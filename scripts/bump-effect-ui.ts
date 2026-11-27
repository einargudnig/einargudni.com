// Moves the vendored Effect UI snapshot to another commit of Effect-TS/ui:
// downloads its three pkg.pr.new tarballs into vendor/, repoints package.json,
// then installs and runs build, test, check and parity against the live site.
//
//   bun run bump-effect-ui <sha>
//
// Stops at the first failing step and leaves the tree as it is, so the failure
// can be read. `git checkout package.json bun.lock vendor` undoes the bump.

import { $ } from "bun";

const PACKAGES = ["ui", "ui-kit", "ui-devtools"] as const;
const PORT = 8799;

const sha = process.argv[2] ?? "";
if (!/^[0-9a-f]{7,40}$/.test(sha)) {
  console.error("usage: bun run bump-effect-ui <commit sha of Effect-TS/ui>");
  process.exit(1);
}

const tarball = (name: string, version: string) => `vendor/effect-${name}-${version}.tgz`;

const manifest = await Bun.file("package.json").text();
const current = /vendor\/effect-ui-([0-9a-f]+)\.tgz/.exec(manifest)?.[1];
if (current === undefined) {
  console.error("package.json doesn't point at a vendored @effect/ui tarball");
  process.exit(1);
}
if (sha.startsWith(current) || current.startsWith(sha)) {
  console.log(`already on ${current}`);
  process.exit(0);
}

// Download everything before touching package.json: a snapshot pkg.pr.new
// never built for one of the packages should leave nothing half-changed.
const downloads = await Promise.all(
  PACKAGES.map(async (name) => {
    const url = `https://pkg.pr.new/Effect-TS/ui/@effect/${name}@${sha}`;
    const response = await fetch(url);
    return { name, url, response, bytes: response.ok ? await response.arrayBuffer() : null };
  }),
);
const missing = downloads.filter(({ bytes }) => bytes === null);
if (missing.length > 0) {
  for (const { url, response } of missing) console.error(`${response.status} ${url}`);
  process.exit(1);
}
await Promise.all(downloads.map(({ name, bytes }) => Bun.write(tarball(name, sha), bytes!)));

await Bun.write("package.json", manifest.replaceAll(`-${current}.tgz`, `-${sha}.tgz`));
console.log(`package.json: ${current} → ${sha}`);

// bun.lock still names the old tarballs, and install reads them while it
// re-resolves, so they go only once it is done.
await $`bun install`;
await $`rm -f ${PACKAGES.map((name) => tarball(name, current))}`;
await $`bun run build`;
await $`bun run test`;
// check typechecks the Worker against the gitignored worker-configuration.d.ts.
await $`bun run cf-typegen`;
await $`bun run check`;

const preview = Bun.spawn(["bunx", "wrangler", "dev", "--port", String(PORT)], {
  stdout: "ignore",
  stderr: "ignore",
});
try {
  const ready = async (tries: number): Promise<boolean> => {
    if (tries === 0) return false;
    const up = await fetch(`http://localhost:${PORT}/`).then(
      (response) => response.ok,
      () => false,
    );
    if (up) return true;
    await Bun.sleep(500);
    return ready(tries - 1);
  };
  if (!(await ready(60))) throw new Error(`wrangler dev didn't answer on port ${PORT}`);
  // Parity reports the diffs the bump causes; read them before committing.
  await $`bun scripts/parity.ts http://localhost:${PORT}`.nothrow();
} finally {
  preview.kill();
}

console.log(`\nbumped Effect UI to ${sha}. Review the parity report, then commit.`);
