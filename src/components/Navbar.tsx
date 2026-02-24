"use client";

import { useState, useEffect } from "react";
import { Menu, X, Code2, Github } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-7xl z-50 transition-all duration-500 rounded-[2rem]",
                isScrolled
                    ? "glass-panel py-3 shadow-2xl border-white/10"
                    : "bg-transparent py-5"
            )}
        >
            <div className="px-6 md:px-10">
                <div className="flex justify-between items-center">
                    <a href="#" className="flex items-center gap-3 group cursor-pointer">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-700 flex items-center justify-center text-white font-bold group-hover:rotate-12 transition-transform duration-500">
                            <Code2 size={24} />
                        </div>
                        <span className="text-2xl font-black tracking-tighter text-white">
                            ARYA VISHAL
                        </span>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-10">
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-sm font-black tracking-widest uppercase text-slate-400 hover:text-white transition-all hover:scale-105"
                            >
                                {link.name}
                            </a>
                        ))}
                        <a
                            href="https://github.com/aryaVishal1706"
                            target="_blank"
                            rel="noreferrer"
                            className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all hover:rotate-12"
                        >
                            <Github size={20} className="text-white" />
                        </a>
                    </div>

                    {/* Mobile Navigation Toggle */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                        >
                            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden glass-panel absolute top-full left-0 w-full mt-4 rounded-[2rem] overflow-hidden border border-white/10 shadow-3xl animate-fade-in p-6">
                    <div className="flex flex-col space-y-6 text-center">
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-lg font-black tracking-widest uppercase text-slate-400 hover:text-white transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                        <div className="pt-4 border-t border-white/5 flex justify-center">
                            <a href="https://github.com/aryaVishal1706" target="_blank" rel="noreferrer" className="flex items-center gap-2 font-bold text-white">
                                <Github size={24} /> GitHub
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
