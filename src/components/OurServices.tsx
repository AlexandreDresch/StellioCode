import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// import Autoplay from "embla-carousel-autoplay"

export default function NossosServicos() {
  const cards = [
    {
      title: "Aplicações Web",
      content:
        "Criamos aplicações web personalizadas que garantem uma experiência de usuário intuitiva e de alto desempenho.",
    },
    {
      title: "Soluções Mobile",
      content:
        "Desenvolvemos aplicativos móveis com design responsivo e funcionalidades que maximizam o engajamento dos usuários, adaptados para Android e iOS.",
    },
    {
      title: "Design UI/UX",
      content:
        "Projetamos interfaces que encantam os usuários e tornam a navegação intuitiva, priorizando uma experiência visual de alta qualidade.",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center bg-slate-200 py-5 dark:bg-stone-800">
      <h3 className="py-5 text-xl font-semibold">O que fazemos</h3>

      <Carousel
        className="w-full max-w-[18rem] flex-col items-center justify-center md:max-w-xl lg:flex lg:max-w-screen-xl"
        // plugins={[
        //   Autoplay({
        //     delay: 2500,
        //   }),
        // ]}
      >
        <CarouselContent>
          {cards.map((card, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/3 lg:pl-10"
            >
              <div className="flex items-center justify-center">
                <div className="rounded-md bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 p-1">
                  <Card className="max-h-[240px] min-h-[240px] w-[250px] rounded dark:bg-indigo-950">
                    <CardHeader>
                      <CardTitle>{card.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs">
                      {card.content}
                    </CardContent>
                    <CardFooter className="flex justify-end text-slate-600">
                      <p>saiba mais...</p>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="xl:hidden" />
        <CarouselNext className="xl:hidden" />
      </Carousel>
    </div>
  );
}
