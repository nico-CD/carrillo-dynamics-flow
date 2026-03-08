import GlassCard from "@/components/GlassCard";
import CountUp from "@/components/CountUp";

const SuccessSnapshots = () => {
    return (
        <section id="success" className="px-6 py-40 bg-black/20">
            <div className="mx-auto max-w-7xl">
                <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="max-w-2xl">
                        <h2 className="text-5xl font-black tracking-tight sm:text-8xl uppercase mb-6">
                            Snapshots of <span className="text-primary italic">Success.</span>
                        </h2>
                        <p className="text-xl text-muted-foreground font-medium">Real-world impact across diverse operational ecosystems.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 italic text-sm text-primary font-bold">
                        Engineering Wins.
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            end: 80, suffix: "%", decimals: 0,
                            label: "Time Reduction",
                            win: "Reduced invoice processing delay for a mid-sized logistics carrier via automated OCR pipeline.",
                        },
                        {
                            end: 4.5, suffix: "x", decimals: 1,
                            label: "Capacity Growth",
                            win: "Automated CRM lead routing allowing a sales team to handle 4.5x volume without new hires.",
                        },
                        {
                            start: 100, end: 0, suffix: "", decimals: 0,
                            label: "Manual Errors",
                            win: "Eliminated reporting discrepancies for a healthcare provider through deterministic data sync.",
                        },
                    ].map((s, idx) => (
                        <GlassCard key={idx} delay={idx * 0.1} className="flex flex-col gap-8 group">
                            <div className="flex items-baseline gap-2">
                                <span className="text-6xl font-black text-primary tracking-tighter">
                                    <CountUp
                                        start={s.start}
                                        end={s.end}
                                        decimals={s.decimals}
                                        suffix={s.suffix}
                                        duration={2}
                                    />
                                </span>
                                <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">{s.label}</span>
                            </div>
                            <p className="text-lg font-medium text-foreground/80 leading-relaxed border-l-2 border-primary/20 pl-6 group-hover:border-primary transition-colors">
                                "{s.win}"
                            </p>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SuccessSnapshots;
