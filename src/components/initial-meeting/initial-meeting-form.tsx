"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { z } from "zod";
import { type CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";
import type { DecodedGoogleToken } from "@/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { addDays, format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { ptBR } from "date-fns/locale";
import useGetAllPlans from "@/hooks/api/useGetAllPlans";
import useGetAllServices from "@/hooks/api/useGetAllServices";
import useCreateInitialMeeting from "@/hooks/api/useCreateInitialMeeting";
import { useNavigate } from "react-router-dom";
import { InitialMeetingSchema } from "@/schemas/event-schemas";
import { steps } from "@/constants/initial-meeting";
import SuccessAnimation from "./success-animation";
import UserContext from "@/context/user-context";
import { ShimmerText } from "../shimmer-text";

type Inputs = z.infer<typeof InitialMeetingSchema>;

export default function InitialMeetingForm() {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;

  const { getPlans, plans } = useGetAllPlans();
  const { getAllServices, services } = useGetAllServices();
  const { meeting, createInitialMeeting, createInitialMeetingLoading } =
    useCreateInitialMeeting();

  const navigate = useNavigate();

  const userContext = useContext(UserContext);
  const prevMeetingId = useRef<string>();

  useEffect(() => {
    getPlans();
    getAllServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const form = useForm<Inputs>({
    resolver: zodResolver(InitialMeetingSchema),
    defaultValues: {
      name: "",
      email: "",
      profilePicture: "",
      googleId: "",
      planId: "",
      serviceId: "",
      title: "",
      description: "",
      phone: "",
      date: undefined,
      time: "",
    },
  });

  useEffect(() => {
    if (meeting?.clientId && meeting.clientId !== prevMeetingId.current) {
      prevMeetingId.current = meeting.clientId;

      const userData = {
        id: meeting.clientGoogleId,
        fullName: meeting.clientName,
        role: "client",
      };
      userContext.setUserData(userData);
    }
  }, [meeting, userContext]);

  const processForm: SubmitHandler<Inputs> = async (data) => {
    try {
      const selectedService = services?.find(
        (service) => service.id === data.serviceId,
      );
      const servicePrice = selectedService?.price || 0;

      const meetingDate = new Date(data.date);
      const [hours, minutes] = data.time.split(":").map(Number);
      meetingDate.setHours(hours, minutes);

      const meetingData = {
        googleId: data.googleId,
        email: data.email,
        name: data.name,
        profilePicture: data.profilePicture,
        planId: data.planId,
        serviceId: data.serviceId,
        title: data.title,
        description: data.description,
        phone: data.phone,
        price: servicePrice,
        meetingDate: meetingDate.toISOString(),
      };

      await createInitialMeeting({ data: meetingData });
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Ocorreu um erro ao agendar a reunião. Tente novamente.");
      throw error;
    }
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
        try {
          await processForm(form.getValues());
        } catch (error) {
          console.error("Error in form submission:", error);
        }
      } else {
        setPreviousStep(currentStep);
        setCurrentStep((step) => step + 1);
      }
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
    <div className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 md:pb-16 lg:px-8">
      <nav aria-label="Progress" className="mb-6 md:mb-8">
        <ol className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.name} className="min-w-[80px] flex-1">
              {currentStep > index ? (
                <div className="group flex flex-col items-center border-t-4 border-sky-300 py-2 transition-colors">
                  <span className="text-xs font-medium text-sky-400 sm:text-sm">
                    {step.id}
                  </span>
                  <span className="text-center text-xs font-medium sm:text-sm">
                    {step.name}
                  </span>
                </div>
              ) : currentStep === index ? (
                <div
                  className="flex flex-col items-center border-t-4 border-sky-300 py-2"
                  aria-current="step"
                >
                  <span className="text-xs font-medium text-sky-400 sm:text-sm">
                    {step.id}
                  </span>
                  <span className="text-center text-xs font-medium sm:text-sm">
                    {step.name}
                  </span>
                </div>
              ) : (
                <div className="group flex flex-col items-center border-t-4 border-gray-200 py-2 transition-colors">
                  <span className="text-xs font-medium text-gray-500 sm:text-sm">
                    {step.id}
                  </span>
                  <span className="text-center text-xs font-medium sm:text-sm">
                    {step.name}
                  </span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <div className="mx-auto max-w-7xl">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(processForm)}
            className="space-y-6 md:space-y-8"
          >
            {currentStep === 0 && (
              <motion.div
                initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="space-y-4 md:space-y-5"
              >
                <h2 className="text-lg font-semibold leading-7 text-gray-900 sm:text-xl">
                  Entre com o Google
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Para que possamos preencher suas informações pessoais
                </p>
                <div className="mt-4 flex md:mt-6">
                  <GoogleLogin
                    onSuccess={responseMessage}
                    onError={errorMessage}
                    size="medium"
                    width={208}
                    useOneTap
                  />
                </div>
              </motion.div>
            )}

            {currentStep === 1 && (
              <motion.div
                initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="space-y-4 md:space-y-6"
              >
                <h2 className="text-lg font-semibold leading-7 text-gray-900 sm:text-xl">
                  Seu Projeto
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Algumas informações iniciais. Não se preocupe, podemos mudar
                  depois.
                </p>

                <div className="grid grid-cols-1 gap-4 md:gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
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
                      <FormItem>
                        <FormLabel>Descrição</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Uma breve descrição do seu projeto..."
                            className="min-h-[100px] md:min-h-[120px]"
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
                          <Input {...field} placeholder="+55 (11) 99999-9999" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
                    <FormField
                      control={form.control}
                      name="planId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Plano</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value || ""}
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
                        <FormItem>
                          <FormLabel>Serviço</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value || ""}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione um serviço" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {services &&
                                services.map((service) => (
                                  <SelectItem
                                    key={service.id}
                                    value={service.id}
                                  >
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
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="space-y-4 md:space-y-6"
              >
                <h2 className="text-lg font-semibold leading-7 text-gray-900 sm:text-xl">
                  Escolha de Horário
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Selecione uma data e horário para a reunião.
                </p>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
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
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? (
                                format(field.value.toString(), "PPP", {
                                  locale: ptBR,
                                })
                              ) : (
                                <span>Selecione um dia</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="flex w-full flex-col space-y-2 p-2"
                            align="start"
                          >
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
                                className="w-full"
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
                        <FormControl>
                          <Input type="time" {...field} className="h-9" />
                        </FormControl>
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
                className="w-full space-y-10 rounded-xl border-2 border-dashed border-border bg-background p-14 py-6 text-center transition duration-500 hover:border-border/80 hover:bg-muted/50 hover:duration-200 md:py-8"
              >
                <div className="flex h-32 w-full justify-center">
                  <SuccessAnimation />
                </div>
                <h2 className="mb-4 text-xl font-semibold text-gray-900 md:text-2xl">
                  Reunião agendada com sucesso!
                </h2>
                <p className="mb-6 text-sm text-gray-600 md:text-base">
                  Obrigado por enviar suas informações! Você já pode acessar a
                  página de acompanhamento do seu projeto.
                </p>
                {meeting?.projectId && (
                  <Button
                    variant={"outline"}
                    onClick={() => handleFollowUpNavigation(meeting.projectId)}
                    className="group relative inline-flex w-full overflow-hidden rounded-md p-[2px] hover:bg-white sm:w-auto"
                  >
                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center px-8 py-3 text-sm font-medium backdrop-blur-3xl transition-all duration-300">
                      <span className="relative">Acompanhar Projeto</span>

                      <svg
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                      >
                        <path
                          d="M13 5l7 7-7 7M5 5l7 7-7 7"
                          stroke-width="2"
                          stroke-linejoin="round"
                          stroke-linecap="round"
                        ></path>
                      </svg>
                    </span>
                  </Button>
                )}
              </motion.div>
            )}

            {currentStep !== steps.length - 1 && (
              <div className="flex flex-col justify-between gap-3 pt-6 sm:flex-row md:pt-8">
                <Button
                  type="button"
                  onClick={prev}
                  disabled={currentStep === 0}
                  variant="outline"
                  className="order-2 w-full sm:order-1 sm:w-auto"
                >
                  Anterior
                </Button>
                {currentStep === steps.length - 2 ? (
                  <Button
                    type="button"
                    variant={
                      createInitialMeetingLoading ? "outline" : "default"
                    }
                    disabled={createInitialMeetingLoading}
                    onClick={async () => {
                      const fields = steps[currentStep].fields;
                      const isValid = await form.trigger(
                        fields as FieldName[],
                        {
                          shouldFocus: true,
                        },
                      );

                      if (isValid) {
                        await processForm(form.getValues());
                      }
                    }}
                    className="order-1 w-full sm:order-2 sm:w-auto"
                  >
                    {createInitialMeetingLoading ? (
                      <ShimmerText
                        duration={1.4}
                        className="text-sm [--base-color:theme(colors.slate.600)] [--base-gradient-color:theme(colors.slate.200)] dark:[--base-color:theme(colors.slate.700)] dark:[--base-gradient-color:theme(colors.slate.400)]"
                      >
                        Agendando...
                      </ShimmerText>
                    ) : (
                      "Agendar"
                    )}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={next}
                    disabled={currentStep === steps.length - 1}
                    className="order-1 w-full sm:order-2 sm:w-auto"
                  >
                    Próximo
                  </Button>
                )}
              </div>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}
