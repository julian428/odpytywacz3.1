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
      ref={ref}
      className="py-1 px-4 rounded h-8 flex justify-center items-center bg-10 text-60 w-full"
    >
      {loading ? <LoadingIcon className="animate-spin text-60" /> : label}
    </button>
  );
});

export default StandardSubmit;
