import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav className="-mt-4 flex justify-evenly w-96 text-30">
        <Link
          href="/dashboard"
          className=" hover:text-10"
          replace
        >
          Ustawienia
        </Link>
        |
        <Link
          href="/dashboard/score-board"
          className=" hover:text-10"
        >
          Tabela Wyników
        </Link>
        |
        <Link
          href="/dashboard/my-chapters"
          className=" hover:text-10"
        >
          Rozdziały
        </Link>
      </nav>
      {children}
    </>
  );
}
