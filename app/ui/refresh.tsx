"use client";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { FiRefreshCw as RefreshIcon } from "react-icons/fi";

export default function RefreshButton() {
  const router = useRouter();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const clickHandler = () => {
    (buttonRef.current as HTMLButtonElement).className = "animate-spin";
    setTimeout(() => {
      (buttonRef.current as HTMLButtonElement).className = "";
    }, 1000);
    router.refresh();
  };
  return (
    <button
      onClick={clickHandler}
      ref={buttonRef}
    >
      <RefreshIcon className="text-xl" />
    </button>
  );
}
