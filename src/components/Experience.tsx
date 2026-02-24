"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Calendar } from "lucide-react";

const WORK_EXPERIENCE = [
    {
        role: "Research Associate",
        company: "CloudThat",
        duration: "Jul 2025 – Present",
        description: "Managing mission-critical smart meter infrastructure for a 24x7 large-scale project. Responsible for cloud infrastructure management, monitoring, and ensuring high availability for distributed systems.",
        tags: ["Cloud Management", "AWS", "Monitoring", "24/7 Support"]
    },
    {
        role: "Research Intern",
        company: "CloudThat",
        duration: "Jan 2025 – Jul 2025",
        description: "Supported cloud-based solutions and infrastructure monitoring. Gained hands-on experience in DevOps practices and ensuring system uptime.",
        tags: ["DevOps", "Infrastructure", "Linux", "Azure"]
    },
    {
        role: "Summer Research Intern (ISRO-funded Project)",
        company: "Nirma University",
        duration: "May 2024 – Jul 2024",
        description: "Authored deep learning models using TensorFlow and Keras to classify marine debris images from remote sensing data. Implemented advanced image augmentation pipelines.",
        tags: ["Deep Learning", "Python", "TensorFlow", "Remote Sensing"]
    },
    {
        role: "Software Engineer (Intern)",
        company: "Lauruss Infoways Pvt Ltd",
        duration: "Previous Internship",
        description: "Gained hands-on experience in software development life cycles and modern programming practices.",
        tags: ["PHP", "JavaScript", "SQL", "Web Apps"]
    },
];

const EDUCATION = [
    {
        institution: "Nirma University (IT)",
        degree: "B.Tech in Computer Science & Engineering",
        duration: "Graduated 2026",
        description: "Specializing in advanced computing and cloud infrastructure management.",
    },
    {
        institution: "Aditya Silver Oak (GTU)",
        degree: "Diploma in Information Technology",
        duration: "Graduated 2022",
        description: "Developed strong foundational skills in IT systems and architecture.",
    },
];

export default function Experience() {
    return (
        <section id="experience" className="py-24 relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-5xl font-black tracking-tight mb-6 text-gradient">The Journey</h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full mb-8" />
                </motion.div>

                <div className="grid lg:grid-cols-12 gap-12">
                    {/* Work Experience Column */}
                    <div className="lg:col-span-12">
                        <div className="flex items-center gap-4 mb-12">
                            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                                <Briefcase className="text-blue-400" size={24} />
                            </div>
                            <h3 className="text-3xl font-extrabold text-white">Professional Experience</h3>
                        </div>

                        <div className="relative space-y-8">
                            {/* Central Line for Desktop */}
                            <div className="absolute left-0 lg:left-1/2 lg:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-transparent hidden lg:block" />

                            {WORK_EXPERIENCE.map((exp, index) => (
                                <motion.div
                                    key={`${exp.company}-${index}`}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: index * 0.1 }}
                                    className={`relative flex flex-col items-start lg:items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                                >
                                    {/* Timeline Dot */}
                                    <div className="absolute left-[-8px] lg:left-1/2 lg:-translate-x-1/2 top-8 w-4 h-4 rounded-full bg-slate-950 border-2 border-blue-500 z-30 shadow-[0_0_15px_rgba(59,130,246,0.6)]" />

                                    <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:pl-16 lg:text-left'} pl-10 lg:pl-0`}>
                                        <div className="glass-panel p-8 rounded-[2.5rem] group hover:border-blue-500/40 transition-all duration-500">
                                            <div className={`flex flex-col ${index % 2 === 0 ? 'lg:items-end' : 'lg:items-start'}`}>
                                                <span className="flex items-center gap-2 mb-4 text-sm font-bold text-blue-400 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 w-fit">
                                                    <Calendar size={14} />
                                                    {exp.duration}
                                                </span>
                                                <h4 className="text-2xl font-black text-white mb-1 group-hover:text-blue-400 transition-colors uppercase tracking-tight">
                                                    {exp.role}
                                                </h4>
                                                <p className="text-lg font-bold text-slate-300 mb-4">{exp.company}</p>
                                                <p className="text-slate-400 text-base leading-relaxed mb-6">
                                                    {exp.description}
                                                </p>
                                                <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'lg:justify-end' : 'lg:justify-start'}`}>
                                                    {exp.tags.map(tag => (
                                                        <span key={tag} className="text-[10px] font-black tracking-widest uppercase py-1 px-3 bg-white/5 border border-white/10 rounded-lg text-slate-500">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hidden lg:block lg:w-2/12" />
                                    <div className="hidden lg:block lg:w-5/12" />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Education Section */}
                    <div className="lg:col-span-12 mt-20">
                        <div className="flex items-center gap-4 mb-12">
                            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                                <GraduationCap className="text-purple-400" size={24} />
                            </div>
                            <h3 className="text-3xl font-extrabold text-white">Education</h3>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {EDUCATION.map((edu, index) => (
                                <motion.div
                                    key={edu.institution}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: index * 0.1 }}
                                    className="glass-panel p-10 rounded-[2.5rem] relative group overflow-hidden"
                                >
                                    <div className="absolute top-0 left-0 w-2 h-full bg-purple-500/40 group-hover:bg-purple-500 transition-colors" />
                                    <span className="inline-block py-1.5 px-5 text-sm font-bold rounded-full bg-purple-500/10 text-purple-400 mb-6 border border-purple-500/20 uppercase tracking-widest">
                                        {edu.duration}
                                    </span>
                                    <h4 className="text-2xl font-black text-white mb-2 group-hover:text-purple-400 transition-colors">
                                        {edu.degree}
                                    </h4>
                                    <p className="text-xl font-bold text-slate-300 mb-4">{edu.institution}</p>
                                    <p className="text-slate-400 leading-relaxed font-medium">
                                        {edu.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
