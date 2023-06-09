import { ChapterCardType } from "@/app/page";
import StandardInput from "@/app/ui/input";
import StandardSubmit from "@/app/ui/submit";
import StandardTextarea from "@/app/ui/textarea";
import { FormEvent, useRef, useState } from "react";
import QuestionsList from "./QuestionsList";

interface Props {
  chapter: ChapterCardType;
}

export default function EditForm({ chapter }: Props) {
  const [editableQuestions, setEditableQuestions] = useState(
    chapter.owned_questions
  );
  const [deleted, setDeleted] = useState(false);
  const [loading, setLoading] = useState(false);

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const submitHandler = async (event: FormEvent) => {
    if (!titleRef.current?.value) {
      console.warn("Can't update chapter without a title.");
      return;
    }
    setLoading(true);

    const submitData = {
      chapterId: chapter.id,
      title: titleRef.current?.value,
      description: descriptionRef.current?.value || "",
      questions: editableQuestions,
      deleted,
    };

    const response = await fetch("/api/update-chapter", {
      method: "POST",
      body: JSON.stringify(submitData),
    });
  };
  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col gap-4"
    >
      <StandardInput
        required
        params={{ defaultValue: chapter.title, disabled: loading }}
        ref={titleRef}
      />
      <StandardTextarea
        ref={descriptionRef}
        params={{ defaultValue: chapter.description, disabled: loading }}
      />
      <QuestionsList
        editableQuestions={editableQuestions}
        setEditableQuestions={setEditableQuestions}
        setDeleted={setDeleted}
        isLoading={loading}
      />
      <StandardSubmit
        loading={loading}
        label="Zapisz"
      />
    </form>
  );
}
