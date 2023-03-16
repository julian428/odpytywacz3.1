import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav className="w-screen flex justify-center gap-2">
        <Link
          href="/dashboard"
          replace
          className="hover:text-10"
        >
          Ustawienia
        </Link>
        |
        <Link
          href="/dashboard/score-board"
          className="hover:text-10"
        >
          Tabela Wyników
        </Link>
        |
        <Link
          href="/dashboard/my-chapters"
          className="hover:text-10"
        >
          Rozdziały
        </Link>
      </nav>
      {children}
    </>
  );
}
