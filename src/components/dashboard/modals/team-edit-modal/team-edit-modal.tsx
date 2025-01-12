import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ScrollArea } from "@/components/ui/scroll-area";
import DeveloperCard from "./developer-card";
import { developersData } from "@/constants/developers";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { projectsData } from "@/constants/projects";

export default function TeamEditModal({ projectId }: { projectId: string }) {
  const [allDevelopers] = useState(developersData);
  const [selectedDevelopers, setSelectedDevelopers] = useState(
    developersData.filter(
      (developer) => developer.currentProjectId === projectId,
    ),
  );

  const selectedProject = projectsData.find(
    (project) => project.id === projectId,
  );

  function handleDeveloperSelection(id: string) {
    const developer = allDevelopers.find((dev) => dev.id === id);

    if (!developer) return;

    const isAlreadySelected = selectedDevelopers.some((dev) => dev.id === id);

    if (isAlreadySelected) {
      setSelectedDevelopers(selectedDevelopers.filter((dev) => dev.id !== id));
    } else {
      setSelectedDevelopers([...selectedDevelopers, developer]);
    }
  }

  return (
    <Dialog>
      <DialogTrigger className="w-full rounded-sm px-2 py-1.5 text-left text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
        Gerenciar Time
      </DialogTrigger>

      <DialogContent className="w-full max-w-3xl">
        <DialogHeader>
          <DialogTitle>Gerenciar Time</DialogTitle>
          <DialogDescription>
            Adicione e/ou remova desenvolvedores ao projeto{" "}
            <span className="font-semibold">{selectedProject?.title}</span> e
            clique em salvar quando estiver pronto.
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-2">
          <ScrollArea className="h-[400px] w-1/2 rounded-md border p-4">
            <h4 className="text-sm font-medium">Desenvolvedores</h4>
            {allDevelopers
              .filter(
                (developer) =>
                  !selectedDevelopers.some(
                    (selectedDev) => selectedDev.id === developer.id,
                  ),
              )
              .map((developer) => (
                <DeveloperCard
                  key={developer.id}
                  {...developer}
                  isSelected={false}
                  onToggleSelect={() => handleDeveloperSelection(developer.id)}
                />
              ))}
          </ScrollArea>

          <ScrollArea className="h-[400px] w-1/2 rounded-md border p-4">
            <h4 className="text-sm font-medium">Time</h4>
            {selectedDevelopers.map((developer) => (
              <DeveloperCard
                key={developer.id}
                {...developer}
                isSelected={true}
                onToggleSelect={() => handleDeveloperSelection(developer.id)}
              />
            ))}
          </ScrollArea>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" className="w-1/5">
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
