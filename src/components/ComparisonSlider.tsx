import { useState } from "react";
import { motion } from "framer-motion";
import { MousePointer2, Zap, ArrowLeftRight } from "lucide-react";

const ComparisonSlider = () => {
    const [sliderPos, setSliderPos] = useState(50);

    const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ("touches" in e) ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
        const position = ((x - rect.left) / rect.width) * 100;
        setSliderPos(Math.min(Math.max(position, 0), 100));
    };

    return (
        <div id="comparison" className="space-y-12">
            <div className="text-center space-y-4">
                <h3 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
                    Manual vs. <span className="text-primary italic">Engineered.</span>
                </h3>
                <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto">
                    Drag the slider to see how structural automation transforms chaotic operations into deterministic digital systems.
                </p>
            </div>

            <div
                className="relative aspect-video sm:aspect-[21/9] w-full rounded-[2.5rem] overflow-hidden border border-white/10 cursor-ew-resize select-none"
                onMouseMove={handleMouseMove}
                onTouchMove={handleMouseMove}
            >
                {/* After (Automated) - Background */}
                <div className="absolute inset-0 bg-primary/5 flex items-center justify-center">
                    <div className="grid grid-cols-3 gap-6 w-full px-12 sm:px-24">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="glass p-6 rounded-2xl border-primary/20 space-y-4">
                                <div className="h-2 w-1/2 bg-primary/20 rounded" />
                                <div className="space-y-2">
                                    <div className="h-1 w-full bg-white/5 rounded" />
                                    <div className="h-1 w-full bg-white/5 rounded" />
                                    <div className="h-1 w-3/4 bg-white/5 rounded" />
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="h-4 w-4 rounded-full bg-primary/40" />
                                    <Zap className="h-4 w-4 text-primary animate-pulse" />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="absolute top-10 right-10 text-primary font-black uppercase tracking-widest text-xs flex items-center gap-2">
                        <Zap className="h-4 w-4" /> Automated State
                    </div>
                </div>

                {/* Before (Manual) - Foreground */}
                <div
                    className="absolute inset-0 bg-zinc-950 flex items-center justify-center transition-none overflow-hidden"
                    style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                >
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full px-12 sm:px-24">
                        {[
                            "rotate-[-12deg] translate-y-4 translate-x-2 scale-95",
                            "rotate-[15deg] -translate-y-8 -translate-x-4 scale-105",
                            "rotate-[-18deg] translate-x-10 translate-y-2",
                            "rotate-[10deg] translate-y-12 -translate-x-2",
                            "rotate-[-8deg] -translate-x-6 -translate-y-4",
                            "rotate-[20deg] translate-y-4 translate-x-4 scale-90",
                            "rotate-[-15deg] -translate-y-6 translate-x-2",
                            "rotate-[12deg] translate-x-8 -translate-y-2",
                            "rotate-[-20deg] translate-y-10 -translate-x-4",
                            "rotate-[8deg] -translate-x-12 translate-y-4",
                            "rotate-[-25deg] translate-y-6 translate-x-6",
                            "rotate-[18deg] -translate-y-4 -translate-x-8",
                        ].map((chaosStyle, i) => (
                            <div key={i} className={`p-4 border border-red-500/20 rounded shadow-[0_0_10px_rgba(239,68,68,0.1)] opacity-50 grayscale hover:grayscale-0 transition-all ${chaosStyle} bg-zinc-900/80 backdrop-blur-[3px] flex flex-col gap-2`}>
                                <div className="h-1.5 w-full bg-red-500/30 mb-1" />
                                <div className="h-1.5 w-3/4 bg-white/10" />
                                <div className="h-1.5 w-1/2 bg-white/5" />
                            </div>
                        ))}
                    </div>
                    <div className="absolute inset-0 bg-red-500/5 mix-blend-overlay" />
                    <div className="absolute top-10 left-10 text-red-500 font-black uppercase tracking-widest text-xs flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-red-500 animate-ping" /> Manual Friction
                    </div>
                </div>

                {/* Handle */}
                <div
                    className="absolute inset-y-0 w-1 bg-primary/50 backdrop-blur-md flex items-center justify-center transition-none shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                    style={{ left: `${sliderPos}%` }}
                >
                    <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-2xl border-4 border-zinc-900 group">
                        <ArrowLeftRight className="h-5 w-5" />
                    </div>
                </div>
            </div>

            <div className="flex justify-center items-center gap-6 sm:gap-20 text-xs sm:text-sm font-black uppercase tracking-[0.3em] italic px-4">
                <span className="text-red-500/60 text-center whitespace-nowrap">Chaos Mode</span>
                <div className="flex-1 max-w-[50px] sm:max-w-[200px] h-[2px] bg-white/5" />
                <span className="text-primary italic text-center whitespace-nowrap">Scale Mode</span>
            </div>
        </div>
    );
};

export default ComparisonSlider;
