import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Ghost, MessageCircleMore, Sun, Moon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";

export default function Header() {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsChecked(true);
      document.body.classList.add("dark");
    } else {
      setIsChecked(false);
      document.body.classList.remove("dark");
    }
  }, []);

  const handleSwitchChange = () => {
    setIsChecked((prevState) => {
      const newState = !prevState;
      if (newState) {
        document.body.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.body.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return newState;
    });
  };

  return (
    <div>
      <header className="flex items-center justify-between px-6 py-4 shadow-lg xl:px-32">
        <div className="flex items-center gap-4">
          <Ghost size="32" />
          <h1 className="text-2xl">StellioCode</h1>
        </div>
        <ul className="hidden items-center gap-12 text-base font-semibold md:flex md:gap-4 xl:flex xl:gap-12">
          <li className="relative cursor-pointer after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full">
            Sobre
          </li>
          <li className="relative cursor-pointer after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full">
            Portfólio
          </li>
          <li className="relative cursor-pointer after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full">
            Planos
          </li>
          <li className="relative cursor-pointer after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full">
            Entre em contato
          </li>
        </ul>

        <div className="relative hidden items-center justify-center gap-4 font-semibold md:flex">
          <div className="flex items-center space-x-2">
            <Sun
              className={`w-5 text-yellow-500 ${isChecked ? "opacity-50" : "opacity-100"}`}
            />

            <Switch
              id="dark-mode"
              checked={isChecked}
              onCheckedChange={handleSwitchChange}
            />
            <Moon
              className={`w-5 text-gray-500 ${isChecked ? "opacity-100" : "opacity-50"}`}
            />
          </div>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <a
              href="#"
              className="rounded-md bg-black p-3 text-white transition-all hover:scale-105 hover:opacity-70 md:hidden"
            >
              <Menu />
            </a>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="flex items-center justify-center gap-2 text-2xl">
                <Ghost />
                <h1 className="font-semibold">StellioCode</h1>
              </SheetTitle>
              <SheetDescription className="relative h-full w-full">
                <ul className="flex flex-col items-center text-lg font-semibold">
                  <li className="relative cursor-pointer py-5 font-bold tracking-widest text-black">
                    HOME
                  </li>
                  <Separator />
                  <li className="relative cursor-pointer py-7">Sobre</li>
                  <Separator />
                  <li className="relative cursor-pointer py-7">Portfólio</li>
                  <Separator />
                  <li className="relative cursor-pointer py-7">Planos</li>
                  <Separator />
                  <li className="relative cursor-pointer py-7 hover:text-black">
                    Tire suas dúvidas
                  </li>

                  <li className="bottom-0 flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-gray-900 py-3 font-normal text-white transition-transform duration-300 hover:scale-105 hover:brightness-200">
                    <span>Entre em contato</span>
                    <MessageCircleMore size="20" />
                  </li>
                </ul>
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4"></div>
            <SheetFooter>
              <SheetClose asChild>Close</SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </header>
    </div>
  );
}
