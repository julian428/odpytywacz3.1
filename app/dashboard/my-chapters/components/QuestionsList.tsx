import { ChangeEvent, Dispatch, MouseEvent, SetStateAction } from "react";
import EditQuestion from "./EditQuestion";
import { BiMessageAltAdd as AddIcon } from "react-icons/bi";

interface Props {
  isLoading: boolean;
  setDeleted: Dispatch<SetStateAction<boolean>>;
  editableQuestions: {
    id: string;
    answear: string;
    question: string;
  }[];
  setEditableQuestions: Dispatch<
    SetStateAction<
      {
        id: string;
        question: string;
        answear: string;
      }[]
    >
  >;
}

export default function QuestionsList({
  isLoading,
  setDeleted,
  editableQuestions,
  setEditableQuestions,
}: Props) {
  const handleQuestionChange = (event: ChangeEvent, index: number) => {
    let data = [...editableQuestions];
    const value = (event.target as HTMLInputElement).value;
    const sIndex = (event.target as HTMLInputElement).name as
      | "id"
      | "question"
      | "answear";
    data[index][sIndex] = value;
    setEditableQuestions(data);
  };

  const handleAddQuestion = (event: MouseEvent) => {
    const newField = { id: "", question: "", answear: "" };
    setEditableQuestions([...editableQuestions, newField]);
  };

  const handleRemoveQuestion = (event: MouseEvent, index: number) => {
    let data = [...editableQuestions];
    data.splice(index, 1);
    setDeleted(true);
    setEditableQuestions(data);
  };

  return (
    <>
      <h2 className="flex justify-center items-center gap-2">
        Pytania: {editableQuestions.length}
        <button
          type="button"
          disabled={isLoading}
          className="text-10 text-2xl"
          onClick={handleAddQuestion}
        >
          <AddIcon />
        </button>
      </h2>
      <article className="flex max-h-[35vh] flex-col gap-2 items-center overflow-y-auto scrollbar-none">
        {editableQuestions.map((q: any, i: number) => {
          return (
            <EditQuestion
              question={q}
              key={q.id}
              isLoading={isLoading}
              changeHandler={handleQuestionChange}
              removeHandler={handleRemoveQuestion}
              index={i}
            />
          );
        })}
      </article>
    </>
  );
}
