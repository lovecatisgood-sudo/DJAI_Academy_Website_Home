import ChineseCoursePage, { chineseCourseMetadata } from "../../ChineseCoursePage";
import { courseContent } from "../../course-content.zh-CN";

const content = { ...courseContent, indexable: false };
export const metadata = chineseCourseMetadata(content, true);
export default function Page() { return <ChineseCoursePage content={content} detail />; }
