import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaDocker,
  FaGitAlt,
} from "react-icons/fa";
import {
  SiAngular,
  SiVuedotjs,
  SiTypescript,
  SiPython,
  SiMysql,
  SiMongodb,
  SiAmazon,
  SiGraphql,
  SiPostgresql,
  SiRuby,
  SiGo,
  SiPhp,
} from "react-icons/si";

const techStacks = [
  { name: "React", icon: <FaReact />, label: "Frontend" },
  { name: "Vue.js", icon: <SiVuedotjs />, label: "Frontend" },
  { name: "Angular", icon: <SiAngular />, label: "Frontend" },
  { name: "HTML5", icon: <FaHtml5 />, label: "Markup" },
  { name: "CSS3", icon: <FaCss3Alt />, label: "Design" },
  { name: "JavaScript", icon: <FaJsSquare />, label: "Frontend/Backend" },
  { name: "TypeScript", icon: <SiTypescript />, label: "Frontend/Backend" },
  { name: "Node.js", icon: <FaNodeJs />, label: "Backend" },
  { name: "Python", icon: <SiPython />, label: "Backend" },
  { name: "Ruby", icon: <SiRuby />, label: "Backend" },
  { name: "Go", icon: <SiGo />, label: "Backend" },
  { name: "PHP", icon: <SiPhp />, label: "Backend" },
  { name: "PostgreSQL", icon: <SiPostgresql />, label: "Database" },
  { name: "MySQL", icon: <SiMysql />, label: "Database" },
  { name: "MongoDB", icon: <SiMongodb />, label: "Database" },
  { name: "Docker", icon: <FaDocker />, label: "DevOps" },
  { name: "AWS", icon: <SiAmazon />, label: "Cloud" },
  { name: "Git", icon: <FaGitAlt />, label: "Version Control" },
  { name: "GraphQL", icon: <SiGraphql />, label: "API" },
];

const iconColors: Record<string, string> = {
  React: "text-blue-500",
  Vue: "text-green-500",
  Angular: "text-red-500",
  HTML5: "text-orange-500",
  CSS3: "text-blue-500",
  JavaScript: "text-yellow-500",
  TypeScript: "text-blue-600",
  "Node.js": "text-green-500",
  Python: "text-blue-500",
  Ruby: "text-red-600",
  Go: "text-blue-500",
  PHP: "text-purple-500",
  PostgreSQL: "text-blue-500",
  MySQL: "text-blue-500",
  MongoDB: "text-green-500",
  Docker: "text-blue-500",
  AWS: "text-orange-500",
  Git: "text-red-500",
  GraphQL: "text-pink-500",
};

export default function Stacks() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
          Nossas Tecnologias
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Confira as tecnologias e ferramentas que utilizamos para desenvolver
          soluções completas
        </p>
      </div>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
        {techStacks.map((tech) => (
          <div
            key={tech.name}
            className="flex transform flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800"
          >
            <div
              className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600`}
            >
              <div className={`text-3xl ${iconColors[tech.name]}`}>
                {tech.icon}
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
              {tech.name}
            </h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              {tech.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
