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

export default function TeamEditModal() {
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
            <span className="font-semibold">Marketplace</span> e clique em
            salvar quando estiver pronto.
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-2">
          <ScrollArea className="h-[400px] w-1/2 rounded-md border p-4">
            <DeveloperCard {...developersData[0]}/>
          </ScrollArea>

          <ScrollArea className="h-[400px] w-1/2 rounded-md border p-4">
            <DeveloperCard {...developersData[1]}/>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
