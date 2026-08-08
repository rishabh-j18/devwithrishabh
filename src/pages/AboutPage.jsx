import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Download,
  MapPin,
  Calendar,
  Award,
  Heart,
  Coffee,
  Code,
  Zap,
  Briefcase,
  GraduationCap,
} from "lucide-react";

const AboutPage = ({ content }) => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  const highlights = [
    { icon: Code, label: "Lines of Code", value: "500K+" },
    { icon: Coffee, label: "Cups of Coffee", value: "∞" },
    { icon: Award, label: "Projects Delivered", value: `${content.projects.length}+` },
    { icon: Heart, label: "Happy Clients", value: "50+" },
  ];

  const values = [
    {
      title: "Clean Code",
      description: "Writing maintainable, scalable code that stands the test of time.",
      color: "#00F5FF",
    },
    {
      title: "User First",
      description: "Every decision is made with the end user experience in mind.",
      color: "#FF006E",
    },
    {
      title: "Continuous Learning",
      description: "Staying updated with the latest technologies and best practices.",
      color: "#39FF14",
    },
    {
      title: "Collaboration",
      description: "Building strong partnerships and working effectively in teams.",
      color: "#FFBE0B",
    },
  ];

  return (
    <div data-testid="about-page" className="pt-20 min-h-screen">
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
              ABOUT.README
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-[#ABABAB]">
              Get to know the developer behind the code
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider" />

      {/* Bio Section */}
      <section className="py-16 px-4" data-testid="bio-section">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="crt-frame p-8">
                {/* Avatar */}
                <div className="flex flex-col items-center mb-8">
                  <div className="w-40 h-40 rounded-2xl bg-gradient-to-br from-[#00F5FF] to-[#FF006E] p-1 mb-4">
                    <div
                      className="w-full h-full rounded-xl flex items-center justify-center text-6xl font-retro bg-[#0A0A0A]"
                    >
                      <span className="text-[#00F5FF]">
                        {content.personal.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <h2 className="font-retro text-xl text-[#00F5FF] glow-cyan">
                    {content.personal.name.toUpperCase()}
                  </h2>
                  <p className="text-[#FF006E] font-medium mt-2">
                    {content.personal.tagline}
                  </p>
                </div>

                {/* Quick Info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-[#FFBE0B]" />
                    <span className="text-[#ABABAB]">
                      {content.personal.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-[#39FF14]" />
                    <span className="text-[#ABABAB]">
                      {content.personal.yearsOfExperience} Years Experience
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-[#00F5FF]" />
                    <span className="text-[#ABABAB]">
                      {content.personal.availability}
                    </span>
                  </div>
                </div>

                {/* Roles */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {content.personal.roles.map((role) => (
                    <span key={role} className="retro-badge">
                      {role}
                    </span>
                  ))}
                </div>

                {/* Download Resume Button */}
                <button
                  className="btn-vintage w-full mt-8 flex items-center justify-center gap-2"
                  data-testid="download-resume"
                >
                  <Download className="w-4 h-4" />
                  DOWNLOAD RESUME
                </button>
              </div>
            </motion.div>

            {/* Bio Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="terminal">
                <div className="terminal-header">
                  <div className="flex gap-2">
                    <div className="terminal-dot red" />
                    <div className="terminal-dot yellow" />
                    <div className="terminal-dot green" />
                  </div>
                  <span className="font-code text-xs text-[#757575] ml-4">
                    ~/about/bio.md
                  </span>
                </div>
                <div className="p-6 font-code text-sm space-y-4">
                  <p className="text-[#757575]">$ cat bio.md</p>
                  <p className="text-[#ABABAB]">
                    {content.personal.bio}
                  </p>
                  <p className="text-[#00F5FF]">---</p>
                  <p className="text-[#FFBE0B]">
                    When I'm not coding, you'll find me exploring new technologies,
                    contributing to open source, or sharing knowledge with the
                    developer community.
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                {highlights.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="p-4 rounded-lg border-2 text-center bg-[#1A1A1A] border-[#3E3E3E]"
                    >
                      <Icon className="w-6 h-6 mx-auto mb-2 text-[#FF006E]" />
                      <p className="font-retro text-xl text-[#00F5FF]">
                        {stat.value}
                      </p>
                      <p className="text-xs text-[#757575] mt-1">{stat.label}</p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider" />

      {/* Values Section */}
      <section
        className="py-16 px-4"
        data-testid="values-section"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-retro text-xl md:text-2xl text-[#FF006E] glow-magenta mb-4">
              CORE VALUES
            </h2>
            <p className="max-w-2xl mx-auto text-[#ABABAB]">
              Principles that guide my work and professional relationships
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-lg border-2 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,245,255,0.2)] bg-[#1A1A1A] border-[#3E3E3E]"
              >
                {/* Bar + Title side-by-side */}
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-1.5 h-8 rounded-full flex-shrink-0"
                    style={{ backgroundColor: value.color, boxShadow: `0 0 8px ${value.color}` }}
                  />
                  <h3
                    className="font-accent text-lg font-bold text-[#F4F1E8]"
                    style={{ textShadow: `0 0 12px ${value.color}40` }}
                  >
                    {value.title}
                  </h3>
                </div>
                <p className="text-sm text-[#ABABAB] pl-4">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider" />

      {/* Journey Timeline */}
      <section className="py-16 px-4" data-testid="journey-section">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-retro text-xl md:text-2xl text-[#FFBE0B] mb-4">
              MY JOURNEY
            </h2>
          </div>

          <div className="relative">
            <div className="timeline-line" />

            {content.experience.map((exp, index) => {
              const isWork = exp.type === "work";
              const Icon = isWork ? Briefcase : GraduationCap;
              const accentColor = isWork ? "#00F5FF" : "#FFBE0B";
              const glowColor = isWork ? "rgba(0,245,255,0.3)" : "rgba(255,190,11,0.3)";

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative pl-12 pb-12 last:pb-0"
                >
                  {/* Timeline dot with icon */}
                  <div
                    className="absolute left-0 w-9 h-9 rounded-full flex items-center justify-center border-2 bg-[#0A0A0A]"
                    style={{
                      top: "6px",
                      borderColor: accentColor,
                      boxShadow: `0 0 10px ${glowColor}`,
                    }}
                  >
                    <Icon className="w-4 h-4" style={{ color: accentColor }} />
                  </div>

                  <div className="vhs-card p-6">
                    {/* Type label */}
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div>
                        <span
                          className="text-xs font-retro mb-1 block"
                          style={{ color: accentColor, fontSize: "9px", letterSpacing: "0.1em" }}
                        >
                          {isWork ? "WORK" : "EDUCATION"}
                        </span>
                        <h3 className="font-accent text-xl font-bold text-[#F4F1E8]">
                          {exp.role}
                        </h3>
                        <p className="font-medium mt-0.5" style={{ color: accentColor }}>
                          {exp.company}
                        </p>
                      </div>
                      <span className="retro-badge">{exp.duration}</span>
                    </div>

                    <p className="text-[#ABABAB] mb-4">{exp.description}</p>

                    {/* Highlights */}
                    {exp.highlights && exp.highlights.length > 0 && (
                      <ul className="space-y-1.5">
                        {exp.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-[#757575]">
                            <span style={{ color: accentColor, marginTop: "2px", flexShrink: 0 }}>▸</span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
