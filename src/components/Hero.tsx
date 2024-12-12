import { Button } from "./ui/button";

export default function Hero() {
  return (
    <div className="flex min-h-lvh flex-col items-center justify-center">
      <main className="flex gap-20">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-6xl">
            Bem-vindo a{" "}
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              StellioCode
            </div>
          </h1>
          <p className="mt-4 p-4 text-4xl text-gray-700">
            Onde sonhos viram websites!
          </p>
          <Button
            variant="secondary"
            className="text-1xl bg-gradient-to-r from-pink-500 to-purple-600 text-white"
            size="lg"
          >
            Marque sua reunião!
          </Button>
        </div>

        <div>
          <img
            src="/heroImage.png"
            alt="Hero"
            className="object-fit h-96 w-full"
          />
        </div>
      </main>
    </div>
  );
}
