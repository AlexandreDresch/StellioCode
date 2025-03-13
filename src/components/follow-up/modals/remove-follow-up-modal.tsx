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
import { Badge } from "@/components/ui/badge";
import useDeleteFollowUp from "@/hooks/api/useDeleteFollowUp";
import useToken from "@/hooks/auth/use-token";
import { LoaderCircleIcon, TrashIcon } from "lucide-react";
import { toast } from "sonner";

export function RemoveFollowUpModal({
  followUp,
}: {
  followUp: {
    id: string;
    title: string;
    descriptions: string[];
    imageUrls: string[];
  };
}) {
  const { deleteFollowUp, deleteFollowUpError, deleteFollowUpLoading } =
    useDeleteFollowUp();

  const token = useToken();

  function handleDeleteFollowUp() {
    deleteFollowUp({
      followUpId: followUp.id,
      token,
    })
      .then(() => {
        toast.success("Atualização de projeto removida com sucesso!");
      })
      .catch(() => {
        console.error(
          "Erro ao deletar atualização de projeto:",
          deleteFollowUpError,
        );
        toast.error("Erro ao deletar atualização de projeto, tente novamente.");
      });
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm outline-none transition-colors">
        <span>
          <Badge variant="outline" className="py-1">
            <TrashIcon size={16} />
          </Badge>
        </span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza disso?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não poderá ser desfeita e acarretará na deleção permanente
            dos dados da atualização de {followUp.title} do nosso servidor.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            disabled={deleteFollowUpLoading}
            onClick={handleDeleteFollowUp}
            className="min-w-10"
          >
            {deleteFollowUpLoading ? (
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
