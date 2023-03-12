import MainNav from "./components/MainNav";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import "./globals.css";

export const metadata = {
  title: "Odpytywacz",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <html lang="pl">
        <body className="bg-60 flex flex-col overflow-hidden">
          <header className="w-screen">
            <MainNav />
          </header>
          <main className="p-4 max-w-[26rem] self-center overflow-hidden">
            {children}
          </main>
        </body>
      </html>
    </UserProvider>
  );
}
