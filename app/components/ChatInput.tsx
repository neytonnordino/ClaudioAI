"use client";

import { db } from "@/firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { TbPaperclip } from "react-icons/tb";
import LoadingDot from "./LoadingDot";

type ChatInputProps = {
  chatId: string;
};

const ChatInput = ({ chatId }: ChatInputProps) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const model = "gpt-3.5-turbo";
  const userEmail = session?.user
    ? (session?.user?.email as string)
    : "unknown";
  const userName = session?.user ? (session?.user?.email as string) : "unknown";
  const [prompt, setPrompt] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) return; //veriifica se o input está vazio, caso esteja, salta a função/não executa nada
    const input = prompt.trim(); //usa trim() pra evitar com que o input seja usado/ativado mesmo com a mensagem em branco
    const message = {
      // É uma estrutura de mensagem
      text: input,
      createdAt: serverTimestamp(), //consegue a data e a hora do server, fornecida pela firebase
      user: {
        _chatId: userEmail,
        name: userName,
        avatar: session?.user ? (
          (session.user.image as string) //escreve a imagem do user
        ) : (
          <FaRegUser className="text-24" />
        ),
      },
    };

    try {
      setLoading(true);
      let chatDocument = chatId;
      if (!chatId) {
        const docRef = await addDoc(
          collection(db, "users", userEmail, "chats"),
          {
            userId: userEmail,
            createdAt: serverTimestamp(),
          }
        );
        chatDocument = docRef.id;
        router.push(`/chat/${chatDocument}`);
      }

      // Write the user's message and wait for it to be committed
      const userMessageRef = await addDoc(
        collection(
          db,
          "users",
          userEmail,
          "chats",
          chatDocument as string,
          "messages"
        ),
        message
      );

      // Wait for Firestore to resolve the serverTimestamp
      let userMessageData = null;
      for (let i = 0; i < 10; i++) {
        // Try up to 10 times
        const userMessageSnap = await getDoc(userMessageRef);
        userMessageData = userMessageSnap.data();
        if (userMessageData && userMessageData.createdAt) break;
        await new Promise((res) => setTimeout(res, 100)); // Wait 100ms
      }
      setPrompt("");

      // Now call the API
      await fetch("/api/askchat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: input,
          id: chatDocument,
          model,
          session: userEmail,
        }),
      }).then(async (res) => {
        const data = await res.json();
        if (!data.success) {
          console.error("API Error:", data?.message);
        }
      });
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white/5 px-4 py-2.5 rounded-full flex items-center gap-2 w-full max-w-3xl mx-auto transition-all"
      >
        <TbPaperclip className="text-xl md:text-2xl -rotate-45 cursor-pointer" />
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="flex-1 px-2 text-white/70 text-base sm:text-xl md:text-2xl outline-none bg-transparent"
          placeholder="Pergunte qualquer coisa"
        />
        <button
          disabled={!prompt || loading}
          type="submit"
          className="bg-white/90 text-black p-2 rounded-full hover:bg-neutral-500 hover:text-neutral-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <LoadingDot size="sm" color="gray" />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="19" x2="12" y2="5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>
          )}
        </button>
      </form>
      <div
        className={`flex items-center justify-center py-4 transition-all duration-300 ${
          loading ? "opacity-100 h-auto" : "opacity-0 h-0 overflow-hidden"
        }`}
      >
        <div className="flex items-center gap-3 text-white/70">
          <LoadingDot size="md" color="white" />
          <span className="text-sm">Claudio está pensando...</span>
        </div>
      </div>
    </>
  );
};

export default ChatInput;
