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
import { LoaderCircleIcon } from "lucide-react";
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
import { FileUpload } from "./file-upload";
import useCreateFeaturedProject from "@/hooks/api/useCreateFeaturedProject";

export function AddFeaturedProjectModal() {
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const form = useForm<z.infer<typeof addFeaturedProjectSchema>>({
    resolver: zodResolver(addFeaturedProjectSchema),
    defaultValues: {
      title: "",
    },
  });

  const token = useToken();
  const {
    addFeaturedProject,
    createFeaturedProjectError,
    createFeaturedProjectLoading,
  } = useCreateFeaturedProject();

  function onSubmit(values: z.infer<typeof addFeaturedProjectSchema>) {
    if (!file) {
      toast.error("Por favor, selecione uma imagem.");
      return;
    }

    if (description.length <= 0) {
      toast.error("Por favor, escreva uma descrição para o Projeto Destacado.");
      return;
    }

    addFeaturedProject({
      token,
      data: {
        title: values.title,
        description: description,
        image: file,
      },
    })
      .then(() => {
        toast.success("Projeto Destacado criado com sucesso!");
      })
      .catch(() => {
        console.error(
          "Erro ao criar Projeto Destacado:",
          createFeaturedProjectError,
        );
        toast.error("Erro ao criar Projeto Destacado, tente novamente.");
      });
  }

  function handleSetFile(file: File) {
    setFile(file);
  }

  return (
    <Dialog>
      <DialogTrigger className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:text-slate-500/50">
        <span>Adicionar Projeto Destacado</span>
      </DialogTrigger>
      <DialogContent className="w-full sm:max-w-[425px] lg:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Adicionar Projeto Destacado</DialogTitle>
          <DialogDescription>
            Preencha as informações necessárias. Clique em Criar Projeto
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

            <FileUpload onChange={handleSetFile} />

            <div>
              <FormLabel>Descrição</FormLabel>
              <p className="text-sm text-gray-500">
                Utilize Markdown para formatar o texto.
              </p>

              <MDEditor
                data-color-mode="light"
                id="description"
                value={description}
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

            <DialogFooter>
              <Button
                type="submit"
                className="min-w-36"
                disabled={createFeaturedProjectLoading}
              >
                {createFeaturedProjectLoading ? (
                  <LoaderCircleIcon className="animate-spin" />
                ) : (
                  <span>Criar Projeto Destacado</span>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
