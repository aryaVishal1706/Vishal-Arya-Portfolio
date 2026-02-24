import { Heart } from "lucide-react";

export default function Footer() {
    return (
        <footer className="py-8 border-t border-white/10 relative overflow-hidden text-center text-slate-400">
            <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent pointer-events-none" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col items-center justify-center gap-4">
                    <p className="text-sm font-medium tracking-wide">
                        © {new Date().getFullYear()} Arya Vishal. All rights reserved.
                    </p>
                    <p className="text-sm flex items-center justify-center gap-1.5 opacity-80">
                        Designed & Built with <Heart size={14} className="text-red-500 fill-red-500 animate-pulse" /> and Next.js
                    </p>
                </div>
            </div>
        </footer>
    );
}
