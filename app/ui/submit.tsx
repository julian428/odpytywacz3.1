import { forwardRef } from "react";
import { AiOutlineLoading3Quarters as LoadingIcon } from "react-icons/ai";

interface Props {
  label: string;
  loading?: boolean;
  params?: any;
}

const StandardSubmit = forwardRef(({ label, loading, params }: Props, ref) => {
  return (
    <button
      type="submit"
      disabled={loading}
      {...params}
      className="bg-10 flex justify-center h-8 items-center rounded py-1 px-4 text-30"
    >
      {loading ? <LoadingIcon className=" animate-spin text-lg" /> : label}
    </button>
  );
});

export default StandardSubmit;
