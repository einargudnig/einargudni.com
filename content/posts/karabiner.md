---
title: karabiner
slug: karabiner
date: 2026-02-10
---

## Move at the speed of thought

It all started when I saw this video with Max Stoiber.

::YouTubeEmbed{videoId="https://www.youtube.com/watch?v=m5MDv9qwhU8&#x26;t=343s" title="Max Stoiber's Karabiner + Raycast setup" caption="The video that started it all." start="915" aspectRatio="16:9" loop="true"}

I was amazed at how fast he moved around his machine. No reaching for the mouse,
no hunting through the dock, no fumbling for window controls. He just... went.

So I cloned his repo and made my own config.

After using this for over a year now I think this is the second most important
tool I use, right after Raycast. The two go hand in hand.

### Why?

Because I want to be able to move at the speed of thought.

Every time you reach for the mouse, or alt-tab through ten windows to find the
one you want, you pay a tiny tax. A fraction of a second, plus the context
switch in your head. On its own it's nothing. But you do it hundreds of times a
day, and it adds up to a constant low hum of friction.

Karabiner lets me delete that friction. I think "Obsidian" and my fingers open
Obsidian before I've finished the thought.

### The Hyper key

The whole thing is built on one idea: the **Hyper key**.

Your Caps Lock key is prime real estate. It's right there on the home row, under
your strongest finger, and you almost never use it for what it's actually for.
So we steal it.

When you _hold_ Caps Lock it becomes Hyper, which is all four modifiers at once,
Control + Option + Shift + Command (⌃⌥⇧⌘). No app in existence binds anything to
that combo, so it's a clean canvas. When you _tap_ Caps Lock on its own, it sends
Escape, which is genuinely useful if you live in Vim.

::KeyboardShortcut{keys='["Caps Lock"]' description="Hold → Hyper (⌃⌥⇧⌘) · Tap → Escape"}

In Karabiner terms, that's a single rule that flips a `hyper` variable on while
the key is held, and falls back to Escape when tapped alone:

```ts
{
  description: "Caps Lock -> Hyper Key",
  from: {
    key_code: "caps_lock",
    modifiers: { optional: ["any"] },
  },
  to: [{ set_variable: { name: "hyper", value: 1 } }],
  to_after_key_up: [{ set_variable: { name: "hyper", value: 0 } }],
  to_if_alone: [{ key_code: "escape" }],
  type: "basic",
}
```

### Sublayers, or: a leader key for your whole Mac

A single Hyper key gives you one extra layer of shortcuts. That's nice, but the
real trick is **sublayers**.

If you use Vim or tmux you already know this pattern, it's a leader key. You
press a prefix, and now you're in a little mode where the next key means
something specific. Karabiner can do the same thing across the entire operating
system.

The mental model is a tree. Hyper opens the door, the next key picks a room, and
the key after that does the thing:

```
Hyper + O          → "Open apps" room
Hyper + O then N   → open Notion
Hyper + O then M   → open Obsidian
Hyper + O then P   → open Spotify
```

So every shortcut is a tiny three-key sentence: Hyper, category, action. The
beauty is you don't have to memorize arbitrary combos, you just remember the
mnemonics. **O**pen, **W**indow, **S**ystem, **R**aycast.

:::Callout{type="info" title="Why a DSL instead of the GUI?"}
Karabiner is configured with JSON, and the JSON for this gets enormous, mine
compiles down to a 2000+ line file. Writing that by hand is misery. Max's repo
ships a small TypeScript layer that generates the JSON for you, so you describe
your shortcuts in a way that's actually readable and type-safe.
:::

Here's the helper that builds a sublayer. Each command only fires when its
sublayer variable is `1`, which is how Karabiner knows you're "inside" that room:

```ts
export function createHyperSubLayer(
  sublayer_key: KeyCode,
  commands: HyperKeySublayer,
  allSubLayerVariables: string[]
): Manipulator[] {
  const subLayerVariableName = generateSubLayerVariableName(sublayer_key);

  return [
    // Hyper + sublayer_key turns this layer "on" while held
    {
      type: "basic",
      from: { key_code: sublayer_key, modifiers: { optional: ["any"] } },
      to: [{ set_variable: { name: subLayerVariableName, value: 1 } }],
      to_after_key_up: [
        { set_variable: { name: subLayerVariableName, value: 0 } },
      ],
      conditions: [{ type: "variable_if", name: "hyper", value: 1 }],
      // ...plus conditions making sure no *other* sublayer is active
    },
    // every command in the layer, gated on this layer being active
    ...Object.keys(commands).map((command_key) => ({
      ...commands[command_key],
      type: "basic" as const,
      from: { key_code: command_key, modifiers: { optional: ["any"] } },
      conditions: [
        { type: "variable_if", name: subLayerVariableName, value: 1 },
      ],
    })),
  ];
}
```

And because that's verbose too, there are a few tiny helpers so the actual
config reads almost like plain English:

```ts
// open an app
export function app(name: string): LayerCommand {
  return open(`-a '${name}.app'`);
}

// run a raycast deeplink, a URL, anything `open` understands
export function open(...what: string[]): LayerCommand {
  return {
    to: what.map((w) => ({ shell_command: `open ${w}` })),
    description: `Open ${what.join(" & ")}`,
  };
}

// resize windows with Rectangle
export function rectangle(name: string): LayerCommand {
  return {
    to: [{ shell_command: `open -g rectangle://execute-action?name=${name}` }],
    description: `Window: ${name}`,
  };
}
```

### My layers

With those helpers in place, the whole config is basically one big object. Here's
a trimmed version so you can see the shape of it:

```ts
createHyperSubLayers({
  // tap space → add a todo to Things via Raycast
  spacebar: open("raycast://extensions/loris/things/add-new-todo"),

  // o = "Open" apps
  o: {
    a: app("Helium"),
    c: app("Notion Calendar"),
    l: app("Linear"),
    n: app("Notion"),
    m: app("Obsidian"),
    p: app("Spotify"),
    t: app("Things3"),
    w: app("Wezterm"),
    z: app("Zed"),
  },

  // w = "Window" management via Rectangle
  w: {
    h: rectangle("left-half"),
    l: rectangle("right-half"),
    k: rectangle("top-half"),
    j: rectangle("bottom-half"),
    f: rectangle("maximize"),
    y: rectangle("previous-display"),
    o: rectangle("next-display"),
  },

  // s = "System": volume, brightness, lock, etc.
  s: {
    u: { to: [{ key_code: "volume_increment" }] },
    j: { to: [{ key_code: "volume_decrement" }] },
    i: { to: [{ key_code: "display_brightness_increment" }] },
    k: { to: [{ key_code: "display_brightness_decrement" }] },
    l: { to: [{ key_code: "q", modifiers: ["right_control", "right_command"] }] }, // lock
    d: open("raycast://extensions/yakitrak/do-not-disturb/toggle"),
    t: open("raycast://extensions/raycast/system/toggle-system-appearance"),
  },

  // v = "moVe": arrows on hjkl, like Vim
  v: {
    h: { to: [{ key_code: "left_arrow" }] },
    j: { to: [{ key_code: "down_arrow" }] },
    k: { to: [{ key_code: "up_arrow" }] },
    l: { to: [{ key_code: "right_arrow" }] },
    u: { to: [{ key_code: "page_down" }] },
    i: { to: [{ key_code: "page_up" }] },
  },

  // r = "Raycast" deeplinks
  r: {
    h: open("raycast://extensions/raycast/clipboard-history/clipboard-history"),
    e: open("raycast://extensions/raycast/emoji-symbols/search-emoji-symbols"),
    a: open("raycast://extensions/raycast/raycast-ai/ai-chat"),
    f: open("raycast://extensions/raycast/raycast-focus/start-focus-session"),
  },
});
```

A couple of the design choices in there took me a while to appreciate:

:::StylishList
- \- **v for "moVe"** lives on the left hand on purpose, so that
  `hjkl` end up under the right hand exactly where they sit in Vim. Same reason
  music controls are on **c** ("musiC") and not **m**.
- \- The **window** layer mirrors Vim too: `h` and `l` snap the
  window left/right, `j` and `k` snap bottom/top. Once your fingers know hjkl,
  you reuse that muscle memory everywhere.
- \- Most of the power doesn't come from Karabiner alone, it comes
  from feeding **Raycast deeplinks** into it. Anything Raycast can do, a single
  key can now trigger.
:::

That last point is the real unlock, and why I said Karabiner is second to
Raycast and not the other way around. Karabiner is the trigger, Raycast is the
engine.

### Clicking without a mouse

Launching apps and snapping windows gets you most of the way to never touching
the mouse. The last mile is clicking things, and for that I lean on
[Homerow](https://www.homerow.app).

Homerow puts a little label on every clickable element on screen, you type the
label, it clicks. Karabiner is just the trigger that turns it on:

```ts
// top-level Hyper keys, not inside a sublayer
f: { to: [{ key_code: "spacebar", modifiers: ["left_shift", "left_command"] }] }, // click
j: { to: [{ key_code: "j", modifiers: ["left_shift", "left_command"] }] },        // scroll

// and "magic move" lives in the move layer
v: {
  m: { to: [{ key_code: "f", modifiers: ["right_control"] }] }, // Homerow magic move
  s: { to: [{ key_code: "j", modifiers: ["right_control"] }] }, // scroll mode
},
```

So `Hyper F` labels everything I could click,
and `Hyper J` drops me into scroll mode. Between
this and the window layer, the trackpad mostly gathers dust.

### The whole map

Step back and the whole thing is just one mnemonic tree. Hold Hyper, pick a
room, do the thing:

```
Caps Lock (Hyper ⌃⌥⇧⌘)
├── space → add a todo
├── f / j → Homerow click / scroll
├── o → Open apps      (n Notion · m Obsidian · p Spotify · …)
├── b → Browse         (websites)
├── w → Window         (hjkl halves · f maximize · displays)
├── s → System         (volume · brightness · lock · theme · DND)
├── v → moVe           (hjkl arrows · page up/down · magic move)
├── c → musiC          (play/pause · next · prev)
└── r → Raycast        (clipboard · emoji · AI · focus · …)
```

That's the entire mental model. Nine rooms, and once your fingers know which
letter opens which, the rest is just muscle memory.

### Building it

Because the config is TypeScript, there's a build step. It's not scary, the whole
"build" just serializes that big object into the `karabiner.json` Karabiner
actually reads:

```bash
# install deps once
yarn install

# generate karabiner.json from rules.ts
yarn build

# or rebuild on every change while you tinker
yarn watch
```

I keep `yarn watch` running whenever I'm adding a new shortcut. Change a line,
save, and the binding is live a second later. That tight loop is what makes it
fun to keep extending, instead of a thing you set up once and never touch.

:::Callout{type="tip" title="Make it yours"}
Don't copy my layers wholesale, they're shaped around the apps _I_ use. Max
gives the same advice: delete all the sublayers, then add your own based on
what you actually reach for during the day. The config is the easy part, the
hard part is being honest about your own habits.
:::

### Was it worth it?

Completely. The setup cost was an afternoon, and a week or two of my fingers
fighting old habits. After that it just became how I use a computer. I genuinely
notice the friction now when I'm on someone else's machine and Caps Lock is just
Caps Lock again.

If you want to start, watch Max's video, clone his repo, and strip it down to a
single layer you'll actually use. Open apps is a great first one. Add to it as
you go.

Kudos, as always, go to [Max Stoiber](https://github.com/mxstbr/karabiner) for the config and the DSL. My own version lives in my [dotfiles](https://github.com/einargudnig/dotfiles/tree/master/karabiner) if you want to poke around.
