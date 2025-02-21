import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import useDeleteDeveloper from "@/hooks/api/useDeleteDeveloper";
import { LoaderCircleIcon, TrashIcon } from "lucide-react";

export function RemoveDeveloperModal({ developerId }: { developerId: string }) {
  const { deleteDeveloper, deleteDeveloperLoading } = useDeleteDeveloper();

  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlhdCI6MTc0MDA5NjUyMSwiZXhwIjoxNzQwMTMyNTIxLCJyb2xlIjoiYWRtaW4ifQ.sP7zFAMNJMelqPlyVFE7CagdZbKFFU0iIoFaoO7DAn4";

  function handleDeleteDeveloper() {
    deleteDeveloper({ developerId, token });
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
        <span>Remover</span>
        <TrashIcon size={14} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza disso?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não poderá ser desfeita e acarretará na deleção permanente
            dos dados do desenvolvedor do nosso servidor.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            disabled={deleteDeveloperLoading}
            onClick={handleDeleteDeveloper}
            className="min-w-10"
          >
            {deleteDeveloperLoading ? (
              <LoaderCircleIcon className="animate-spin" />
            ) : (
              <span>Deletar</span>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
