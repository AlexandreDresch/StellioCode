import SignInForm from "@/components/forms/signInForm";
import SignUpForm from "@/components/forms/signUpForm";
import { IconCloud } from "@/components/iconCloud";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { technologySlugs } from "@/constants/geral";

export default function Login() {
  return (
    <div className="mx-10 flex h-auto min-h-screen flex-col items-center justify-center md:flex-row">
      <div className="hidden items-center justify-center md:flex md:w-1/2">
        <IconCloud iconSlugs={technologySlugs} />
      </div>

      <div className="flex w-full items-center justify-center md:w-1/2">
        <Tabs
          defaultValue="login"
          className="w-full max-w-md rounded-lg border border-gray-300 p-4"
        >
          <img
            src="logo.png"
            alt="StellioCode Logo"
            className="mx-auto mb-4 w-20"
          />

          <div className="flex justify-center">
            <TabsList className="mb-4 flex w-full max-w-xs justify-center">
              <TabsTrigger value="login" className="w-1/2 text-sm">
                Entrar
              </TabsTrigger>
              <TabsTrigger value="createAccount" className="w-1/2 text-sm">
                Criar conta
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="login">
            <SignInForm />
          </TabsContent>
          <TabsContent value="createAccount">
            <SignUpForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
