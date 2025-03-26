import {
  CalendarSearchIcon,
  CogIcon,
  ComputerIcon,
  GhostIcon,
  HandCoinsIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  PanelBottomIcon,
  ServerIcon,
  Settings2Icon,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "../ui/sheet";
import { Link, useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import useLogout from "@/hooks/auth/use-logout";
import { useState } from "react";
import { Badge } from "../ui/badge";
import useUserName from "@/hooks/auth/use-user-name";
import useRole from "@/hooks/auth/use-role";

// Define os links da sidebar
const sidebarLinks = [
  {
    id: "summary",
    icon: <LayoutDashboardIcon className="size-5 transition-all" />,
    text: "Início",
    tooltip: "Início",
    roles: ["admin", "developer"],
  },
  {
    id: "projects",
    icon: <CogIcon className="size-5 transition-all" />,
    text: "Projetos",
    tooltip: "Projetos",
    roles: ["admin", "developer"],
  },
  {
    id: "developers",
    icon: <ComputerIcon className="size-5 transition-all" />,
    text: "Desenvolvedores",
    tooltip: "Desenvolvedores",
    roles: ["admin"],
  },
  {
    id: "meetings",
    icon: <CalendarSearchIcon className="size-5 transition-all" />,
    text: "Reuniões",
    tooltip: "Reuniões",
    roles: ["admin", "developer"],
  },
  {
    id: "plans",
    icon: <HandCoinsIcon className="size-5 transition-all" />,
    text: "Planos",
    tooltip: "Planos",
    roles: ["admin"],
  },
  {
    id: "services",
    icon: <ServerIcon className="size-5 transition-all" />,
    text: "Serviços",
    tooltip: "Serviços",
    roles: ["admin"],
  },
  {
    id: "settings",
    icon: <Settings2Icon className="size-5 transition-all" />,
    text: "Configurações",
    tooltip: "Configurações",
    roles: ["admin"],
  },
];

export default function Sidebar() {
  const [openSheet, setOpenSheet] = useState(false);

  const logout = useLogout();
  const name = useUserName();
  const role = useRole();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/auth");
  }

  function scrollTo(targetId: string) {
    setOpenSheet(false);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  }

  const filteredLinks = sidebarLinks.filter((link) =>
    link.roles.includes(role as string),
  );

  return (
    <div className="flex w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col justify-between border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 py-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to={"/"}
                  className="flex size-10 items-center justify-center gap-2 rounded-full bg-white text-lg text-primary-foreground md:text-base"
                >
                  <img
                    src="ovelhaNegra.svg"
                    className="size-6 transition-all"
                  />
                  <span className="sr-only">StellioCode</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Página Inicial</TooltipContent>
            </Tooltip>

            <div className="grid gap-6 text-lg font-medium">
              {filteredLinks.map((link) => (
                <Tooltip key={link.id}>
                  <TooltipTrigger asChild>
                    <a
                      href={`#${link.id}`}
                      onClick={(event) => {
                        event.preventDefault();
                        scrollTo(link.id);
                      }}
                      className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                      {link.icon}
                      <span className="sr-only">{link.text}</span>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent side="right">{link.tooltip}</TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TooltipProvider>
        </nav>

        <nav className="flex flex-col items-center gap-4 px-2 py-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-red-500"
                >
                  <LogOutIcon className="size-5 transition-all" />
                  <span className="sr-only">Sair</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Sair</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>

      <div className="flex flex-col sm:hidden sm:gap-4 sm:py-4 sm:pl-14">
        <header className="fixed top-0 z-30 flex h-14 w-full items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet open={openSheet} onOpenChange={setOpenSheet}>
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
                {filteredLinks.map((link) => (
                  <SheetClose key={link.id} asChild>
                    <a
                      href={`#${link.id}`}
                      onClick={(event) => {
                        event.preventDefault();
                        setTimeout(() => {
                          scrollTo(link.id);
                        }, 100);
                      }}
                      className="flex items-center gap-4 text-muted-foreground hover:text-foreground"
                    >
                      {link.icon}
                      <span>{link.text}</span>
                    </a>
                  </SheetClose>
                ))}
              </nav>

              <nav className="fixed bottom-4 left-6 grid gap-6 text-lg font-medium">
                <SheetClose asChild>
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-red-500"
                  >
                    <LogOutIcon className="size-5 transition-all" />
                    <span className="sr-only">Sair</span>
                  </Button>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>

          <Badge
            variant="outline"
            className="flex items-center gap-4 px-2.5 text-muted-foreground"
          >
            {name}
          </Badge>
        </header>
      </div>
    </div>
  );
}
