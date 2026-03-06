import { motion } from "framer-motion";
import { Box, Cpu, Workflow } from "lucide-react";

const ProcessBlueprint = () => {
    return (
        <div className="w-full max-w-5xl mx-auto py-20 px-4 relative flex flex-col md:flex-row items-center justify-between gap-12">

            {/* Chaotic Inputs */}
            <div className="flex flex-col gap-4 w-full md:w-1/3">
                <div className="text-center mb-4">
                    <span className="text-xs font-black uppercase tracking-widest text-red-500/80">Manual Debt</span>
                </div>
                {[1, 2, 3].map((i) => (
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        key={`input-${i}`}
                        className="bg-red-500/5 border border-red-500/20 p-4 rounded-xl flex items-center justify-between relative"
                    >
                        <span className="text-sm font-bold text-foreground/60">{i === 1 ? 'Data Silos' : i === 2 ? 'Spreadsheet Sync' : 'Human Error'}</span>
                        <Box className="w-4 h-4 text-red-500/50" />

                        {/* Animated path to center */}
                        <motion.div
                            className="absolute top-1/2 -right-12 w-12 h-px bg-gradient-to-r from-red-500/50 to-transparent hidden md:block origin-left"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            transition={{ duration: 1, repeat: Infinity, repeatType: "loop", ease: "linear" }}
                        />
                    </motion.div>
                ))}
            </div>

            {/* The Engine */}
            <div className="relative flex-shrink-0 z-10">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    className="w-40 h-40 rounded-full border border-primary/30 bg-black/60 backdrop-blur-xl flex items-center justify-center relative shadow-[0_0_50px_rgba(16,185,129,0.15)]"
                >
                    <div className="absolute inset-2 rounded-full border border-primary/20 animate-[spin_10s_linear_infinite]" />
                    <div className="absolute inset-4 rounded-full border border-primary/10 animate-[spin_15s_linear_infinite_reverse]" />
                    <Cpu className="w-12 h-12 text-primary" />
                </motion.div>
            </div>

            {/* Engineered Outputs */}
            <div className="flex flex-col gap-4 w-full md:w-1/3">
                <div className="text-center mb-4">
                    <span className="text-xs font-black uppercase tracking-widest text-primary">Engineered Leverage</span>
                </div>
                {[1, 2, 3].map((i) => (
                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        key={`output-${i}`}
                        className="bg-primary/5 border border-primary/20 p-4 rounded-xl flex items-center gap-4 relative"
                    >
                        {/* Animated path from center */}
                        <motion.div
                            className="absolute top-1/2 -left-12 w-12 h-px bg-gradient-to-r from-transparent to-primary/50 hidden md:block origin-right"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            transition={{ duration: 1, repeat: Infinity, repeatType: "loop", ease: "linear", delay: 0.5 }}
                        />

                        <Workflow className="w-4 h-4 text-primary" />
                        <span className="text-sm font-bold text-foreground text-right flex-1">{i === 1 ? 'Centralized Truth' : i === 2 ? 'Automated Flow' : 'Deterministic Outcomes'}</span>
                    </motion.div>
                ))}
            </div>

        </div>
    );
};

export default ProcessBlueprint;
