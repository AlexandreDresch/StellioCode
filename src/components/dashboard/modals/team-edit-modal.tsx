import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function TeamEditModal() {
  return (
    <Dialog>
      <DialogTrigger className="w-full rounded-sm px-2 py-1.5 text-left text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
        Gerenciar Time
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Gerenciar Time</DialogTitle>
          <DialogDescription>
            Adicione e/ou remova desenvolvedores usando{" "}
            <span className="italic">Drag and Drop</span>, salve quando estiver pronto.
          </DialogDescription>
        </DialogHeader>

        
      </DialogContent>
    </Dialog>
  );
}
