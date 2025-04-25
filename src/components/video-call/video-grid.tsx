import { useCallback, useEffect, useState } from "react";
import { useCallStateHooks } from "@stream-io/video-react-sdk";
import { MicOff, VideoOff, Volume2 } from "lucide-react";

export default function VideoGrid() {
  const { useParticipants, useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();
  const participants = useParticipants();

  const [layout] = useState<"grid" | "speaker">("grid");
  const [dominantSpeaker, setDominantSpeaker] = useState(localParticipant);

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getVideoStream = (participant: any) => {
    try {
      if (participant.videoStream instanceof MediaStream) {
        return participant.videoStream;
      }

      if (participant.videoTrack instanceof MediaStreamTrack) {
        return new MediaStream([participant.videoTrack]);
      }

      if (participant.tracks) {
        const videoTrack = participant.tracks.video?.track;
        if (videoTrack instanceof MediaStreamTrack) {
          return new MediaStream([videoTrack]);
        }
      }

      if (
        participant.publishedTracks?.includes("videoTrack") &&
        participant.trackByName?.["videoTrack"] instanceof MediaStreamTrack
      ) {
        return new MediaStream([participant.trackByName["videoTrack"]]);
      }

      return null;
    } catch (error) {
      console.error("Error getting video stream:", error);
      return null;
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hasAudio = (participant: any) => {
    return (
      participant.hasAudio ||
      participant.audioOn ||
      participant.publishedTracks?.includes("audioTrack") ||
      (participant.audioStream instanceof MediaStream &&
        participant.audioStream.active) ||
      participant.tracks?.audio?.track instanceof MediaStreamTrack
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hasVideo = (participant: any) => {
    return (
      participant.hasVideo ||
      participant.videoOn ||
      participant.publishedTracks?.includes("videoTrack") ||
      (participant.videoStream instanceof MediaStream &&
        participant.videoStream.active) ||
      participant.tracks?.video?.track instanceof MediaStreamTrack
    );
  };

  if (layout === "speaker" && dominantSpeaker) {
    const dominantVideoStream = getVideoStream(dominantSpeaker);
    const hasDominantVideo = hasVideo(dominantSpeaker);

    return (
      <div className="h-full w-full">
        <div className="relative h-full w-full overflow-hidden rounded-lg bg-muted">
          {hasDominantVideo && dominantVideoStream ? (
            <video
              ref={(node) => {
                if (node) {
                  node.srcObject = dominantVideoStream;
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
            {dominantSpeaker.name || "Anônimo"}
            {dominantSpeaker.isLocalParticipant && " (Você)"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`grid h-full w-full gap-1 ${getGridTemplateColumns()}`}>
      {participants.map((participant) => {
        const videoStream = getVideoStream(participant);
        const hasVideoEnabled = hasVideo(participant);
        const hasAudioEnabled = hasAudio(participant);

        return (
          <div
            key={participant.sessionId}
            className="relative aspect-video overflow-hidden rounded-lg bg-muted"
          >
            {hasVideoEnabled && videoStream ? (
              <video
                ref={(node) => {
                  if (node) {
                    node.srcObject = videoStream;
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
              <p className="flex items-center gap-1">
                {participant.name || "Anonymous"}
                {participant.isLocalParticipant && " (Você)"}
                {participant.isSpeaking && (
                  <Volume2 className="size-3 text-muted-foreground" />
                )}
              </p>
            </div>

            <div className="absolute right-2 top-2 flex gap-1">
              {!hasAudioEnabled && (
                <div className="rounded bg-background/80 p-1">
                  <MicOff className="h-4 w-4 text-muted-foreground" />
                </div>
              )}
              {!hasVideoEnabled && (
                <div className="rounded bg-background/80 p-1">
                  <VideoOff className="h-4 w-4 text-muted-foreground" />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
