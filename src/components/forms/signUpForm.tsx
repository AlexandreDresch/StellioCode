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
} from "@/components/ui/select";
import useRegister from "@/hooks/api/useRegister";

// Regex para validação de email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Regex para validação do Telefone
const phoneRegex = /^\(?\d{2}\)?\s?\d{1}?\d{4}[-\s]?\d{4}$/;

// Regex para validação da força da senha
const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

const formSchema = z.object({
  fullName: z.string().min(2, "O nome deve ter no mínimo 2 caracteres").max(50),
  email: z.string().regex(emailRegex, "Insira um email válido"),
  password: z
    .string()
    .regex(
      strongPasswordRegex,
      "A senha deve conter ao menos 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial.",
    ),
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

export const translateLevel = (level: "junior" | "mid_level" | "senior") => {
  const levelTranslations = {
    junior: "Júnior",
    mid_level: "Pleno",
    senior: "Sênior",
  };

  return levelTranslations[level] || "Selecione um nível";
};

export default function SignUpForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      phone: "",
      level: "junior", // Valor padrão
      technologies: [],
    },
    mode: "onChange", // Permite verificar a validade dos campos em tempo real
  });

  const { register } = useRegister();

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
      console.log("Enviando dados para API:", JSON.stringify(formattedData));

      register({ data: formattedData });
      console.log("Cadastro bem-sucedido!");
      alert("Cadastro realizado com sucesso!");
    } catch (error) {
      console.error("Erro no cadastro:", error);
      alert("Erro ao realizar cadastro!");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-x-4 gap-y-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome Completo</FormLabel>
                <FormControl>
                  <Input
                    className=""
                    placeholder="Ex: Alex Silva de Oliveira"
                    {...field}
                  />
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
                  <Input
                    className=""
                    placeholder="Ex: exemplo@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input className="" placeholder="Ex: 123456Aa*" {...field} />
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
                    className=""
                    placeholder="Ex: 11987654321"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                    <SelectTrigger>{translateLevel(field.value)}</SelectTrigger>
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
        <FormField
          control={form.control}
          name="technologies"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel>Tecnologias</FormLabel>
              <FormControl>
                <textarea
                  {...field}
                  value={field.value.join("\n")}
                  onChange={(e) => field.onChange(e.target.value.split("\n"))}
                  className="min-h-30"
                  placeholder="Adicione as tecnologias que domina, separadas por uma nova linha."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="px-6"
          disabled={
            !form.formState.isValid
          } /*Desabilita o botão Sign Up se o formulário não for válido*/
        >
          Cadastrar
        </Button>
      </form>
    </Form>
  );
}
