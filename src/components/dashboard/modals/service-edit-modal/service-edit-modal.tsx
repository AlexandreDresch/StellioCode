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
import { LoaderCircleIcon, PenIcon, PenOffIcon } from "lucide-react";
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
import { Service } from "@/types";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import useToken from "@/hooks/auth/use-token";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { editServiceSchema } from "@/schemas/services-schemas";
import ServiceDetails from "./service-details";
import useUpdateService from "@/hooks/api/useUpdateService";

export function ServiceEditModal({ service }: { service: Service }) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const form = useForm<z.infer<typeof editServiceSchema>>({
    resolver: zodResolver(editServiceSchema),
    defaultValues: {
      title: service.title,
      price: +service.price,
      description: service.description,
      category: service.category,
      duration: service.duration,
      isActive: service.active,
    },
  });

  const token = useToken();
  const {
    updateService,
    updateServiceError,
    updateServiceLoading,
    updatedService,
  } = useUpdateService();

  function onSubmit(values: z.infer<typeof editServiceSchema>) {
    updateService({
      token,
      serviceId: service.id,
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
        toast.success("Serviço atualizado com sucesso!");
        setIsEditOpen(false);
      })
      .catch(() => {
        console.error("Erro ao atualizar o serviço:", updateServiceError);
        toast.error("Erro ao atualizar serviço, tente novamente.");
      });
  }

  return (
    <Dialog>
      <DialogTrigger className="-mt-5 ml-auto pr-5">
        <PenIcon size={14} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editando serviço {service.title}</DialogTitle>
          <DialogDescription>
            Faça alterações no serviço. Clique em Salvar Alterações quando
            estiver pronto.
          </DialogDescription>
        </DialogHeader>

        {isEditOpen ? (
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
                        placeholder="Adicione uma descrição ao serviço."
                        className="min-h-20"
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
                  disabled={updateServiceLoading}
                >
                  {updateServiceLoading ? (
                    <LoaderCircleIcon className="animate-spin" />
                  ) : (
                    <span>Editar Serviço</span>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        ) : (
          <>
            <ServiceDetails
              service={updatedService ? updatedService : service}
            />

            <div className="grid w-full gap-1.5">
              <Label htmlFor="message">Descrição do Serviço</Label>
              <Textarea
                value={
                  updatedService
                    ? updatedService.description
                    : service.description
                }
                readOnly
                className="min-h-20"
              />
            </div>
          </>
        )}

        <Button onClick={() => setIsEditOpen(!isEditOpen)} variant="ghost">
          <span>{isEditOpen ? "Fechar" : "Abrir"} Edição</span>
          {isEditOpen ? <PenOffIcon size={10} /> : <PenIcon size={10} />}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
