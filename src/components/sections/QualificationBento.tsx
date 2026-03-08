import { Check, X, Shield, Activity } from "lucide-react";
import GlassCard from "@/components/GlassCard";

const QualificationBento = () => {
    return (
        <section id="qualification" className="px-6 py-40 border-t border-white/5 bg-black/20">
            <div className="mx-auto max-w-7xl">
                <div className="mb-24">
                    <h2 className="text-5xl font-black tracking-tight sm:text-8xl uppercase">
                        Operational <span className="text-primary">Clarity.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:auto-rows-[360px]">
                    {/* Built For Bento */}
                    <GlassCard className="md:col-span-8 flex flex-col justify-between group overflow-hidden border-primary/10">
                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
                            <Shield className="h-96 w-96" />
                        </div>
                        <div className="p-2">
                            <h3 className="text-3xl font-black uppercase tracking-widest text-primary mb-10">Engineered For</h3>
                            <ul className="grid gap-10 sm:grid-cols-2">
                                {[
                                    "Businesses with real operations and bottlenecks",
                                    "Teams doing repetitive manual work at scale",
                                    "Founders seeking engineered clarity",
                                    "Enterprise-grade operations needing structural integrity",
                                ].map((item) => (
                                    <li key={item} className="flex items-start gap-5 text-lg font-bold text-foreground">
                                        <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary border border-primary/20">
                                            <Check className="h-4 w-4" />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex items-center gap-4 text-sm font-black uppercase text-primary/60 group-hover:text-primary transition-colors p-2">
                            <Activity className="h-5 w-5" />
                            Scalability Infrastructure
                        </div>
                    </GlassCard>

                    {/* Not For Bento */}
                    <GlassCard className="md:col-span-4 flex flex-col justify-between bg-white/[0.02] border-white/5">
                        <div className="p-2">
                            <h3 className="text-3xl font-black uppercase tracking-widest text-muted-foreground mb-10">Excluded</h3>
                            <ul className="space-y-8">
                                {[
                                    "Magic button instant fixes",
                                    "Hobby projects",
                                    "Manual-bias ventures",
                                    "Short-term tactical patches",
                                ].map((item) => (
                                    <li key={item} className="flex items-start gap-5 text-lg font-medium text-muted-foreground/70">
                                        <X className="mt-1 h-6 w-6 shrink-0 text-red-500/50" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </section>
    );
};

export default QualificationBento;
