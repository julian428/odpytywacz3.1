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
      <html
        lang="pl"
        className="w-screen h-screen flex flex-col items-center"
      >
        <body className="bg-60 flex flex-col overflow-x-hidden overflow-y-auto scrollbar-none items-center">
          <header className="w-screen">
            <MainNav profiles={profiles} />
          </header>
          <main className="p-4 max-w-[26rem] self-center overflow-hidden">
            {children}
          </main>
        </body>
      </html>
    </UserProvider>
  );
}
