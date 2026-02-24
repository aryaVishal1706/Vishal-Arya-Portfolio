"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";

const CERTIFICATIONS = [
    {
        title: "Unsupervised Learning, Recommenders, Reinforcement Learning",
        issuer: "Coursera",
        link: "https://coursera.org/share/b8f11d4d71cbe24f870b6b380e734a75",
        description: "Uncovered hidden patterns in data, built personalized recommendation systems, and optimized decision-making with reinforcement learning."
    },
    {
        title: "Supervised Machine Learning: Regression and Classification",
        issuer: "Coursera",
        link: "https://coursera.org/share/b97768d47a7651198663120d1a8498f3",
        description: "Mastered supervised machine learning techniques, focusing on regression and classification algorithms."
    },
    {
        title: "Mind Hackathon - 2nd Runner Up",
        issuer: "Nirma University",
        description: "Collaborated with a team to develop innovative solutions, demonstrating strong problem-solving and teamwork skills."
    },
    {
        title: "E-Series Course",
        issuer: "Universal Robot",
        description: "Intensive course on practical applications of robotic arm technology, programming, and operation."
    },
    {
        title: "Block Chain Technology",
        issuer: "Foundation",
        description: "Foundational knowledge of cryptography, distributed ledger technology, and smart contracts."
    }
];

export default function Certifications() {
    return (
        <section id="certifications" className="py-24 relative overflow-hidden bg-slate-900/30">
            <div className="absolute left-0 bottom-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold tracking-tight mb-4 text-gradient">Certifications & Awards</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full mb-8" />
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {CERTIFICATIONS.map((cert, index) => (
                        <motion.div
                            key={cert.title}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="glass-panel p-6 rounded-2xl flex flex-col group hover:border-blue-500/30 transition-colors"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform">
                                    <Award className="text-blue-400" />
                                </div>
                                {cert.link && (
                                    <a href={cert.link} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white transition-colors">
                                        <ExternalLink size={20} />
                                    </a>
                                )}
                            </div>
                            <h3 className="text-xl font-bold text-slate-200 mb-2">{cert.title}</h3>
                            <p className="text-sm font-medium text-blue-400 mb-3">{cert.issuer}</p>
                            <p className="text-slate-400 text-sm flex-grow">
                                {cert.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
