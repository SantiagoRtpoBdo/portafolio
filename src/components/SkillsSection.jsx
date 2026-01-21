import { useState } from "react";
import { cn } from "@/lib/utils";

const skills = [
  // Frontend
  {
    category: "frontend",
    logo: "https://img.shields.io/badge/-React-61DAFB?style=for-the-badge&logo=react&logoColor=black",
  },
  {
    category: "frontend",
    logo: "https://img.shields.io/badge/-Next.js-000?style=for-the-badge&logo=next.js&logoColor=white",
  },
  {
    category: "frontend",
    logo: "https://img.shields.io/badge/-Astro-FF5D01?style=for-the-badge&logo=astro&logoColor=white",
  },
  {
    category: "frontend",
    logo: "https://img.shields.io/badge/-HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white",
  },
  {
    category: "frontend",
    logo: "https://img.shields.io/badge/-CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white",
  },
  {
    category: "frontend",
    logo: "https://img.shields.io/badge/-TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white",
  },
  {
    category: "frontend",
    logo: "https://img.shields.io/badge/-shadcn%20UI-111827?style=for-the-badge&logo=cloudflarepages&logoColor=white",
  },
  {
    category: "frontend",
    logo: "https://img.shields.io/badge/-Radix%20UI-111827?style=for-the-badge&logo=radixui&logoColor=white",
  },
  {
    category: "frontend",
    logo: "https://img.shields.io/badge/-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black",
  },
  {
    category: "frontend",
    logo: "https://img.shields.io/badge/-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white",
  },

  // Backend
  {
    category: "backend",
    logo: "https://img.shields.io/badge/-.NET-512BD4?style=for-the-badge&logo=dotnet&logoColor=white",
  },
  {
    category: "backend",
    logo: "https://img.shields.io/badge/-ASP.NET%20Core-512BD4?style=for-the-badge&logo=dotnet&logoColor=white",
  },
  {
    category: "backend",
    logo: "https://img.shields.io/badge/-Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white",
  },
  {
    category: "backend",
    logo: "https://img.shields.io/badge/-Firebase%20Functions-FFCA28?style=for-the-badge&logo=firebase&logoColor=black",
  },
  {
    category: "backend",
    logo: "https://img.shields.io/badge/-C%23-239120?style=for-the-badge&logo=csharp&logoColor=white",
  },
  {
    category: "backend",
    logo: "https://img.shields.io/badge/-Python-3776AB?style=for-the-badge&logo=python&logoColor=white",
  },
  {
    category: "backend",
    logo: "https://img.shields.io/badge/-C++-00599C?style=for-the-badge&logo=c%2B%2B&logoColor=white",
  },
  {
    category: "backend",
    logo: "https://img.shields.io/badge/-Java-007396?style=for-the-badge&logo=openjdk&logoColor=white",
  },
  {
    category: "tools",
    logo: "https://img.shields.io/badge/-PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white",
  },
  {
    category: "tools",
    logo: "https://img.shields.io/badge/-MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white",
  },
  {
    category: "tools",
    logo: "https://img.shields.io/badge/-MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white",
  },
  {
    category: "tools",
    logo: "https://img.shields.io/badge/-SQL%20Server-CC2927?style=for-the-badge&logo=microsoftsqlserver&logoColor=white",
  },
  {
    category: "tools",
    logo: "https://img.shields.io/badge/-Cloud%20Firestore-FFCA28?style=for-the-badge&logo=firebase&logoColor=black",
  },
  {
    category: "tools",
    logo: "https://img.shields.io/badge/-RESTful%20APIs-6DB33F?style=for-the-badge&logo=spring&logoColor=white",
  },
  {
    category: "tools",
    logo: "https://img.shields.io/badge/-Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black",
  },
  {
    category: "tools",
    logo: "https://img.shields.io/badge/-Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white",
  },
  {
    category: "tools",
    logo: "https://img.shields.io/badge/-Bruno-6C47FF?style=for-the-badge&logo=bruno&logoColor=white",
  },
  {
    category: "tools",
    logo: "https://img.shields.io/badge/-Azure%20DevOps-0078D7?style=for-the-badge&logo=azuredevops&logoColor=white",
  },
  {
    category: "tools",
    logo: "https://img.shields.io/badge/-Git-181717?style=for-the-badge&logo=git&logoColor=white",
  },
  {
    category: "tools",
    logo: "https://img.shields.io/badge/-GitHub-181717?style=for-the-badge&logo=github&logoColor=white",
  },
  {
    category: "tools",
    logo: "https://img.shields.io/badge/-Vercel-000?style=for-the-badge&logo=vercel&logoColor=white",
  },
  {
    category: "tools",
    logo: "https://img.shields.io/badge/-Firebase%20CLI-FFCA28?style=for-the-badge&logo=firebase&logoColor=black",
  },
];

const categories = [
  { key: "all", label: "All" },
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "tools", label: "Tools" },
];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills =
    activeCategory === "all"
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);

  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary">Skills</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={cn(
                "px-5 py-2 rounded-full transition-colors duration-300 capitalize font-semibold flex items-center gap-2",
                activeCategory === cat.key
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-secondary/70 text-foreground hover:bg-secondary",
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          {filteredSkills.map((skill, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary font-medium text-base shadow-sm border border-primary/20 hover:bg-primary/20 transition-all"
            >
              {Array.isArray(skill.logo)
                ? skill.logo.map((logo, i) => (
                    <img
                      key={i}
                      src={
                        logo.startsWith("http")
                          ? logo
                          : logo.startsWith("src")
                            ? logo
                            : `/src/assets/skills/${logo.replace(
                                "../assets/skills/",
                                "",
                              )}`
                      }
                      alt={skill.name + " logo"}
                      className={logo.startsWith("http") ? "h-8" : "w-5 h-5"}
                    />
                  ))
                : skill.logo && (
                    <img
                      src={
                        skill.logo.startsWith("http")
                          ? skill.logo
                          : skill.logo.startsWith("src")
                            ? skill.logo
                            : `/src/assets/skills/${skill.logo.replace(
                                "../assets/skills/",
                                "",
                              )}`
                      }
                      alt={skill.name + " logo"}
                      className={
                        skill.logo.startsWith("http") ? "h-8" : "w-5 h-5"
                      }
                    />
                  )}
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
