import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Instagram,
  Clock,
  CheckCircle,
} from "lucide-react";

const ContactPage = ({ content }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission (replace with actual handler)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  const socialLinks = [
    { icon: Github, href: content.social.github, label: "GitHub", color: "#ABABAB" },
    { icon: Linkedin, href: content.social.linkedin, label: "LinkedIn", color: "#0077B5" },
    { icon: Instagram, href: content.social.instagram, label: "Instagram", color: "#E4405F" },
  ];

  return (
    <div data-testid="contact-page" className="pt-20 min-h-screen">
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
              CONNECTION TERMINAL
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-[#ABABAB]">
              Ready to start a conversation? Drop me a message and let's build
              something amazing together.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider" />

      {/* Contact Form & Info */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Terminal Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="terminal" data-testid="contact-form-terminal">
                <div className="terminal-header">
                  <div className="flex gap-2">
                    <div className="terminal-dot red" />
                    <div className="terminal-dot yellow" />
                    <div className="terminal-dot green" />
                  </div>
                  <span className="font-code text-xs text-[#757575] ml-4">
                    connect_with_me.exe
                  </span>
                </div>

                <div className="p-6">
                  {/* Terminal Output */}
                  <div className="font-code text-sm mb-6 space-y-1">
                    <p className="text-[#757575]">
                      C:\CONTACT{">"}connect_with_me.exe
                    </p>
                    <p className="text-[#00F5FF]">
                      {">"}Initializing connection protocol...
                    </p>
                    <p className="text-[#39FF14]">
                      {">"}Ready to receive message
                    </p>
                  </div>

                  {/* Success Message */}
                  {isSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 p-4 mb-6 rounded-lg bg-[#39FF14]/10 border border-[#39FF14]"
                    >
                      <CheckCircle className="w-5 h-5 text-[#39FF14]" />
                      <span className="font-code text-sm text-[#39FF14]">
                        Message transmitted successfully!
                      </span>
                    </motion.div>
                  )}

                  {/* Contact Form */}
                  <form onSubmit={handleSubmit} data-testid="contact-form">
                    <div className="space-y-4">
                      <div>
                        <label className="block font-code text-xs text-[#00F5FF] mb-2">
                          {">"}NAME
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          data-testid="input-name"
                          className="input-terminal"
                          placeholder="Enter your name"
                        />
                      </div>

                      <div>
                        <label className="block font-code text-xs text-[#00F5FF] mb-2">
                          {">"}EMAIL
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          data-testid="input-email"
                          className="input-terminal"
                          placeholder="your.email@example.com"
                        />
                      </div>

                      <div>
                        <label className="block font-code text-xs text-[#00F5FF] mb-2">
                          {">"}SUBJECT
                        </label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          data-testid="input-subject"
                          className="input-terminal"
                          placeholder="What's this about?"
                        />
                      </div>

                      <div>
                        <label className="block font-code text-xs text-[#00F5FF] mb-2">
                          {">"}MESSAGE
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          data-testid="input-message"
                          className="input-terminal resize-none"
                          placeholder="Type your message here..."
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        data-testid="submit-button"
                        className="btn-neon w-full justify-center"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="loader-reel w-5 h-5" />
                            TRANSMITTING...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            TRANSMIT MESSAGE
                          </>
                        )}
                      </button>
                    </div>
                  </form>

                  {/* Status */}
                  <div className="mt-6 pt-4 border-t border-[#3E3E3E] font-code text-xs space-y-2">
                    <p className="flex items-center gap-2 text-[#757575]">
                      <span className="status-indicator online" />
                      STATUS: <span className="text-[#39FF14]">ONLINE</span>
                    </p>
                    <p className="flex items-center gap-2 text-[#757575]">
                      <Clock className="w-3 h-3" />
                      RESPONSE TIME: <span className="text-[#FFBE0B]">WITHIN 24 HOURS</span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Contact Details */}
              <div
                className="p-8 rounded-lg border-4 bg-[#1A1A1A] border-[#8B6F47]"
                data-testid="contact-details"
              >
                <h3 className="font-retro text-lg text-[#FF006E] mb-6">
                  DIRECT CHANNELS
                </h3>

                <div className="space-y-6">
                  <a
                    href={`mailto:${content.personal.email}`}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-14 h-14 rounded-lg bg-[#FF006E]/10 flex items-center justify-center group-hover:bg-[#FF006E]/20 transition-colors">
                      <Mail className="w-6 h-6 text-[#FF006E]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#757575] uppercase">Email</p>
                      <p className="font-medium text-[#F4F1E8]">
                        {content.personal.email}
                      </p>
                    </div>
                  </a>

                  <a
                    href={`tel:${content.personal.phone}`}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-14 h-14 rounded-lg bg-[#39FF14]/10 flex items-center justify-center group-hover:bg-[#39FF14]/20 transition-colors">
                      <Phone className="w-6 h-6 text-[#39FF14]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#757575] uppercase">Phone</p>
                      <p className="font-medium text-[#F4F1E8]">
                        {content.personal.phone}
                      </p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-lg bg-[#FFBE0B]/10 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-[#FFBE0B]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#757575] uppercase">Location</p>
                      <p className="font-medium text-[#F4F1E8]">
                        {content.personal.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div
                className="p-8 rounded-lg border-4 bg-[#1A1A1A] border-[#8B6F47]"
                data-testid="social-links"
              >
                <h3 className="font-retro text-lg text-[#00F5FF] mb-6">
                  ALTERNATE CHANNELS
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid={`social-${social.label.toLowerCase()}`}
                        className="flex items-center gap-3 p-4 rounded-lg border-2 transition-all duration-300 hover:border-[#00F5FF] hover:shadow-[0_0_20px_rgba(0,245,255,0.2)] bg-[#0A0A0A] border-[#3E3E3E]"
                      >
                        <Icon
                          className="w-5 h-5"
                          style={{ color: social.color }}
                        />
                        <span className="text-sm font-medium text-[#ABABAB]">
                          {social.label}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Availability Card */}
              <div className="p-6 rounded-lg border-2 border-[#39FF14] bg-[#39FF14]/5">
                <div className="flex items-center gap-3">
                  <span className="status-indicator online" />
                  <div>
                    <p className="font-retro text-sm text-[#39FF14]">
                      CURRENTLY AVAILABLE
                    </p>
                    <p className="text-sm text-[#757575]">
                      {content.personal.availability}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
