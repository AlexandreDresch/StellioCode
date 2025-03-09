import { Separator } from "@/components/ui/separator";
import { Ghost, MapPin, Mail, Dot } from "lucide-react";

export default function Footer() {
  return (
    <footer className="flex w-full flex-col items-center justify-center bg-slate-50 dark:bg-black">
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
          className="shape-fill"
          fill="#5B1F83"
        ></path>
      </svg>
      <div className="flex flex-col py-5 lg:flex-row lg:gap-32">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center justify-center text-lg">
            <Ghost />
            <h2>StellioCode</h2>
          </div>
          <p className="px-4 text-sm">Amazing Software House</p>
          <span className="flex p-2">
            <img
              src="/githubIcon.svg"
              alt="GitHub"
              className="zoom-in-50 hover:animate-in"
            />
            <img src="/instagram.svg" alt="Instagram" />
            <img src="/linkedInIcon.svg" alt="LinkedIn" />
          </span>
        </div>

        <div className="my-1 flex flex-col items-center justify-center gap-4 text-sm lg:py-0">
          <div className="flex gap-2">
            <a href="#">Sobre</a>
            <Dot />
            <a href="#">Porfólio</a>
            <Dot />
            <a href="#">Planos</a>
            <Dot />
            <a href="#">Entre em contato</a>
          </div>
          <div>
            <p className="flex items-center justify-center gap-2 p-2">
              <MapPin /> Porto Alegre - RS
            </p>
            <p className="flex gap-2 p-2">
              <Mail /> software@stelliocode.com
            </p>
          </div>
        </div>
      </div>
      <Separator
        orientation="horizontal"
        className="w-11/12 bg-slate-500 opacity-45"
      />
      <p className="p-2 text-xs text-gray-500">
        © 2024 StellioCode. All rights reserved.
      </p>
    </footer>
  );
}
