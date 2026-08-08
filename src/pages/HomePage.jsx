import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Github,
  Linkedin,
  ExternalLink,
  Code2,
  Smartphone,
  Cloud,
  Lightbulb,
  ChevronRight,
  Star,
  Zap,
} from "lucide-react";

const HomePage = ({ content }) => {
  const heroRef = useRef(null);
  const projectsRef = useRef(null);
  const servicesRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const isProjectsInView = useInView(projectsRef, { once: true, margin: "-100px" });
  const isServicesInView = useInView(servicesRef, { once: true, margin: "-100px" });

  const featuredProjects = content.projects.filter((p) => p.featured);

  const serviceIcons = {
    FaCode: Code2,
    FaMobile: Smartphone,
    FaCloud: Cloud,
    FaLightbulb: Lightbulb,
  };

  const getColorClass = (color) => {
    const colors = {
      cyan: "from-[#00F5FF] to-[#0096FF]",
      magenta: "from-[#FF006E] to-[#BF00FF]",
      green: "from-[#39FF14] to-[#00F5FF]",
      yellow: "from-[#FFBE0B] to-[#FF6600]",
      purple: "from-[#BF00FF] to-[#FF006E]",
      amber: "from-[#B8860B] to-[#8B6914]",
    };
    return colors[color] || colors.cyan;
  };

  return (
    <div data-testid="home-page" className="pt-20">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="min-h-[90vh] flex items-center justify-center px-4 py-20"
      >
        <div className="max-w-6xl mx-auto w-full">
          <div className="crt-frame p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                {/* Status Badge — driven by availableForFreelance toggle in content.json */}
                {(() => {
                  const available = content.personal.availableForFreelance;
                  const color = available ? "#39FF14" : "#FFBE0B";
                  const text = available
                    ? content.personal.availability
                    : content.personal.availabilityIdle;
                  return (
                    <div
                      className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border"
                      style={{
                        borderColor: color,
                        background: `${color}18`,
                      }}
                    >
                      <span
                        className="status-indicator"
                        style={{
                          background: color,
                          boxShadow: `0 0 8px ${color}`,
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          display: "inline-block",
                        }}
                      />
                      <span className="font-code text-xs" style={{ color }}>
                        {text}
                      </span>
                    </div>
                  );
                })()}

                {/* Name */}
                <h1
                  className="font-retro text-2xl md:text-3xl lg:text-4xl text-[#00F5FF] glow-cyan mb-4 glitch-text"
                  data-text={content.personal.name.toUpperCase()}
                >
                  {content.personal.name.toUpperCase()}
                </h1>

                {/* Roles */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {content.personal.roles.map((role, index) => (
                    <span
                      key={role}
                      className="retro-badge"
                      style={{
                        animationDelay: `${index * 0.1}s`,
                      }}
                    >
                      {role}
                    </span>
                  ))}
                </div>

                {/* Tagline */}
                <p className="font-accent text-xl md:text-2xl text-[#FF006E] mb-4">
                  {content.personal.tagline}
                </p>

                {/* Bio */}
                <p className="text-base md:text-lg mb-8 leading-relaxed text-[#ABABAB]">
                  {content.personal.bio}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/projects"
                    data-testid="view-projects-btn"
                    className="btn-neon"
                  >
                    View Projects
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/contact"
                    data-testid="contact-btn"
                    className="btn-ghost"
                  >
                    Get In Touch
                  </Link>
                </div>

                {/* Social Links */}
                <div className="flex gap-4 mt-8">
                  <a
                    href={content.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    data-testid="hero-github"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href={content.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    data-testid="hero-linkedin"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </motion.div>

              {/* Right Content - Terminal */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="hidden md:block"
              >
                <div className="terminal">
                  <div className="terminal-header">
                    <div className="flex gap-2">
                      <div className="terminal-dot red" />
                      <div className="terminal-dot yellow" />
                      <div className="terminal-dot green" />
                    </div>
                    <span className="font-code text-xs text-[#757575] ml-4">
                      ~/rishabh
                    </span>
                  </div>
                  <div className="p-6 font-code text-sm">
                    <p className="text-[#757575]">$ whoami</p>
                    <p className="text-[#39FF14] mb-3">
                      {content.personal.name}
                    </p>

                    <p className="text-[#757575]">$ cat skills.txt</p>
                    <p className="text-[#00F5FF] mb-3">
                      {content.skills.frontend
                        .slice(0, 3)
                        .map((s) => s.name)
                        .join(", ")}
                      ...
                    </p>

                    <p className="text-[#757575]">$ echo $EXPERIENCE</p>
                    <p className="text-[#FFBE0B] mb-3">
                      {content.personal.yearsOfExperience} years of building
                      awesome stuff
                    </p>

                    <p className="text-[#757575]">$ ./start_collab.sh</p>
                    <p className="text-[#FF006E]">
                      <span className="inline-block w-2 h-4 bg-[#FF006E] animate-pulse mr-1" />
                      Ready to collaborate!
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                  {[
                    { label: "Years Exp", value: content.personal.yearsOfExperience },
                    { label: "Projects", value: `${content.projects.length}+` },
                    { label: "Technologies", value: "20+" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="p-4 rounded-lg text-center border bg-[#1A1A1A] border-[#3E3E3E]"
                    >
                      <p className="font-retro text-lg text-[#00F5FF]">
                        {stat.value}
                      </p>
                      <p className="text-xs text-[#757575] mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider" />

      {/* Featured Projects */}
      <section
        ref={projectsRef}
        className="py-20 px-4"
        data-testid="featured-projects"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isProjectsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-retro text-xl md:text-2xl text-[#00F5FF] glow-cyan mb-4">
              FEATURED PROJECTS
            </h2>
            <p className="max-w-2xl mx-auto text-[#ABABAB]">
              A selection of my best work showcasing diverse skills and creative solutions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isProjectsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                data-testid={`project-card-${project.id}`}
                className="vhs-card p-6 group cursor-pointer transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px]"
              >
                {/* Project Header */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getColorClass(
                      project.color
                    )} flex items-center justify-center`}
                  >
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <span className="retro-badge">{project.category}</span>
                </div>

                {/* Project Info */}
                <h3 className="font-accent text-xl font-semibold mb-2 text-[#F4F1E8]">
                  {project.title}
                </h3>
                <p className="text-sm text-[#FF006E] font-medium mb-3">
                  {project.tagline}
                </p>
                <p className="text-sm mb-4 line-clamp-3 text-[#ABABAB]">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-1 rounded bg-[#2D2D2D] text-[#00F5FF]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3 pt-4 border-t border-[#3E3E3E]">
                  {project.links.live && project.links.live !== "#" && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-[#00F5FF] hover:underline"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Live Demo
                    </a>
                  )}
                  {project.links.github && project.links.github !== "#" && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-[#757575] hover:text-[#00F5FF]"
                    >
                      <Github className="w-3 h-3" />
                      Code
                    </a>
                  )}
                  {project.type === "native" && (
                    <span className="flex items-center gap-1 text-xs text-[#39FF14] opacity-70">
                      Runs Locally
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <Link
              to="/projects"
              data-testid="view-all-projects"
              className="btn-vintage inline-flex items-center gap-2"
            >
              VIEW ALL PROJECTS
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider" />

      {/* Services Section */}
      <section
        ref={servicesRef}
        className="py-20 px-4"
        data-testid="services-section"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-retro text-xl md:text-2xl text-[#FF006E] glow-magenta mb-4">
              WHAT I DO
            </h2>
            <p className="max-w-2xl mx-auto text-[#ABABAB]">
              Comprehensive development services to bring your ideas to life
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.services.map((service, index) => {
              const Icon = serviceIcons[service.icon] || Code2;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  data-testid={`service-${service.id}`}
                  className="p-6 rounded-lg border-2 transition-all duration-300 hover:border-[#00F5FF] hover:shadow-[0_0_30px_rgba(0,245,255,0.2)] bg-[#1A1A1A] border-[#3E3E3E]"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00F5FF] to-[#FF006E] flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-accent text-lg font-semibold mb-2 text-[#F4F1E8]">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#ABABAB]">
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider" />

      {/* Testimonials */}
      <section className="py-20 px-4" data-testid="testimonials-section">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-retro text-xl md:text-2xl text-[#FFBE0B] mb-4">
              CLIENT FEEDBACK
            </h2>
            <p className="max-w-2xl mx-auto text-[#ABABAB]">
              What people say about working with me
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {content.testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="testimonial-card"
                data-testid={`testimonial-${testimonial.id}`}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-[#FFBE0B] fill-[#FFBE0B]"
                    />
                  ))}
                </div>
                <p className="mb-6 italic text-[#ABABAB]">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00F5FF] to-[#FF006E] flex items-center justify-center">
                    <span className="font-bold text-white text-sm">
                      {testimonial.avatar}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-[#F4F1E8]">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-[#757575]">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-[#1A1A1A]" data-testid="cta-section">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-retro text-xl md:text-2xl text-[#00F5FF] glow-cyan mb-4">
            LET'S BUILD SOMETHING AMAZING
          </h2>
          <p className="text-lg mb-8 text-[#ABABAB]">
            Have a project in mind? Let's discuss how we can work together to
            bring your vision to life.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn-neon">
              Start a Project
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`mailto:${content.personal.email}`}
              className="btn-ghost"
            >
              Email Me Directly
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
