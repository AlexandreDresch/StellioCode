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

import useToken from "@/hooks/auth/use-token";
import { toast } from "sonner";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { addFollowUpSchema } from "@/schemas/follow-up-schemas";
import useCreateFollowUp from "@/hooks/api/useCreateFollowUp";
import useUserId from "@/hooks/auth/use-user-id";
import { Input } from "@/components/ui/input";
import { FileUpload } from "@/components/dashboard/modals/add-featured-project/file-upload";

export function AddFollowUpModal({ projectId }: { projectId: string }) {
  const [file, setFile] = useState<File | null>(null);

  const form = useForm<z.infer<typeof addFollowUpSchema>>({
    resolver: zodResolver(addFollowUpSchema),
    defaultValues: {
      progressPercentage: 0,
      description: "",
    },
  });

  const token = useToken();
  const userId = useUserId();
  const { addFollowUp, createFollowUpError, createFollowUpLoading } =
    useCreateFollowUp();

  function onSubmit(values: z.infer<typeof addFollowUpSchema>) {
    if (!file) {
      toast.error("Por favor, selecione uma imagem.");
      return;
    }

    addFollowUp({
      token,
      data: {
        description: values.description,
        image: file,
        developerId: userId,
        projectId,
        progressPercentage: values.progressPercentage,
      },
    })
      .then(() => {
        toast.success("Progress criado com sucesso!");
      })
      .catch(() => {
        console.error("Erro ao criar Progresso:", createFollowUpError);
        toast.error("Erro ao criar Progresso, tente novamente.");
      });
  }

  function handleSetFile(file: File) {
    setFile(file);
  }

  return (
    <Dialog>
      <DialogTrigger className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm outline-none transition-colors disabled:cursor-not-allowed disabled:text-slate-500/50">
        <Badge variant="outline" className="px-5 py-3">
          Adicionar Progresso
        </Badge>
      </DialogTrigger>
      <DialogContent className="w-full sm:max-w-[425px] lg:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Adicionar Progresso</DialogTitle>
          <DialogDescription>
            Preencha as informações necessárias. Clique em Adicionar Informações
            quando estiver pronto.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="progressPercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Porcentagem atual</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} placeholder="Ex. 80" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Detalhes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descreva o que foi implementado."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FileUpload onChange={handleSetFile} />

            <DialogFooter>
              <Button
                type="submit"
                className="min-w-36"
                disabled={createFollowUpLoading}
              >
                {createFollowUpLoading ? (
                  <LoaderCircleIcon className="animate-spin" />
                ) : (
                  <span>Adicionar Informações</span>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
