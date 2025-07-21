"use client";

import { useEffect, useState } from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import { TbLayoutSidebar } from "react-icons/tb";
import { useUser } from "../contexts/UserContext";

type clientLayoutProps = {
  children: React.ReactNode;
  className?: string;
};

export default function ClientLayout({ children }: clientLayoutProps) {
  const [isSideBarOpen, setIsSidebarOpen] = useState(false); // começa fechado
  const { userName, setUserName, isHydrated } = useUser();

  // Detecta o tamanho da tela no carregamento
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLargeScreen = window.innerWidth >= 1024; // lg: em Tailwind
      setIsSidebarOpen(isLargeScreen);
    }
  }, []);

  function handleSubmit(formData: FormData) {
    const input = formData.get("name");
    if (typeof input === "string") {
      const trimmed = input.trim();
      setUserName(trimmed);
    }
  }

  if (!isHydrated) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-[#212121]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!userName) {
    return (
      <div className="w-full h-screen flex items-end md:items-center justify-center bg-[#212121]">
        <form
          action={handleSubmit}
          className="bg-[#292929] p-6 rounded-4xl shadow-md w-full md:min-w-2xl md:w-auto m-2 md:m-0 mb-4"
        >
          <label className="block font-medium mb-2 text-center text-2xl md:text-4xl text-white/90">
            Olá !
          </label>
          <div className="flex">
            <input
              type="text"
              name="name"
              className="p-2 w-full text-white/70 text-xl md:text-2xl outline-0"
              placeholder="Digite seu nome"
            />
            <div className="flex flex-nowrap">
              <button
                type="submit"
                className="bg-gray-300 text-gray-500 p-3 rounded-full hover:bg-neutral-500 hover:text-gray-300 transition"
              >
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
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-[#212121] text-white">
      <div>
        <SideBar
          isOpen={isSideBarOpen}
          toggleSideBar={() => setIsSidebarOpen((prev) => !prev)}
        />
        {isSideBarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={() => setIsSidebarOpen((prev) => !prev)}
          />
        )}
      </div>
      <div className="py-4 hidden lg:block overflow-hidden">
        <button
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          className="rounded-xl overflow-hidden cursor-e-resize p-2 hover:bg-neutral-600 transition"
        >
          {!isSideBarOpen && (
            <TbLayoutSidebar className="text-2xl text-white/80" />
          )}
        </button>
      </div>

      <div className="h-screen flex-1 relative">
        <Header
          isOpen={isSideBarOpen}
          toggleSideBar={() => setIsSidebarOpen((prev) => !prev)}
        />

        <main className="h-full pt-14">{children}</main>
      </div>
    </div>
  );
}
