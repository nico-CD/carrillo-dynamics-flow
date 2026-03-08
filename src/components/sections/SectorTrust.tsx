import { Gem, Truck, HeartPulse, Boxes } from "lucide-react";

const SectorTrust = () => {
    return (
        <section className="py-24 border-y border-white/5 bg-black/40">
            <div className="mx-auto max-w-7xl px-6">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
                    <div className="max-w-2xl text-center lg:text-left">
                        <p className="text-3xl sm:text-4xl font-black leading-tight tracking-tight uppercase">
                            Partnered with firms across <span className="text-primary italic">high-stakes sectors</span> to eliminate operational debt.
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-12 sm:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                        {[
                            { icon: Gem, label: "Finance" },
                            { icon: Truck, label: "Logistics" },
                            { icon: HeartPulse, label: "Healthcare" },
                            { icon: Boxes, label: "Energy" },
                        ].map((sector) => (
                            <div key={sector.label} className="flex flex-col items-center gap-4 group">
                                <sector.icon className="h-14 w-14 sm:h-16 sm:w-16 group-hover:text-primary transition-colors duration-500" />
                                <span className="text-xs font-black uppercase tracking-[0.2em]">{sector.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SectorTrust;
