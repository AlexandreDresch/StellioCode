import { useEffect, useState } from "react";
import {
  type Call,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";
import { Loader2 } from "lucide-react";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import VideoGrid from "./video-grid";
import CallControls from "./call-controls";
import ParticipantsList from "./participants-list";
import { useNavigate, useParams } from "react-router-dom";

export default function VideoCallUI() {
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<Call | null>(null);
  const [userName] = useState<string>("");
  const [isJoining, setIsJoining] = useState(false);

  const navigate = useNavigate();
  const { callId: paramCallId } = useParams();

  useEffect(() => {
    if (!import.meta.env.VITE_GETSTREAM_API_KEY) {
      console.error("Stream API key is missing");
      return;
    }

    const initClient = async () => {
      try {
        const userId = import.meta.env.VITE_GETSTREAM_USERID;

        const apiKey = import.meta.env.VITE_GETSTREAM_API_KEY;
        if (!apiKey) {
          throw new Error("Stream API key is missing");
        }

        const client = new StreamVideoClient({
          apiKey,
          user: {
            id: userId,
            name: "Oliver",
            image: `https://getstream.io/random_svg/?id=${userId}&name=${userName}`,
          },
          token: import.meta.env.VITE_GETSTREAM_TOKEN,
        });

        setClient(client);
      } catch (error) {
        console.error("Error initializing Stream client:", error);
      }
    };

    if (!client) {
      initClient();
    }

    return () => {
      if (client) {
        client.disconnectUser();
      }
    };
  }, [client, userName]);

  useEffect(() => {
    const joinCall = async () => {
      if (!client || !paramCallId) return;

      setIsJoining(true);

      try {
        const call = client.call("default", paramCallId);
        await call.join({ create: false });
        setCall(call);

        // Update URL with call ID
        const params = new URLSearchParams(window.location.search);
        params.set("callId", paramCallId);
        navigate(`${window.location.pathname}?${params.toString()}`);
      } catch (error) {
        console.error("Error joining call:", error);
      } finally {
        setIsJoining(false);
      }
    };

    if (client && paramCallId) {
      joinCall();
    }
  }, [client, paramCallId, navigate]);

  const handleLeaveCall = async () => {
    if (!call) return;

    try {
      await call.leave();
      setCall(null);

      // Remove call ID from URL
      const params = new URLSearchParams(window.location.search);
      params.delete("callId");
      navigate(
        `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}`,
      );
    } catch (error) {
      console.error("Error leaving call:", error);
    }
  };

  if (isJoining || !client || !call) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <div className="flex h-screen flex-col md:flex-row">
          <div className="flex-1 overflow-hidden">
            <div className="relative h-full w-full">
              <VideoGrid />
              <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                <CallControls onLeave={handleLeaveCall} />
              </div>
            </div>
          </div>
          <div className="w-full border-t border-border md:w-80 md:border-l md:border-t-0">
            <div className="h-full overflow-y-auto">
              <ParticipantsList />
            </div>
          </div>
        </div>
      </StreamCall>
    </StreamVideo>
  );
}
