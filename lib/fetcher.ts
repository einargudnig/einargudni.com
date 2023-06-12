export default async function Fetcher(url: string) {
	return fetch(url).then((r) => r.json());
}
