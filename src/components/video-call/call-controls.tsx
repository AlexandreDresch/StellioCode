import { useState } from "react";
import { useCallStateHooks } from "@stream-io/video-react-sdk";
import { Mic, MicOff, Monitor, PhoneOff, Video, VideoOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CallControlsProps {
  onLeave?: () => void;
}

export default function CallControls({ onLeave }: CallControlsProps) {
  const { useMicrophoneState, useCameraState, useScreenShareState } =
    useCallStateHooks();
  const microphone = useMicrophoneState();
  const camera = useCameraState();
  const screenShare = useScreenShareState();

  const [isScreenSharing, setIsScreenSharing] = useState(false);

  const toggleMicrophone = async () => {
    try {
      if (microphone.isEnabled) {
        await microphone.microphone.disable();
      } else {
        await microphone.microphone.enable();
      }
    } catch (error) {
      console.error("Error toggling microphone:", error);
    }
  };

  const toggleCamera = async () => {
    try {
      if (camera.isEnabled) {
        await camera.camera.disable();
      } else {
        await camera.camera.enable();
      }
    } catch (error) {
      console.error("Error toggling camera:", error);
    }
  };

  const toggleScreenShare = async () => {
    try {
      if (isScreenSharing) {
        if (
          typeof (screenShare as { disable?: () => Promise<void> }).disable ===
          "function"
        ) {
          await (
            screenShare.screenShare as unknown as {
              disable: () => Promise<void>;
            }
          ).disable();
          return;
        }
        if (
          typeof (
            screenShare as { setEnabled?: (enabled: boolean) => Promise<void> }
          ).setEnabled === "function"
        ) {
          await (
            screenShare as unknown as {
              setEnabled: (enabled: boolean) => Promise<void>;
            }
          ).setEnabled(false);
          return;
        }
        const manager = screenShare.screenShare;
        if (manager) {
          if (
            typeof (manager as { disable?: () => Promise<void> }).disable ===
            "function"
          ) {
            await (manager as { disable: () => Promise<void> }).disable();
            return;
          }
          if (
            typeof (
              manager as { setEnabled?: (enabled: boolean) => Promise<void> }
            ).setEnabled === "function"
          ) {
            await (
              manager as unknown as {
                setEnabled: (enabled: boolean) => Promise<void>;
              }
            ).setEnabled(false);
            return;
          }
        }
      } else {
        if (
          typeof (screenShare as { enable?: () => Promise<void> }).enable ===
          "function"
        ) {
          await (
            screenShare.screenShare as { enable: () => Promise<void> }
          ).enable();
          return;
        }
        if (
          typeof (
            screenShare as { setEnabled?: (enabled: boolean) => Promise<void> }
          ).setEnabled === "function"
        ) {
          await (
            screenShare as unknown as {
              setEnabled: (enabled: boolean) => Promise<void>;
            }
          ).setEnabled(true);
          return;
        }
        const manager = screenShare.screenShare;
        if (manager) {
          if (
            typeof (manager as { enable?: () => Promise<void> }).enable ===
            "function"
          ) {
            await (manager as { enable: () => Promise<void> }).enable();
            return;
          }
          if (
            typeof (
              manager as { setEnabled?: (enabled: boolean) => Promise<void> }
            ).setEnabled === "function"
          ) {
            await (
              manager as unknown as {
                setEnabled: (enabled: boolean) => Promise<void>;
              }
            ).setEnabled(true);
            return;
          }
          if (
            typeof (manager as { start?: () => Promise<void> }).start ===
            "function"
          ) {
            if (
              typeof (manager as { start?: () => Promise<void> }).start ===
              "function"
            ) {
              await (
                manager as unknown as { start: () => Promise<void> }
              ).start();
            }
            return;
          }
        }
      }
    } catch (error) {
      console.error("Error toggling screen share:", error);
      setIsScreenSharing(false);
    }
  };

  return (
    <TooltipProvider>
      <div className="flex items-center gap-2 rounded-full bg-background/90 p-2 shadow-lg">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-full ${!microphone.isEnabled ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : ""}`}
              onClick={toggleMicrophone}
            >
              {microphone.isEnabled ? (
                <Mic className="h-5 w-5" />
              ) : (
                <MicOff className="h-5 w-5" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {microphone.isEnabled ? "Desativar Microfone" : "Ativar Microfone"}
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-full ${!camera.isEnabled ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : ""}`}
              onClick={toggleCamera}
            >
              {camera.isEnabled ? (
                <Video className="h-5 w-5" />
              ) : (
                <VideoOff className="h-5 w-5" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {camera.isEnabled ? "Desligar Câmera" : "Ligar Câmera"}
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-full ${isScreenSharing ? "bg-amber-500 text-white hover:bg-amber-600" : ""}`}
              onClick={toggleScreenShare}
            >
              <Monitor className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {isScreenSharing
              ? "Parar de Compartilhar Tela"
              : "Compartilhar Tela"}
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="destructive"
              size="icon"
              className="rounded-full"
              onClick={onLeave}
            >
              <PhoneOff className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Sair da Chamada</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
