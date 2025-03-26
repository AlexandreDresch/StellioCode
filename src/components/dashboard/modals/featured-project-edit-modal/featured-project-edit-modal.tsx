import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FileUpIcon, LoaderCircleIcon, XIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import useToken from "@/hooks/auth/use-token";
import { toast } from "sonner";

import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { addFeaturedProjectSchema } from "@/schemas/featured-projects-schemas";
import { FileUpload } from "../add-featured-project/file-upload";
import { FeaturedProject } from "@/types";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import useUpdateFeaturedProject from "@/hooks/api/useUpdateFeaturedProject";

export function FeaturedProjectEditModal({
  featuredProject,
}: {
  featuredProject: FeaturedProject;
}) {
  const [description, setDescription] = useState(featuredProject.description);
  const [file, setFile] = useState<File | null>(null);
  const [isImageUploadOpen, setIsImageUploadOpen] = useState(
    featuredProject.imageUrl ? false : true,
  );

  const {
    updateFeaturedProject,
    updateFeaturedProjectError,
    updateFeaturedProjectLoading,
    updatedFeaturedProject,
  } = useUpdateFeaturedProject();

  const form = useForm<z.infer<typeof addFeaturedProjectSchema>>({
    resolver: zodResolver(addFeaturedProjectSchema),
    defaultValues: {
      title: updatedFeaturedProject
        ? updatedFeaturedProject.title
        : featuredProject.title,
    },
  });

  const token = useToken();

  function onSubmit(values: z.infer<typeof addFeaturedProjectSchema>) {
    if (description.length <= 0) {
      toast.error("Por favor, escreva uma descrição para o Projeto Destacado.");
      return;
    }

    if (!file) {
      updateFeaturedProject({
        token,
        featuredProjectId: featuredProject.projectId,
        data: {
          title: values.title,
          description: description,
        },
      })
        .then(() => {
          toast.success("Projeto Destacado atualizado com sucesso!");
          setIsImageUploadOpen(false);
        })
        .catch(() => {
          console.error(
            "Erro ao atualizar Projeto Destacado:",
            updateFeaturedProjectError,
          );
          toast.error("Erro ao atualizar Projeto Destacado, tente novamente.");
        });

      return;
    }

    updateFeaturedProject({
      token,
      featuredProjectId: featuredProject.projectId,
      data: {
        title: values.title,
        description: description,
        image: file,
      },
    })
      .then(() => {
        toast.success("Projeto Destacado atualizado com sucesso!");
        setIsImageUploadOpen(false);
      })
      .catch(() => {
        console.error(
          "Erro ao atualizar Projeto Destacado:",
          updateFeaturedProjectLoading,
        );
        toast.error("Erro ao atualizar Projeto Destacado, tente novamente.");
      });
  }

  function handleSetFile(file: File) {
    setFile(file);
  }

  function handleUploadNewImage() {
    setIsImageUploadOpen(true);
  }

  return (
    <Dialog>
      <DialogTrigger className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:text-slate-500/50">
        <span>
          Editar{" "}
          <Badge variant="outline">
            {updatedFeaturedProject
              ? updatedFeaturedProject.title
              : featuredProject.title}
          </Badge>
        </span>
      </DialogTrigger>
      <DialogContent className="w-full sm:max-w-[425px] lg:max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            Editar{" "}
            {updatedFeaturedProject
              ? updatedFeaturedProject.title
              : featuredProject.title}
          </DialogTitle>
          <DialogDescription>
            Preencha as informações necessárias. Clique em Atualizar Projeto
            Destacado quando estiver pronto.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Nome do projeto." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ScrollArea className="max-h-[600px] overflow-y-auto">
              {isImageUploadOpen ? (
                <div className="flex flex-col gap-2">
                  <FileUpload onChange={handleSetFile} />
                  <Button
                    variant="outline"
                    onClick={() => setIsImageUploadOpen(false)}
                    className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-400"
                  >
                    <span>Cancelar</span>
                    <XIcon className="ml-1" />
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <FormLabel>Imagem</FormLabel>
                  <img
                    className="w-3/4 object-cover"
                    src={
                      updatedFeaturedProject
                        ? updatedFeaturedProject.imageUrl
                        : featuredProject.imageUrl
                    }
                    alt="Projeto Destacado"
                  />
                  <Button
                    variant="outline"
                    onClick={handleUploadNewImage}
                    className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-400"
                  >
                    <span>Alterar Imagem</span>
                    <FileUpIcon className="ml-1" />
                  </Button>
                </div>
              )}

              <div>
                <FormLabel>Descrição</FormLabel>
                <p className="text-sm text-gray-500">
                  Utilize Markdown para formatar o texto.
                </p>

                <MDEditor
                  data-color-mode="light"
                  id="description"
                  value={
                    updatedFeaturedProject
                      ? updatedFeaturedProject.description
                      : description
                  }
                  onChange={(value) => setDescription(value as string)}
                  preview="edit"
                  height={300}
                  style={{ borderRadius: 20, overflow: "hidden" }}
                  textareaProps={{
                    placeholder:
                      "Descreva o projeto usando o formato Markdown...",
                  }}
                  previewOptions={{
                    disallowedElements: ["style"],
                  }}
                  className="placeholder:text-black-300 mt-3 w-full text-[18px] text-black"
                />
              </div>
            </ScrollArea>

            <DialogFooter>
              <Button
                type="submit"
                className="min-w-36"
                disabled={updateFeaturedProjectLoading}
              >
                {updateFeaturedProjectLoading ? (
                  <LoaderCircleIcon className="animate-spin" />
                ) : (
                  <span>Atualizar Projeto Destacado</span>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
