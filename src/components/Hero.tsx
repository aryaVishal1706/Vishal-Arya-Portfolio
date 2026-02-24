"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Download, Mail, ChevronRight } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-start lg:items-center justify-center pt-64 lg:pt-32 overflow-hidden">
            {/* Dynamic visual backgrounds */}
            <div className="absolute top-0 left-0 w-full h-full -z-10">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-blob" />
                <div
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-blob"
                    style={{ animationDelay: "2s" }}
                />
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/5 rounded-full blur-[160px] animate-pulse-slow"
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20">
                <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-16 lg:gap-8">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="flex-1 text-center lg:text-left"
                    >
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-blue-400 text-sm font-semibold mb-8 shadow-2xl"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            Available for new opportunities
                        </motion.div>

                        <h1 className="text-6xl lg:text-8xl font-black tracking-tight mb-8 leading-[1.1]">
                            Hi, I'm <br />
                            <span className="text-gradient">Arya Vishal</span>
                        </h1>

                        <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
                            A versatile <strong className="text-white">Cloud Engineer & Infrastructure Specialist</strong> managing 24x7 mission-critical smart meter systems. I also thrive at the intersection of <strong className="text-white text-gradient">AI/ML, Data Science, and Web Development</strong>.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                            <a
                                href="#projects"
                                className="group relative flex items-center gap-2 px-10 py-5 bg-white text-slate-950 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)] overflow-hidden"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-10 transition-opacity" />
                                View My Work
                                <ChevronRight size={22} className="group-hover:translate-x-1 transition-transform" />
                            </a>

                            <a
                                href="/Resume.pdf"
                                download="Arya_Vishal_Resume.pdf"
                                className="group flex items-center gap-2 px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 glass-panel"
                            >
                                <Download size={22} className="group-hover:-translate-y-1 transition-transform" />
                                Download CV
                            </a>
                        </div>

                        <div className="mt-16 flex items-center justify-center lg:justify-start gap-10 text-slate-400">
                            <div className="group">
                                <span className="block text-3xl font-black text-white group-hover:text-blue-400 transition-colors">20+</span>
                                <span className="text-sm font-bold tracking-widest uppercase opacity-60">Projects Built</span>
                            </div>
                            <div className="w-px h-12 bg-white/5" />
                            <div className="group">
                                <span className="block text-3xl font-black text-white group-hover:text-purple-400 transition-colors">5+</span>
                                <span className="text-sm font-bold tracking-widest uppercase opacity-60">Certifications</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Avatar / Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                        className="flex-1 flex justify-center lg:justify-end relative"
                    >
                        <div className="relative w-80 h-80 md:w-96 md:h-96">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-[2rem] md:rounded-[3rem] rotate-6 opacity-50 blur-lg mix-blend-screen animate-pulse" />
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-[2rem] md:rounded-[3rem] -rotate-6 transition-transform hover:rotate-0 duration-500" />
                            <div className="absolute inset-1 bg-slate-900 rounded-[2rem] md:rounded-[3rem] overflow-hidden flex items-center justify-center border border-white/10">
                                <Image
                                    src="/vishal-avatar.png"
                                    alt="Arya Vishal"
                                    layout="fill"
                                    objectFit="cover"
                                    className="hover:scale-110 transition-transform duration-700 opacity-90 hover:opacity-100"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
