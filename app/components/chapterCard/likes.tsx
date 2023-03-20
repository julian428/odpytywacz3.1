"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineHeart as EmptyHeartIcon } from "react-icons/ai";
import { AiFillHeart as FilledHeartIcon } from "react-icons/ai";

interface Props {
  likes: {
    id: string;
    user: string;
  }[];
  chapterId: string;
}

export default function Likes({ likes, chapterId }: Props) {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const likeHandler = async () => {
    if (!user || loading) return;
    router.refresh();
    setLoading(true);
    const res = fetch("/api/handle-like", {
      method: "POST",
      body: JSON.stringify({
        isLiked: isLiked().isLiked,
        likeId: isLiked().likeId,
        chapterId,
        owner: user.nickname,
      }),
    });
    setLoading(false);
    router.refresh();
  };

  const isLiked = (): { isLiked: boolean; likeId: string } => {
    const like = likes.filter((l: { id: string; user: string }) => {
      return l.user === user?.nickname;
    });
    return { isLiked: like.length > 0, likeId: like[0]?.id };
  };

  return (
    <button
      onClick={likeHandler}
      className={"text-10 flex items-center gap-2 z-10"}
    >
      {isLiked().isLiked ? (
        <FilledHeartIcon className={loading ? "animate-ping" : ""} />
      ) : (
        <EmptyHeartIcon className={loading ? "animate-ping" : ""} />
      )}
      {likes.length}
    </button>
  );
}
