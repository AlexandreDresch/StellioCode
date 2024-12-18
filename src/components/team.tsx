export default function Team() {
  const members = [
    {
      name: "Alexandre Dresch",
      role: "Líder | Fullstack",
      github: "#",
      linkedin: "#",
      email:
        "mailto:alexandre.dresch@stelliocode.com?subject=Quero%20conhecer%20mais%20sobre%20os%20planos%20da%20empresa&body=Olá%20Alexandre,%20gostaria%20de%20conhecer%20mais%20sobre%20os%20planos%20e%20como%20a%20stelliocode%20pode%20colaborar%20no%20desenvolvimento%20web%2Fmobile%20da%20minha%20empresa.%0A%0AAtenciosamente,%0A",
      image: "https://source.unsplash.com/150x150/?portrait?1",
    },
    {
      name: "Alexandre Ferreira",
      role: "Backend",
      github: "#",
      linkedin: "#",
      email:
        "mailto:alexandre.ferreira@stelliocode.com?subject=Quero%20conhecer%20mais%20sobre%20os%20planos%20da%20empresa&body=Olá%20Alexandre,%20gostaria%20de%20conhecer%20mais%20sobre%20os%20planos%20e%20como%20a%20stelliocode%20pode%20colaborar%20no%20desenvolvimento%20web%2Fmobile%20da%20minha%20empresa.%0A%0AAtenciosamente,%0A",
      image: "https://source.unsplash.com/150x150/?portrait?2",
    },
    {
      name: "Alvaro Pedrosa",
      role: "Fullstack",
      github: "#",
      linkedin: "#",
      email:
        "mailto:alvaro.pedrosa@stelliocode.com?subject=Quero%20conhecer%20mais%20sobre%20os%20planos%20da%20empresa&body=Olá%20Alvaro,%20gostaria%20de%20conhecer%20mais%20sobre%20os%20planos%20e%20como%20a%20stelliocode%20pode%20colaborar%20no%20desenvolvimento%20web%2Fmobile%20da%20minha%20empresa.%0A%0AAtenciosamente,%0A",
      image: "https://source.unsplash.com/150x150/?portrait?3",
    },
    {
      name: "Carlos Eduardo",
      role: "Backend",
      github: "#",
      linkedin: "#",
      email:
        "mailto:carlos.eduardo@stelliocode.com?subject=Quero%20conhecer%20mais%20sobre%20os%20planos%20da%20empresa&body=Olá%20Carlos,%20gostaria%20de%20conhecer%20mais%20sobre%20os%20planos%20e%20como%20a%20stelliocode%20pode%20colaborar%20no%20desenvolvimento%20web%2Fmobile%20da%20minha%20empresa.%0A%0AAtenciosamente,%0A",
      image: "https://source.unsplash.com/150x150/?portrait?4",
    },
    {
      name: "Filipe Ritter",
      role: "Fullstack",
      github: "#",
      linkedin: "#",
      email:
        "mailto:filipe.ritter@stelliocode.com?subject=Quero%20conhecer%20mais%20sobre%20os%20planos%20da%20empresa&body=Olá%20Filipe,%20gostaria%20de%20conhecer%20mais%20sobre%20os%20planos%20e%20como%20a%20stelliocode%20pode%20colaborar%20no%20desenvolvimento%20web%2Fmobile%20da%20minha%20empresa.%0A%0AAtenciosamente,%0A",
      image: "https://source.unsplash.com/150x150/?portrait?5",
    },
    {
      name: "Gabriel Coimbra",
      role: "Fullstack",
      github: "#",
      linkedin: "#",
      email:
        "mailto:gabriel.coimbra@stelliocode.com?subject=Quero%20conhecer%20mais%20sobre%20os%20planos%20da%20empresa&body=Olá%20Gabriel,%20gostaria%20de%20conhecer%20mais%20sobre%20os%20planos%20e%20como%20a%20stelliocode%20pode%20colaborar%20no%20desenvolvimento%20web%2Fmobile%20da%20minha%20empresa.%0A%0AAtenciosamente,%0A",
      image: "https://source.unsplash.com/150x150/?portrait?6",
    },
    {
      name: "Julia Bueno",
      role: "Frontend",
      github: "#",
      linkedin: "#",
      email:
        "mailto:julia.bueno@stelliocode.com?subject=Quero%20conhecer%20mais%20sobre%20os%20planos%20da%20empresa&body=Olá%20Julia,%20gostaria%20de%20conhecer%20mais%20sobre%20os%20planos%20e%20como%20a%20stelliocode%20pode%20colaborar%20no%20desenvolvimento%20web%2Fmobile%20da%20minha%20empresa.%0A%0AAtenciosamente,%0A",
      image: "https://source.unsplash.com/150x150/?portrait?7",
    },
    {
      name: "Neucielle Quadros",
      role: "Design | Frontend",
      github: "#",
      linkedin: "#",
      email:
        "mailto:neucielle.quadros@stelliocode.com?subject=Quero%20conhecer%20mais%20sobre%20os%20planos%20da%20empresa&body=Olá%20Neucielle,%20gostaria%20de%20conhecer%20mais%20sobre%20os%20planos%20e%20como%20a%20stelliocode%20pode%20colaborar%20no%20desenvolvimento%20web%2Fmobile%20da%20minha%20empresa.%0A%0AAtenciosamente,%0A",
      image: "https://source.unsplash.com/150x150/?portrait?8",
    },
    {
      name: "Polliana Silva",
      role: "Frontend",
      github: "#",
      linkedin: "#",
      email:
        "mailto:polliana.silva@stelliocode.com?subject=Quero%20conhecer%20mais%20sobre%20os%20planos%20da%20empresa&body=Olá%20Polliana,%20gostaria%20de%20conhecer%20mais%20sobre%20os%20planos%20e%20como%20a%20stelliocode%20pode%20colaborar%20no%20desenvolvimento%20web%2Fmobile%20da%20minha%20empresa.%0A%0AAtenciosamente,%0A",
      image: "https://source.unsplash.com/150x150/?portrait?9",
    },
    {
      name: "Vanessa Coutinho",
      role: "Frontend",
      github: "#",
      linkedin: "#",
      email:
        "mailto:vanessa.coutinho@stelliocode.com?subject=Quero%20conhecer%20mais%20sobre%20os%20planos%20da%20empresa&body=Olá%20Vanessa,%20gostaria%20de%20conhecer%20mais%20sobre%20os%20planos%20e%20como%20a%20stelliocode%20pode%20colaborar%20no%20desenvolvimento%20web%2Fmobile%20da%20minha%20empresa.%0A%0AAtenciosamente,%0A",
      image: "https://source.unsplash.com/150x150/?portrait?10",
    },
  ];

  return (
    <div className="group flex cursor-pointer flex-wrap justify-center gap-6">
      {members.map((member, index) => (
        <div
          key={index}
          className="flex max-w-xs flex-col justify-center rounded-xl bg-gray-100 p-6 text-gray-800 opacity-100 shadow-md transition-opacity duration-500 hover:!opacity-100 group-hover:opacity-50 dark:bg-gray-900 dark:text-gray-200 sm:px-12"
        >
          <img
            src={member.image}
            alt={member.name}
            className="mx-auto aspect-square h-32 w-32 rounded-full bg-gray-200 dark:bg-gray-700"
          />
          <div className="space-y-4 divide-y divide-gray-300 text-center dark:divide-gray-700">
            <div className="my-2 space-y-1">
              <h2 className="text-xl font-semibold sm:text-2xl">
                {member.name}
              </h2>
              <p className="px-5 text-xs text-gray-600 dark:text-gray-400 sm:text-base">
                {member.role}
              </p>
            </div>
            <div className="align-center flex justify-center space-x-4 pt-2">
              <a
                rel="noopener noreferrer"
                href={member.github}
                aria-label="GitHub"
                className="rounded-md p-2 text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-400 hover:dark:text-violet-400"
              >
                <svg
                  viewBox="0 0 496 512"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 fill-current"
                >
                  <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8z" />
                </svg>
              </a>
              <a
                rel="noopener noreferrer"
                href={member.linkedin}
                aria-label="LinkedIn"
                className="rounded-md p-2 text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-400 hover:dark:text-violet-400"
              >
                <svg
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 fill-current"
                >
                  <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1c-29.48 0-53.79-24.3-53.79-53.79S24.3 0 53.79 0 107.58 24.3 107.58 53.79s-24.3 54.31-53.79 54.31zm394.51 339.9h-92.78V312.4c0-32.4-.6-74.1-45.21-74.1-45.22 0-52.1 35.3-52.1 71.7v138h-92.8V148.9h89.2v40.8h1.3c12.5-23.6 43-48.5 88.5-48.5 94.6 0 112.1 62.3 112.1 143.1v163.7z" />
                </svg>
              </a>
              <a
                rel="noopener noreferrer"
                href={member.email}
                aria-label="Email"
                className="rounded-md p-2 text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-400 hover:dark:text-violet-400"
              >
                <svg
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 fill-current"
                >
                  <path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805l-192 152-192-152V112h384z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
