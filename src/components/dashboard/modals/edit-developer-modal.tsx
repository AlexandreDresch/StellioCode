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
import { FilePenLineIcon, LoaderCircleIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { editDeveloperSchema } from "@/schemas/developer-schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetDeveloperById from "@/hooks/api/useGetDeveloperById";
import { useEffect } from "react";
import { DeveloperFormSkeleton } from "@/components/skeletons/developer-form-skeleton";
import useUpdateDeveloper from "@/hooks/api/useUpdateDeveloper";

export function EditDeveloperModal({ developerId }: { developerId: string }) {
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlhdCI6MTc0MDA5NjUyMSwiZXhwIjoxNzQwMTMyNTIxLCJyb2xlIjoiYWRtaW4ifQ.sP7zFAMNJMelqPlyVFE7CagdZbKFFU0iIoFaoO7DAn4";

  const { developer, getDeveloperById, getDeveloperLoading } =
    useGetDeveloperById();
  const { updateDeveloper, updateDeveloperLoading } = useUpdateDeveloper();

  useEffect(() => {
    getDeveloperById({ token, developerId });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const form = useForm<z.infer<typeof editDeveloperSchema>>({
    resolver: zodResolver(editDeveloperSchema),
    defaultValues: {
      name: "",
      phone: "",
      status: "pending",
      level: "junior",
      technologies: [],
    },
  });

  useEffect(() => {
    if (developer) {
      form.reset({
        name: developer.name || "",
        phone: developer.phone || "",
        status: developer.status || "",
        level: developer.level || "",
        technologies: developer.technologies || [],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [developer]);

  function onSubmit(values: z.infer<typeof editDeveloperSchema>) {
    updateDeveloper({
      token,
      developerId,
      data: {
        name: values.name,
        phone: values.phone,
        status: values.status,
        level: values.level,
      },
    });
  }

  return (
    <Dialog>
      <DialogTrigger className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
        <span>Editar</span>
        <FilePenLineIcon size={14} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editação de perfil</DialogTitle>
          <DialogDescription>
            Faça mudanças no perfil de {developer?.name} aqui. Clique em Salvar
            Alterações quando estiver pronto.
          </DialogDescription>
        </DialogHeader>
        {getDeveloperLoading ? (
          <DeveloperFormSkeleton />
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Doe"
                        {...field}
                        disabled={getDeveloperLoading || updateDeveloperLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="(11) 91234-5678"
                        {...field}
                        disabled={getDeveloperLoading || updateDeveloperLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex w-full gap-2">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={
                            getDeveloperLoading || updateDeveloperLoading
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pendente</SelectItem>
                            <SelectItem value="approved">Aprovado</SelectItem>
                            <SelectItem value="rejected">Rejeitado</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel>Nível</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={
                            getDeveloperLoading || updateDeveloperLoading
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o nível" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="junior">Júnior</SelectItem>
                            <SelectItem value="mid_level">Pleno</SelectItem>
                            <SelectItem value="senior">Sênior</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter>
                <Button
                  type="submit"
                  className="min-w-10"
                  disabled={getDeveloperLoading || updateDeveloperLoading}
                >
                  {updateDeveloperLoading ? (
                    <LoaderCircleIcon className="animate-spin" />
                  ) : (
                    <span>Salvar Alterações</span>
                  )}
                  
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
