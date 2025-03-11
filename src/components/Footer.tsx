import { Separator } from "@/components/ui/separator";
import { MapPin, Mail, Dot } from "lucide-react";

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
          fill="#bba4ff"
        ></path>
      </svg>
      <div className="flex flex-col py-5 lg:flex-row lg:gap-32">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center justify-center text-lg">
            <svg
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              width="40pt"
              height="50pt"
              viewBox="0 0 149 150"
              preserveAspectRatio="xMidYMid meet"
              className="group w-12 transition duration-300 ease-in-out hover:scale-110"
            >
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0ea5e9" />
                  <stop offset="100%" stopColor="purple" />
                </linearGradient>
              </defs>

              <g
                transform="translate(0,150) scale(0.1,-0.1)"
                className="transition duration-300 ease-in-out group-hover:fill-[url(#grad)] dark:bg-white"
              >
                <path
                  d="M364 1432 c-6 -4 -16 -17 -23 -30 -7 -12 -16 -20 -21 -17 -15 10 -50
-14 -50 -34 0 -26 26 -44 53 -37 17 4 25 0 32 -17 12 -27 41 -34 64 -13 15 14
18 13 29 -4 15 -24 59 -26 83 -4 15 14 23 14 53 3 28 -10 38 -10 51 1 23 19
16 72 -12 85 -12 5 -24 17 -26 27 -4 13 -15 18 -40 18 -19 0 -40 7 -48 16 -9
11 -23 14 -48 10 -53 -9 -55 -9 -71 -2 -8 3 -20 2 -26 -2z"
                />
                <path
                  d="M154 1306 c-62 -20 -66 -24 -48 -51 20 -31 76 -49 130 -41 49 6 43
15 68 -104 20 -91 45 -135 90 -156 47 -23 98 -12 139 30 31 31 38 48 77 194 7
29 16 42 28 42 11 0 13 -3 6 -8 -7 -4 -23 -50 -37 -102 -31 -112 -48 -137
-110 -169 -47 -23 -49 -23 -92 -7 -66 26 -90 61 -115 171 -13 52 -25 95 -29
95 -4 0 -17 -7 -29 -16 -18 -12 -22 -24 -21 -57 1 -23 -4 -56 -11 -73 -16 -38
-7 -79 25 -108 29 -27 31 -36 10 -36 -24 0 -40 -45 -27 -75 7 -14 9 -44 6 -69
-8 -56 0 -87 31 -124 22 -26 23 -33 13 -59 -26 -68 50 -172 137 -189 30 -5 34
-11 49 -63 20 -70 21 -143 2 -179 -7 -15 -17 -46 -21 -69 l-7 -43 54 0 55 0
12 92 c6 51 9 107 5 125 -3 18 -4 47 0 65 5 30 10 33 45 36 47 3 50 -4 58
-104 5 -57 2 -82 -16 -128 -11 -31 -21 -68 -21 -82 0 -24 2 -25 53 -22 l52 3
-3 85 c-1 47 3 118 9 158 11 68 14 73 33 67 61 -19 111 -16 158 8 66 34 116
26 140 -23 22 -42 23 -95 4 -132 -8 -15 -16 -47 -18 -70 l-3 -43 54 -3 54 -3
-8 73 c-4 40 -6 89 -4 108 1 19 2 56 3 82 1 27 3 47 6 45 3 -1 22 -11 42 -21
59 -31 85 -133 52 -211 -8 -20 -14 -51 -12 -69 3 -30 5 -31 46 -30 23 0 45 4
49 8 9 9 6 91 -5 131 -5 17 -5 45 1 64 6 23 5 47 -2 72 -11 35 -9 40 14 63 21
21 26 34 23 69 -3 36 1 46 25 65 29 25 36 67 17 102 -8 15 -4 27 15 56 30 44
32 77 5 126 -11 21 -17 44 -14 51 10 28 -24 87 -58 102 -22 8 -40 27 -51 50
-23 48 -70 68 -137 59 -33 -4 -50 -3 -50 4 0 17 -68 35 -107 27 -19 -3 -47
-18 -60 -32 -20 -19 -28 -22 -34 -11 -5 7 -9 16 -9 21 0 4 -16 15 -35 24 -28
13 -41 14 -69 6 -31 -10 -36 -9 -41 8 -4 10 -10 19 -14 19 -5 0 -14 13 -21 30
-7 16 -22 33 -34 37 -15 5 -4 9 42 14 50 5 69 12 90 32 32 32 26 40 -47 61
-73 21 -86 20 -99 -9 -15 -32 -49 -46 -81 -33 -19 7 -34 4 -58 -9 -32 -17 -35
-17 -64 -1 -20 12 -36 15 -52 9 -24 -9 -67 3 -67 19 0 5 -11 10 -24 10 -14 0
-31 7 -40 15 -18 18 -66 18 -122 1z"
                />
              </g>
            </svg>
            <h2 className="px-3 font-mono text-xl">StellioCode</h2>
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
            <a href="#" className="transition-all hover:scale-x-110">
              Sobre
            </a>
            <Dot />
            <a href="#" className="transition-all hover:scale-x-110">
              Porfólio
            </a>
            <Dot />
            <a href="#" className="transition-all hover:scale-x-110">
              Planos
            </a>
            <Dot />
            <a href="#" className="transition-all hover:scale-x-110">
              Entre em contato
            </a>
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
