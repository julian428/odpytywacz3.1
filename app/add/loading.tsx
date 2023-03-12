import { AiOutlineLoading3Quarters as LoadingIcon } from "react-icons/ai";

export default function loading() {
  return (
    <article className="flex justify-center items-center text-30 text-2xl mt-8">
      <LoadingIcon className=" animate-spin" />
    </article>
  );
}
