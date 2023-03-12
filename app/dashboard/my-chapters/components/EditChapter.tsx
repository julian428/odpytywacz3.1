"use client";
import { ChapterCardType } from "@/app/page";
import StandardModal from "@/app/ui/modal";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  AiOutlineEdit as EditIcon,
  AiOutlineDelete as DeleteIcon,
  AiOutlineLoading3Quarters as LoadingIcon,
} from "react-icons/ai";

interface Props {
  chapter: ChapterCardType;
}

export default function EditChapter({ chapter }: Props) {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    setLoading(true);
    const response = await fetch("/api/delete-chapter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chapterId: chapter.id,
        userName: user?.nickname,
      }),
    });
    router.refresh();
  };

  if (chapter.owner !== user?.nickname) {
    return <></>;
  }

  return (
    <section className="text-30 flex justify-between mt-4 border-b">
      <h2 className="capitalize text-lg">{chapter.title}</h2>
      <aside className="flex gap-2 mb-1">
        <StandardModal
          label={<EditIcon />}
          title="test"
          buttonStyle="py-1 px-2 bg-10 rounded"
        ></StandardModal>
        <StandardModal
          label={<DeleteIcon />}
          title={`Napewno chcesz usunąć ${chapter.title}?`}
          buttonStyle="py-1 px-2 border border-10 rounded"
        >
          <article className="flex justify-evenly mt-8">
            <button
              onClick={onDelete}
              disabled={loading}
              className="text-30 transition-all flex justify-center items-center bg-10 rounded px-4 py-1 w-20 h-8 text-center"
            >
              {loading ? (
                <LoadingIcon className=" animate-spin text-lg" />
              ) : (
                "Usuń"
              )}
            </button>
          </article>
        </StandardModal>
      </aside>
    </section>
  );
}
