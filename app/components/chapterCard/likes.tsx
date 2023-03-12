"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { AiOutlineHeart as EmptyHeartIcon } from "react-icons/ai";
import { AiFillHeart as FilledHeartIcon } from "react-icons/ai";

interface Props {
  likes: {
    id: string;
    user: string;
  }[];
}

export default function Likes({ likes }: Props) {
  const { user, error, isLoading } = useUser();
  return (
    <section className="text-10 flex items-center gap-2">
      <EmptyHeartIcon />0
    </section>
  );
}
