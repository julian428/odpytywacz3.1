import StandardModal from "@/app/ui/modal";
import DownloadForm from "./DownloadForm";

interface Props {
  chapter: {
    id: string;
    title: string;
    owned_questions: {
      id: string;
      question: string;
      answear: string;
    }[];
  };
}

export default function DownloadChapterButton({ chapter }: Props) {
  const parsedQuestions = chapter.owned_questions.map((q: any) => ({
    question: q.question,
    answear: q.answear,
  }));
  return (
    <center>
      <StandardModal
        textLabel={"Pobierz CSV"}
        title="Wybierz ustawienia pobierania"
        buttonStyle="px-4 py-1 border border-10 rounded text-10 mb-8"
      >
        <DownloadForm questions={parsedQuestions} />
      </StandardModal>
    </center>
  );
}
