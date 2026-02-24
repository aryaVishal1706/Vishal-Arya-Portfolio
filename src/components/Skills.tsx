"use client";

import { motion } from "framer-motion";

const skillsByCategory = [
    {
        category: "Cloud & DevOps",
        items: ["Cloud Management", "AWS / Azure", "Infrastructure Monitoring", "24/7 Operations", "DevOps", "Automation"],
    },
    {
        category: "Programming",
        items: ["Python", "C/C++", "Java", "JavaScript", "TypeScript", "SQL"],
    },
    {
        category: "Development",
        items: ["React & Next.js", "Tailwind CSS", "API Design", "High Availability", "Scalability"],
    },
    {
        category: "Analytics & Tools",
        items: ["Data Science", "Machine Learning", "Monitoring Tools", "Data Structures", "Algorithms", "Remote Sensing"],
    },
];

export default function Skills() {
    return (
        <section id="skills" className="py-24 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold tracking-tight mb-4 text-gradient">Technical Skills</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full mb-6" />
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        A comprehensive overview of my technical expertise, encompassing cloud infrastructure, programming languages, and scalable web technologies.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {skillsByCategory.map((skillGroup, index) => (
                        <motion.div
                            key={skillGroup.category}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="glass-panel p-6 rounded-2xl flex flex-col h-full hover:-translate-y-2 transition-transform duration-300"
                        >
                            <h3 className="text-xl font-semibold mb-6 text-slate-200 border-b border-white/10 pb-4">
                                {skillGroup.category}
                            </h3>
                            <div className="flex flex-wrap gap-2 mt-auto">
                                {skillGroup.items.map((item) => (
                                    <span
                                        key={item}
                                        className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-slate-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white hover:border-transparent transition-all cursor-default"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
