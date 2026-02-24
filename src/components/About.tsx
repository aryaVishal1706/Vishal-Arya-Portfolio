"use client";

import { motion } from "framer-motion";
import { BookOpen, MapPin, Award } from "lucide-react";

export default function About() {
    return (
        <section id="about" className="py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold tracking-tight mb-4 hidden-heading text-gradient">About Me</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full" />
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    >
                        <h3 className="text-4xl font-extrabold mb-8 text-white">
                            Designing the future of <span className="text-gradient">Infrastructure</span>
                        </h3>
                        <div className="space-y-6 text-lg text-slate-400 leading-relaxed">
                            <p>
                                Welcome to my portfolio! I'm <strong className="text-white">Arya Vishal</strong>, a Cloud Engineer with a deep-seated passion for infrastructure, automation, and distributed systems.
                            </p>
                            <p>
                                From optimizing network configurations to exploring high-availability architectures, I've always been driven by the challenge of building resilient systems that operate 24x7 without a hitch.
                            </p>
                            <p>
                                While my professional focus centers on mastering cloud environments and 24x7 mission-critical infrastructure, I am equally passionate about <strong className="text-white">AI/ML and Data Science</strong>. I believe in the synergy between cloud scalability and data intelligence to build truly transformative, self-optimizing systems.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="grid sm:grid-cols-1 gap-6"
                    >
                        {[
                            {
                                icon: <MapPin className="text-blue-400" size={24} />,
                                title: "Location",
                                detail: "Ahmedabad, Gujarat, India",
                                color: "blue"
                            },
                            {
                                icon: <BookOpen className="text-purple-400" size={24} />,
                                title: "Education",
                                detail: "B.Tech in Computer Science and Engineering, Nirma University (Expected 2026)",
                                color: "purple"
                            },
                            {
                                icon: <Award className="text-pink-400" size={24} />,
                                title: "Specialization",
                                detail: "Cloud Computing, DevOps, Infrastructure as Code, Machine Learning, Data Science, LLM, High Availability Systems",
                                color: "pink"
                            }
                        ].map((item, i) => (
                            <div key={i} className="glass-panel p-8 rounded-3xl group relative overflow-hidden transition-all duration-500 hover:translate-x-2">
                                <div className={`absolute top-0 left-0 w-1 h-full bg-${item.color}-500 opacity-50`} />
                                <div className="flex items-center gap-6">
                                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold tracking-widest uppercase text-slate-500 mb-1">{item.title}</h4>
                                        <p className="text-lg font-semibold text-slate-200">{item.detail}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
