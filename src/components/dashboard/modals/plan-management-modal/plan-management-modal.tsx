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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PricingPlan } from "@/types";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import useToken from "@/hooks/auth/use-token";
import PlanDetails from "./plan-details";
import { editPlanSchema } from "@/schemas/plans-schemas";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import useUpdatePlan from "@/hooks/api/useUpdatePlan";
import { toast } from "sonner";

export function PlanManagementModal({ plan }: { plan: PricingPlan }) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const form = useForm<z.infer<typeof editPlanSchema>>({
    resolver: zodResolver(editPlanSchema),
    defaultValues: {
      name: plan.name,
      price: +plan.price,
      yearlyPrice: +plan.yearlyPrice,
      features: plan.features,
      description: plan.description,
      popular: plan.popular,
    },
  });

  const token = useToken();
  const { updatePlan, updatedPlan, updatePlanError, updatePlanLoading } =
    useUpdatePlan();

  function onSubmit(values: z.infer<typeof editPlanSchema>) {
    updatePlan({
      token,
      planId: plan.id,
      data: {
        name: values.name,
        description: values.description,
        price: values.price,
        yearlyPrice: values.yearlyPrice,
        features: values.features,
        popular: values.popular,
        period: plan.period,
      },
    })
      .then(() => {
        toast.success("Plano atualizado com sucesso!");
        setIsEditOpen(false);
      })
      .catch(() => {
        console.error("Erro ao atualizar o plano:", updatePlanError);
        toast.error("Erro ao atualizar plano, tente novamente.");
      });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "group relative w-full gap-2 overflow-hidden text-lg font-semibold tracking-tighter",
            "transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-[#F76680]",
            plan.popular
              ? "bg-gradient-to-bl from-[#F76680] via-[#9D2C7D] to-[#57007B] text-primary-foreground hover:text-primary-foreground"
              : "bg-background text-foreground",
          )}
        >
          <span>Editar Plano</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editando plano {plan.name}</DialogTitle>
          <DialogDescription>
            Faça alterações no plano. Clique em Salvar Alterações quando estiver
            pronto.
          </DialogDescription>
        </DialogHeader>

        {isEditOpen ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Nome do plano." />
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
                      <FormLabel>Preço Mensal</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Assinatura mensal." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="yearlyPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preço Anual</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Assinatura mensal -20%"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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

              <FormField
                control={form.control}
                name="features"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Features</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        value={field.value.join("\n")}
                        onChange={(e) =>
                          field.onChange(e.target.value.split("\n"))
                        }
                        className="min-h-40"
                        placeholder="Adicione as features do plano, separadas por uma nova linha."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="popular"
                render={({ field }) => (
                  <FormItem>
                    <FormControl className="flex">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Tornar Popular</FormLabel>
                      <FormDescription>
                        Fazendo isso esse plano ficará em destaque entre os
                        demais.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="submit"
                  className="min-w-36"
                  disabled={updatePlanLoading}
                >
                  {updatePlanLoading ? (
                    <LoaderCircleIcon className="animate-spin" />
                  ) : (
                    <span>Salvar Alterações</span>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        ) : (
          <>
            <PlanDetails plan={updatedPlan ? updatedPlan : plan} />

            <div className="grid w-full gap-1.5">
              <Label htmlFor="message">Descrição do Plano</Label>
              <Textarea
                value={updatedPlan ? updatedPlan.description : plan.description}
                readOnly
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
