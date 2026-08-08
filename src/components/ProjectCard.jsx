import { useState } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Github,
  Monitor,
  Lock,
  Archive,
  Globe,
  Cpu,
  Calendar,
  ArrowRight,
  ImageOff,
  Play,
} from "lucide-react";
import ScreenshotModal from "./ScreenshotModal";

/* ─────────────────────────────────────────────
   TYPE CONFIG (colour palette per project type)
───────────────────────────────────────────── */
const TYPE_CONFIG = {
  webapp: {
    accent: "#00F5FF",
    glow: "rgba(0,245,255,0.15)",
    icon: <Globe className="w-4 h-4" />,
    label: "WEB APP",
  },
  native: {
    accent: "#39FF14",
    glow: "rgba(57,255,20,0.15)",
    icon: <Cpu className="w-4 h-4" />,
    label: "NATIVE APP",
  },
  client: {
    accent: "#FF006E",
    glow: "rgba(255,0,110,0.15)",
    icon: <Lock className="w-4 h-4" />,
    label: "CLIENT WORK",
  },
  archive: {
    accent: "#B8860B",
    glow: "rgba(139,105,20,0.15)",
    icon: <Archive className="w-4 h-4" />,
    label: "ARCHIVED",
  },
};

/* ─────────────────────────────────────────────
   CRT SCREENSHOT FRAME (shared sub-component)
───────────────────────────────────────────── */
const CrtFrame = ({ screenshots, projectTitle, onOpen }) => {
  const hasScreenshots = screenshots && screenshots.length > 0;

  return (
    <div
      className="crt-frame mb-5"
      onClick={hasScreenshots ? onOpen : undefined}
      style={{ cursor: hasScreenshots ? "pointer" : "default" }}
    >
      {hasScreenshots ? (
        <>
          <img
            src={screenshots[0]}
            alt={`${projectTitle} preview`}
            style={{ maxHeight: "160px", width: "100%", objectFit: "cover" }}
          />
          {screenshots.length > 1 && (
            <div
              className="crt-frame-label"
              style={{ display: "flex", alignItems: "center", gap: "4px" }}
            >
              <Play className="w-3 h-3" />
              {screenshots.length} screenshots
            </div>
          )}
        </>
      ) : (
        <div className="crt-no-screenshot">
          <ImageOff className="w-6 h-6" />
          <span>// screenshots coming soon</span>
        </div>
      )}
      <div className="crt-scanlines" />
      <div className="crt-glow" />
    </div>
  );
};

/* ─────────────────────────────────────────────
   SELF PORTFOLIO META-CARD
───────────────────────────────────────────── */
const SelfCard = ({ project, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="project-card-self vhs-card"
    data-testid={`project-${project.id}`}
  >
    <div className="self-inner">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="type-badge webapp">
          <Globe className="w-3 h-3" />
          WEB APP
        </span>
        <span className="self-meta-tag">// meta</span>
      </div>

      {/* Glitch Title */}
      <h3
        className="font-accent text-2xl font-bold mb-1 text-[#F4F1E8] glitch-text"
        data-text={project.title}
      >
        {project.title}
      </h3>
      <p className="text-[#FF006E] font-medium mb-3 text-sm">{project.tagline}</p>

      {/* Easter egg message */}
      <div
        className="mb-4 p-3 rounded"
        style={{
          background: "rgba(0,245,255,0.05)",
          border: "1px dashed rgba(0,245,255,0.25)",
          fontFamily: "var(--font-code)",
          fontSize: "12px",
          color: "var(--neon-cyan)",
        }}
      >
        <span style={{ color: "var(--text-muted)" }}>$ </span>
        You're currently viewing this project.
        <br />
        <span style={{ color: "var(--text-muted)" }}>$ </span>
        <span style={{ color: "#39FF14" }}>Status: RUNNING ✓</span>
      </div>

      <p className="mb-4 leading-relaxed text-[#ABABAB] text-sm">{project.description}</p>

      {/* Tech Tags */}
      <div className="flex flex-wrap gap-2 mb-5">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="text-xs px-3 py-1 rounded-full font-medium bg-[#2D2D2D] text-[#00F5FF] border border-[#3E3E3E]"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-[#3E3E3E]">
        <div className="flex items-center gap-2 text-sm text-[#757575]">
          <Calendar className="w-4 h-4" />
          {project.year}
        </div>
        <div className="flex gap-4">
          {project.links.github && project.links.github !== "#" && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-[#757575] hover:text-[#00F5FF] transition-colors"
            >
              <Github className="w-4 h-4" />
              Source
            </a>
          )}
          <a
            href={project.links.live || "#"}
            className="flex items-center gap-2 text-sm text-[#00F5FF] hover:underline transition-colors"
            style={{ cursor: "default" }}
          >
            <Monitor className="w-4 h-4" />
            Live (this page)
          </a>
        </div>
      </div>
    </div>
  </motion.div>
);

/* ─────────────────────────────────────────────
   ARCHIVE CARD (worn VHS treatment)
───────────────────────────────────────────── */
const ArchiveCard = ({ project, index, onOpenModal }) => {
  const hasScreenshots = project.screenshots && project.screenshots.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="project-card-archive vhs-card p-6 group"
      style={{ position: "relative" }}
      data-testid={`project-${project.id}`}
    >
      {/* VHS tracking lines overlay */}
      <div className="vhs-tracking-lines" />

      {/* ARCHIVED stamp */}
      <div className="archive-stamp">ARCHIVED</div>

      {/* Header */}
      <div className="flex items-start justify-between mb-4" style={{ paddingRight: "64px" }}>
        <span className="type-badge archive">
          <Archive className="w-3 h-3" />
          ARCHIVED
        </span>
        <span
          className="text-xs font-code"
          style={{ color: "#8B6914" }}
        >
          {project.year}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-accent text-xl font-bold mb-1" style={{ color: "#C8B88A" }}>
        {project.title}
      </h3>
      <p className="text-sm mb-3" style={{ color: "#8B7355" }}>
        {project.tagline}
      </p>
      <p className="mb-4 leading-relaxed text-sm" style={{ color: "#6B6B5A" }}>
        {project.description}
      </p>

      {/* CRT Frame */}
      <CrtFrame
        screenshots={project.screenshots}
        projectTitle={project.title}
        onOpen={() => hasScreenshots && onOpenModal(project)}
      />

      {/* Tech Tags — muted */}
      <div className="flex flex-wrap gap-2 mb-5">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="text-xs px-3 py-1 rounded-full font-medium"
            style={{
              background: "#1A1A10",
              color: "#6B6B4A",
              border: "1px solid #2A2A1A",
            }}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Evolved Into note */}
      {project.evolvedInto && (
        <div
          className="mb-4 flex items-center gap-2 text-xs"
          style={{ color: "#8B6914", fontFamily: "var(--font-code)" }}
        >
          <ArrowRight className="w-3 h-3" />
          Evolved into{" "}
          <span style={{ color: "#B8860B", fontWeight: "bold" }}>
            {project.evolvedInto === "tracesafe-v2" ? "TraceSafe v2.0" : project.evolvedInto}
          </span>
        </div>
      )}

      {/* No links — screenshots only */}
      {hasScreenshots && (
        <div className="pt-4 border-t" style={{ borderColor: "#2A2A1A" }}>
          <button
            onClick={() => onOpenModal(project)}
            className="flex items-center gap-2 text-xs transition-colors"
            style={{ color: "#8B6914", fontFamily: "var(--font-retro)", background: "none", border: "none", cursor: "pointer" }}
          >
            <Monitor className="w-3 h-3" />
            VIEW SCREENSHOTS
          </button>
        </div>
      )}
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   CLIENT CARD
───────────────────────────────────────────── */
const ClientCard = ({ project, index, onOpenModal }) => {
  const hasScreenshots = project.screenshots && project.screenshots.length > 0;
  const cfg = TYPE_CONFIG.client;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="vhs-card p-6 group transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px]"
      data-testid={`project-${project.id}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <span className="type-badge client">
          <Lock className="w-3 h-3" />
          CLIENT WORK
        </span>
        {project.clientInfo && (
          <span
            className="text-xs font-code"
            style={{ color: cfg.accent, opacity: 0.7 }}
          >
            {project.clientInfo.industry}
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="font-accent text-xl font-bold mb-1 text-[#F4F1E8]">{project.title}</h3>
      <p style={{ color: cfg.accent }} className="font-medium mb-3 text-sm">
        {project.tagline}
      </p>
      <p className="mb-4 leading-relaxed text-[#ABABAB] text-sm">{project.description}</p>

      {/* CRT Frame */}
      <CrtFrame
        screenshots={project.screenshots}
        projectTitle={project.title}
        onOpen={() => hasScreenshots && onOpenModal(project)}
      />

      {/* IP Notice */}
      <div
        className="mb-4 flex items-center gap-2 text-xs p-2 rounded"
        style={{
          background: "rgba(255,0,110,0.05)",
          border: "1px solid rgba(255,0,110,0.15)",
          color: "#FF006E",
          fontFamily: "var(--font-code)",
          opacity: 0.8,
        }}
      >
        <Lock className="w-3 h-3" />
        Source code is private — intellectual property of the client.
      </div>

      {/* Tech Tags */}
      <div className="flex flex-wrap gap-2 mb-5">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="text-xs px-3 py-1 rounded-full font-medium bg-[#2D2D2D] border border-[#3E3E3E]"
            style={{ color: cfg.accent }}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-[#3E3E3E]">
        <div className="flex items-center gap-2 text-sm text-[#757575]">
          <Calendar className="w-4 h-4" />
          {project.year}
        </div>
        {project.links.live && project.links.live !== "#" && (
          <a
            href={project.links.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-semibold transition-colors hover:underline"
            style={{ color: cfg.accent }}
          >
            <ExternalLink className="w-4 h-4" />
            Visit Site
          </a>
        )}
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   STANDARD CARD (webapp + native)
───────────────────────────────────────────── */
const StandardCard = ({ project, index, onOpenModal }) => {
  const hasScreenshots = project.screenshots && project.screenshots.length > 0;
  const cfg = TYPE_CONFIG[project.type] || TYPE_CONFIG.webapp;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="vhs-card p-6 group transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px]"
      data-testid={`project-${project.id}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <span className={`type-badge ${project.type}`}>
          {cfg.icon}
          {cfg.label}
        </span>
        {project.type === "native" && (
          <span
            className="text-xs font-code flex items-center gap-1"
            style={{ color: cfg.accent, opacity: 0.8 }}
          >
            <Cpu className="w-3 h-3" />
            Runs Locally
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="font-accent text-xl font-bold mb-1 text-[#F4F1E8]">{project.title}</h3>
      <p style={{ color: cfg.accent }} className="font-medium mb-3 text-sm">
        {project.tagline}
      </p>
      <p className="mb-4 leading-relaxed text-[#ABABAB] text-sm">{project.description}</p>

      {/* CRT Frame */}
      <CrtFrame
        screenshots={project.screenshots}
        projectTitle={project.title}
        onOpen={() => hasScreenshots && onOpenModal(project)}
      />

      {/* Tech Tags */}
      <div className="flex flex-wrap gap-2 mb-5">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="text-xs px-3 py-1 rounded-full font-medium bg-[#2D2D2D] border border-[#3E3E3E]"
            style={{ color: cfg.accent }}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-[#3E3E3E]">
        <div className="flex items-center gap-2 text-sm text-[#757575]">
          <Calendar className="w-4 h-4" />
          {project.year}
        </div>
        <div className="flex gap-4">
          {project.links.github && project.links.github !== "#" && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-[#757575] hover:text-[#00F5FF] transition-colors"
            >
              <Github className="w-4 h-4" />
              Source
            </a>
          )}
          {project.links.live && project.links.live !== "#" && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-semibold transition-colors hover:underline"
              style={{ color: cfg.accent }}
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   MAIN EXPORT — Smart card dispatcher
───────────────────────────────────────────── */
const ProjectCard = ({ project, index, onOpenModal }) => {
  if (project.isSelf) return <SelfCard project={project} index={index} />;
  if (project.type === "archive") return <ArchiveCard project={project} index={index} onOpenModal={onOpenModal} />;
  if (project.type === "client") return <ClientCard project={project} index={index} onOpenModal={onOpenModal} />;
  return <StandardCard project={project} index={index} onOpenModal={onOpenModal} />;
};

export default ProjectCard;
