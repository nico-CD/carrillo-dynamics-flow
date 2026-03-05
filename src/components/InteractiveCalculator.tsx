import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Users, Clock, Zap, Target } from "lucide-react";
import GlassCard from "./GlassCard";

const InteractiveCalculator = () => {
    const [teamSize, setTeamSize] = useState(10);
    const [hoursPerWeek, setHoursPerWeek] = useState(5);
    const [reclaimedHours, setReclaimedHours] = useState(0);

    useEffect(() => {
        // Annual reclaimed hours = team size * hours/week * 50 weeks
        const total = teamSize * hoursPerWeek * 50;
        setReclaimedHours(total);
    }, [teamSize, hoursPerWeek]);

    const equivalentHires = (reclaimedHours / 2000).toFixed(1);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <GlassCard className="p-10 space-y-10 border-white/10 bg-white/5 backdrop-blur-xl">
                <div className="flex items-center gap-4 text-primary">
                    <Calculator className="h-8 w-8" />
                    <h3 className="text-2xl font-black uppercase tracking-tight">Efficiency Input</h3>
                </div>

                <div className="space-y-8">
                    <div className="space-y-4">
                        <div className="flex justify-between text-sm font-bold uppercase tracking-widest text-muted-foreground">
                            <label className="flex items-center gap-2 italic">
                                <Users className="h-4 w-4" /> Team Size
                            </label>
                            <span className="text-primary">{teamSize} Members</span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="100"
                            value={teamSize}
                            onChange={(e) => setTeamSize(parseInt(e.target.value))}
                            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between text-sm font-bold uppercase tracking-widest text-muted-foreground">
                            <label className="flex items-center gap-2 italic">
                                <Clock className="h-4 w-4" /> Manual Hours / Week / Person
                            </label>
                            <span className="text-primary">{hoursPerWeek} Hours</span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="20"
                            value={hoursPerWeek}
                            onChange={(e) => setHoursPerWeek(parseInt(e.target.value))}
                            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                    </div>
                </div>

                <div className="pt-6 border-t border-white/5">
                    <p className="text-xs font-medium text-muted-foreground leading-relaxed italic">
                        *Based on standard 50-week operational year and typical manual friction points like CRM entry, lead routing, and report generation.
                    </p>
                </div>
            </GlassCard>

            <div className="flex flex-col justify-center space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 flex flex-col justify-center">
                        <p className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-2">Annual Reclaimed</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-5xl font-black text-primary tabular-nums">
                                {reclaimedHours.toLocaleString()}
                            </span>
                            <span className="text-lg font-bold text-muted-foreground">Hrs</span>
                        </div>
                    </div>

                    <div className="p-8 rounded-[2rem] bg-primary/10 border border-primary/20 flex flex-col justify-center">
                        <p className="text-sm font-black uppercase tracking-widest text-primary/70 mb-2">Engineered Leverage</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-5xl font-black text-primary tabular-nums">
                                {equivalentHires}
                            </span>
                            <span className="text-lg font-bold text-muted-foreground italic">Full-Time Units</span>
                        </div>
                    </div>
                </div>

                <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 relative overflow-hidden group">
                    <div className="relative z-10 flex items-start gap-6">
                        <div className="p-4 rounded-2xl bg-primary/20 text-primary">
                            <Target className="h-8 w-8" />
                        </div>
                        <div>
                            <h4 className="text-xl font-black uppercase mb-2">Strategic Impact</h4>
                            <p className="text-muted-foreground font-medium">
                                This isn't just "saved time." It's capacity to focus on high-variance strategic work that scales revenue without linear headcount growth.
                            </p>
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Zap className="h-24 w-24 text-primary" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InteractiveCalculator;
