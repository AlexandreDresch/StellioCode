import {
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  useCallStateHooks,
  User,
  ParticipantView,
  StreamVideoParticipant,
  SpeakerLayout,
  CallControls,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "./style.css";
import { useNavigate } from "react-router-dom";
import Header from "@/components/header";

//create call
const apiKey = import.meta.env.VITE_GETSTREAM_API_KEY;
const token = import.meta.env.VITE_GETSTREAM_TOKEN;
const userId = import.meta.env.VITE_GETSTREAM_USERID;
const callId = "default";
const callType = "default";

//config users
const user: User = {
  id: userId,
  name: "alvaropedrosa",
  image: "https://getstream.io/random_svg/?id=alvaro&name=alvaro",
};

//config call's
const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call(callType, callId);
await call.getOrCreate();
await call.join({
  create: true,
});
await call.camera.enable();
await call.microphone.enable();

// set up the user object

export default function Meeting() {
  console.log(apiKey);
  return (
    <>
      <Header />
      <StreamVideo client={client}>
        <StreamCall call={call}>
          <MyUILayout />
        </StreamCall>
      </StreamVideo>
    </>
  );
}

export const MyUILayout = () => {
  const { useRemoteParticipants } = useCallStateHooks();

  const remoteParticipant = useRemoteParticipants();

  <MyParticipantList participants={remoteParticipant} />;

  const navigate = useNavigate();
  function handleLeave() {
    navigate("/");
  }
  return (
    <StreamTheme>
      <SpeakerLayout participantsBarPosition="bottom" />
      <CallControls onLeave={handleLeave} />
    </StreamTheme>
  );
};

export const MyParticipantList = (props: {
  participants: StreamVideoParticipant[];
}) => {
  const { participants } = props;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "8px",
      }}
    >
      {participants.map((participant) => (
        <div style={{ width: "100%", aspectRatio: "3 / 2" }}>
          <ParticipantView
            muteAudio
            participant={participant}
            key={participant.sessionId}
          />
        </div>
      ))}
    </div>
  );
};

export const MyFloatingLocalParticipant = (props: {
  participant?: StreamVideoParticipant;
}) => {
  const { participant } = props;
  return (
    <div
      style={{
        position: "absolute",
        top: "15px",
        left: "15px",
        width: "240px",
        height: "135px",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 10px 3px",
        borderRadius: "12px",
      }}
    >
      {participant && <ParticipantView muteAudio participant={participant} />}
    </div>
  );
};
