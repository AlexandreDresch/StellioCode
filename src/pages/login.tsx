import SignInForm from "@/components/forms/signInForm";
import SignUpForm from "@/components/forms/signUpForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Login = () => {
  return (
    <div className="flex h-screen">
      {/* Imagem ao lado esquerdo */}
      <div className="w-1/2">
        <img
          src="https://media.gettyimages.com/id/173606617/pt/vetorial/ovelha.jpg?s=612x612&w=0&k=20&c=CxHkdh5onSHyB_CD4VFgpvFV42BxO4_DcFD2VTqLfUY="
          alt="Imagem Ilustrativa"
          className="h-full w-full object-cover"
        />
      </div>
      {/* Área de Login/Criar Conta */}
      <div className="flex w-1/2 items-center justify-center bg-customGray px-6 text-white">
        <Tabs defaultValue="account" className="w-3/4">
          {/* Abas de Login e Criar Conta */}
          <div className="flex justify-center">
            <TabsList className="mb-6 flex w-1/2 justify-center px-2 py-6">
              <TabsTrigger value="login" className="w-full px-6 text-base">
                Login
              </TabsTrigger>
              <TabsTrigger
                value="createAccount"
                className="w-full px-6 text-base"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>
          </div>
          {/* Conteúdo(que são os components signInForm e signUpForm) das abas de Login e Criar conta */}
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
};

export default Login;
