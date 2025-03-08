import * as React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { MovingBorderButton } from "./moving-border-button";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import { DecodedGoogleToken } from "@/types";
import UserContext from "@/context/user-context";

interface EmptyStateProps {
  title: string;
  description: string;
  icons?: LucideIcon[];
  action: "payment" | "waiting" | "login";
  className?: string;
}

export function EmptyState({
  title,
  description,
  icons = [],
  action,
  className,
}: EmptyStateProps) {
  const context = React.useContext(UserContext);
  const responseMessage = (credentialResponse: CredentialResponse) => {
    try {
      if (credentialResponse.credential) {
        const decoded = jwtDecode<DecodedGoogleToken>(
          credentialResponse.credential,
        );

        const clientData = {
          id: decoded.sub,
          fullName: decoded.name,
        };

        if (context && context.setUserData) {
          context.setUserData(clientData);
        } 
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

  return (
    <div
      className={cn(
        "border-border bg-background text-center hover:border-border/80",
        "w-full rounded-xl border-2 border-dashed p-14",
        "group transition duration-500 hover:bg-muted/50 hover:duration-200",
        className,
      )}
    >
      <div className="isolate flex justify-center">
        {icons.length === 3 ? (
          <>
            <div className="relative left-2.5 top-1.5 grid size-12 -rotate-6 place-items-center rounded-xl bg-background shadow-lg ring-1 ring-border transition duration-500 group-hover:-translate-x-5 group-hover:-translate-y-0.5 group-hover:-rotate-12 group-hover:duration-200">
              {React.createElement(icons[0], {
                className: "w-6 h-6 text-muted-foreground",
              })}
            </div>
            <div className="relative z-10 grid size-12 place-items-center rounded-xl bg-background shadow-lg ring-1 ring-border transition duration-500 group-hover:-translate-y-0.5 group-hover:duration-200">
              {React.createElement(icons[1], {
                className: "w-6 h-6 text-muted-foreground",
              })}
            </div>
            <div className="relative right-2.5 top-1.5 grid size-12 rotate-6 place-items-center rounded-xl bg-background shadow-lg ring-1 ring-border transition duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-5 group-hover:rotate-12 group-hover:duration-200">
              {React.createElement(icons[2], {
                className: "w-6 h-6 text-muted-foreground",
              })}
            </div>
          </>
        ) : (
          <div className="grid size-12 place-items-center rounded-xl bg-background shadow-lg ring-1 ring-border transition duration-500 group-hover:-translate-y-0.5 group-hover:duration-200">
            {icons[0] &&
              React.createElement(icons[0], {
                className: "w-6 h-6 text-muted-foreground",
              })}
          </div>
        )}
      </div>
      <h2 className="mt-6 font-medium text-foreground">{title}</h2>
      <p className="mt-1 whitespace-pre-line pb-3 text-sm text-muted-foreground">
        {description}
      </p>
      {action === "payment" ? (
        <MovingBorderButton
          borderRadius="1rem"
          className="border-neutral-200 bg-white text-black dark:border-slate-800 dark:bg-slate-900 dark:text-white"
        >
          Realizar Pagamento
        </MovingBorderButton>
      ) : action === "login" ? (
        <div className="flex w-full items-center justify-center">
          <GoogleLogin
            onSuccess={responseMessage}
            onError={errorMessage}
            size="medium"
            width={208}
          />
        </div>
      ) : null}
    </div>
  );
}
