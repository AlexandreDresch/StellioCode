import { MovingBorderButton } from "@/components/moving-border-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, LoaderCircleIcon, Wallet } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  InnerDialog,
  InnerDialogTrigger,
  InnerDialogContent,
  InnerDialogHeader,
  InnerDialogFooter,
  InnerDialogTitle,
  InnerDialogDescription,
} from "@/components/nested-dialog";
import { useState } from "react";
import useCheckoutForProject from "@/hooks/api/useCheckoutForProject";
import { toast } from "sonner";

export interface PaymentModalProps {
  project: {
    name: string;
    id: string;
    paymentId: string;
    price: string;
  };
  plan: {
    name: string;
    price: string;
    id: string;
    period: string;
  };
}

export function PaymentModal({ project, plan }: PaymentModalProps) {
  const [selectedPaymentCategory, setSelectedPaymentCategory] =
    useState("project");

  const {
    createProjectPaymentLoading,
    createProjectPayment,
  } = useCheckoutForProject();

  function handleCreateProjectPayment() {
    createProjectPayment({
      paymentId: project.paymentId,
      projectId: project.id,
    })
    .then((url) => {
        if (url) {
            toast.success("Redirecionando para o checkout...");
            window.location.href = url;
        } else {
            toast.error("URL de pagamento não disponível.");
        }
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <MovingBorderButton
          borderRadius="1rem"
          className="border-neutral-200 bg-white text-black dark:border-slate-800 dark:bg-slate-900 dark:text-white"
        >
          Realizar Pagamento
        </MovingBorderButton>
      </DialogTrigger>
      <DialogContent className="p-0">
        <DialogHeader className="border-b p-4">
          <DialogTitle>Pagamento</DialogTitle>
          <DialogDescription>
            Aqui você pode efetuar o pagamento do seu projeto e do plano
            escolhido. Após pagos, você terá acesso à timeline do seu projeto.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-col">
            <Label className="mb-1.5 text-xs text-muted-foreground">
              {selectedPaymentCategory === "project" ? "Projeto" : "Plano"}
            </Label>
            <div className="relative">
              <Input
                disabled
                value={
                  selectedPaymentCategory === "project"
                    ? project.name
                    : plan.name
                }
              />
            </div>
          </div>
          <div className="flex flex-col">
            <Label className="mb-1.5 text-xs text-muted-foreground">
              Valor
            </Label>
            <div className="relative">
              <Input
                disabled
                value={
                  selectedPaymentCategory === "project"
                    ? project.price
                    : `${plan.price} ${plan.period}`
                }
              />
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col items-center justify-between space-y-2 border-t px-4 py-2 sm:flex-row sm:space-y-0">
          <InnerDialog>
            <InnerDialogTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                Opções de Pagamento
              </Button>
            </InnerDialogTrigger>
            <InnerDialogContent className="-mt-6 p-0 sm:-mt-1">
              <InnerDialogHeader className="border-b p-4">
                <InnerDialogTitle>Escolha o que deseja pagar</InnerDialogTitle>
                <InnerDialogDescription>
                  Pague seu projeto, ou seu plano.
                </InnerDialogDescription>
              </InnerDialogHeader>

              <div className="flex flex-col gap-4 p-4">
                <RadioGroup
                  value={selectedPaymentCategory}
                  onValueChange={setSelectedPaymentCategory}
                >
                  <div
                    className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 hover:bg-accent ${
                      selectedPaymentCategory === "project" ? "bg-accent" : ""
                    }`}
                    onClick={() => setSelectedPaymentCategory("project")}
                  >
                    <div className="flex items-center space-x-4">
                      <Wallet className="h-5 w-5" />
                      <div>
                        <h3 className="text-sm font-medium">Projeto</h3>
                        <p className="text-sm text-muted-foreground">
                          {project.price}
                        </p>
                      </div>
                    </div>
                    <RadioGroupItem value="project" id="project" />
                  </div>
                  <div
                    className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 hover:bg-accent ${
                      selectedPaymentCategory === "plan" ? "bg-accent" : ""
                    }`}
                    onClick={() => setSelectedPaymentCategory("plan")}
                  >
                    <div className="flex items-center space-x-4">
                      <CreditCard className="h-5 w-5" />
                      <div>
                        <h3 className="text-sm font-medium">
                          Plano {plan.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {plan.price} / {plan.period}
                        </p>
                      </div>
                    </div>
                    <RadioGroupItem value="plan" id="plan" />
                  </div>
                </RadioGroup>
              </div>

              <InnerDialogFooter className="flex flex-col items-center justify-between space-y-2 border-t px-4 py-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                <DialogClose asChild>
                  <Button variant="outline" className="w-full sm:w-auto">
                    Voltar
                  </Button>
                </DialogClose>
              </InnerDialogFooter>
            </InnerDialogContent>
          </InnerDialog>
          <div className="flex w-full flex-col items-center gap-2 sm:w-auto sm:flex-row">
            <DialogClose asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                Cancelar
              </Button>
            </DialogClose>

            <Button
              className="w-full sm:w-auto"
              onClick={
                selectedPaymentCategory === "project"
                  ? handleCreateProjectPayment
                  : handleCreateProjectPayment
              }
              disabled={createProjectPaymentLoading}
            >
              {createProjectPaymentLoading ? (
                <LoaderCircleIcon className="animate-spin" />
              ) : (
                <span>
                  Pagar{" "}
                  {selectedPaymentCategory === "project" ? "Projeto" : "Plano"}
                </span>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
