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
import useDeleteFeaturedProject from "@/hooks/api/useDeleteFeaturedProject";
import useToken from "@/hooks/auth/use-token";
import { FeaturedProject } from "@/types";
import { LoaderCircleIcon } from "lucide-react";
import { toast } from "sonner";

export function RemoveFeaturedProjectModal({
  featuredProject,
}: {
  featuredProject: FeaturedProject;
}) {
  const {
    deleteFeaturedProject,
    deleteFeaturedProjectError,
    deleteFeaturedProjectLoading,
  } = useDeleteFeaturedProject();

  const token = useToken();

  function handleDeleteFeaturedProject() {
    deleteFeaturedProject({
      featuredProjectId: featuredProject.projectId,
      token,
    })
      .then(() => {
        toast.success("Projeto Destacado removido com sucesso!");
      })
      .catch(() => {
        console.error(
          "Erro ao deletar o Projeto Destacado:",
          deleteFeaturedProjectError,
        );
        toast.error("Erro ao deletar Projeto Destacado, tente novamente.");
      });
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
        <span>
          Remover <Badge variant="outline">{featuredProject.title}</Badge>
        </span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza disso?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não poderá ser desfeita e acarretará na deleção permanente
            dos dados do projeto {featuredProject.title} do nosso servidor.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            disabled={deleteFeaturedProjectLoading}
            onClick={handleDeleteFeaturedProject}
            className="min-w-10"
          >
            {deleteFeaturedProjectLoading ? (
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
