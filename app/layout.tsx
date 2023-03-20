import MainNav from "./components/MainNav";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { prisma } from "./db";

import "./globals.css";

export const metadata = {
  title: "Odpytywacz",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profilesRes = await fetch("http://localhost:3000/api/get-profiles", {
    method: "POST",
    next: { revalidate: 10 },
  });
  const { profiles } = await profilesRes.json();
  return (
    <UserProvider>
      <html lang="pl">
        <body className="bg-60 w-screen flex flex-col items-center h-screen text-30 overflow-y-hidden">
          <header className="border-b border-30 w-screen">
            <MainNav profiles={profiles} />
          </header>
          <main className="flex flex-col max-w-md items-center">
            {children}
          </main>
        </body>
      </html>
    </UserProvider>
  );
}
