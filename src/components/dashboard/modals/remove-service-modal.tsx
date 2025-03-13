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
import useDeleteService from "@/hooks/api/useDeleteService";
import useToken from "@/hooks/auth/use-token";
import { Service } from "@/types";
import { LoaderCircleIcon } from "lucide-react";
import { toast } from "sonner";

export function RemoveServiceModal({ service }: { service: Service }) {
  const { deleteService, deleteServiceError, deleteServiceLoading } =
    useDeleteService();

  const token = useToken();

  function handleDeleteService() {
    deleteService({ serviceId: service.id, token })
      .then(() => {
        toast.success("Serviço removido com sucesso!");
      })
      .catch(() => {
        console.error("Erro ao deletar o serviço:", deleteServiceError);
        toast.error("Erro ao deletar serviço, tente novamente.");
      });
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
        <span>
          Remover serviço <Badge variant="outline">{service.title}</Badge>
        </span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza disso?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não poderá ser desfeita e acarretará na deleção permanente
            dos dados do serviço {service.title} do nosso servidor.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            disabled={deleteServiceLoading}
            onClick={handleDeleteService}
            className="min-w-10"
          >
            {deleteServiceLoading ? (
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
