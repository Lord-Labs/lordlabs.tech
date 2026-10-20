export const ORGANIZATION = "Lord-Labs";
export function normalizeRepositories(items) {
  if (!Array.isArray(items)) throw new TypeError("Expected repositories");
  return items
    .filter(
      (repo) =>
        repo &&
        !repo.private &&
        !repo.archived &&
        !repo.fork &&
        repo.name !== ".github" &&
        typeof repo.name === "string" &&
        repo.owner?.login?.toLowerCase() === ORGANIZATION.toLowerCase(),
    )
    .map((repo) => ({
      name: repo.name,
      description: typeof repo.description === "string" ? repo.description : "",
      language: typeof repo.language === "string" ? repo.language : "",
      license:
        repo.license?.spdx_id === "NOASSERTION"
          ? ""
          : repo.license?.spdx_id || "",
      url: `https://github.com/${ORGANIZATION}/${encodeURIComponent(repo.name)}`,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}
export async function getPublicRepositories(fetcher = fetch) {
  const result = [];
  for (let page = 1; ; page++) {
    const response = await fetcher(
      `https://api.github.com/orgs/${ORGANIZATION}/repos?type=public&per_page=100&page=${page}`,
      {
        headers: { Accept: "application/vnd.github+json" },
        signal: AbortSignal.timeout(8000),
      },
    );
    if (!response.ok)
      throw new Error(`GitHub unavailable (${response.status})`);
    const batch = await response.json();
    if (!Array.isArray(batch)) throw new TypeError("Invalid GitHub response");
    result.push(...batch);
    if (batch.length < 100) break;
  }
  return normalizeRepositories(result);
}
