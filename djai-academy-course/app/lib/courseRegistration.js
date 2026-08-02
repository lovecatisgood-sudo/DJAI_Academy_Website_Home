export const COURSE_ID = "ai-masterclass";
export const SCHOOL_ORIGIN = "https://school.djai.academy";

const courseQuery = `intent=offline-course&course_id=${COURSE_ID}`;

export const courseRegistrationUrls = {
  signup: `${SCHOOL_ORIGIN}/signup?${courseQuery}`,
  login: `${SCHOOL_ORIGIN}/login?${courseQuery}`,
  reserve: `${SCHOOL_ORIGIN}/reserve-seat?course_id=${COURSE_ID}`,
  session: `${SCHOOL_ORIGIN}/api/auth/session`
};
