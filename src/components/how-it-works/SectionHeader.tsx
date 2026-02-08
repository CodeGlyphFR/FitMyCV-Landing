"use client";
import { SparklesCore } from "@/components/ui/sparkles";

export default function SectionHeader() {
  return (
    <div className="w-full flex flex-col items-center justify-center overflow-hidden">
      <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-6">
        Comment ça marche
      </div>
      <h2 className="md:text-5xl text-3xl lg:text-6xl font-extrabold text-center text-white relative z-20 tracking-tight leading-tight">
        Un workflow simple,
        <br />
        des résultats puissants
      </h2>
      <div className="w-[40rem] max-w-full h-40 relative">
        {/* Gradients — brand colors */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-emerald-400 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-emerald-400 to-transparent h-px w-1/4" />

        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />

        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 w-full h-full bg-[#0a0a1a] [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]" />
      </div>
      <p className="text-white/50 text-sm md:text-base max-w-[550px] text-center leading-relaxed -mt-12 relative z-10">
        Importez votre CV, laissez l&apos;IA l&apos;optimiser pour chaque offre,
        et exportez un document parfaitement adapté.
      </p>
    </div>
  );
}
