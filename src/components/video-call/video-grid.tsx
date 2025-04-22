import { useCallback, useEffect, useState } from "react";
import { useCallStateHooks } from "@stream-io/video-react-sdk";

export default function VideoGrid() {
  const { useParticipants, useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();
  const participants = useParticipants();

  const [layout] = useState<"grid" | "speaker">("grid");
  const [dominantSpeaker, setDominantSpeaker] = useState(localParticipant);

  // Update dominant speaker based on who is speaking
  useEffect(() => {
    const interval = setInterval(() => {
      const speakers = participants.filter((p) => p.isSpeaking);
      if (speakers.length > 0) {
        setDominantSpeaker(speakers[0]);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [participants]);

  const getGridTemplateColumns = useCallback(() => {
    const count = participants.length;
    if (count === 1) return "grid-cols-1";
    if (count === 2) return "grid-cols-2";
    if (count <= 4) return "grid-cols-2";
    if (count <= 9) return "grid-cols-3";
    return "grid-cols-4";
  }, [participants.length]);

  // Helper function to get video track from participant
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getVideoTrack = (participant: any) => {
    // Check different possible properties for video track
    return (
      participant.videoTrack ||
      (participant.publishedTracks?.includes("videoTrack") &&
        participant.trackByName?.["videoTrack"]) ||
      (participant.videoStream &&
        new MediaStream([participant.videoStream]).getVideoTracks()[0])
    );
  };

  // Helper function to check if participant has audio
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hasAudio = (participant: any) => {
    return (
      participant.hasAudio ||
      participant.publishedTracks?.includes("audioTrack") ||
      (participant.audioStream && participant.audioStream.active)
    );
  };

  // Remove the SpeakerLayout since it might not be available
  if (layout === "speaker" && dominantSpeaker) {
    const dominantVideoTrack = getVideoTrack(dominantSpeaker);

    return (
      <div className="h-full w-full">
        <div className="relative h-full w-full overflow-hidden rounded-lg bg-muted">
          {dominantVideoTrack ? (
            <video
              ref={(node) => {
                if (node && dominantVideoTrack) {
                  node.srcObject = new MediaStream([dominantVideoTrack]);
                }
              }}
              autoPlay
              playsInline
              muted={dominantSpeaker.isLocalParticipant}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <div className="flex h-32 w-32 items-center justify-center rounded-full bg-primary text-4xl text-primary-foreground">
                {dominantSpeaker.name?.[0] || "?"}
              </div>
            </div>
          )}
          <div className="absolute bottom-4 left-4 rounded bg-background/80 px-3 py-1 text-lg">
            {dominantSpeaker.name || "Anonymous"}
            {dominantSpeaker.isLocalParticipant && " (You)"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`grid h-full w-full gap-1 ${getGridTemplateColumns()}`}>
      {participants.map((participant) => {
        const videoTrack = getVideoTrack(participant);
        const hasAudioEnabled = hasAudio(participant);

        return (
          <div
            key={participant.sessionId}
            className="relative aspect-video overflow-hidden rounded-lg bg-muted"
          >
            {videoTrack ? (
              <video
                ref={(node) => {
                  if (node && videoTrack) {
                    node.srcObject = new MediaStream([videoTrack]);
                  }
                }}
                autoPlay
                playsInline
                muted={participant.isLocalParticipant}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-2xl text-primary-foreground">
                  {participant.name?.[0] || "?"}
                </div>
              </div>
            )}

            <div className="absolute bottom-2 left-2 rounded bg-background/80 px-2 py-1 text-sm">
              {participant.name || "Anonymous"}
              {participant.isLocalParticipant && " (You)"}
              {participant.isSpeaking && " 🔊"}
            </div>

            <div className="absolute right-2 top-2 flex gap-1">
              {!hasAudioEnabled && (
                <div className="rounded bg-background/80 p-1">🔇</div>
              )}
              {!videoTrack && (
                <div className="rounded bg-background/80 p-1">🎦</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
