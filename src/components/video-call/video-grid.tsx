/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import { useCallStateHooks } from "@stream-io/video-react-sdk";
import { MicOff, TvIcon, VideoOff, Volume2 } from "lucide-react";

/**
 * The `VideoGrid` component is responsible for rendering a video call interface
 * with multiple layouts such as grid, speaker, and screen share modes. It dynamically
 * adjusts the layout based on the state of participants, screen sharing, and dominant speaker.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered video grid component.
 *
 * @remarks
 * - The component uses hooks from `useCallStateHooks` to manage participants, local participant,
 *   and screen share state.
 * - It supports three layouts: "grid", "speaker", and "screenShare".
 * - The layout automatically switches based on whether someone is screen sharing or if a dominant
 *   speaker is detected.
 *
 * @example
 * ```tsx
 * <VideoGrid />
 * ```
 *
 * @hook useParticipants - Retrieves the list of participants in the call.
 * @hook useLocalParticipant - Retrieves the local participant's information.
 * @hook useScreenShareState - Retrieves the state of screen sharing in the call.
 *
 * @state {("grid" | "speaker" | "screenShare")} layout - The current layout of the video grid.
 * @state {any} dominantSpeaker - The participant currently identified as the dominant speaker.
 *
 * @function getGridTemplateColumns
 * Dynamically calculates the CSS grid column class based on the number of participants.
 *
 * @function getVideoStream
 * Retrieves the video stream for a given participant.
 *
 * @function hasAudio
 * Checks if a participant has audio enabled.
 *
 * @function hasVideo
 * Checks if a participant has video enabled.
 *
 * @function getScreenShareStream
 * Retrieves the screen share stream for the local participant or other participants.
 *
 * @function isParticipantScreenSharing
 * Determines if a specific participant is currently sharing their screen.
 *
 * @function getScreenSharingParticipant
 * Retrieves the participant who is currently sharing their screen.
 *
 * @layout "grid"
 * Displays all participants in a grid layout.
 *
 * @layout "speaker"
 * Focuses on the dominant speaker, showing their video or initials prominently.
 *
 * @layout "screenShare"
 * Displays the screen share stream in a large view with participant thumbnails below.
 *
 * @dependencies
 * - React hooks: `useState`, `useEffect`, `useCallback`
 * - Tailwind CSS classes for styling.
 */
export default function VideoGrid() {
  const { useParticipants, useLocalParticipant, useScreenShareState } =
    useCallStateHooks();
  const localParticipant = useLocalParticipant();
  const participants = useParticipants();
  const screenShareState = useScreenShareState();
  const callState = useCallStateHooks();
  const [layout, setLayout] = useState<"grid" | "speaker" | "screenShare">(
    "grid",
  );
  const [dominantSpeaker, setDominantSpeaker] = useState(localParticipant);

  useEffect(() => {
    const isAnyoneScreenSharing =
      screenShareState?.isEnabled ||
      participants.some((p) => {
        return p.screenShareStream?.active;
      });

    if (isAnyoneScreenSharing) {
      setLayout("screenShare");
    } else if (layout === "screenShare") {
      setLayout("grid");
    }
  }, [screenShareState, participants, layout]);

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

  const getScreenShareStream = () => {
    try {
      console.log("Screen share state:", screenShareState);
      console.log("Call state:", callState);
      console.log("All participants:", participants);

      if (screenShareState?.isEnabled) {
        console.log("Local participant is screen sharing");

        if (
          screenShareState.screenShare &&
          typeof screenShareState.screenShare === "object"
        ) {
          const mediaStream = (
            screenShareState.screenShare as { mediaStream?: MediaStream }
          ).mediaStream;
          if (mediaStream instanceof MediaStream) {
            console.log(
              "Found screen share stream in screenShareState.screenShare.mediaStream",
            );
            return mediaStream;
          }

          const track = (
            screenShareState.screenShare as { track?: MediaStreamTrack }
          ).track;
          if (track instanceof MediaStreamTrack) {
            console.log(
              "Found screen share track in screenShareState.screenShare.track",
            );
            return new MediaStream([track]);
          }
        }

        if (localParticipant) {
          console.log("Checking local participant for screen share tracks");

          if (
            (localParticipant as any).tracks?.screenShare?.track instanceof
            MediaStreamTrack
          ) {
            console.log(
              "Found screen share track in localParticipant.tracks.screenShare.track",
            );
            return new MediaStream([
              (localParticipant as any).tracks.screenShare.track,
            ]);
          }

          if (
            (localParticipant as any).tracks?.screen?.track instanceof
            MediaStreamTrack
          ) {
            console.log(
              "Found screen share track in localParticipant.tracks.screen.track",
            );
            return new MediaStream([
              (localParticipant as any).tracks.screen.track,
            ]);
          }
        }
      }

      return null;
    } catch (error) {
      console.error("Error getting screen share stream:", error);
      return null;
    }
  };
  const isParticipantScreenSharing = (participant: any) => {
    if (screenShareState?.isEnabled && participant.isLocalParticipant) {
      return true;
    }

    return false;
  };

  const getScreenSharingParticipant = () => {
    if (screenShareState?.isEnabled && localParticipant) {
      return localParticipant;
    }

    return null;
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

  if (layout === "screenShare") {
    const screenSharingParticipant = getScreenSharingParticipant();
    const screenShareStream = getScreenShareStream();

    if (!screenShareStream) {
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
                  {participant.name || "Anônimo"}
                  {participant.isLocalParticipant && " (Você)"}
                  {participant.isSpeaking && (
                    <Volume2 className="size-3 text-muted-foreground" />
                  )}
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

    return (
      <div className="flex h-full w-full flex-col">
        <div className="relative flex-1 overflow-hidden rounded-lg bg-black">
          <video
            ref={(node) => {
              if (node) {
                node.srcObject = screenShareStream;
              }
            }}
            autoPlay
            playsInline
            className="h-full w-full object-contain"
          />

          <div className="absolute bottom-2 left-2 rounded bg-background/80 px-2 py-1 text-sm">
            {screenSharingParticipant?.name || "Convidado"} está compartilhando
            sua tela
            {screenSharingParticipant?.isLocalParticipant && " (Você)"}
          </div>
        </div>

        <div className="mt-1 flex h-24 gap-1 overflow-x-auto">
          {participants.map((participant) => {
            const videoStream = getVideoStream(participant);
            const hasVideoEnabled = hasVideo(participant);
            const hasAudioEnabled = hasAudio(participant);

            return (
              <div
                key={participant.sessionId}
                className="relative h-full min-w-24 overflow-hidden rounded-lg bg-muted"
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
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg text-primary-foreground">
                      {participant.name?.[0] || "?"}
                    </div>
                  </div>
                )}

                <div className="absolute bottom-1 left-1 right-1 truncate rounded bg-background/80 px-1 py-0.5 text-xs">
                  {participant.name || "Anônimo"}
                  {participant.isLocalParticipant && " (Você)"}
                </div>

                <div className="absolute right-1 top-1 flex gap-0.5">
                  {!hasAudioEnabled && (
                    <div className="rounded bg-background/80 p-1">
                      <MicOff className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

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
        const isScreenSharing = isParticipantScreenSharing(participant);

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
                {participant.name || "Anônimo"}
                {participant.isLocalParticipant && " (Você)"}
                {participant.isSpeaking && (
                  <Volume2 className="size-3 text-muted-foreground" />
                )}
                {isScreenSharing && " (Compartilhando tela)"}
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
              {isScreenSharing && (
                <div className="rounded bg-background/80 p-1">
                  <TvIcon className="h-4 w-4 text-muted-foreground" />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
