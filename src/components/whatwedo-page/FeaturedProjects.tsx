const projects = [
  {
    id: 1,
    name: "Sistema de Gestão",
    description:
      "Uma plataforma completa para gerenciar equipes e processos, com funcionalidades personalizadas para cada necessidade.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
  },
  {
    id: 2,
    name: "E-commerce",
    description:
      "Loja virtual moderna e funcional, projetada para maximizar vendas e oferecer uma excelente experiência de compra.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
  },
  {
    id: 3,
    name: "Aplicativo Mobile",
    description:
      "Aplicativo intuitivo que oferece funcionalidades inovadoras para melhorar a interação do usuário.",
    image: "https://images.unsplash.com/photo-1534126511673-b6899657816a",
  },
];

const FeaturedProjects = () => {
  return (
    <section
      id="featured-projects"
      className="flex w-full flex-col items-center space-y-12 px-2 py-20"
    >
      {projects.map((project) => (
        <div
          key={project.id}
          className="w-full rounded-lg bg-white lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg"
        >
          <div className="lg:w-1/2">
            <div
              className="h-80 rounded-b-none border bg-cover lg:h-full lg:scale-110 lg:rounded-lg"
              style={{ backgroundImage: `url(${project.image})` }}
            ></div>
          </div>
          <div className="max-w-xl rounded-t-none border px-6 py-12 lg:w-1/2 lg:max-w-5xl lg:rounded-lg lg:px-12">
            <h2 className="text-3xl font-bold text-gray-800">
              {project.name} <span className="text-indigo-600">Project</span>
            </h2>
            <p className="mt-4 text-gray-600">{project.description}</p>
            <div className="mt-8">
              <a
                href="#"
                className="rounded bg-gray-900 px-5 py-3 font-semibold text-gray-100 transition hover:bg-gray-700"
              >
                Saiba Mais
              </a>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default FeaturedProjects;
