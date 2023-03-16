import Login from "../components/Login";
import Setting from "./components/Setting";

export const revalidate = 0;

export default function Dashboard() {
  const settings = [
    {
      label: "sprawdzanie słów",
      name: "word-checking",
      options: ["manual", "semi-auto", "auto"],
    },
  ];
  return (
    <>
      <article className="mt-4">
        {settings.map((setting: any) => (
          <Setting
            setting={setting}
            key={setting.label}
          />
        ))}
      </article>
      <Login
        styles="absolute bottom-2 right-2 text-10 underline"
        replace
      />
    </>
  );
}
