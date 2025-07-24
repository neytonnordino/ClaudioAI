"use client";

import { db } from "@/firebase";
import { collection, orderBy, query, doc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { BsArrowDownCircle } from "react-icons/bs";
import Message from "./Message";
import MessageSkeleton from "./MessageSkeleton";

export default function ChatMessage({ id }: { id: string }) {
  const { data: session } = useSession();
  const userEmail = session?.user?.email || "unknown";

  const chatDocRef = doc(db, "users", userEmail, "chats", id);

  const messagesRef = collection(chatDocRef, "messages");

  const [messages, loading] = useCollection(
    query(messagesRef, orderBy("createdAt", "asc"))
  );

  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="pt-50 md:pt-52 max-w-full md:max-w-3xl mx-auto h-[calc(100vh-120px)] md:h-dvh overflow-y-auto overflow-x-hidden px-2 sm:px-4 scrollbar1 transition">
      {loading ? (
        // Skeleton loader while fetching data
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <MessageSkeleton key={index} isUser={index % 2 === 1} />
          ))}
        </div>
      ) : messages?.empty ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-0 pt-10">
          {/* Main empty state container */}
          <div className="text-center space-y-6 max-w-md">
            {/* Icon */}
            <div className="relative">
              <div className="w-10 h-10 md:w-20 md:h-20 mx-auto bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center border border-white/10">
                <svg
                  className="w-10 h-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-white">
                Bem-vindo ao Claudio
              </h2>
              <p className="text-neutral-400 text-sm leading-relaxed hidden md:block">
                Seu assistente de IA pessoal. Estou aqui para ajudar com
                qualquer pergunta, tarefa ou conversa.
              </p>
            </div>

            {/* Quick suggestions */}
            <div className="space-y-3">
              <p className="text-xs text-neutral-500 uppercase tracking-wider font-medium">
                Tente algumas sugestões:
              </p>
              <div className="grid grid-cols-1 gap-2">
                {[
                  "Explique um conceito complexo de forma simples",
                  "Escreva um email profissional",
                  "Analise um problema e sugira soluções",
                ].map((suggestion, index) => (
                  <div
                    key={index}
                    className="group py-2 px-3 md:p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg cursor-pointer transition-all duration-200"
                  >
                    <p className="text-sm text-neutral-300 group-hover:text-white transition-colors">
                      {suggestion}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to action */}
            <div className="pt-2">
              <div className="flex items-center justify-center gap-2 text-neutral-200 animate-pulse">
                <BsArrowDownCircle className="text-lg" />
                <span className="text-sm font-medium">
                  Digite sua mensagem abaixo
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        messages?.docs.map((message, index) => (
          <div className="" key={index}>
            <Message message={message?.data()} />
          </div>
        ))
      )}
      <div ref={bottomRef} />
    </div>
  );
}
