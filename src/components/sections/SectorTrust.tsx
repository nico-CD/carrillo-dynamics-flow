import { Thermometer, Droplets, TreePine, Hammer, Truck, Factory } from "lucide-react";
import { motion } from "framer-motion";

const SectorTrust = () => {
    return (
        <section className="py-20 border-y border-white/5 bg-black/40 relative overflow-hidden">
            {/* Blueprint Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            
            <div className="mx-auto max-w-7xl px-6 relative z-10">
                <div className="flex flex-col items-center gap-12 text-center">
                    <div className="space-y-2">
                        <p className="text-xs font-black uppercase tracking-[0.4em] text-primary/60">Operational Expertise</p>
                        <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
                            Engineered for <span className="text-primary italic">High-Stakes</span> Industries.
                        </h3>
                    </div>

                    <div className="w-full relative py-8">
                        {/* Scanning Line Effect */}
                        <motion.div 
                            initial={{ left: "-10%" }}
                            animate={{ left: "110%" }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-primary/30 to-transparent z-20"
                        />
                        
                        <div className="flex flex-wrap justify-center gap-8 sm:gap-16 md:gap-24 opacity-40 grayscale group cursor-default">
                            {[
                                { icon: Hammer, label: "Construction" },
                                { icon: Truck, label: "Logistics" },
                                { icon: Factory, label: "Manufacturing" },
                                { icon: Thermometer, label: "HVAC" },
                                { icon: Droplets, label: "Plumbing" },
                                { icon: TreePine, label: "Landscaping" },
                            ].map((sector) => (
                                <div key={sector.label} className="flex flex-col items-center gap-4 transition-all duration-500 hover:opacity-100 hover:grayscale-0 hover:scale-110">
                                    <sector.icon className="h-10 w-10 sm:h-12 sm:w-12 text-foreground" />
                                    <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em]">{sector.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SectorTrust;
