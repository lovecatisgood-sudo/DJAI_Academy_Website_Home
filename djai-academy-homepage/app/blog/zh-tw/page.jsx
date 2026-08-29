import ChineseBlogHub, { chineseBlogMetadata } from "../ChineseBlogHub";

export const metadata = chineseBlogMetadata("zh-TW");
export default function Page() { return <ChineseBlogHub locale="zh-TW" />; }
