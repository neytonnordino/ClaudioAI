"use client";

import { db } from "@/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { PiNoteBlankLight } from "react-icons/pi";

const NewChat = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const userEmail = session?.user
    ? (session?.user?.email as string)
    : "unknown";
  const createNewChat = async () => {
    const doc = await addDoc(collection(db, "users", userEmail, "chats"), {
      userId: userEmail,
      createdAt: serverTimestamp(),
    });
    router.push(`/chat/${doc?.id}`);
  };
  return (
    <button
      onClick={createNewChat}
      className="flex gap-3 items-center hover:bg-white/20 p-2 rounded-xl cursor-pointer"
    >
      <PiNoteBlankLight className="text-2xl " /> <h1>Novo Chat</h1>
    </button>
  );
};

export default NewChat;
