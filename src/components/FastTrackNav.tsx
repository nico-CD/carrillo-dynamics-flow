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

    const navLinks = [
        { label: "Systems", target: "qualification" },
        { label: "Success", target: "success" },
    ];

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
                    className="fixed top-0 left-0 right-0 z-[100] px-6 py-4"
                >
                    <div className="mx-auto max-w-7xl">
                        <div className="glass-morphism rounded-full px-6 py-3 border border-white/10 flex items-center justify-between shadow-2xl backdrop-blur-2xl bg-black/60">
                            <button
                                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                                className="flex items-center gap-4 group"
                            >
                                <div className="bg-primary/20 p-2 rounded-full hidden sm:block group-hover:bg-primary/30 transition-colors">
                                    <Zap className="h-5 w-5 text-primary" />
                                </div>
                                <div className="flex flex-col items-start">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-primary leading-none">Carrillo</span>
                                    <span className="text-sm font-bold uppercase tracking-tight text-foreground">Dynamics</span>
                                </div>
                            </button>

                            <div className="hidden md:flex items-center gap-8">
                                {navLinks.map((link) => (
                                    <button
                                        key={link.target}
                                        onClick={() => scrollToSection(link.target)}
                                        className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40 hover:text-primary transition-colors"
                                    >
                                        {link.label}
                                    </button>
                                ))}
                            </div>

                            <div className="flex items-center gap-6">
                                <Button
                                    onClick={onContactClick}
                                    size="sm"
                                    className="rounded-full bg-primary hover:bg-primary/90 text-[10px] font-black uppercase tracking-widest px-6 h-10 shadow-lg"
                                >
                                    Contact Us
                                    <ChevronRight className="ml-1 h-3 w-3" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Progress Indicator */}
                    <motion.div
                        className="absolute top-0 left-0 right-0 h-1 bg-primary origin-left"
                        style={{ scaleX }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FastTrackNav;
