"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
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
  const [liked, setLiked] = useState(false);

  const likeHandler = async () => {
    if (!user || loading) return;
    setLoading(true);
    setLiked((state: boolean) => !state);
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
  };

  const isLiked = (): { isLiked: boolean; likeId: string } => {
    const like = likes.filter((l: { id: string; user: string }) => {
      return l.user === user?.nickname;
    });
    return { isLiked: like.length > 0, likeId: like[0]?.id };
  };

  useEffect(() => {
    setLiked(isLiked().isLiked);
  }, [isLiked().isLiked]);

  return (
    <button
      disabled={loading}
      onClick={likeHandler}
      className="text-10 text-2xl absolute top-2 right-2"
    >
      {liked ? <FilledHeartIcon /> : <EmptyHeartIcon />}
    </button>
  );
}
