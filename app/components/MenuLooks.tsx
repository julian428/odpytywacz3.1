"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import { RxHamburgerMenu as Menu } from "react-icons/rx";

interface Props {
  profiles: { email: string; nickname: string; exp: number }[];
}

export default function MenuLooks({ profiles }: Props) {
  const { user } = useUser();
  const [xp, setXp] = useState(0);
  useEffect(() => {
    if (!user || !profiles) return;
    setXp(
      profiles.filter((profile: any) => profile.email === user?.email)[0].exp
    );
  }, [user, profiles]);
  if (user) {
    const defaultPic =
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.YAJlHz4zchNP5zIfsajE9AHaFr%26pid%3DApi&f=1&ipt=53dea86cb4c1e9ea32515d1038ff20c2bca153bdccce8e96423e7b0e1363fe1d&ipo=images";
    return (
      <section className="w-10 h-10 rounded-full relative">
        <div className="rounded-full gap-0 flex flex-col justify-center items-center text-xs text-10  w-6 h-6 bg-60 -top-2 -right-2 absolute">
          <p>{xp}</p>
        </div>
        <img
          src={user.picture || defaultPic}
          alt="profile picture"
          className="w-full h-full rounded-full"
        />
      </section>
    );
  }
  return <Menu />;
}
