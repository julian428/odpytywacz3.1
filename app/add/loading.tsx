import { AiOutlineLoading3Quarters as LoadingIcon } from "react-icons/ai";

export default function loading() {
  return (
    <article className="text-center flex items-center mt-4">
      <LoadingIcon className="animate-spin" />
    </article>
  );
}
