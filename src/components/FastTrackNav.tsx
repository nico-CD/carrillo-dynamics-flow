import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { ChevronRight, Zap } from "lucide-react";
import { Button } from "./ui/button";

interface FastTrackNavProps {
    onContactClick: () => void;
    onVisibilityChange?: (isVisible: boolean) => void;
}

const FastTrackNav = ({ onContactClick, onVisibilityChange }: FastTrackNavProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const handleScroll = () => {
            const visible = window.scrollY > 800;
            if (visible !== isVisible) {
                setIsVisible(visible);
                onVisibilityChange?.(visible);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isVisible, onVisibilityChange]);



    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "circOut" }}
                    className="fixed top-0 left-0 right-0 z-[100] px-4 py-4 pointer-events-none"
                >
                    <div className="mx-auto max-w-7xl pointer-events-auto">
                        <div className="glass-morphism rounded-full px-6 lg:px-12 py-3 border border-white/10 flex items-center shadow-2xl backdrop-blur-2xl bg-black/80 relative overflow-hidden">
                            {/* Progress Indicator integrated into the bottom of the pill */}
                            <motion.div
                                className="absolute bottom-0 left-0 h-[2px] bg-primary origin-left"
                                style={{ scaleX, width: '100%' }}
                            />

                            <div className="grid grid-cols-2 lg:grid-cols-4 w-full items-center gap-4">
                                <button
                                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                                    className="flex items-center gap-3 group justify-self-start"
                                >
                                    <div className="bg-primary/20 p-2 rounded-full hidden sm:flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                                        <Zap className="h-4 w-4 text-primary" />
                                    </div>
                                    <div className="flex flex-col items-start min-w-0">
                                        <span className="text-[9px] font-black uppercase tracking-widest text-primary leading-none">Carrillo</span>
                                        <span className="text-xs font-bold uppercase tracking-tight text-foreground truncate">Dynamics</span>
                                    </div>
                                </button>

                                <div className="hidden lg:flex justify-center">
                                    <button
                                        onClick={() => scrollToSection('calculator')}
                                        className="text-[10px] font-black uppercase tracking-[0.2em] text-white hover:text-primary transition-colors whitespace-nowrap"
                                    >
                                        Time Saving Calculator
                                    </button>
                                </div>

                                <div className="hidden lg:flex justify-center">
                                    <button
                                        onClick={() => scrollToSection('comparison')}
                                        className="text-[10px] font-black uppercase tracking-[0.2em] text-white hover:text-primary transition-colors whitespace-nowrap"
                                    >
                                        Before & After Engineering
                                    </button>
                                </div>

                                <div className="justify-self-end">
                                    <Button
                                        onClick={onContactClick}
                                        size="sm"
                                        className="h-10 rounded-full px-6 text-[10px] font-black uppercase tracking-widest bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-all"
                                    >
                                        Contact Us
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FastTrackNav;
