import { motion } from 'motion/react';
import { Project } from '../types';
import { X, Calendar, User, Layout, ArrowRight } from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.85 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-neutral-950 backdrop-blur-md"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-neutral-900 bg-gradient-to-b from-neutral-900 to-neutral-950 p-6 sm:p-8 md:p-10 text-left shadow-2xl text-neutral-200"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 rounded-full p-2 text-neutral-400 hover:bg-white/5 hover:text-white transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Category & Title */}
        <div className="mb-4">
          <span className="rounded-full bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1 text-xs font-mono tracking-wider uppercase text-indigo-300">
            {project.category}
          </span>
        </div>
        <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white mb-6">
          {project.title}
        </h2>

        {/* Hero image inside detail modal */}
        <div className="w-full aspect-[21/9] overflow-hidden rounded-2xl border border-white/5 bg-neutral-950 mb-8">
          <img
            src={project.image}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Column: Descriptions */}
          <div className="md:col-span-7 space-y-6">
            <div>
              <h4 className="text-xs font-mono tracking-wider text-neutral-400 uppercase mb-2">Overview</h4>
              <p className="text-base text-neutral-300 leading-relaxed">
                {project.longDescription}
              </p>
            </div>

            {/* Metrics block */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
              <h4 className="text-xs font-mono tracking-wider text-neutral-300 uppercase mb-4 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Performance Outcomes
              </h4>
              <ul className="space-y-3.5">
                {project.metrics.map((metric, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm font-medium text-neutral-200">
                    <ArrowRight className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{metric}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Metadata Details */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-neutral-950/40 border border-white/5 rounded-2xl p-6 space-y-5">
              <h4 className="text-xs font-mono tracking-wider text-neutral-400 uppercase">Project Metadata</h4>
              
              <div className="flex items-start gap-3 text-sm">
                <Layout className="h-5 w-5 text-neutral-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Client</p>
                  <p className="text-neutral-400 mt-0.5">{project.client}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm">
                <Calendar className="h-5 w-5 text-neutral-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Duration</p>
                  <p className="text-neutral-400 mt-0.5">{project.duration}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm">
                <User className="h-5 w-5 text-neutral-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Our Role</p>
                  <p className="text-neutral-400 mt-0.5">{project.role}</p>
                </div>
              </div>
            </div>

            <div className="text-center p-6 bg-indigo-500/5 rounded-2xl border border-indigo-500/10">
              <p className="text-sm text-neutral-300 mb-4">Want to achieve similar strategic results for your product?</p>
              <button
                onClick={() => {
                  onClose();
                  // Trigger scroll to book a call
                  const element = document.getElementById('book-call');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full rounded-xl bg-white text-neutral-950 font-semibold text-xs py-3 hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                Let's discuss your project
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
