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
import useDeletePlan from "@/hooks/api/useDeletePlan";
import useToken from "@/hooks/auth/use-token";
import { PricingPlan } from "@/types";
import { LoaderCircleIcon } from "lucide-react";
import { toast } from "sonner";

export function RemovePlanModal({ plan }: { plan: PricingPlan }) {
  const { deletePlan, deletePlanError, deletePlanLoading } = useDeletePlan();

  const token = useToken();

  function handleDeletePlan() {
    deletePlan({ planId: plan.id, token })
      .then(() => {
        toast.success("Plano removido com sucesso!");
      })
      .catch(() => {
        console.error("Erro ao deletar o plano:", deletePlanError);
        toast.error("Erro ao deletar plano, tente novamente.");
      });
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
        <span>
          Remover plano <Badge variant="outline">{plan.name}</Badge>
        </span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza disso?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não poderá ser desfeita e acarretará na deleção permanente
            dos dados do plano {plan.name} do nosso servidor.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            disabled={deletePlanLoading}
            onClick={handleDeletePlan}
            className="min-w-10"
          >
            {deletePlanLoading ? (
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
