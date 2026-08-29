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
  assert.match(component, /registrationUrlFor\("reserve", locale\)/);
  assert.match(component, /registrationUrlFor\("signup", locale\)/);
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

test("Chinese course routes are complete and independently localized", async () => {
  const [zhCn, zhTw] = await Promise.all([
    import("../app/course-content.zh-CN.js"),
    import("../app/course-content.zh-TW.js")
  ]);

  assert.equal(zhCn.courseContent.locale, "zh-CN");
  assert.equal(zhTw.courseContent.locale, "zh-TW");
  assert.match(zhCn.courseContent.hero.title, /人工智能|AI/);
  assert.match(zhTw.courseContent.hero.title, /人工智慧|AI/);
  assert.notEqual(zhCn.courseContent.hero.copy, zhTw.courseContent.hero.copy);
  assert.equal(zhCn.courseContent.indexable, false);
  assert.equal(zhTw.courseContent.indexable, false);

  for (const path of ["zh-cn/page.jsx", "zh-tw/page.jsx", "detail/zh-cn/page.jsx", "detail/zh-tw/page.jsx"]) {
    const page = await source(path);
    assert.match(page, /indexable: false/);
    assert.match(page, /ChineseCoursePage/);
  }
});

test("course registration preserves Chinese market attribution", async () => {
  const registration = await import("../app/lib/courseRegistration.js");
  assert.match(registration.registrationUrlFor("signup", "zh-CN"), /locale=zh-CN/);
  assert.match(registration.registrationUrlFor("reserve", "zh-TW"), /locale=zh-TW/);
  const link = await source("CourseRegistrationLink.jsx");
  assert.match(link, /registrationUrlFor\("signup", locale\)/);
  assert.match(link, /registrationUrlFor\("reserve", locale\)/);
});
