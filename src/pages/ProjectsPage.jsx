import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Globe, Cpu, Lock, Archive } from "lucide-react";
import ProjectCard from "../components/ProjectCard";
import ScreenshotModal from "../components/ScreenshotModal";

/* ─────────────────────────────────────────────
   SECTION HEADER
───────────────────────────────────────────── */
const SectionHeader = ({ type, label, icon, delay = 0 }) => (
  <motion.div
    className="section-type-header"
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
  >
    <div className={`section-type-label ${type}`}>
      <span className="flex items-center gap-2">
        {icon}
        {label}
      </span>
    </div>
    <div className={`section-type-line ${type}`} />
  </motion.div>
);

/* ─────────────────────────────────────────────
   PROJECTS PAGE
───────────────────────────────────────────── */
const ProjectsPage = ({ content }) => {
  const [modalState, setModalState] = useState({ open: false, project: null });
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  const { projects } = content;

  // Group by type — maintain narrative order
  const webapps  = projects.filter((p) => p.type === "webapp");
  const native   = projects.filter((p) => p.type === "native");
  const clients  = projects.filter((p) => p.type === "client");
  const archives = projects.filter((p) => p.type === "archive");

  const openModal = (project) => {
    if (project.screenshots && project.screenshots.length > 0) {
      setModalState({ open: true, project });
    }
  };

  const closeModal = () => setModalState({ open: false, project: null });

  return (
    <div data-testid="projects-page" className="pt-20 min-h-screen">

      {/* ── Page Header ── */}
      <section ref={headerRef} className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-6"
          >
            <h1 className="font-retro text-2xl md:text-3xl text-[#00F5FF] glow-cyan mb-4">
              PROJECT ARCHIVE
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-[#ABABAB]">
              A curated collection of real work — web apps, native tools, client deliveries, and
              experimental prototypes that shaped my journey.
            </p>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center gap-10 mt-8"
          >
            {[
              { label: "Web Apps",    value: webapps.length,  color: "#00F5FF" },
              { label: "Native",      value: native.length,   color: "#39FF14" },
              { label: "Client Work", value: clients.length,  color: "#FF006E" },
              { label: "Archived",    value: archives.length, color: "#B8860B" },
            ].map(({ label, value, color }) => (
              <div key={label} className="text-center">
                <p className="font-retro text-2xl mb-1" style={{ color, textShadow: `0 0 10px ${color}` }}>
                  {value}
                </p>
                <p className="text-xs text-[#757575] font-code">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── Web Applications ── */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            type="webapp"
            label="WEB APPLICATIONS"
            icon={<Globe className="w-3 h-3" />}
          />
          <div className="grid md:grid-cols-2 gap-8">
            {webapps.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onOpenModal={openModal}
              />
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" style={{ opacity: 0.4 }} />

      {/* ── Native Application ── */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            type="native"
            label="NATIVE APPLICATION"
            icon={<Cpu className="w-3 h-3" />}
          />
          {/* Single card — centered, max-width capped for balance */}
          <div className="grid md:grid-cols-2 gap-8">
            {native.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onOpenModal={openModal}
              />
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" style={{ opacity: 0.4 }} />

      {/* ── Client Work ── */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            type="client"
            label="CLIENT WORK"
            icon={<Lock className="w-3 h-3" />}
          />
          <div className="grid md:grid-cols-2 gap-8">
            {clients.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onOpenModal={openModal}
              />
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" style={{ opacity: 0.4 }} />

      {/* ── The Archives ── */}
      <section className="py-16 px-4 pb-24">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            type="archive"
            label="THE ARCHIVES"
            icon={<Archive className="w-3 h-3" />}
          />
          {/* Subtle note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs mb-8 -mt-4"
            style={{ color: "#6B5A30", fontFamily: "var(--font-code)" }}
          >
            // These projects are no longer maintained. Preserved here as a record of experimentation.
          </motion.p>
          <div className="grid md:grid-cols-2 gap-8">
            {archives.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onOpenModal={openModal}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Screenshot Modal ── */}
      {modalState.open && modalState.project && (
        <ScreenshotModal
          screenshots={modalState.project.screenshots}
          projectTitle={modalState.project.title}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default ProjectsPage;
