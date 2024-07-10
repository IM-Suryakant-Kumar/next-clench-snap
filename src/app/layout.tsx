import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";

const exo_2 = Exo_2({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coding Celnch Social Media App",
  description: "Social media app built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={exo_2.className}>
          <div className="w-full bg-white px-4 md:px-8 lg:px-16 xs:px-32 2xl:px-64">
            <Navbar />
          </div>
          <div className="bg-slate-100 px-4 md:px-8 lg:px-16 xs:px-32 2xl:px-64">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}