"use client";
import { useUser } from "@auth0/nextjs-auth0/client";

interface Props {
  styles?: string;
  replace?: boolean;
}

export default function Login({ styles, replace }: Props) {
  const { user } = useUser();
  let link = "/api/auth/login";
  let label = "login";
  let style = replace
    ? styles
    : styles + "text-sm bg-10 text-60 px-2 py-1 rounded capitalize";
  if (user) {
    link = "/api/auth/logout";
    label = "logout";
  }
  return (
    <a
      href={link}
      className={style}
    >
      {label}
    </a>
  );
}
