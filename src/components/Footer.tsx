import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="flex w-full flex-col items-center justify-center bg-gray-800">
      <span className="flex p-2">
        <img src="/githubIcon.svg" alt="GitHub" />
        <img src="/instagram.svg" alt="Instagram" />
        <img src="/linkedInIcon.svg" alt="LinkedIn" />
      </span>

      <Separator
        orientation="horizontal"
        className="w-11/12 bg-slate-500 opacity-45"
      />
      <p className="p-2 text-gray-300">
        © 2024 StellioCode. All rights reserved.
      </p>
    </footer>
  );
}
