"use client";
import React from "react";
import { twMerge } from "tailwind-merge";

type LoadingDotProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
  color?: "white" | "gray" | "blue";
};

const LoadingDot = ({
  className,
  size = "md",
  color = "white",
}: LoadingDotProps) => {
  const sizeClasses = {
    sm: "h-2 w-2",
    md: "h-3 w-3",
    lg: "h-4 w-4",
  };

  const colorClasses = {
    white: "bg-white",
    gray: "bg-gray-400",
    blue: "bg-blue-500",
  };

  return (
    <div
      className={twMerge("flex items-center justify-center gap-1", className)}
    >
      <div
        className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-pulse`}
        style={{ animationDelay: "0ms" }}
      ></div>
      <div
        className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-pulse`}
        style={{ animationDelay: "150ms" }}
      ></div>
      <div
        className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-pulse`}
        style={{ animationDelay: "300ms" }}
      ></div>
    </div>
  );
};

export default LoadingDot;
