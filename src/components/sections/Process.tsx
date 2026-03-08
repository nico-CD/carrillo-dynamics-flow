import { motion } from "framer-motion";
import { Search, Layers, Rocket } from "lucide-react";
import GlassCard from "@/components/GlassCard";

const Process = () => {
    return (
        <section id="process" className="px-6 py-40 border-t border-white/5">
            <div className="mx-auto max-w-7xl">
                <div className="mb-24">
                    <h2 className="text-5xl font-black tracking-tight sm:text-8xl uppercase">
                        Our <span className="text-primary italic">Process.</span>
                    </h2>
                </div>

                <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Live System Schematic (Animated Lines) */}
                    <div className="absolute top-[60px] left-[15%] right-[15%] h-px hidden md:block z-0 pointer-events-none">
                        <svg className="w-full h-[300px] overflow-visible">
                            <motion.path
                                d="M 0 0 C 100 0, 100 200, 200 200 C 300 200, 300 0, 400 0"
                                fill="none"
                                stroke="url(#gradient-line)"
                                strokeWidth="2"
                                strokeDasharray="10 10"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                viewport={{ once: false, amount: 0.1 }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                            />
                            <defs>
                                <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="rgba(16,185,129,0)" />
                                    <stop offset="50%" stopColor="rgba(16,185,129,0.5)" />
                                    <stop offset="100%" stopColor="rgba(16,185,129,0)" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>

                    {[
                        {
                            icon: Search,
                            step: "01",
                            title: "Systems Analysis",
                            desc: "Rigorous mapping of existing operational debt and performance bottlenecks.",
                        },
                        {
                            icon: Layers,
                            step: "02",
                            title: "Architecture Design",
                            desc: "Custom-engineered infrastructure layers designed for long-term scalability.",
                        },
                        {
                            icon: Rocket,
                            step: "03",
                            title: "Deterministic Scale",
                            desc: "Deployment of high-ROI systems that automate complex business logic.",
                        },
                    ].map((p, idx) => (
                        <GlassCard key={idx} delay={idx * 0.1} className="flex flex-col justify-between group cursor-default hover:bg-white/[0.08] relative overflow-hidden border-white/5 min-h-[360px]">
                            <div className="absolute top-4 right-4 text-7xl font-black text-white/[0.03] select-none group-hover:text-primary/10 transition-colors">{p.step}</div>
                            <div className="flex justify-between items-start">
                                <div className="p-5 rounded-3xl bg-white/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-lg">
                                    <p.icon className="h-12 w-12" />
                                </div>
                            </div>
                            <div className="border-l-4 border-white/5 group-hover:border-primary/50 transition-all pl-6 py-2">
                                <h4 className="text-3xl font-black uppercase mb-4 tracking-tight">{p.title}</h4>
                                <p className="text-lg text-muted-foreground font-medium leading-relaxed">{p.desc}</p>
                            </div>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Process;
