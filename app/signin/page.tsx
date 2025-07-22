import { auth, signIn } from "@/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export const metadata: Metadata = {
  title: "Signin | Claudio",
};

const SignInPage = async () => {
  const session = await auth();
  if (session?.user) {
    redirect("/");
  }
  return (
    <div className="fixed w-full h-full left-0 bg-black/90 text-white flex items-center justify-center z-50">
      <div className="bg-neutral-800 shadow-gray-200 w-72 h-auto md:w-96 md:h-auto flex flex-col borde justify-center items-center rounded-lg">
        <div className="px-10 py-6 text-center">
          <p className="text-2xl md:text-3xl text-center font-bold tracking-wide">
            Bem vindo
          </p>
          <p className="text-base  text-center mt-2 tracking-wide">
            Entre ou Cadastre-se para receber respostas mais inteligentes,
            carregar arquivos, imagens e mais
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-3 py-6 px-3">
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <button
              type="submit"
              className="flex items-center border border-neutral-500 py-2 px-4 rounded-md font-semibold hover:text-black/80 hover:bg-neutral-200 hover:border-black/20 duration-300 ease-in-out gap-1 "
            >
              <FcGoogle className="text-2xl md:text-2xl" />
              Sign in with Google
            </button>
          </form>
          <form
            action={async () => {
              "use server";
              await signIn("github");
            }}
          >
            <button
              type="submit"
              className="flex items-center border border-neutral-500 py-2 px-4 rounded-md font-semibold hover:text-black/80 hover:bg-neutral-200 hover:border-black/20 duration-300 ease-in-out gap-1 "
            >
              <FaGithub className="text-2xl md:text-2xl" />
              Sign in with GitHub
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
