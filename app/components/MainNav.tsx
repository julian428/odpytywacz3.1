import Link from "next/link";
import { AiOutlineSearch as Logo } from "react-icons/ai";
import MenuLooks from "./MenuLooks";

export default function MainNav({ profiles }: any) {
  return (
    <nav className="bg-60 w-screen flex justify-between px-4 items-center text-2xl py-2 text-30 border-b border-30">
      <Link
        href="/"
        replace
        className="flex flex-col items-center"
      >
        <Logo />
        <h2 className="text-xs">Odpytywacz</h2>
      </Link>
      <section className="flex items-center gap-2">
        <Link
          href="/dashboard"
          replace
        >
          <MenuLooks profiles={profiles} />
        </Link>
      </section>
    </nav>
  );
}
