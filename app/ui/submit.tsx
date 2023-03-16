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
      className="py-1 px-4 rounded bg-10 text-30 w-full"
    >
      {loading ? <LoadingIcon /> : label}
    </button>
  );
});

export default StandardSubmit;
