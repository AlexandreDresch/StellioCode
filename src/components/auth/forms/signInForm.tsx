import { useContext, useState } from "react";
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
import useLogin from "@/hooks/api/useLogin";
import { useNavigate } from "react-router-dom";
import UserContext from "@/context/user-context";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { loginSchema } from "@/schemas/auth-schemas";

export default function SignInForm() {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { login, useLoginError } = useLogin();
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  const { setUserData } = userContext;

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);
  const handleHomeNavigation = () => {
    navigate("/");
  };

  function onSubmit(values: z.infer<typeof loginSchema>) {
    login({
      data: {
        email: values.email,
        password: values.password,
      },
    })
      .then((response) => {
        if (
          response &&
          response.status !== "pending" &&
          response.status !== "rejected"
        ) {
          setUserData(response);
          localStorage.setItem("userData", JSON.stringify(response));
          navigate("/dashboard");
        } else {
          toast.error(
            "Seu cadastro ainda não foi aprovado pelos nossos administradores.",
          );
        }
      })
      .catch(() => {
        console.error("Erro: ", useLoginError);
        toast.error(
          "Erro ao entrar na sua conta. Por favor, verifique suas credenciais e tente novamente.",
        );
      });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="text-sm"
                    {...field}
                    placeholder="john@email.com"
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
                  <div className="relative">
                    <Input
                      className="text-sm"
                      {...field}
                      type={isVisible ? "text" : "password"}
                    />
                    <button
                      className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                      type="button"
                      onClick={toggleVisibility}
                      aria-label={
                        isVisible ? "Esconder senha" : "Mostrar senha"
                      }
                      aria-pressed={isVisible}
                      aria-controls="password"
                    >
                      {isVisible ? (
                        <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
                      ) : (
                        <Eye size={16} strokeWidth={2} aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full items-center justify-between">
            <Button
              variant={"outline"}
              className="px-6"
              type="button"
              onClick={handleHomeNavigation}
            >
              Voltar
            </Button>
            <Button type="submit" className="min-w-40 px-6">
              Entrar
            </Button>
          </div>
        </form>
      </Form>

      {/* Botão de esqueci a senha */}
      {/* <button
        onClick={() => setModalOpen(true)}
        className="mt-2 text-sm text-white hover:underline"
      >
        Esqueci minha senha
      </button>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="mb-2 text-lg font-bold">Redefinir Senha</h2>
        <p className="mb-4 text-xs text-gray-400">Digite seu endereço de e-mail para receber instruções sobre como redefinir sua senha.</p>
        <Input
          placeholder="Digite seu e-mail"
          className="mb-4  rounded-sm"
          onChange={(e) => form.setValue("email", e.target.value)}
        />
        <div className="flex justify-end">
          <Button
            onClick={() => handleResetPassword(form.getValues("email"))}
            className="bg-customPurple px-6 text-white mt-4 rounded-sm"
          >
            Redefinir Senha
          </Button>
        </div>
      </Modal> */}
    </>
  );
}
