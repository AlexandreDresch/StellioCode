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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import useToken from "@/hooks/auth/use-token";
import { addPlanSchema } from "@/schemas/plans-schemas";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import useCreatePlan from "@/hooks/api/useCreatePlan";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function AddPlanModal({ isDisabled }: { isDisabled: boolean }) {
  const form = useForm<z.infer<typeof addPlanSchema>>({
    resolver: zodResolver(addPlanSchema),
    defaultValues: {
      name: "",
      price: 0,
      yearlyPrice: 0,
      period: "",
      features: [],
      description: "",
      popular: false,
    },
  });

  const token = useToken();
  const { addPlan, createPlanError, createPlanLoading } = useCreatePlan();

  function onSubmit(values: z.infer<typeof addPlanSchema>) {
    addPlan({
      token,
      data: {
        name: values.name.toUpperCase(),
        description: values.description,
        price: values.price,
        yearlyPrice: values.yearlyPrice,
        features: values.features,
        popular: values.popular,
        period: values.period,
      },
    })
      .then(() => {
        toast.success("Plano criado com sucesso!");
      })
      .catch(() => {
        console.error("Erro ao criar plano:", createPlanError);
        toast.error("Erro ao criar plano, tente novamente.");
      });
  }

  return (
    <Dialog>
      <DialogTrigger
        className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:text-slate-500/50"
        disabled={isDisabled}
      >
        <span>Adicionar Plano</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Plano</DialogTitle>
          <DialogDescription>
            Preencha as informações necessárias. Clique em Criar Plano quando
            estiver pronto.
          </DialogDescription>
        </DialogHeader>

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
                      <Input {...field} placeholder="Assinatura mensal -20%" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="period"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>Período</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={createPlanLoading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o período" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="por mês">Por Mês</SelectItem>
                      </SelectContent>
                    </Select>
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
                disabled={createPlanLoading}
              >
                {createPlanLoading ? (
                  <LoaderCircleIcon className="animate-spin" />
                ) : (
                  <span>Criar Plano</span>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
