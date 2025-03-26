const Banner = () => {
  return (
    <section className="body-font bg-white text-gray-600 dark:bg-slate-900">
      <div className="container mx-auto flex flex-col items-center md:flex-row md:px-24 md:py-10">
        <div className="md:w-1.5/2 mb-16 mt-5 flex flex-col items-center text-center md:mb-0 md:mt-0 md:items-start md:pr-16 md:text-left lg:flex-grow lg:pr-24">
          <h1 className="mb-3 text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-normal">
            O Que Fazemos
          </h1>
          <p className="mb-8 pl-2 pr-2 leading-relaxed dark:text-gray-300 md:pl-0">
            Oferecemos soluções inovadoras para transformar ideias em realidade.
            Confira nosso portfólio e descubra como podemos ajudar você a
            alcançar seus objetivos.
          </p>
          <div className="flex justify-center">
            <a
              href="#featured-projects"
              className="inline-flex rounded border-0 bg-emerald-600 px-6 py-2 text-lg text-white hover:bg-emerald-500 focus:outline-none"
            >
              Veja Nossos Projetos
            </a>
            <a
              href="#call-to-action"
              className="ml-4 inline-flex rounded border-0 bg-gray-100 px-6 py-2 text-lg text-gray-700 hover:bg-gray-200 focus:outline-none"
            >
              Saiba Mais
            </a>
          </div>
        </div>
        <div className="mb-5 w-3/6 md:mb-0 md:w-1/2 lg:w-full lg:max-w-lg">
          <img
            className="rounded object-cover object-center"
            alt="hero"
            src="https://www.svgrepo.com/show/490900/hot-air-balloon.svg"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
