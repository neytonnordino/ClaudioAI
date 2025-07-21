"use client"

import { db } from "@/firebase";
import { collection, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { BiSolidTrashAlt } from "react-icons/bi";
import { IoChatboxOutline } from "react-icons/io5";
import { motion } from "framer-motion";

type ChatRowProps = {
  id: string;
};

const ChatRow = ({ id }: ChatRowProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [active, setActive] = useState(false);
  const [messages, loading] = useCollection(
    session
      ? query(
          collection(
            db,
            "users",
            session?.user?.email as string,
            "chats",
            id,
            "messages"
          )
        )
      : null
  );

  const chat =
    messages?.docs[messages?.docs?.length - 1]?.data().text &&
    messages?.docs[messages?.docs?.length - 1]?.data();

  const chatText = chat?.text || "New Chat";
  const shouldAnimate = active;

  useEffect(() => {
    if (!pathname) return;
    setActive(pathname.includes(id));
  }, [pathname, id]);

  const [chatSnapShot] = useCollection(
    session
      ? query(
          collection(db, "users", session?.user?.email as string, "chats"),
          orderBy("createdAt", "desc")
        )
      : null
  );

  const handleRemoveChat = async () => {
    await deleteDoc(
      doc(db, "users", session?.user?.email as string, "chats", id)
    );
    if (active) {
      const nextChat = chatSnapShot?.docs?.find((chat) => chat.id !== id);
      if (nextChat) {
        router.push(`/chat/${nextChat.id}`);
      } else {
        router.push("/");
      }
    }
  };
  return (
    <Link
      href={`/chat/${id}`}
      className={`flex gap-2 items-center justify-center px-2 py-1.5  bg-transparent mb-2 hover:bg-white/10 rounded-md duration-300 ease-in ${
        active ? "bg-white/10" : "bg-transparent"
      }`}
    >
      <IoChatboxOutline />
      <div className="relative flex-1 select-none overflow-hidden text-ellipsis break-all">
        <span className="whitespace-nowrap">
          {shouldAnimate ? (
            chat?.text ? (
              chat.text?.split("").map((character: string, index: number) => (
                <motion.span
                  key={index}
                  variants={{
                    initial: { opacity: 0, x: -100 },
                    animate: { opacity: 1, x: 0 },
                  }}
                  initial={shouldAnimate ? "initial" : undefined}
                  animate={shouldAnimate ? "animate" : undefined}
                  transition={{
                    duration: 0.25,
                    ease: "easeIn",
                    delay: index * 0.05,
                    staggerChildren: 0.05,
                  }}
                >
                  <span className="text-sm font-medium tracking-wide text-green-200">
                    {character}
                  </span>
                </motion.span>
              ))
            ) : (
              <span className="text-sm font-medium tracking-wide">
                {loading ? <span>....</span> : chatText}
              </span>
            )
          ) : (
            <span className="text-sm font-medium tracking-wide">
              {loading ? <span>....</span> : chatText}
            </span>
          )}
        </span>
      </div>
      <BiSolidTrashAlt
        onClick={handleRemoveChat}
        className="text-white/50 hover:text-red-500 duration-300 ease-inout"
      />
    </Link>
  );
};

export default ChatRow;
