import SignInForm from "@/components/forms/signInForm";
import SignUpForm from "@/components/forms/signUpForm";
import { IconCloud } from "@/components/iconCloud";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Login = () => {
  const slugs = [
    "typescript",
    "javascript",
    "dart",
    "java",
    "react",
    "flutter",
    "android",
    "html5",
    "css3",
    "nodedotjs",
    "express",
    "nextdotjs",
    "prisma",
    "amazonaws",
    "postgresql",
    "firebase",
    "nginx",
    "vercel",
    "testinglibrary",
    "jest",
    "cypress",
    "docker",
    "git",
    "jira",
    "github",
    "gitlab",
    "visualstudiocode",
    "androidstudio",
    "sonarqube",
    "figma",
    "springboot",
  ];
  return (
    <div className="flex h-auto min-h-screen flex-col md:flex-row">
      {/* Imagem (oculta em telas menores) */}
      <div className="hidden items-center justify-center md:flex md:w-1/2">
        <IconCloud iconSlugs={slugs} />
      </div>

      {/* Área de Login/Cadastro */}
      <div className="flex w-full items-center justify-center md:w-1/2">
        <Tabs
          defaultValue="login"
          className="w-full max-w-md rounded-lg border border-gray-300 p-4"
        >
          {/* Logo StellioCode */}
          <img src="logo.png" alt="logo" className="mx-auto mb-4 w-20" />

          {/* Abas de Login e Cadastro */}
          <div className="flex justify-center">
            <TabsList className="mb-4 flex w-full max-w-xs justify-center">
              <TabsTrigger value="login" className="w-1/2 text-sm">
                Login
              </TabsTrigger>
              <TabsTrigger value="createAccount" className="w-1/2 text-sm">
                Cadastro
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Conteúdo das abas */}
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
