import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");

test("loads the official project areas instead of the legacy groups", () => {
  assert.match(html, /from\("project_areas"\)/);
  assert.match(html, /Todas as áreas/);
  assert.match(html, /Área responsável/);
});

test("combines calendar activities, deliveries and published notices", () => {
  assert.match(html, /from\("baja_events"\)/);
  assert.match(html, /from\("milestones"\)/);
  assert.match(html, /from\("announcements"\)/);
  assert.match(html, /source: "milestone"/);
  assert.match(html, /source: "announcement"/);
});

test("saves calendar activities with multiple assignees", () => {
  assert.match(html, /id="eventAssignees"/);
  assert.match(html, /save_baja_event_with_assignees/);
  assert.match(html, /assignee_ids: assigneeIds/);
  assert.match(html, /Responsáveis/);
});

test("imports the portal session through a short-lived one-time code", () => {
  assert.match(html, /portal-session-transfer/);
  assert.match(html, /portal_code/);
  assert.match(html, /history\.replaceState/);
  assert.match(html, /credentials:\s*"omit"/);
  assert.match(html, /cache:\s*"no-store"/);
  assert.doesNotMatch(html, /portal_access_token/);
  assert.doesNotMatch(html, /portal_refresh_token/);
});

test("provides the seven-column private notes table and CRUD", () => {
  for (const heading of ["Descrição", "Área", "Data", "Prazo", "Prioridade", "Status", "Observações"]) {
    assert.match(html, new RegExp(`<th>${heading}</th>`));
  }
  assert.match(html, /from\("personal_notes"\)/);
  assert.match(html, /function saveNote/);
  assert.match(html, /function deleteNote/);
  assert.match(html, /somente você pode consultá-la/);
});

test("keeps the embedded application JavaScript syntactically valid", () => {
  const scripts = [...html.matchAll(/<script(?:[^>]*)>([\s\S]*?)<\/script>/g)];
  assert.ok(scripts.length > 0);
  assert.doesNotThrow(() => new Function(scripts.at(-1)[1]));
});
