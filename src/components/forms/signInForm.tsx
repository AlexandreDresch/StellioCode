import { useContext } from "react";
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

const formSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
});

export default function SignInForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { login, useLoginError } = useLogin();
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  const { setUserData } = userContext;

  function onSubmit(values: z.infer<typeof formSchema>) {
    login({
      data: {
        email: values.email,
        password: values.password,
      },
    })
      .then((response) => {
        // Receber e armazenar o token JWT no localStorage
        console.log(response);
        if (
          response &&
          response.status !== "pending" &&
          response.status !== "rejected"
        ) {
          setUserData(response);
          localStorage.setItem("userData", JSON.stringify(response));
          console.log(
            "Usuário salvo no localStorage:",
            localStorage.getItem("userData"),
          );
          // Redirecionar para o dashboard
          navigate("/dashboard");
        } else {
          toast.error("Usuário com pendência de aprovação ou recusado.");
        }
      })
      .catch(() => {
        console.error("Erro: ", useLoginError);
        toast.error("Erro ao autenticar. Verifique suas credenciais.");
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
                  <Input className="" {...field} />
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
                  <Input className="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="px-6">
            Entrar
          </Button>
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
