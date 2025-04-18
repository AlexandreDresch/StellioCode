import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useRegister from "@/hooks/api/useRegister";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  User,
  Lock,
  Code,
} from "lucide-react";
import { PasswordCheckInput } from "../password-check-input";
import { translateDeveloperLevel } from "@/lib/utils";
import { TagsSelector } from "../tags-selector";
import { technologyTags } from "@/constants/general";
import { Tag } from "@/types";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\(?\d{2}\)?\s?\d{1}?\d{4}[-\s]?\d{4}$/;
const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

const formSchema = z.object({
  fullName: z.string().min(2, "O nome deve ter no mínimo 2 caracteres").max(50),
  email: z.string().regex(emailRegex, "Insira um email válido"),
  password: z.string().regex(strongPasswordRegex),
  phone: z
    .string()
    .regex(
      phoneRegex,
      "Número de telefone inválido. Deve seguir o formato brasileiro, como (11) 91234-5678",
    ),
  level: z.enum(["junior", "mid_level", "senior"]),
  technologies: z
    .array(
      z
        .string()
        .min(1, "O nome da tecnologia deve ter pelo menos 1 caractere."),
    )
    .nonempty("É necessário incluir pelo menos uma tecnologia."),
});

export default function SignUpForm() {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      phone: "",
      level: "junior",
      technologies: [],
    },
    mode: "onChange",
  });

  const { register } = useRegister();

  const steps = [
    {
      title: "Informações Pessoais",
      icon: <User className="h-5 w-5" />,
      fields: ["fullName", "email"],
    },
    {
      title: "Segurança e Contato",
      icon: <Lock className="h-5 w-5" />,
      fields: ["password", "phone"],
    },
    {
      title: "Experiência Profissional",
      icon: <Code className="h-5 w-5" />,
      fields: ["level", "technologies"],
    },
  ];

  const currentStepFields = steps[step - 1].fields;

  const validateCurrentStep = () => {
    let isValid = true;

    for (const field of currentStepFields) {
      const fieldState = form.getFieldState(
        field as keyof z.infer<typeof formSchema>,
      );
      if (fieldState.invalid) {
        isValid = false;
        break;
      }

      const fieldValue = form.getValues(
        field as keyof z.infer<typeof formSchema>,
      );
      if (
        !fieldValue ||
        (Array.isArray(fieldValue) && fieldValue.length === 0)
      ) {
        isValid = false;
        break;
      }
    }

    return isValid;
  };

  const goToNextStep = () => {
    if (step < totalSteps) {
      form.trigger(currentStepFields as (keyof z.infer<typeof formSchema>)[]);

      if (validateCurrentStep()) {
        setStep(step + 1);
      }
    }
  };

  const goToPreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formattedData = {
        fullName: values.fullName,
        email: values.email,
        password: values.password,
        phone: values.phone,
        role: "DEVELOPER",
        level: values.level,
        technologies: values.technologies,
      };

      register({ data: formattedData });
      alert("Cadastro realizado com sucesso!");
      form.reset();
      setStep(1);
    } catch (error) {
      console.error("Erro no cadastro:", error);
      alert("Erro ao realizar cadastro!");
    }
  }

  return (
    <Card className="mx-auto w-full max-w-md border-none shadow-none">
      <CardHeader>
        <CardTitle className="mb-3 text-center font-medium">
          {steps[step - 1].title}
        </CardTitle>
        <div className="mt-4 flex items-center justify-between">
          {steps.map((s, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full`}
              >
                {step > index + 1 ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  s.icon
                )}
              </div>
              <div
                className={`mt-1 text-xs ${step === index + 1 ? "font-medium" : "text-gray-500"}`}
              >
                Etapa {index + 1}
              </div>
            </div>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 && (
              <>
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome Completo</FormLabel>
                      <FormControl>
                        <Input placeholder="João da Silva" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="exemplo@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {step === 2 && (
              <>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <PasswordCheckInput
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e);
                          }}
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
                        <Input placeholder="Ex: (11) 98765-4321" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {step === 3 && (
              <>
                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nível</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue
                              placeholder={translateDeveloperLevel(field.value)}
                            />
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

                <FormField
                  control={form.control}
                  name="technologies"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel>Tecnologias</FormLabel>
                      <FormControl>
                        <TagsSelector
                          tags={technologyTags}
                          selectedTags={field.value as unknown as Tag[]}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={goToPreviousStep}
          disabled={step === 1}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Anterior
        </Button>

        {step < totalSteps ? (
          <Button onClick={goToNextStep} disabled={!validateCurrentStep()}>
            Próximo <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={!form.formState.isValid}
          >
            Cadastrar
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
