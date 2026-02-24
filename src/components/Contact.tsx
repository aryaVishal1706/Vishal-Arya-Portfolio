"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Linkedin, Github, Send, ExternalLink } from "lucide-react";

export default function Contact() {
    return (
        <section id="contact" className="py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-6xl font-black tracking-tight mb-6 text-gradient italic">Let's Connect</h2>
                    <div className="w-24 h-2 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full mb-8 transform -skew-x-12" />
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
                        Ready to help you scale your infrastructure or discuss intelligent data solutions. Let's build something extraordinary together.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Direct Access",
                            value: "vishalarya1706@gmail.com",
                            href: "mailto:vishalarya1706@gmail.com",
                            icon: <Mail className="text-blue-400" size={32} />,
                            action: "Send Email",
                            color: "blue"
                        },
                        {
                            title: "Social Hub",
                            value: "LinkedIn Profile",
                            href: "https://www.linkedin.com/in/vishalarya1706/",
                            icon: <Linkedin className="text-purple-400" size={32} />,
                            action: "Connect",
                            color: "purple"
                        },
                        {
                            title: "Code Repository",
                            value: "GitHub Portfolio",
                            href: "https://github.com/aryaVishal1706",
                            icon: <Github className="text-pink-400" size={32} />,
                            action: "Explore",
                            color: "pink"
                        }
                    ].map((item, i) => (
                        <motion.a
                            key={i}
                            href={item.href}
                            target="_blank"
                            rel="noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="glass-panel p-10 rounded-[3rem] group relative overflow-hidden flex flex-col items-center text-center hover:scale-105 transition-all duration-500"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br from-${item.color}-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mb-8 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 border border-white/10">
                                {item.icon}
                            </div>

                            <h3 className="text-sm font-black tracking-[0.2em] uppercase text-slate-500 mb-2">{item.title}</h3>
                            <p className="text-2xl font-bold text-white mb-8 truncate w-full px-4">{item.value}</p>

                            <div className="flex items-center gap-2 text-white font-bold px-8 py-3 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-white group-hover:text-slate-950 transition-all duration-300">
                                {item.action}
                                <ExternalLink size={18} />
                            </div>
                        </motion.a>
                    ))}
                </div>

                {/* Optional: Simple footer info in contact section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-20 text-center flex flex-col items-center gap-4"
                >
                    <div className="flex items-center gap-2 text-slate-500 font-bold">
                        <MapPin size={18} className="text-blue-500" />
                        Ahmedabad, Gujarat, India
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
