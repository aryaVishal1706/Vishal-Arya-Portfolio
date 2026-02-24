"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const PROJECTS = [
    {
        id: 1,
        title: "Floating Marine Debris Detection",
        category: "AI / ML",
        description: "Deep learning system using MARIDA dataset and satellite imagery (TensorFlow/Keras) identifying marine debris in real-time.",
        tech: ["Python", "TensorFlow", "Keras", "Remote Sensing"],
        link: "https://aryavishal1706.github.io/Vishal-Arya-Portfolio/",
        github: "https://github.com/aryaVishal1706/Floating-Marine-Debris-Detection-Using-Remote-Sensing-Data",
    },
    {
        id: 2,
        title: "French-to-English Machine Translation",
        category: "AI / ML",
        description: "Machine translation system using state-of-the-art neural networks and NLP to deliver accurate translations from French to English.",
        tech: ["Python", "Neural Networks", "NLP"],
        link: "https://github.com/aryaVishal1706/French-to-English-Machine-Translation",
        github: "https://github.com/aryaVishal1706/French-to-English-Machine-Translation",
    },
    {
        id: 3,
        title: "Customer Churn Detection",
        category: "Data Science",
        description: "Machine learning model designed to predict customer churn in a bank using predictive analytics techniques.",
        tech: ["Machine Learning", "Python", "Data Analysis"],
        link: "https://github.com/aryaVishal1706/Customer-Churn-Detection",
        github: "https://github.com/aryaVishal1706/Customer-Churn-Detection",
    },
    {
        id: 4,
        title: "Cats vs Dogs Classification",
        category: "AI / ML",
        description: "CNN model developed with TensorFlow/Keras to accurately classify images as either cats or dogs.",
        tech: ["TensorFlow", "Keras", "CNN", "Python"],
        link: "https://github.com/aryaVishal1706/Cats-vs-Dogs%20",
        github: "https://github.com/aryaVishal1706/Cats-vs-Dogs",
    },
    {
        id: 5,
        title: "Olympic Prediction",
        category: "Web Dev & ML",
        description: "Web app forecasting Gold or Silver medals using Machine Learning. Built with Django and Bootstrap.",
        tech: ["Django", "Python", "Bootstrap", "ML"],
        link: "https://github.com/aryaVishal1706/OLYMPIC-PREDICTION",
        github: "https://github.com/aryaVishal1706/OLYMPIC-PREDICTION",
    },
    {
        id: 6,
        title: "Campus Chatbot",
        category: "Web Dev",
        description: "Intelligent chatbot built with Django to assist students/faculty in accessing college information quickly.",
        tech: ["Django", "Python", "Web"],
        link: "https://github.com/aryaVishal1706/CampusChat",
        github: "https://github.com/aryaVishal1706/CampusChat",
    }
];

const CATEGORIES = ["All", "AI / ML", "Data Science", "Web Dev & ML", "Web Dev"];

export default function Projects() {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredProjects = PROJECTS.filter(
        (project) => activeCategory === "All" || project.category === activeCategory
    );

    return (
        <section id="projects" className="py-24 relative overflow-hidden bg-slate-900/50">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold tracking-tight mb-4 text-gradient">Featured Projects</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full mb-8" />

                    <div className="flex flex-wrap justify-center gap-2 mb-12">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat
                                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-purple-500/25"
                                        : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </motion.div>

                <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {filteredProjects.map((project) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                key={project.id}
                                className="glass-panel p-6 rounded-2xl flex flex-col group hover:-translate-y-2 transition-transform duration-300 border border-white/5 hover:border-purple-500/30 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-6 flex gap-3 text-slate-400">
                                    {project.github && (
                                        <a href={project.github} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors z-10">
                                            <Github size={20} />
                                        </a>
                                    )}
                                    {project.link && (
                                        <a href={project.link} target="_blank" rel="noreferrer" className="hover:text-purple-400 transition-colors z-10">
                                            <ExternalLink size={20} />
                                        </a>
                                    )}
                                </div>

                                <div className="text-xs font-semibold text-purple-400 mb-4 tracking-wider uppercase">
                                    {project.category}
                                </div>

                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors pr-16 relative z-10 leading-snug">
                                    {project.title}
                                </h3>

                                <p className="text-slate-400 mb-6 flex-grow text-sm relative z-10">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-auto relative z-10">
                                    {project.tech.map((t) => (
                                        <span key={t} className="px-2 py-1 text-xs font-medium bg-white/5 text-slate-300 rounded border border-white/5">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
