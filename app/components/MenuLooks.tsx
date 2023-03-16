"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import { RxHamburgerMenu as Menu } from "react-icons/rx";

interface Props {
  profiles: { email: string; nickname: string; exp: number }[];
}

export function abbreviateNumber(value: number) {
  let newValue: number | string = value;
  if (value >= 1000) {
    let suffixes = ["", "k", "m", "b", "t"];
    let suffixNum = Math.floor(("" + value).length / 3);
    let shortValue: number | string = 0;
    for (let precision = 2; precision >= 1; precision--) {
      shortValue = parseFloat(
        (suffixNum != 0
          ? value / Math.pow(1000, suffixNum)
          : value
        ).toPrecision(precision)
      );
      let dotLessShortValue = (shortValue + "").replace(/[^a-zA-Z 0-9]+/g, "");
      if (dotLessShortValue.length <= 2) {
        break;
      }
    }
    if (shortValue % 1 != 0) shortValue = shortValue.toFixed(1);
    newValue = shortValue + suffixes[suffixNum];
  }
  return newValue;
}

export default function MenuLooks({ profiles }: Props) {
  const { user } = useUser();
  const [xp, setXp] = useState(0);
  useEffect(() => {
    if (!user || !profiles || !profiles.length) return;
    setXp(
      profiles.filter((profile: any) => profile.email === user?.email)[0].exp
    );
  }, [user, profiles]);
  if (user) {
    const defaultPic =
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.YAJlHz4zchNP5zIfsajE9AHaFr%26pid%3DApi&f=1&ipt=53dea86cb4c1e9ea32515d1038ff20c2bca153bdccce8e96423e7b0e1363fe1d&ipo=images";
    return (
      <section className="w-12 relative">
        <div className="absolute -top-[5px] -right-[5px] text-10 bg-60 w-6 h-6 rounded-full flex justify-center items-center">
          <p>{abbreviateNumber(xp)}</p>
        </div>
        <img
          className="rounded-full"
          src={user.picture || defaultPic}
          alt="profile picture"
        />
      </section>
    );
  }
  return <Menu className="text-3xl" />;
}
