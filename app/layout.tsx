import MainNav from "./components/MainNav";
import { UserProvider } from "@auth0/nextjs-auth0/client";

import "./globals.css";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Odpytywacz | Strona główna",
  icons: {
    icon: "@/public/favicon-32x32.png",
    apple: "@/public/apple-touch-icon.png",
  },
  manifest: "@/public/site.webmanifest",
  themeColor: "#000000",
  description:
    "Odpytywacz to strona która łączy osoby chętne do nauki. Używając odpytywacza możesz robić rozdziały stworzone przez innych użytkowników jak i przez ciebie.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let profiles = [];
  try {
    const profilesRes = await fetch("https://odpytywacz.me/api/get-profiles", {
      method: "POST",
      next: { revalidate: 10 },
    });
    profiles = await profilesRes.json();
    profiles = profiles.profiles;
  } catch (e) {
    notFound();
  }
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
