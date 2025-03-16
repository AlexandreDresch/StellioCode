"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";
import { DecodedGoogleToken } from "@/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import useGetAllPlans from "@/hooks/api/useGetAllPlans";
import useGetAllServices from "@/hooks/api/useGetAllServices";
import { InitialMeetingSchema } from "@/schemas/event-schemas";
import { Textarea } from "../ui/textarea";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { addDays, format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { ptBR } from "date-fns/locale";
import { BackgroundBeams } from "../background-beams";
import { useNavigate } from "react-router-dom";

type Inputs = z.infer<typeof InitialMeetingSchema>;

const steps = [
  {
    id: "Passo 1",
    name: "Informações Pessoais",
    fields: ["name", "email", "googleId", "profilePicture"],
  },
  {
    id: "Passo 2",
    name: "Sobre o Projeto",
    fields: ["planId", "serviceId", "title", "description", "phone"],
  },
  {
    id: "Passo 3",
    name: "Escolha de Horário",
    fields: ["date", "time"],
  },
  { id: "Passo 4", name: "Finalizado 🎉" },
];

export default function InitialMeetingForm() {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;

  const { getPlans, plans } = useGetAllPlans();
  const { getAllServices, services } = useGetAllServices();

  const navigate = useNavigate();

  useEffect(() => {
    getPlans();
    getAllServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const form = useForm<Inputs>({
    resolver: zodResolver(InitialMeetingSchema),
  });

  const processForm: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    form.reset();
  };

  type FieldName = keyof Inputs;

  const next = async () => {
    if (currentStep === 0) {
      const requiredFields = ["name", "email", "profilePicture", "googleId"];
      const hasAllFields = requiredFields.every((field) =>
        form.getValues(field as FieldName),
      );

      if (!hasAllFields) {
        toast.error("Por favor, faça login com o Google para continuar.");
        return;
      }

      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
      return;
    }

    const fields = steps[currentStep].fields;
    const output = await form.trigger(fields as FieldName[], {
      shouldFocus: true,
    });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        await form.handleSubmit(processForm)();
      }
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  const responseMessage = (credentialResponse: CredentialResponse) => {
    try {
      if (credentialResponse.credential) {
        const decoded = jwtDecode<DecodedGoogleToken>(
          credentialResponse.credential,
        );

        form.setValue("name", decoded.name || "");
        form.setValue("email", decoded.email || "");
        form.setValue("profilePicture", decoded.picture || "");
        form.setValue("googleId", decoded.sub || "");

        toast.success("Login com Google realizado com sucesso!");

        next();
      } else {
        toast.error("Erro: Credential não encontrada.");
      }
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
      toast.error("Erro ao decodificar o token.");
    }
  };

  const errorMessage = () => {
    toast.error("Erro ao fazer login, tente novamente.");
  };

  function handleFollowUpNavigation(id: string) {
    navigate(`/acompanhamento/${id}`);
  }

  return (
    <section className="absolute inset-0 mx-auto flex max-w-7xl flex-col justify-between p-24">
      <nav aria-label="Progress">
        <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
          {steps.map((step, index) => (
            <li key={step.name} className="md:flex-1">
              {currentStep > index ? (
                <div className="group flex w-full flex-col border-l-4 border-sky-300 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-sky-400 transition-colors">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : currentStep === index ? (
                <div
                  className="flex w-full flex-col border-l-4 border-sky-300 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                  aria-current="step"
                >
                  <span className="text-sm font-medium text-sky-400">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : (
                <div className="group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-gray-500 transition-colors">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <Form {...form}>
        <form className="py-12" onSubmit={form.handleSubmit(processForm)}>
          {currentStep === 0 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Entre com o Google
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Para que possamos preencher suas informações pessoais
              </p>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <GoogleLogin
                  onSuccess={responseMessage}
                  onError={errorMessage}
                  size="medium"
                  width={208}
                />
              </div>
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Seu Projeto
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Algumas informações iniciais. Não se preocupe, podemos mudar
                depois.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="col-span-full">
                      <FormLabel>Título</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Ex. Lojinha Virtual" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="col-span-full">
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Uma breve descrição do seu projeto..."
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
                    <FormItem className="col-span-full">
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="+55 (11) 99999-9999" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="planId"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-3">
                      <FormLabel>Plano</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um plano" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {plans &&
                            plans.map((plan) => (
                              <SelectItem key={plan.id} value={plan.id}>
                                {plan.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="serviceId"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-3">
                      <FormLabel>Serviço</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um serviço" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {services &&
                            services.map((service) => (
                              <SelectItem key={service.id} value={service.id}>
                                {service.title}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Escolha de Horário
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Selecione uma data e horário para a reunião.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Dia da Reunião</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2" />
                            {field.value ? (
                              format(field.value.toString(), "PPP", {
                                locale: ptBR,
                              })
                            ) : (
                              <span>Selecione um dia</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="flex w-full flex-col space-y-2 p-2">
                          <Select
                            onValueChange={(value) => {
                              const newDate =
                                value === "today"
                                  ? new Date()
                                  : value === "tomorrow"
                                    ? addDays(new Date(), 1)
                                    : value === "in_3_days"
                                      ? addDays(new Date(), 3)
                                      : value === "in_7_days"
                                        ? addDays(new Date(), 7)
                                        : null;
                              if (newDate) {
                                field.onChange(newDate);
                              }
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Atalhos" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                              <SelectItem value="today">Hoje</SelectItem>
                              <SelectItem value="tomorrow">Amanhã</SelectItem>
                              <SelectItem value="in_3_days">
                                Em 3 dias
                              </SelectItem>
                              <SelectItem value="in_7_days">
                                Em uma semana
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <div className="rounded-md border">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                              locale={ptBR}
                            />
                          </div>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Hora da Reunião</FormLabel>
                      <Input aria-label="Time" type="time" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <BackgroundBeams>
                <div className="flex w-full items-center justify-between px-10">
                  <div>
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                      Reunião agendada
                    </h2>
                    <p className="mt-1 max-w-xs text-sm leading-6 text-gray-600">
                      Obrigado por enviar suas informações! Você já pode acessar
                      a página de acompanhamento do seu projeto.
                    </p>
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => {
                      handleFollowUpNavigation("1");
                    }}
                  >
                    Acompanhar Projeto
                  </Button>
                </div>
              </BackgroundBeams>
            </motion.div>
          )}
        </form>
      </Form>

      {currentStep !== steps.length - 1 && (
        <div className="pt-5">
          <div className="flex justify-between">
            <Button
              type="button"
              onClick={prev}
              disabled={currentStep === 0}
              variant="outline"
            >
              Anterior
            </Button>
            <Button
              type="button"
              onClick={next}
              disabled={currentStep === steps.length - 1}
              variant="outline"
            >
              {currentStep === steps.length - 2 ? "Enviar" : "Próximo"}
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
