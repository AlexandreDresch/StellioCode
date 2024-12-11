import { useSpringCarousel } from "react-spring-carousel";

interface CarouselItem {
  id: number;
  title: string;
  description: string;
  image: string;
  color: string;
}

const mockedItems: CarouselItem[] = [
  {
    id: 1,
    title: "Inovação",
    description:
      "Buscamos sempre inovar e trazer soluções criativas e eficientes.",
    image: "https://via.placeholder.com/300x300",
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "Confiança",
    description:
      "A confiança é o alicerce dos nossos relacionamentos com clientes e parceiros.",
    image: "https://via.placeholder.com/300x300",
    color: "bg-green-500",
  },
  {
    id: 3,
    title: "Agilidade",
    description:
      "Nosso time é ágil e se adapta rapidamente às necessidades do cliente.",
    image: "https://via.placeholder.com/300x300",
    color: "bg-yellow-500",
  },
  {
    id: 4,
    title: "Qualidade",
    description:
      "Comprometemo-nos com a entrega de soluções de alta qualidade em todos os projetos.",
    image: "https://via.placeholder.com/300x300",
    color: "bg-red-500",
  },
  {
    id: 5,
    title: "Sustentabilidade",
    description:
      "Reflete o compromisso com práticas que minimizem o impacto ambiental e promovam soluções eficientes a longo prazo.",
    image: "https://via.placeholder.com/300x300",
    color: "bg-teal-500",
  },
  {
    id: 6,
    title: "Colaboração",
    description:
      "Destaca a importância de trabalhar em equipe, tanto internamente como com os clientes, para alcançar os melhores resultados e soluções personalizadas.",
    image: "https://via.placeholder.com/300x300",
    color: "bg-purple-500",
  },
];

export default function SpringCarousel() {
  const { carouselFragment, slideToPrevItem, slideToNextItem } =
    useSpringCarousel({
      slideType: "fluid",
      withLoop: true,
      items: mockedItems.map((i) => ({
        id: i.id,
        renderItem: (
          <div
            className={`mx-2 flex flex-col rounded-lg shadow-md ${i.color} h-auto min-w-[20em] max-w-[35em] cursor-grab text-white active:cursor-grabbing`}
          >
            <img
              src={i.image}
              alt={i.title}
              className="mb-4 max-h-full min-w-full rounded-tl-lg rounded-tr-lg object-cover"
            />
            <h3 className="text-3xl font-bold tracking-wider">{i.title}</h3>
            <p className="my-5 p-10 text-justify text-xl font-thin">
              {i.description}
            </p>
          </div>
        ),
      })),
    });

  return (
    <div className="w-full px-8 py-10 text-center">
      <div className="carousel-container flex items-center justify-center">
        {carouselFragment}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={slideToPrevItem}
          className="rounded-md bg-gray-800 px-4 py-2 text-white"
        >
          ←
        </button>
        <button
          onClick={slideToNextItem}
          className="rounded-md bg-gray-800 px-4 py-2 text-white"
        >
          →
        </button>
      </div>
    </div>
  );
}
