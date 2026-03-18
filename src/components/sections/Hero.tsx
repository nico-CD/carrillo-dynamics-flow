import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
    onContactClick: () => void;
}

const cyclingWords = ["Sheet Sprawl", "Manual Syncing", "Invoice Chasing", "Email Purgatory", "CRM Bloat", "Lead Leakage"];

const Hero = ({ onContactClick }: HeroProps) => {
    const [wordIndex, setWordIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setWordIndex((prev) => (prev + 1) % cyclingWords.length);
        }, 2000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-40 text-center overflow-hidden pb-40">
            <div className="max-w-5xl z-10">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[0.85] uppercase flex flex-col items-center justify-center pt-10 sm:pt-0"
                >
                    <div className="flex flex-wrap justify-center gap-x-[0.3em] whitespace-normal sm:whitespace-nowrap">
                        <span>Engineer</span> <span className="text-primary italic">Flow.</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-x-[0.3em] text-muted-foreground/30 whitespace-normal sm:whitespace-nowrap">
                        <span>Eliminate</span> <span>Friction.</span>
                    </div>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mx-auto mt-12 max-w-3xl text-xl text-muted-foreground sm:text-2xl font-medium leading-relaxed"
                >
                    <p className="mb-6 flex flex-wrap justify-center items-center gap-x-2 min-h-[5.5rem] sm:min-h-[2.5rem]">
                        <span>Your team is spending hours on</span>
                        <span className="relative inline-flex items-center justify-center min-w-[12ch] h-10 text-primary font-bold italic">
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={cyclingWords[wordIndex]}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute text-center w-full"
                                >
                                    {cyclingWords[wordIndex]}
                                </motion.span>
                            </AnimatePresence>
                        </span>
                        <span>that shouldn't require a human.</span>
                    </p>
                    <p>
                        We replace business bottlenecks with engineered leverage.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-14"
                >
                    <Button
                        onClick={onContactClick}
                        size="lg"
                        className="h-16 sm:h-20 rounded-full bg-primary px-8 sm:px-12 text-base sm:text-lg font-black uppercase tracking-widest transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(16,185,129,0.4)] shadow-xl"
                    >
                        Initiate Blueprint
                        <ChevronRight className="ml-2 h-5 w-5 sm:h-6 sm:w-6" />
                    </Button>
                </motion.div>
            </div>

            {/* Subtle decorative grid */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        </section>
    );
};

export default Hero;
