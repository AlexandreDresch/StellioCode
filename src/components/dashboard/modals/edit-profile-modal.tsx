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
import { LoaderCircleIcon, SettingsIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { editProfileSchema } from "@/schemas/developer-schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { DeveloperFormSkeleton } from "@/components/skeletons/developer-form-skeleton";
import useToken from "@/hooks/auth/use-token";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import useGetProfileData from "@/hooks/api/useGetProfileData";
import useUpdateProfile from "@/hooks/api/useUpdateProfile";
import { toast } from "sonner";

export function EditProfileModal({ developerId }: { developerId: string }) {
  const token = useToken();

  const { data, getProfileDataById, getProfileDataLoading } =
    useGetProfileData();

  const { updateProfile, updateProfileLoading, updateProfileError } =
    useUpdateProfile();

  useEffect(() => {
    getProfileDataById({ token, developerId });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const form = useForm<z.infer<typeof editProfileSchema>>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: "",
      phone: "",
      technologies: [],
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        name: data.name || "",
        phone: data.phone || "",
        technologies: data.technologies || [],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  function onSubmit(values: z.infer<typeof editProfileSchema>) {
    updateProfile({
      token,
      developerId,
      data: {
        name: values.name,
        phone: values.phone,
        technologies: values.technologies,
      },
    })
      .then(() => {
        toast.success("Perfil atualizado com sucesso!");
      })
      .catch(() => {
        console.error("Erro ao atualizar o perfil:", updateProfileError);
        toast.error("Erro ao atualizar perfil, tente novamente.");
      });
  }

  return (
    <Dialog>
      <DialogTrigger className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm outline-none transition-colors hover:bg-transparent hover:text-accent-foreground">
        <Badge variant="outline" className="bg-white">
          <SettingsIcon />
        </Badge>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editação de perfil</DialogTitle>
          <DialogDescription>
            Faça mudanças no seu perfil. Clique em Salvar Alterações quando
            estiver pronto.
          </DialogDescription>
        </DialogHeader>
        {getProfileDataLoading ? (
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
                        disabled={getProfileDataLoading || updateProfileLoading}
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
                        disabled={getProfileDataLoading || updateProfileLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="technologies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tecnologias</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        value={field.value.join("\n")}
                        onChange={(e) =>
                          field.onChange(e.target.value.split("\n"))
                        }
                        className="min-h-40"
                        placeholder="Adicione as tecnologias que domina, separadas por uma nova linha."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="submit"
                  className="min-w-10"
                  disabled={getProfileDataLoading || updateProfileLoading}
                >
                  {updateProfileLoading ? (
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
