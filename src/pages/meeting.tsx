import Header from "@/components/header";
import VideoCallUI from "@/components/video-call/video-call-ui";

export default function Meeting() {
  return (
    <div className="h-auto w-full bg-background">
      <div className="fixed top-0 z-50 w-full bg-background">
        <Header />
      </div>
      <VideoCallUI />
    </div>
  );
}
