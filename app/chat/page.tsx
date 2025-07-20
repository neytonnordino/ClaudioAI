import type { Metadata } from "next";
import ChatPage from "./ChatPage";

export const metadata: Metadata = {
  title: "ClaudioAI",
  description: "ClaudioAI powered by Next.js and React",
};

export default function Page() {
  return <ChatPage />;
}
