"use client";

import React from "react";

const MessageSkeleton = ({ isUser = false }: { isUser?: boolean }) => {
  return (
    <section className="py-5 text-white">
      <div
        className={`flex items-start gap-2.5 md:gap-5 md:px-10 ${
          !isUser ? "justify-start" : "justify-end"
        }`}
      >
        {!isUser && (
          <div className="border border-gray-600 w-9 h-9 rounded-full bg-gray-700 animate-pulse" />
        )}

        <div
          className={`flex flex-col max-w-xl ${
            !isUser ? "items-start" : "items-end"
          }`}
        >
          <div
            className={`px-4 py-2 rounded-lg shadow-sm ${
              !isUser ? "bg-transparent" : "bg-[#2F2F2F] max-w-lg"
            }`}
          >
            <div className="space-y-2">
              {/* Skeleton lines with different widths to simulate text */}
              <div
                className="h-4 bg-gray-700 rounded animate-pulse"
                style={{ width: `${Math.random() * 40 + 60}%` }}
              />
              <div
                className="h-4 bg-gray-700 rounded animate-pulse"
                style={{ width: `${Math.random() * 30 + 40}%` }}
              />
              <div
                className="h-4 bg-gray-700 rounded animate-pulse"
                style={{ width: `${Math.random() * 50 + 30}%` }}
              />
            </div>
          </div>
        </div>

        {isUser && (
          <div className="border border-gray-600 w-9 h-9 rounded-full bg-gray-700 animate-pulse" />
        )}
      </div>
    </section>
  );
};

export default MessageSkeleton;
