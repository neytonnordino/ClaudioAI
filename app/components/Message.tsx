import { DocumentData } from "firebase/firestore";
import Image from "next/image";
import React from "react";
import ReactMarkdown from "react-markdown";

const Message = ({ message }: { message: DocumentData }) => {
  const isClaudio = message?.user?.name === "Claudio";
  console.log(message.text)

  return (
    <section className="py-5 text-white">
      <div
        className={`flex items-start gap-2.5 md:gap-5 md:px-10 ${
          isClaudio ? "justify-start" : "justify-end"
        }`}
      >
        {isClaudio && (
          <div className="border border-gray-600 w-9 h-9 rounded-full">
            <Image
              src={message?.user.avatar}
              alt="userImage"
              width={100}
              height={100}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        )}

        <div
          className={`flex flex-col max-w-xl ${
            isClaudio ? "items-start" : "items-end"
          }`}
        >
          <div
            className={`prose prose-invert px-4 py-2 rounded-lg shadow-sm text-base tracking-wider whitespace-pre-wrap ${
              isClaudio ? "bg-transparent" : "bg-[#2F2F2F] max-w-lg"
            }`}
          >
            <ReactMarkdown>{message?.text}</ReactMarkdown>
          </div>
        </div>

        {!isClaudio && (
          <div className="border border-gray-600 w-9 h-9 rounded-full">
            <Image
              src={message?.user.avatar}
              alt="userImage"
              width={100}
              height={100}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Message;
