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
import EditForm from "./EditForm";

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
    setLoading(false);
    router.refresh();
  };

  if (chapter.owner !== user?.nickname) {
    return <></>;
  }

  return (
    <section className="flex max-w-[95vw] justify-between gap-32 items-baseline mx-2 px-2 pb-1 border-b">
      <h2 className="capitalize text-xl truncate w-36">{chapter.title}</h2>
      <aside className="flex gap-1">
        <StandardModal
          Label={EditIcon}
          textLabel="edit"
          title={`Edytuj ${chapter.title}`}
          buttonStyle="flex justify-center items-center w-8 h-8 bg-10 rounded"
        >
          <EditForm chapter={chapter} />
        </StandardModal>
        <StandardModal
          Label={DeleteIcon}
          textLabel="delete"
          title={`Napewno chcesz usunąć ${chapter.title}?`}
          buttonStyle="flex justify-center items-center w-8 h-8 border border-10 rounded"
        >
          <article>
            <button
              onClick={onDelete}
              disabled={loading}
              className="px-4 py-1 border rounded border-10 mt-4 text-10"
            >
              {loading ? <LoadingIcon className="animate-spin" /> : "Usuń"}
            </button>
          </article>
        </StandardModal>
      </aside>
    </section>
  );
}
