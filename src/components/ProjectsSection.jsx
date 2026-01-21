import {
  ArrowRight,
  ExternalLink,
  Github,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

const projects = [
  {
    id: 1,
    title: "My Portfolio Website",
    description:
      "Personal portfolio designed to present my work, skills, and professional experience, showcasing who I am and the projects I have developed.",
    image: "/projects/portafolio.png",
    tags: [
      "React",
      "TypeScript",
      "Lucide Icons",
      "Vite",
      "TailwindCSS",
      "Radix UI",
    ],
    demoUrl: "",
    githubUrl: "https://github.com/SantiagoRtpoBdo/portafolio",
  },
  {
    id: 2,
    title: "Clone Spotify",
    description:
      "A simple Spotify clone developed to practice frontend development, including music playback, playlists, and song visualization.",
    image: "/projects/spotify.png",
    tags: ["TypeScript", "React", "NodeJS", "TailwindCSS", "Vite", "Astro"],
    demoUrl: "https://santiagortpobdo-clone-spotify.vercel.app/",
    githubUrl: "https://github.com/SantiagoRtpoBdo/clone-spotify",
  },
  {
    id: 3,
    title: "Word Search Solver",
    description:
      "Developed a web application to solve word search puzzles, detecting words in all directions and highlighting them within a visual matrix",
    image: "/projects/SolucionadorSopaLetra.png",
    tags: ["HTML5", "CSS3", "JavaScript"],
    demoUrl: "",
    githubUrl: "https://github.com/SantiagoRtpoBdo/Solucionador_Sopa_de_Letras",
  },
  // {
  //   id: 4,
  //   title: "My Portfolio Website",
  //   description:
  //     "Personal portfolio designed to present my work, skills, and professional experience, showcasing who I am and the projects I have developed.",
  //   image: "",
  //   tags: [
  //     "React",
  //     "TypeScript",
  //     "Lucide Icons",
  //     "Vite",
  //     "TailwindCSS",
  //     "Radix UI",
  //   ],
  //   demoUrl: "#",
  //   githubUrl: "#",
  // },
  // {
  //   id: 5,
  //   title: "Orbit Analytics Dashboard",
  //   description:
  //     "Interactive analytics dashboard with data visualization and filtering capabilities.",
  //   image: "",
  //   tags: ["TypeScript", "D3.js", "Next.js"],
  //   demoUrl: "#",
  //   githubUrl: "#",
  // },
];

export const ProjectsSection = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(() => {
    if (typeof window === "undefined") return 3;
    const w = window.innerWidth;
    return w >= 1024 ? 3 : w >= 768 ? 2 : 1;
  });

  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      const newItems = w >= 1024 ? 3 : w >= 768 ? 2 : 1;
      setItemsPerPage(newItems);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const totalPages = Math.max(1, Math.ceil(projects.length / itemsPerPage));

  useEffect(() => {
    // Ensure currentPage is valid when itemsPerPage/totalPages change
    setCurrentPage((prev) => (prev > totalPages - 1 ? 0 : prev));
  }, [itemsPerPage, totalPages]);

  const TRANSITION_MS = 500;

  const trackRef = useRef(null);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const handleTouchStart = (e) => {
      touchStartX.current = e.touches[0].clientX;
      touchDeltaX.current = 0;
    };

    const handleTouchMove = (e) => {
      touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
    };

    const handleTouchEnd = () => {
      const dx = touchDeltaX.current;
      const threshold = 50; // px
      if (Math.abs(dx) > threshold && !isTransitioning && totalPages > 1) {
        setIsTransitioning(true);
        setCurrentPage((prev) => {
          if (dx < 0) return prev < totalPages - 1 ? prev + 1 : 0;
          return prev > 0 ? prev - 1 : totalPages - 1;
        });
        setTimeout(() => setIsTransitioning(false), TRANSITION_MS);
      }
      touchStartX.current = 0;
      touchDeltaX.current = 0;
    };

    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchmove", handleTouchMove, { passive: true });
    el.addEventListener("touchend", handleTouchEnd);

    return () => {
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleTouchEnd);
    };
  }, [itemsPerPage, totalPages, isTransitioning]);

  const goToPage = (page) => {
    if (isTransitioning || totalPages <= 1) return;
    setIsTransitioning(true);
    setCurrentPage(page);
    setTimeout(() => setIsTransitioning(false), TRANSITION_MS);
  };

  const goToPrevious = () => {
    if (isTransitioning || totalPages <= 1) return;
    setIsTransitioning(true);
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
    setTimeout(() => setIsTransitioning(false), TRANSITION_MS);
  };

  const goToNext = () => {
    if (isTransitioning || totalPages <= 1) return;
    setIsTransitioning(true);
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
    setTimeout(() => setIsTransitioning(false), TRANSITION_MS);
  };

  // Keep each slot width constant (based on itemsPerPage) so the
  // overall carousel width stays the same as when full.
  // When there are fewer projects than slots, we center the items.
  const cardBasis = 100 / itemsPerPage;

  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          {" "}
          Featured <span className="text-primary"> Projects </span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some of my recent projects. Each project was carefully
          crafted with attention to detail, performance, and user experience.
        </p>

        {/* Carrusel de proyectos */}
        <div className="relative">
          {/* Botones de navegación (solo si hay más de una página) */}
          {totalPages > 1 && (
            <>
              <button
                onClick={goToPrevious}
                disabled={isTransitioning}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-card/80 backdrop-blur-sm hover:bg-card border border-border rounded-full p-2 transition-all hover:scale-110 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                aria-label="Previous projects"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={goToNext}
                disabled={isTransitioning}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-card/80 backdrop-blur-sm hover:bg-card border border-border rounded-full p-2 transition-all hover:scale-110 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                aria-label="Next projects"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Carrusel: pista deslizable (track) que contiene todas las tarjetas */}
          <div className="overflow-hidden" ref={trackRef}>
            <div
              className={`flex transition-transform duration-500 ease-in-out ${projects.length <= itemsPerPage ? "justify-center" : ""}`}
              style={{
                transform: `translateX(-${currentPage * 100}%)`,
              }}
            >
              {projects.map((project) => {
                const projectUrl = project.demoUrl || project.githubUrl;
                return (
                  <div
                    key={project.id}
                    className="px-4"
                    style={{
                      flex: `0 0 ${cardBasis}%`,
                      maxWidth: `${cardBasis}%`,
                    }}
                  >
                    <div
                      className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover h-full flex flex-col cursor-pointer"
                      onClick={() => window.open(projectUrl, "_blank")}
                    >
                      <div className="h-48 overflow-hidden flex-shrink-0">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>

                      <div className="p-6 flex flex-col flex-grow">
                        {/* Tags section con altura fija */}
                        <div className="flex flex-wrap gap-2 mb-4 min-h-[56px]">
                          {project.tags.map((tag, idx) => (
                            <span
                              key={tag + idx}
                              className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground h-fit"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Título */}
                        <h3 className="text-xl font-semibold mb-2">
                          {project.title}
                        </h3>

                        {/* Descripción con espacio flexible */}
                        <p className="text-muted-foreground text-sm mb-6 flex-grow">
                          {project.description}
                        </p>

                        {/* Iconos fijos en la parte inferior */}
                        <div className="flex space-x-3 mt-auto">
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            className="text-foreground/80 hover:text-primary transition-colors duration-300"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink size={20} />
                          </a>
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            className="text-foreground/80 hover:text-primary transition-colors duration-300"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Github size={20} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Indicadores del carrusel: puntos por página (solo si hay más de una página) */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                disabled={isTransitioning}
                className={`transition-all duration-300 rounded-full disabled:cursor-not-allowed ${
                  currentPage === index
                    ? "w-8 h-2 bg-primary"
                    : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            target="_blank"
            href="https://github.com/SantiagoRtpoBdo"
          >
            Check My Github <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
