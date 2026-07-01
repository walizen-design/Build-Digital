import { motion } from 'motion/react';
import { Project } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  key?: string | number;
  project: Project;
  onClick: () => void;
  index: number;
}

export default function ProjectCard({ project, onClick, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/40 backdrop-blur-sm"
    >
      {/* Image container with scale effect */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-950">
        <img
          src={project.image}
          alt={project.title}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Soft elegant gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-80" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-6 text-left">
        {/* Category tag */}
        <span className="inline-block rounded-full bg-white/10 backdrop-blur-md px-3 py-1 text-[11px] font-mono tracking-wider uppercase text-neutral-300 border border-white/5 mb-3">
          {project.category}
        </span>

        {/* Title and Arrow */}
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-display text-xl font-medium text-white group-hover:text-neutral-200 transition-colors">
            {project.title}
          </h3>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white border border-white/5 group-hover:bg-white group-hover:text-neutral-950 transition-all duration-300">
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:rotate-45" />
          </div>
        </div>

        {/* Brief description */}
        <p className="mt-2 text-sm text-neutral-400 line-clamp-2 leading-relaxed">
          {project.description}
        </p>
      </div>
    </motion.div>
  );
}
