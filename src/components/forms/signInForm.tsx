import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Modal from "../modal";

const formSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
});

export default function SignInForm() {
  const [isModalOpen, setModalOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  function handleResetPassword(email: string) {
    // Implmentar lógica de redefinição
    console.log(`Redefinir senha para: ${email}`);
    setModalOpen(false);
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
                    className="border-customPurple"
                    placeholder="shadcn"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    className="border-customPurple"
                    placeholder="shadcn"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-customPurple px-6 text-white">
            Sign In
          </Button>
        </form>
      </Form>
      <button
        onClick={() => setModalOpen(true)}
        className="mt-2 text-customPurple hover:underline"
      >
        Esqueci minha senha
      </button>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="mb-4 text-lg font-bold">Redefinir Senha</h2>
        <Input
          placeholder="Digite seu e-mail"
          className="mb-4 border-customPurple"
          onChange={(e) => form.setValue("email", e.target.value)}
        />
        <Button
          onClick={() => handleResetPassword(form.getValues("email"))}
          className="bg-customPurple px-6 text-white"
        >
          Redefinir Senha
        </Button>
      </Modal>
    </>
  );
}
