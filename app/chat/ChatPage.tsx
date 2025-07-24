"use client";

import React from "react";
import ChatHelp from "../components/ChatHelp";
import { useUser } from "../contexts/UserContext";
import ChatInput from "../components/ChatInput";

function ChatPage() {
  const { userName } = useUser();

  return (
    <>
      <main className="h-full  ">
        <div className="max-w-3xl mx-auto h-full flex flex-col gap-24 justify-end md:justify-center py-2">
          <h1 className=" text-xl md:text-3xl text-center">
            Olá {userName}, o que posso fazer por ti hoje?
          </h1>

          <div className="flex flex-col gap-12 pb-2">
            <div className="flex flex-col gap-6 px-2">
              <ChatInput chatId="" />
              <ChatHelp />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default ChatPage;
