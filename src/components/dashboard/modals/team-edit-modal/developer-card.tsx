import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IDeveloperCardProps } from "@/types";

export default function DeveloperCard({
  avatarUrl,
  email,
  githubUrl,
  name,
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
            <div className="flex">
              <h4 className="text-xs font-medium">Função:</h4>
              <p>{role}</p>
            </div>
            <div className="flex">
              <h4 className="text-xs font-medium">Tecnologias:</h4>
              <ul className="list-none flex gap-1">
                {techStack.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            </div>
            <div className="flex">
              <h4 className="text-xs font-medium">GitHub:</h4>
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                {githubUrl}
              </a>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
