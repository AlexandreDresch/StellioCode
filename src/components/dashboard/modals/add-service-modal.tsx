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
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import useToken from "@/hooks/auth/use-token";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { addServiceSchema } from "@/schemas/services-schemas";
import useCreateService from "@/hooks/api/useCreateService";

export function AddServiceModal() {
  const form = useForm<z.infer<typeof addServiceSchema>>({
    resolver: zodResolver(addServiceSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      category: "",
      duration: "",
      isActive: true,
    },
  });

  const token = useToken();
  const { addService, createServiceError, createServiceLoading } =
    useCreateService();

  function onSubmit(values: z.infer<typeof addServiceSchema>) {
    addService({
      token,
      data: {
        title: values.title,
        description: values.description,
        price: values.price,
        category: values.category,
        duration: values.duration,
        isActive: values.isActive,
      },
    })
      .then(() => {
        toast.success("Serviço criado com sucesso!");
      })
      .catch(() => {
        console.error("Erro ao criar serviço:", createServiceError);
        toast.error("Erro ao criar serviço, tente novamente.");
      });
  }

  return (
    <Dialog>
      <DialogTrigger className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:text-slate-500/50">
        <span>Adicionar Serviço</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Serviço</DialogTitle>
          <DialogDescription>
            Preencha as informações necessárias. Clique em Criar Serviço quando
            estiver pronto.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Título do serviço." />
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
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Adicione uma descrição ao plano."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço Base</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Valor do serviço." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duração</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Tempo base, em meses" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Chatbot, etc..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tornar Ativo</FormLabel>
                  <FormControl className="flex">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="submit"
                className="min-w-36"
                disabled={createServiceLoading}
              >
                {createServiceLoading ? (
                  <LoaderCircleIcon className="animate-spin" />
                ) : (
                  <span>Criar Serviço</span>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
