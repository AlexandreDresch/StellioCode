import Header from "@/components/header";
import InitialMeetingForm from "@/components/initial-meeting/initial-meeting-form";
import { WorldMap } from "@/components/initial-meeting/world-map";
import { MovingBorderButton } from "@/components/moving-border-button";
import { motion } from "framer-motion";
import { useState } from "react";

export default function InitialMeeting() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  return (
    <div className="min-h-screen w-full">
      <Header />

      {isFormOpen ? (
        <div className="mx-auto w-full max-w-7xl bg-white pt-40 dark:bg-black">
          <InitialMeetingForm />
        </div>
      ) : (
        <>
          <div className="mx-auto w-full max-w-7xl bg-white pt-40 dark:bg-black">
            <div className="mx-auto max-w-7xl text-center">
              <p className="text-xl font-bold text-black dark:text-white md:text-4xl">
                Onde você{" "}
                <span className="text-neutral-400">
                  {"precisar".split("").map((word, idx) => (
                    <motion.span
                      key={idx}
                      className="inline-block"
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: idx * 0.04 }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </span>
              </p>
              <p className="mx-auto max-w-2xl py-4 text-sm text-neutral-500 md:text-lg">
                Construa uma vez. Acesse do conforto do seu negócio, da sua
                casa, ou de qualquer lugar.
              </p>
            </div>
            <WorldMap
              dots={[
                {
                  start: {
                    lat: 64.2008,
                    lng: -149.4937,
                  },
                  end: {
                    lat: 34.0522,
                    lng: -118.2437,
                  },
                },
                {
                  start: { lat: 64.2008, lng: -149.4937 },
                  end: { lat: -15.7975, lng: -47.8919 },
                },
                {
                  start: { lat: -15.7975, lng: -47.8919 },
                  end: { lat: 38.7223, lng: -9.1393 },
                },
                {
                  start: { lat: 51.5074, lng: -0.1278 },
                  end: { lat: 28.6139, lng: 77.209 },
                },
                {
                  start: { lat: 28.6139, lng: 77.209 },
                  end: { lat: 43.1332, lng: 131.9113 },
                },
                {
                  start: { lat: 28.6139, lng: 77.209 },
                  end: { lat: -1.2921, lng: 36.8219 },
                },
              ]}
            />
          </div>

          <div className="relative bottom-32 flex w-full items-center justify-center">
            <MovingBorderButton
              className="border-sky-100/50 bg-white text-black"
              borderClassName="bg-[radial-gradient(var(--sky-500)_40%,transparent_60%)]"
              onClick={() => {
                setIsFormOpen(true);
              }}
            >
              Agendar Reunião
            </MovingBorderButton>
          </div>
        </>
      )}
    </div>
  );
}
