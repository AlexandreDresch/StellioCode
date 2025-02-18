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
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import useGetApprovedDevelopers from "@/hooks/api/useGetApprovedDevelopers";
import { IDeveloper } from "@/types";
import { UserSkeleton } from "@/components/skeletons/user-skeleton";

export default function TeamEditModal({ projectId }: { projectId: string }) {
  const {
    getApprovedDevelopers,
    approvedDevelopers,
    getApprovedDevelopersLoading,
  } = useGetApprovedDevelopers();

  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlhdCI6MTczOTgzNjA3MSwiZXhwIjoxNzM5ODcyMDcxLCJyb2xlIjoiYWRtaW4ifQ.IsY6n0RTdoa9OmlqJejWVt6LOwA1LkBg2Kru6pXbcos";

  const [allDevelopers, setAllDevelopers] = useState<IDeveloper[]>([]);
  const [selectedDevelopers, setSelectedDevelopers] = useState<IDeveloper[]>(
    [],
  );

  useEffect(() => {
    getApprovedDevelopers({ token });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (approvedDevelopers) {
      setAllDevelopers(approvedDevelopers);
    }
  }, [approvedDevelopers]);

  useEffect(() => {
    setSelectedDevelopers(
      allDevelopers.filter((developer) =>
        developer.currentProjectIds?.includes(projectId),
      ),
    );
  }, [allDevelopers, projectId]);

  function handleDeveloperSelection(id: string) {
    setSelectedDevelopers((prev) => {
      const isAlreadySelected = prev.some((dev) => dev.id === id);
      return isAlreadySelected
        ? prev.filter((dev) => dev.id !== id)
        : [...prev, allDevelopers.find((dev) => dev.id === id)!];
    });
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
            Adicione e/ou remova desenvolvedores do projeto e clique em salvar
            quando estiver pronto.
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-2">
          <ScrollArea className="h-[400px] w-1/2 rounded-md border p-4">
            <h4 className="text-sm font-medium">Desenvolvedores</h4>
            {getApprovedDevelopersLoading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <UserSkeleton key={index} />
                ))
              : allDevelopers
                  .filter(
                    (dev) =>
                      !selectedDevelopers.some(
                        (selectedDev) => selectedDev.id === dev.id,
                      ),
                  )
                  .map((developer) => (
                    <DeveloperCard
                      key={developer.id}
                      {...developer}
                      isSelected={false}
                      onToggleSelect={() =>
                        handleDeveloperSelection(developer.id)
                      }
                    />
                  ))}
          </ScrollArea>

          <ScrollArea className="h-[400px] w-1/2 rounded-md border p-4">
            <h4 className="text-sm font-medium">Time</h4>
            {getApprovedDevelopersLoading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <UserSkeleton key={index} />
                ))
              : selectedDevelopers.map((developer) => (
                  <DeveloperCard
                    key={developer.id}
                    {...developer}
                    isSelected={true}
                    onToggleSelect={() =>
                      handleDeveloperSelection(developer.id)
                    }
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
