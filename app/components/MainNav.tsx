import Link from "next/link";
import { AiOutlineSearch as Logo } from "react-icons/ai";
import MenuLooks from "./MenuLooks";

export default function MainNav({ profiles }: any) {
  return (
    <nav className="flex justify-between px-2 items-center py-1">
      <Link
        href="/"
        replace
        className="flex flex-col items-center"
      >
        <Logo className="text-3xl" />
        <h2>Odpytywacz</h2>
      </Link>
      <section>
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
