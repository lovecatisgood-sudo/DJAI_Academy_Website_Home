import ChineseBlogHub, { chineseBlogMetadata } from "../ChineseBlogHub";

export const metadata = chineseBlogMetadata("zh-CN");
export default function Page() { return <ChineseBlogHub locale="zh-CN" />; }
