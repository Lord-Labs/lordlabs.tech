import { writeFile, rename } from "node:fs/promises";
import { ORGANIZATION, getSelectedRepositoryData } from "../public/repositories.js";

// Only explicitly selected public projects are fetched. Failures leave the saved copy intact.
const repositories = await getSelectedRepositoryData();
const fields = ["name", "description", "language", "topics", "stargazers_count", "forks_count", "open_issues_count", "pushed_at", "homepage", "license", "private", "archived", "fork"];
const snapshot = {
  fetchedAt: new Date().toISOString(),
  repositories: repositories.map(repo => ({
    ...Object.fromEntries(fields.map(key => [key, repo[key]])),
    owner: { login: ORGANIZATION },
  })),
};
const destination = new URL("../public/data/repositories.json", import.meta.url);
const temporary = new URL("../public/data/repositories.json.tmp", import.meta.url);
await writeFile(temporary, JSON.stringify(snapshot, null, 2) + "\n");
await rename(temporary, destination);
console.log(`Saved ${repositories.length} selected public projects.`);
