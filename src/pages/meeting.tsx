import {
  CallingState,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  //useCall,
  useCallStateHooks,
  User,
  ParticipantView,
  StreamVideoParticipant,
  SpeakerLayout,
  CallControls,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "./style.css";

const apiKey = import.meta.env.VITE_GETSTREAM_API_KEY;
const token = import.meta.env.VITE_GETSTREAM_TOKEN;
const userId = import.meta.env.VITE_GETSTREAM_USERID;
const callId = "default_8f17f03d-a4e3-4044-95fc-48b1fd2cf018";

// set up the user object

const user: User = {
  id: userId,
  name: "alvaropedrosa",
  image: "https://getstream.io/random_svg/?id=alvaro&name=alvaro",
};

const client = new StreamVideoClient({ apiKey, user, token });

const call = client.call("default", callId);
call.join({ create: true });

export default function Meeting() {
  console.log(apiKey);
  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MyUILayout />
      </StreamCall>
    </StreamVideo>
  );
}

export const MyUILayout = () => {
  // const call = useCall();

  const {
    useCallCallingState,
    //useLocalParticipant,
    useRemoteParticipants,
    //useParticipantCount,
  } = useCallStateHooks();

  const callingState = useCallCallingState();
  //const localParticipant = useLocalParticipant();
  const remoteParticipant = useRemoteParticipants();
  //const participantCount = useParticipantCount();

  <MyParticipantList participants={remoteParticipant} />;

  if (callingState !== CallingState.JOINED) {
    return <div>Loading...</div>;
  }

  return (
    <StreamTheme>
      <SpeakerLayout participantsBarPosition="bottom" />
      <CallControls />
    </StreamTheme>
  );
  // return (
  //     <StreamTheme style={{position: 'relative'}}>
  //       <MyParticipantList participants={remoteParticipant}/>
  //       <MyFloatingLocalParticipant participant={localParticipant}/>
  //     </StreamTheme>
  // );
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
        //  width:  '100vw'
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
