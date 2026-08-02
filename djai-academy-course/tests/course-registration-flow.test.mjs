import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const appDirectory = new URL("../app/", import.meta.url);

async function source(path) {
  return readFile(new URL(path, appDirectory), "utf8");
}

test("uses the Academy allowlisted course intent", async () => {
  const registration = await source("lib/courseRegistration.js");

  assert.match(registration, /COURSE_ID = "ai-masterclass"/);
  assert.match(registration, /SCHOOL_ORIGIN = "https:\/\/school\.djai\.academy"/);
  assert.match(registration, /intent=offline-course&course_id=/);
  assert.match(registration, /\/api\/auth\/session/);
});

test("checks the authenticated school session with credentials", async () => {
  const component = await source("CourseRegistrationLink.jsx");

  assert.match(component, /credentials: "include"/);
  assert.match(component, /session\?\.authenticated === true/);
  assert.match(component, /courseRegistrationUrls\.reserve/);
  assert.match(component, /courseRegistrationUrls\.signup/);
});

test("course CTAs no longer bypass account registration", async () => {
  const pages = await Promise.all([
    source("page.jsx"),
    source("en/page.jsx"),
    source("CourseDetailPage.jsx")
  ]);

  for (const page of pages) {
    assert.doesNotMatch(page, /buy\.stripe\.com/);
    assert.match(page, /CourseRegistrationLink/);
    assert.match(page, /courseRegistrationUrls\.login/);
  }
});
