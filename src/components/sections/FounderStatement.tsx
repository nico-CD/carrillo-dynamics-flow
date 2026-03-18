import { Quote } from "lucide-react";
import GlassCard from "@/components/GlassCard";

const FounderStatement = () => {
    return (
        <section className="px-6 py-40 border-b border-white/5">
            <div className="mx-auto max-w-4xl">
                <GlassCard className="p-12 sm:p-20 relative overflow-hidden border-primary/20 bg-primary/[0.02]">
                    <Quote className="absolute top-10 left-10 h-20 w-20 text-primary/5 -z-10" />
                    <div className="space-y-8 relative z-10">
                        <h3 className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Founder's Statement.</h3>
                        <p className="text-xl sm:text-3xl font-bold leading-relaxed text-foreground">
                            "I started Carrillo Dynamics because I saw too many talented teams drowning in the kind of work that adds spreadsheets instead of adding zeros.<br /><br />My goal is to turn your operational chaos into a deterministic engine that wins on repeat by design."
                        </p>
                        <div className="pt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-8 border-t border-white/5">
                            <div>
                                <p className="text-xl font-black uppercase tracking-tight">Nicolas Carrillo</p>
                                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest italic">Founding Engineer, Carrillo Dynamics</p>
                            </div>
                        </div>
                    </div>
                </GlassCard>
            </div>
        </section>
    );
};

export default FounderStatement;
