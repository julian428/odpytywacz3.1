import MainNav from "./components/MainNav";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { prisma } from "./db";

import "./globals.css";

export const metadata = {
  title: "Odpytywacz",
};

async function getUserProfile() {
  try {
    const profiles = await prisma.profile.findMany({
      select: {
        email: true,
        nickname: true,
        exp: true,
      },
    });
    return profiles;
  } catch (e) {
    console.warn(e);
    return [];
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profiles = await getUserProfile();
  return (
    <UserProvider>
      <html lang="pl">
        <body className="bg-60 w-screen h-screen text-30">
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
