import {
  CalendarSearchIcon,
  CogIcon,
  ComputerIcon,
  GhostIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  PanelBottomIcon,
  Settings2Icon,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from "../ui/sheet";
import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export default function Sidebar() {
  return (
    <div className="flex w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col justify-between border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 py-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to={"/"}
                  className="flex size-10 items-center justify-center gap-2 rounded-full bg-primary text-lg text-primary-foreground md:text-base"
                >
                  <GhostIcon className="size-5 transition-all" />
                  <span className="sr-only">StellioCode</span>
                </Link>
              </TooltipTrigger>

              <TooltipContent side="right">Página Inicial</TooltipContent>
            </Tooltip>

            <div className="grid gap-6 text-lg font-medium">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to={"#"}
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <LayoutDashboardIcon className="size-5 transition-all" />
                    <span className="sr-only">Início</span>
                  </Link>
                </TooltipTrigger>

                <TooltipContent side="right">Início</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to={"#developers"}
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <ComputerIcon className="size-5 transition-all" />
                    <span className="sr-only">Desenvolvedores</span>
                  </Link>
                </TooltipTrigger>

                <TooltipContent side="right">Desenvolvedores</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to={"#projects"}
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <CogIcon className="size-5 transition-all" />
                    <span className="sr-only">Projetos</span>
                  </Link>
                </TooltipTrigger>

                <TooltipContent side="right">Projetos</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to={"#meetings"}
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <CalendarSearchIcon className="size-5 transition-all" />
                    <span className="sr-only">Reuniões</span>
                  </Link>
                </TooltipTrigger>

                <TooltipContent side="right">Reuniões</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to={"#settings"}
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <Settings2Icon className="size-5 transition-all" />
                    <span className="sr-only">Configurações</span>
                  </Link>
                </TooltipTrigger>

                <TooltipContent side="right">Configurações</TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </nav>

        <nav className="flex flex-col items-center gap-4 px-2 py-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to={"/auth"}
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-red-500"
                >
                  <LogOutIcon className="size-5 transition-all" />
                  <span className="sr-only">Sair</span>
                </Link>
              </TooltipTrigger>

              <TooltipContent side="right">Sair</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>

      <div className="flex flex-col sm:hidden sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelBottomIcon className="size-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="space-y-4 sm:max-w-xs">
              <SheetTitle className="flex items-center gap-4">
                <Link
                  to={"/"}
                  className="flex size-10 items-center justify-center gap-2 rounded-full bg-primary text-lg text-primary-foreground md:text-base"
                >
                  <GhostIcon className="size-5 transition-all" />
                </Link>
                <span>StellioCode</span>
              </SheetTitle>

              <SheetDescription>
                Navegue pelo Dashboard, consulte gráficos e execute tarefas.
              </SheetDescription>

              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  to={"#"}
                  className="flex items-center gap-4 text-muted-foreground hover:text-foreground"
                >
                  <LayoutDashboardIcon className="size-5 transition-all" />
                  <span>Início</span>
                </Link>

                <Link
                  to={"#developers"}
                  className="flex items-center gap-4 text-muted-foreground hover:text-foreground"
                >
                  <ComputerIcon className="size-5 transition-all" />
                  <span>Desenvolvedores</span>
                </Link>

                <Link
                  to={"#projects"}
                  className="flex items-center gap-4 text-muted-foreground hover:text-foreground"
                >
                  <CogIcon className="size-5 transition-all" />
                  <span>Projetos</span>
                </Link>

                <Link
                  to={"#meetings"}
                  className="flex items-center gap-4 text-muted-foreground hover:text-foreground"
                >
                  <CalendarSearchIcon className="size-5 transition-all" />
                  <span>Reuniões</span>
                </Link>

                <Link
                  to={"#settings"}
                  className="flex items-center gap-4 text-muted-foreground hover:text-foreground"
                >
                  <Settings2Icon className="size-5 transition-all" />
                  <span>Configurações</span>
                </Link>
              </nav>

              <nav className="grid gap-6 text-lg font-medium fixed bottom-4 left-6">
                <Link
                  to={"/auth"}
                  className="flex items-center gap-4 text-muted-foreground hover:text-red-500"
                >
                  <LogOutIcon className="size-5 transition-all" />
                  <span>Sair</span>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </header>
      </div>
    </div>
  );
}
