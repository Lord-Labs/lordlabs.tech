import test from "node:test";
import assert from "node:assert/strict";
import {
  normalizeRepositories,
  getPublicRepositories,
} from "../public/repositories.js";
const repo = (overrides) => ({
  name: "example",
  owner: { login: "Lord-Labs" },
  description: "A useful project",
  language: "JavaScript",
  license: { spdx_id: "MIT" },
  ...overrides,
});
test("only owned, public, original, active projects appear", () => {
  const result = normalizeRepositories([
    repo({}),
    repo({ private: true }),
    repo({ archived: true }),
    repo({ fork: true }),
    repo({ name: ".github" }),
    repo({ owner: { login: "another-org" } }),
    null,
  ]);
  assert.equal(result.length, 1);
  assert.equal(result[0].url, "https://github.com/Lord-Labs/example");
});
test("untrusted URLs never become links and missing metadata is handled", () => {
  const [result] = normalizeRepositories([
    repo({
      name: "a project",
      html_url: "javascript:alert(1)",
      description: null,
      license: null,
    }),
  ]);
  assert.equal(result.url, "https://github.com/Lord-Labs/a%20project");
  assert.equal(result.description, "");
  assert.equal(result.license, "");
});
test("pagination includes projects beyond the first 100", async () => {
  let calls = 0;
  const projects = await getPublicRepositories(async (url) => {
    calls++;
    assert.ok(url.includes(`page=${calls}`));
    return {
      ok: true,
      json: async () =>
        calls === 1
          ? Array.from({ length: 100 }, (_, i) =>
              repo({ name: `project-${i}` }),
            )
          : [repo({ name: "last-project" })],
    };
  });
  assert.equal(calls, 2);
  assert.equal(projects.length, 101);
});
test("rate limits and malformed responses reject so static content remains available", async () => {
  await assert.rejects(
    getPublicRepositories(async () => ({ ok: false, status: 403 })),
    /403/,
  );
  await assert.rejects(
    getPublicRepositories(async () => ({
      ok: true,
      json: async () => ({ message: "error" }),
    })),
    /Invalid/,
  );
});
