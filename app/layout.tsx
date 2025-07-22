import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import ClientLayout from "./components/ClientLayout";
import { UserProvider } from "./contexts/UserContext";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "ClaudioAI",
  description: "A GPT clone for learning purposes",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <Providers>
          <body className="h-screen">
            <ClientLayout>{children}</ClientLayout>
            <Toaster
              position="top-right"
              toastOptions={{
                style: { background: "#000", color: "#fff" },
              }}
            />
          </body>
        </Providers>
      </UserProvider>
    </html>
  );
}
