import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { IDeveloperCardProps } from "@/types";

import { GithubIcon, PlusIcon } from "lucide-react";

export default function DeveloperCard({
  avatarUrl,
  email,
  githubUrl,
  name,
  projectsCount,
  role,
  techStack,
}: IDeveloperCardProps) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <div className="flex gap-4">
            <Avatar>
              <AvatarImage src={avatarUrl} />
              <AvatarFallback>
                {name
                  .split(" ")
                  .filter((part) => part.length > 0)
                  .map((part) => part[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3>{name}</h3>
              <p className="text-xs font-light">{email}</p>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-medium">Função:</h4>
              <Badge variant="outline">{role}</Badge>
            </div>

            <div className="flex items-center gap-2">
              <h4 className="text-xs font-medium">Tecnologias:</h4>
              <ul className="flex list-none gap-1">
                {techStack.map((tech) => (
                  <li key={tech}>
                    <Badge variant="outline">{tech}</Badge>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-normal">Trabalhando em</span>
              <Badge variant="outline">{projectsCount}</Badge>
              <span className="text-xs font-normal">
                {projectsCount > 1 || projectsCount === 0
                  ? "projetos"
                  : "projeto"}{" "}
                no momento.
              </span>
            </div>

            <div className="flex items-center justify-between">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button asChild variant="outline">
                      <a
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <GithubIcon size={28} />
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Visitar Perfil</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">
                      <PlusIcon />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Adicionar ao Time</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
