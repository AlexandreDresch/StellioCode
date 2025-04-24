"use client";

import { useCallStateHooks } from "@stream-io/video-react-sdk";
import { Mic, MicOff, Video, VideoOff } from "lucide-react";

export default function ParticipantsList() {
  const { useParticipants } = useCallStateHooks();
  const participants = useParticipants();

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

  return (
    <div className="h-full overflow-auto p-4">
      <h2 className="mb-4 text-lg font-semibold">
        Participantes ({participants.length})
      </h2>
      <div className="space-y-2">
        {participants.map((participant) => {
          const hasVideoEnabled = hasVideo(participant);
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
                  <p className="text-sm font-normal">
                    {participant.name || "Anonimo"}
                    {participant.isLocalParticipant && " (Você)"}
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
                {hasVideoEnabled ? (
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
