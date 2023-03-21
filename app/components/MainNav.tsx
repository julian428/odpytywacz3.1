import Link from "next/link";
import { AiOutlineSearch as Logo } from "react-icons/ai";
import RefreshButton from "../ui/refresh";
import MenuLooks from "./MenuLooks";

interface Props {
  profiles: {
    email: string;
    nickname: string;
    exp: number;
  }[];
}

export default function MainNav({ profiles }: Props) {
  return (
    <nav className="flex justify-between px-2 items-center py-1">
      <Link
        href="/"
        replace
        className="flex flex-col items-center"
      >
        <Logo className="text-2xl" />
        <h2 className="text-xs">Odpytywacz</h2>
      </Link>
      <section className="flex gap-4">
        {/* <RefreshButton /> */}
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
