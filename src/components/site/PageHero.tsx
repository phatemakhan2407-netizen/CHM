import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function PageHero({
  image, eyebrow, title, subtitle, children,
}: {
  image: string;
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative min-h-[92svh] flex items-center overflow-hidden">
      <img
        src={image}
        alt=""
        aria-hidden
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Subtle dark overlay for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />

      {/* Subtle purple geometric accent */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#7B2C91]/70 to-transparent"
      />

      <div className="relative container-px w-full pt-32 pb-20">
        <div className="max-w-4xl">
          {eyebrow && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 px-4 py-1.5 text-xs font-semibold tracking-[0.25em] uppercase text-white mb-6"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#7B2C91]" />
              {eyebrow}
            </motion.div>
          )}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl font-bold leading-[1.05] text-white drop-shadow-lg"
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="mt-5 sm:mt-6 max-w-2xl text-lg text-white/85 leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-10"
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
