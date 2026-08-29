import ChineseCoursePage, { chineseCourseMetadata } from "../ChineseCoursePage";
import { courseContent } from "../course-content.zh-TW";

const content = { ...courseContent, indexable: false };
export const metadata = chineseCourseMetadata(content);
export default function Page() { return <ChineseCoursePage content={content} />; }
