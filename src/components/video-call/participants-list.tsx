/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCallStateHooks } from "@stream-io/video-react-sdk";
import { Mic, MicOff, Video, VideoOff } from "lucide-react";

export default function ParticipantsList() {
  const { useParticipants } = useCallStateHooks();
  const participants = useParticipants();

  const getVideoTrack = (participant: any) => {
    return (
      participant.videoTrack ||
      (participant.publishedTracks?.includes("videoTrack") &&
        participant.trackByName?.["videoTrack"]) ||
      (participant.videoStream && participant.videoStream.active)
    );
  };

  const hasAudio = (participant: any) => {
    return (
      participant.hasAudio ||
      participant.publishedTracks?.includes("audioTrack") ||
      (participant.audioStream && participant.audioStream.active)
    );
  };

  return (
    <div className="h-full overflow-auto p-4">
      <h2 className="mb-4 text-lg font-semibold">
        Participants ({participants.length})
      </h2>
      <div className="space-y-2">
        {participants.map((participant) => {
          const hasVideo = !!getVideoTrack(participant);
          const hasAudioEnabled = hasAudio(participant);

          return (
            <div
              key={participant.sessionId}
              className="flex items-center justify-between rounded-md border p-2"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm text-primary-foreground">
                  {participant.name?.[0] || "?"}
                </div>
                <div>
                  <p className="font-medium">
                    {participant.name || "Anonymous"}
                    {participant.isLocalParticipant && " (You)"}
                  </p>
                  {participant.isSpeaking && (
                    <p className="text-xs text-muted-foreground">Speaking...</p>
                  )}
                </div>
              </div>
              <div className="flex gap-1">
                {hasAudioEnabled ? (
                  <Mic className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <MicOff className="h-4 w-4 text-muted-foreground" />
                )}
                {hasVideo ? (
                  <Video className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <VideoOff className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
