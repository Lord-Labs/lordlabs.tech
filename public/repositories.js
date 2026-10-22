import { projects } from "./projects.js";
export const ORGANIZATION = "Lord-Labs";
const count = (value) => Number.isSafeInteger(value) && value >= 0 ? value : 0;
export function safeHomepage(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password ? url.href : "";
  } catch { return ""; }
}
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
      topics: Array.isArray(repo.topics) ? repo.topics.filter((v) => typeof v === "string").slice(0, 8) : [],
      stars: count(repo.stargazers_count),
      forks: count(repo.forks_count),
      openItems: count(repo.open_issues_count),
      updatedAt: typeof repo.pushed_at === "string" && Number.isFinite(Date.parse(repo.pushed_at)) ? repo.pushed_at : null,
      homepage: safeHomepage(repo.homepage),
      license:
        repo.license?.spdx_id === "NOASSERTION"
          ? ""
          : repo.license?.spdx_id || "",
      url: `https://github.com/${ORGANIZATION}/${encodeURIComponent(repo.name)}`,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}
export function curateRepositories(repositories, selection = projects) {
  return selection.flatMap(project => {
    const repo = repositories.find(item => item.name.toLowerCase() === project.repository.toLowerCase());
    return repo ? [{...repo, project}] : [];
  });
}
export function selectRepositories(repositories, { query = "", language = "", sort = "curated" } = {}) {
  const term = query.trim().toLocaleLowerCase();
  return repositories.filter((repo) =>
    (!language || repo.language === language) &&
    (!term || [repo.name, repo.description, repo.language, ...repo.topics, ...Object.values(repo.project?.description || {}), ...Object.values(repo.project?.tagline || {})].join(" ").toLocaleLowerCase().includes(term))
  ).sort((a, b) => {
    if (sort === "stars") return b.stars - a.stars || a.name.localeCompare(b.name);
    if (sort === "name") return a.name.localeCompare(b.name);
    if (sort === "curated") return 0;
    return (Date.parse(b.updatedAt) || 0) - (Date.parse(a.updatedAt) || 0) || a.name.localeCompare(b.name);
  });
}
export async function getSelectedRepositoryData(fetcher = fetch) {
  return Promise.all(projects.map(async project => {
    const response = await fetcher(
      `https://api.github.com/repos/${ORGANIZATION}/${encodeURIComponent(project.repository)}`,
      {
        headers: { Accept: "application/vnd.github+json" },
        signal: AbortSignal.timeout(8000),
      },
    );
    if (!response.ok)
      throw new Error(`GitHub unavailable (${response.status})`);
    const item = await response.json();
    const [verified] = normalizeRepositories([item]);
    if (!verified || verified.name.toLowerCase() !== project.repository.toLowerCase()) throw new TypeError("Invalid selected repository response");
    return item;
  }));
}
export async function getSelectedRepositories(fetcher = fetch) {
  return curateRepositories(normalizeRepositories(await getSelectedRepositoryData(fetcher)));
}
