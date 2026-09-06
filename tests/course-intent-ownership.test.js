const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.resolve(__dirname, "..");
const read = (relativePath) => readFileSync(path.join(root, relativePath), "utf8");

const paidTh = read("djai-academy-course/app/page.jsx");
const paidEn = read("djai-academy-course/app/en/page.jsx");
const paidVi = read("djai-academy-course/app/vi/page.jsx");
const paidLayout = read("djai-academy-course/app/layout.jsx");
const detailTh = read("djai-academy-course/app/detail/page.jsx");
const detailEn = read("djai-academy-course/app/detail/en/page.jsx");
const detailVi = read("djai-academy-course/app/detail/vi/page.jsx");
const detailContent = read("djai-academy-course/app/CourseDetailPage.jsx");
const freeCourse = read("Siamese-Cat-Dev-Bio-Site/src/CourseApp.tsx");
const catalogComponent = read("Siamese-Cat-Dev-Bio-Site/src/CoursesApp.tsx");
const catalogData = JSON.parse(read("Siamese-Cat-Dev-Bio-Site/src/courses-data.json"));
const routeBuilder = read("Siamese-Cat-Dev-Bio-Site/scripts/copy-routes.mjs");
const ownership = JSON.parse(read("data/seo/keyword-ownership.json"));

test("paid Masterclass landing owns evaluation and registration intent", () => {
  assert.match(paidLayout, /Offline AI Masterclass in Thailand|AI Masterclass ออฟไลน์/);
  assert.match(paidTh, /AI Masterclass ออฟไลน์/);
  assert.match(paidEn, /Offline AI Masterclass/);
  assert.match(paidVi, /AI Masterclass trực tiếp/);
  for (const source of [paidTh, paidEn, paidVi]) {
    assert.match(source, /CourseRegistrationLink/);
    assert.match(source, /courseRegistrationUrls\.login/);
  }
});

test("detail routes own schedule, curriculum, and outcome reassurance", () => {
  assert.match(detailTh, /หลักสูตรและตารางเรียน/);
  assert.match(detailEn, /Curriculum and Schedule/);
  assert.match(detailVi, /Lịch học và nội dung/);
  assert.match(detailContent, /See the curriculum, full-day schedule, and project outcome/);
  assert.match(detailContent, /ดูหลักสูตร ตารางเรียนเต็มวัน และผลลัพธ์ของโปรเจกต์/);
  assert.doesNotMatch(detailEn, /Offline AI Masterclass in Thailand: Build and Reserve/);
});

test("the current free live course is distinct from the paid offline Masterclass", () => {
  assert.match(freeCourse, /Free Live Vibe Coding Course/);
  assert.match(freeCourse, /คอร์ส Vibe Coding สดฟรี/);
  assert.match(freeCourse, /This free live session/);
  assert.match(freeCourse, /คลาสสดฟรีนี้/);
  assert.doesNotMatch(freeCourse, /22 August 2026|22 สิงหาคม 2026|5,999|5999/);
  assert.match(routeBuilder, /Free Live Vibe Coding Course/);
});

test("catalog and individual courses own discovery and exact build outcomes", () => {
  assert.match(catalogData.hub.title, /AI Coding Courses and Vibe Coding/);
  assert.match(catalogData.hub.lead, /compare/i);
  assert.deepEqual(
    catalogData.courses.map((course) => course.slug),
    ["build-first-app", "make-a-game", "coding-with-ai"]
  );
  assert.equal(new Set(catalogData.courses.map((course) => course.metaTitle)).size, 3);
  for (const course of catalogData.courses) {
    assert.match(course.outcome, /app|game|plan/i);
    assert.match(catalogComponent, /<h1>\{course\.title\}<\/h1>/);
  }
});

test("School owns future public learning discovery while legacy pages remain functional", () => {
  assert.equal(ownership.propertyBoundaries.www.publicLearningDiscovery, false);
  assert.equal(ownership.propertyBoundaries.school.publicLearningDiscovery, true);
  assert.equal(ownership.propertyBoundaries.school.authenticatedLearning, true);

  const plannedSchoolRoutes = new Set(ownership.plannedSchoolLearningRoutes);
  for (const route of [
    "https://school.djai.academy/th/courses",
    "https://school.djai.academy/en/courses",
    "https://school.djai.academy/th/courses/vibe-coding",
    "https://school.djai.academy/en/courses/vibe-coding",
  ]) {
    assert.equal(plannedSchoolRoutes.has(route), true, `missing School owner: ${route}`);
  }

  const learningRows = ownership.entries.filter(({ cluster }) => ["course", "vibe"].includes(cluster));
  assert.ok(learningRows.length > 0);
  for (const row of learningRows) {
    assert.equal(row.property, "www", `${row.route}: current property`);
    assert.equal(row.futureProperty, "school", `${row.route}: future property`);
    if (row.locale === "vi") {
      assert.equal(row.migrationStatus, "retained_until_equivalent", `${row.route}: migration status`);
      assert.equal(row.futureUrl, null, `${row.route}: no cross-locale redirect`);
    } else {
      assert.equal(row.migrationStatus, "pending_school_replacement", `${row.route}: migration status`);
      assert.match(row.futureUrl, new RegExp(`^https://school\\.djai\\.academy/${row.locale}/courses(?:/|$)`));
    }
  }

  for (const source of [freeCourse, catalogComponent]) {
    assert.match(source, /https:\/\/school\.djai\.academy/);
    assert.match(source, /Start or continue learning|เริ่มหรือเรียนต่อ/);
  }
});

test("approved paid-course facts remain unchanged", () => {
  assert.match(paidEn, /22 August 2026/);
  assert.match(paidEn, /5,999/);
  assert.match(paidTh, /22 สิงหาคม 2026/);
  assert.match(paidTh, /5,999/);
  assert.match(paidVi, /22 tháng 8, 2026/);
  assert.match(paidVi, /5\.999/);
});
