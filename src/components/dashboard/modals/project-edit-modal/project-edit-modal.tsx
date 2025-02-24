import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { LoaderCircleIcon, PenIcon, PenOffIcon } from "lucide-react";
import useGetProjectByIdAdmin from "@/hooks/api/useGetProjectByIdAdmin";
import { useEffect, useState } from "react";
import ProjectDetails from "./project-details";
import { Project } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { editProjectSchema } from "@/schemas/project-schemas";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import useGetAllPlans from "@/hooks/api/useGetAllPlans";
import useGetAllServices from "@/hooks/api/useGetAllServices";
import useUpdateProject from "@/hooks/api/useUpdateProject";

export default function ProjectEditModal({ projectId }: { projectId: string }) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlhdCI6MTc0MDMzMDQ1MywiZXhwIjoxNzQwMzY2NDUzLCJyb2xlIjoiYWRtaW4ifQ.1xvZSLFisql3DHHLaWCCDMOwVOAmIVFDamjjFBoZOEM";

  const { getProjectByIdAdmin, getProjectLoading, project } =
    useGetProjectByIdAdmin();

  const { getPlans, plans, getPlansLoading } = useGetAllPlans();
  const { getAllServices, services, getServicesLoading } = useGetAllServices();
  const { updateProject, updateProjectLoading } = useUpdateProject();

  const form = useForm<z.infer<typeof editProjectSchema>>({
    resolver: zodResolver(editProjectSchema),
  });

  useEffect(() => {
    if (project && plans && services) {
      form.reset({
        title: project.title,
        description: project.description,
        status: project.status.toLowerCase(),
        price: project.price,
        planName: project.planName,
        serviceName: project.serviceName,
      });
    }
  }, [project, plans, services, form]);

  useEffect(() => {
    getProjectByIdAdmin({ token, projectId });
    getAllServices();
    getPlans();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onSubmit(values: z.infer<typeof editProjectSchema>) {
    const planId = plans?.find((plan) => plan.name === values.planName)?.id;
    const serviceId = services?.find(
      (service) => service.title === values.serviceName,
    )?.id;
    updateProject({
      token,
      projectId,
      data: {
        title: values.title,
        description: values.description,
        status: values.status.toUpperCase(),
        price: values.price,
        planId,
        serviceId,
      },
    });

    getProjectByIdAdmin({ token, projectId });
    setIsEditOpen(false);
  }

  return (
    <Dialog>
      <DialogTrigger className="w-full rounded-sm px-2 py-1.5 text-left text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
        Gerenciar Projeto
      </DialogTrigger>

      {getProjectLoading || getPlansLoading || getServicesLoading ? (
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              <Skeleton className="h-6 w-3/4" />
            </DialogTitle>
            <Skeleton className="h-4 w-full" />
          </DialogHeader>

          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" className="w-1/5" disabled>
              <Skeleton className="h-4 w-full" />
            </Button>
          </div>
        </DialogContent>
      ) : (
        <DialogContent className="w-full sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Projeto {project?.title}</DialogTitle>
            <DialogDescription>
              Faça alterações em Abrir/Fechar Edição. Clique em Salvar
              Alterações quando estiver pronto.
            </DialogDescription>
          </DialogHeader>

          <ProjectDetails
            client={project?.clientName}
            plan={project?.planName}
            service={project?.serviceName}
            status={project?.status.toLowerCase() as Project["status"]}
          />

          {!isEditOpen && (
            <div className="grid w-full gap-1.5">
              <Label htmlFor="message">Descrição do Projeto</Label>
              <Textarea value={project?.description} readOnly />
            </div>
          )}

          {isEditOpen && (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Nome do Projeto</FormLabel>
                      <Input
                        type="text"
                        {...field}
                        placeholder="Ex. Landing Page John Doe"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Descrição do Projeto</FormLabel>
                      <Textarea
                        {...field}
                        className="resize-none"
                        placeholder="Ex. Landing Page com x, y, z..."
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Preço do Projeto</FormLabel>
                      <Input type="number" {...field} placeholder="Ex. 1500" />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione o Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pendente</SelectItem>
                            <SelectItem value="in_progress">
                              Em progresso
                            </SelectItem>
                            <SelectItem value="completed">
                              Finalizado
                            </SelectItem>
                            <SelectItem value="cancelled">Cancelado</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-between gap-2">
                  <FormField
                    control={form.control}
                    name="planName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Plano</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o Plano" />
                            </SelectTrigger>
                            <SelectContent>
                              {plans &&
                                plans.map((plan) => (
                                  <SelectItem key={plan.id} value={plan.name}>
                                    {plan.name}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="serviceName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Serviço</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o Serviço" />
                            </SelectTrigger>
                            <SelectContent>
                              {services &&
                                services.map((service) => (
                                  <SelectItem
                                    key={service.id}
                                    value={service.title}
                                  >
                                    {service.title}
                                  </SelectItem>
                                ))}
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
                    className="min-w-36"
                    disabled={updateProjectLoading}
                  >
                    {updateProjectLoading ? (
                      <LoaderCircleIcon className="animate-spin" />
                    ) : (
                      <span>Salvar Alterações</span>
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          )}

          <Button onClick={() => setIsEditOpen(!isEditOpen)} variant="ghost">
            <span>{isEditOpen ? "Fechar" : "Abrir"} Edição</span>
            {isEditOpen ? <PenOffIcon size={10} /> : <PenIcon size={10} />}
          </Button>
        </DialogContent>
      )}
    </Dialog>
  );
}
