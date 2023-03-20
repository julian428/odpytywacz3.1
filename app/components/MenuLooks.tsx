"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import { RxHamburgerMenu as Menu } from "react-icons/rx";

interface Props {
  profiles: {
    email: string;
    nickname: string;
    exp: number;
  }[];
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

  const profile = profiles.find((profile) => profile.email === user?.email);

  useEffect(() => {
    if (!user || !profile) return;
    setXp(profile.exp);
  }, [user, profile]);
  if (user) {
    return (
      <section className="w-10 relative">
        <div className="absolute -top-[3px] -right-[3px] text-xs text-10 bg-60 w-4 h-4 rounded-full flex justify-center items-center">
          <p>{abbreviateNumber(xp)}</p>
        </div>
        <img
          className="rounded-full"
          src={user.picture || ""}
          alt="profile picture"
        />
      </section>
    );
  }
  return <Menu className="text-3xl" />;
}
