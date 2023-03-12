"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { RxHamburgerMenu as Menu } from "react-icons/rx";

export default function MenuLooks() {
  const { user } = useUser();
  if (user) {
    const defaultPic =
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.YAJlHz4zchNP5zIfsajE9AHaFr%26pid%3DApi&f=1&ipt=53dea86cb4c1e9ea32515d1038ff20c2bca153bdccce8e96423e7b0e1363fe1d&ipo=images";
    return (
      <img
        src={user.picture || defaultPic}
        alt="profile picture"
        className="w-8 rounded-full"
      />
    );
  }
  return <Menu />;
}
