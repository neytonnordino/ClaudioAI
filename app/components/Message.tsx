import { DocumentData } from "firebase/firestore";
import Image from "next/image";
import React from "react";
import ReactMarkdown from "react-markdown";

const Message = ({ message }: { message: DocumentData }) => {
  const isClaudio = message?.user?.name === "Claudio";

  return (
    <section className="py-3 sm:py-5 text-white">
      <div
        className={`flex items-start gap-2 sm:gap-4 md:gap-5 px-1 sm:px-4 w-full ${
          isClaudio ? "justify-start" : "justify-end"
        }`}
      >
        {isClaudio && (
          <div className="border border-gray-600 w-8 h-8 sm:w-9 sm:h-9 rounded-full hidden md:inline-flex">
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
          className={`flex flex-col max-w-[85vw] sm:max-w-xl ${
            isClaudio ? "items-end" : "items-start"
          }`}
        >
          <div
            className={`prose prose-invert px-3 py-2 rounded-lg shadow-sm text-sm sm:text-base tracking-normal md:tracking-wider whitespace-pre-wrap break-words max-w-full ${
              isClaudio ? "bg-transparent" : "bg-[#2F2F2F]"
            }`}
          >
            <ReactMarkdown>{message?.text}</ReactMarkdown>
          </div>
        </div>

        {!isClaudio && (
          <div className="border border-gray-600 w-8 h-8 sm:w-9 sm:h-9 rounded-full shrink-0 hidden md:inline-flex">
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
