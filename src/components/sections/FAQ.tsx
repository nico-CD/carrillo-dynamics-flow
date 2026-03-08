import {
    Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
    return (
        <section className="px-6 py-40 border-t border-white/5 bg-white/[0.01]">
            <div className="mx-auto max-w-4xl">
                <div className="mb-20 text-center">
                    <h2 className="text-4xl font-black uppercase tracking-tight mb-4">Operations <span className="text-primary italic">FAQ.</span></h2>
                    <p className="text-xl text-muted-foreground font-medium italic">Addressing common friction points and structural concerns.</p>
                </div>

                <Accordion type="single" collapsible className="w-full space-y-4">
                    {[
                        {
                            q: "Is this just another SaaS tool we have to manage?",
                            a: "No. This is infrastructure engineering. We build headless, structural systems that sit underneath your current tools and orchestrate them invisibly. You do not log into our software. We turn your existing tools into a unified, deterministic engine."
                        },
                        {
                            q: "How long does it take to see operational leverage?",
                            a: "Because we focus on highly targeted, high-friction bottlenecks first, initial systems are typically architected, deployed, and yielding reclaimed hours within 14-21 days of engagement start."
                        },
                        {
                            q: "What if our internal processes are completely undocumented?",
                            a: "That is our starting point. We do not automate chaos; we engineer clarity. Our first step is a rigorous Systems Blueprint phase where we map, optimize, and document the flow before writing a single line of logic."
                        },
                        {
                            q: "Do we need an internal development team to maintain this?",
                            a: "Zero internal maintenance is required. We act as your fractional operations engineering department, providing ongoing structural oversight, uptime management, and iterative scaling."
                        }
                    ].map((faq, idx) => (
                        <AccordionItem key={idx} value={`item-${idx}`} className="border border-white/10 bg-white/5 backdrop-blur-md rounded-2xl px-6 data-[state=open]:bg-white/10 transition-colors">
                            <AccordionTrigger className="text-left text-lg font-bold hover:no-underline py-6 data-[state=open]:text-primary transition-colors">
                                {faq.q}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground font-medium text-base leading-relaxed pb-6">
                                {faq.a}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
};

export default FAQ;
