import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaDocker,
  FaAws,
  FaGit,
  FaLinux,
  FaFigma,
  FaVuejs,
  FaHtml5,
  FaCode,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiExpress,
  SiFastapi,
  SiGraphql,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiMysql,
  SiKubernetes,
  SiGithubactions,
  SiTerraform,
  SiFlutter,
} from "react-icons/si";

const SkillsPage = ({ content }) => {
  const [activeCategory, setActiveCategory] = useState("frontend");
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  const iconMap = {
    FaReact: FaReact,
    FaNodeJs: FaNodeJs,
    FaPython: FaPython,
    FaDocker: FaDocker,
    FaAws: FaAws,
    FaGit: FaGit,
    FaLinux: FaLinux,
    FaFigma: FaFigma,
    FaVuejs: FaVuejs,
    FaHtml5: FaHtml5,
    SiNextdotjs: SiNextdotjs,
    SiTypescript: SiTypescript,
    SiTailwindcss: SiTailwindcss,
    SiExpress: SiExpress,
    SiFastapi: SiFastapi,
    SiGraphql: SiGraphql,
    SiMongodb: SiMongodb,
    SiPostgresql: SiPostgresql,
    SiRedis: SiRedis,
    SiMysql: SiMysql,
    SiKubernetes: SiKubernetes,
    SiGithubactions: SiGithubactions,
    SiTerraform: SiTerraform,
    SiFlutter: SiFlutter,
    SiVisualstudiocode: FaCode,
  };

  const categories = [
    { key: "frontend", label: "Frontend", color: "#00F5FF" },
    { key: "backend", label: "Backend", color: "#FF006E" },
    { key: "database", label: "Database", color: "#39FF14" },
    { key: "devops", label: "DevOps", color: "#FFBE0B" },
    { key: "mobile", label: "Mobile", color: "#BF00FF" },
    { key: "tools", label: "Tools", color: "#FF6600" },
  ];

  const currentSkills = content.skills[activeCategory] || [];
  const activeColor =
    categories.find((c) => c.key === activeCategory)?.color || "#00F5FF";

  return (
    <div data-testid="skills-page" className="pt-20 min-h-screen">
      {/* Header */}
      <section ref={headerRef} className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="font-retro text-2xl md:text-3xl text-[#00F5FF] glow-cyan mb-4">
              SKILLS ARCADE
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-[#ABABAB]">
              Technologies and tools I've mastered throughout my development journey
            </p>
          </motion.div>

          {/* Category Selector - Cassette Tapes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setActiveCategory(category.key)}
                data-testid={`category-${category.key}`}
                className={`relative px-6 py-4 rounded-md font-retro text-xs transition-all duration-300 ${
                  activeCategory === category.key
                    ? `bg-[${category.color}] text-[#0A0A0A] shadow-[0_0_30px_${category.color}40]`
                    : "bg-[#1A1A1A] text-[#757575] border-2 border-[#3E3E3E] hover:border-[#757575]"
                }`}
                style={
                  activeCategory === category.key
                    ? {
                        backgroundColor: category.color,
                        boxShadow: `0 0 30px ${category.color}40`,
                      }
                    : {}
                }
              >
                {/* Cassette Reel Decoration */}
                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded-full border-2 ${
                      activeCategory === category.key
                        ? "border-[#0A0A0A] animate-spin"
                        : "border-current"
                    }`}
                    style={{ animationDuration: "2s" }}
                  />
                  <span>{category.label.toUpperCase()}</span>
                  <div
                    className={`w-4 h-4 rounded-full border-2 ${
                      activeCategory === category.key
                        ? "border-[#0A0A0A] animate-spin"
                        : "border-current"
                    }`}
                    style={{ animationDuration: "2s" }}
                  />
                </div>
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider" />

      {/* Skills Grid */}
      <section className="py-16 px-4" data-testid="skills-grid">
        <div className="max-w-6xl mx-auto">
          {/* Category Title */}
          <div className="text-center mb-12">
            <h2
              className="font-retro text-xl"
              style={{ color: activeColor, textShadow: `0 0 20px ${activeColor}` }}
            >
              {activeCategory.toUpperCase()} TECHNOLOGIES
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentSkills.map((skill, index) => {
              const Icon = iconMap[skill.icon] || FaReact;
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  data-testid={`skill-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                  className={`p-6 rounded-lg border-2 transition-all duration-300 hover:border-[${activeColor}] hover:shadow-[0_0_30px_${activeColor}20] bg-[#1A1A1A] border-[#3E3E3E]`}
                  style={{
                    "--hover-color": activeColor,
                  }}
                >
                  {/* Skill Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${activeColor}20` }}
                      >
                        <Icon
                          className="w-6 h-6"
                          style={{ color: activeColor }}
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#F4F1E8]">
                          {skill.name}
                        </h3>
                        <p className="text-xs text-[#757575]">
                          {skill.years} experience
                        </p>
                      </div>
                    </div>
                    <span
                      className="font-retro text-lg"
                      style={{ color: activeColor }}
                    >
                      {skill.level}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="progress-vhs h-4">
                    <motion.div
                      className="h-full rounded"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      style={{
                        background: `linear-gradient(90deg, ${activeColor}80 0%, ${activeColor} 100%)`,
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider" />

      {/* Experience Section */}
      <section className="py-16 px-4" data-testid="experience-section">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-retro text-xl md:text-2xl text-[#FF006E] glow-magenta mb-4">
              WORK EXPERIENCE
            </h2>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="timeline-line" />

            {/* Experience Items */}
            {content.experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                data-testid={`experience-${exp.id}`}
                className="relative pl-12 pb-12 last:pb-0"
              >
                {/* Timeline Dot */}
                <div
                  className="timeline-dot"
                  style={{ top: "6px" }}
                />

                {/* Content */}
                <div className="p-6 rounded-lg border-2 bg-[#1A1A1A] border-[#3E3E3E]">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-accent text-xl font-bold text-[#F4F1E8]">
                        {exp.role}
                      </h3>
                      <p className="text-[#FF006E] font-medium">{exp.company}</p>
                    </div>
                    <span className="retro-badge">{exp.duration}</span>
                  </div>

                  <p className="mb-4 text-[#ABABAB]">
                    {exp.description}
                  </p>

                  <ul className="space-y-2">
                    {exp.highlights.map((highlight, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-[#ABABAB]"
                      >
                        <span className="text-[#39FF14] mt-1">▸</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SkillsPage;
