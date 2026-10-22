import test from "node:test";
import assert from "node:assert/strict";
import { projects as selectedProjects } from '../public/projects.js';
import {
  normalizeRepositories,
  getSelectedRepositories,
  curateRepositories,
  selectRepositories,
  safeHomepage,
} from "../public/repositories.js";
const repo = (overrides) => ({
  name: "example",
  owner: { login: "Lord-Labs" },
  description: "A useful project",
  language: "JavaScript",
  license: { spdx_id: "MIT" },
  ...overrides,
});

test("project discovery searches topics and descriptions, combines filters, and sorts without mutating data", () => {
  const projects = normalizeRepositories([
    repo({name:"zeta", language:"CSS", topics:["arabic"], stargazers_count:5, pushed_at:"2026-10-20T12:00:00Z"}),
    repo({name:"alpha", language:"JavaScript", description:"An Arabic reading tool", stargazers_count:12, pushed_at:"2026-10-21T12:00:00Z"}),
    repo({name:"beta", language:"CSS", topics:["design"], pushed_at:null}),
  ]);
  const original = projects.map(p => p.name);
  assert.deepEqual(selectRepositories(projects, {query:" ARABIC ",sort:"updated"}).map(p=>p.name), ["alpha","zeta"]);
  assert.deepEqual(selectRepositories(projects, {query:"arabic",language:"CSS"}).map(p=>p.name), ["zeta"]);
  assert.deepEqual(selectRepositories(projects, {sort:"name"}).map(p=>p.name), ["alpha","beta","zeta"]);
  assert.deepEqual(selectRepositories(projects, {sort:"stars"}).map(p=>p.name), ["alpha","zeta","beta"]);
  assert.deepEqual(selectRepositories(projects, {query:"missing"}), []);
  assert.deepEqual(projects.map(p=>p.name),original);
});

test("homepage links reject credentials and executable schemes; metadata stays predictable", () => {
  for(const value of ["javascript:alert(1)","data:text/html,test","http://example.com","https://user:secret@example.com",null,"not a URL"]) assert.equal(safeHomepage(value),"");
  assert.equal(safeHomepage("https://example.com/docs"),"https://example.com/docs");
  const [result] = normalizeRepositories([repo({topics:["design",null,7],stargazers_count:-1,forks_count:Infinity,open_issues_count:2,pushed_at:"invalid",homepage:"javascript:alert(1)"})]);
  assert.deepEqual(result.topics,["design"]);
  assert.equal(result.stars,0);assert.equal(result.forks,0);assert.equal(result.openItems,2);assert.equal(result.updatedAt,null);assert.equal(result.homepage,"");
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
test("only selected endpoints are fetched and the project retains its curated identity", async () => {
  const urls=[];
  const projects=await getSelectedRepositories(async url=>{urls.push(url);return {ok:true,json:async()=>repo({name:url.split('/').at(-1)})};});
  assert.deepEqual(urls,selectedProjects.map(project=>`https://api.github.com/repos/Lord-Labs/${project.repository}`));
  assert.deepEqual(projects.map(project=>project.project.identity),['zipzap','lor']);
});
test("unselected snapshot entries never enter the gallery, search, or editorial order", () => {
  const raw=normalizeRepositories([repo({name:"unselected"}),repo({name:"lor"}),repo({name:"ZipZap"})]);
  const curated=curateRepositories(raw);
  assert.deepEqual(curated.map(item=>item.name),["ZipZap","lor"]);
  assert.deepEqual(selectRepositories(curated,{query:"unselected"}),[]);
  assert.equal(selectRepositories(curated,{query:"تنزيلاتك"}).length,1);
  assert.equal(selectRepositories(curated,{query:"اجتماعات"})[0].name,'lor');
  const ordered=curateRepositories(raw,[{repository:"unselected"},{repository:"ZipZap"}]);
  assert.deepEqual(selectRepositories(ordered).map(item=>item.name),["unselected","ZipZap"]);
});
test("rate limits and malformed responses reject so static content remains available", async () => {
  await assert.rejects(
    getSelectedRepositories(async () => ({ ok: false, status: 403 })),
    /403/,
  );
  await assert.rejects(
    getSelectedRepositories(async () => ({
      ok: true,
      json: async () => ({ message: "error" }),
    })),
    /Invalid/,
  );
  await assert.rejects(getSelectedRepositories(async()=>({ok:true,json:async()=>repo({name:"unselected"})})),/Invalid/);
});
