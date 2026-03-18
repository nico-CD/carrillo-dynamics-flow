import {
    Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
    return (
        <section className="px-6 py-40 border-t border-white/5 bg-white/[0.01]">
            <div className="mx-auto max-w-4xl">
                <div className="mb-20 text-center">
                    <h2 className="text-5xl font-black uppercase tracking-tight mb-4 sm:text-7xl">Operations <span className="text-primary italic">FAQ.</span></h2>
                    <p className="text-xl text-muted-foreground font-medium italic">Addressing common friction points and structural concerns.</p>
                </div>

                <Accordion type="single" collapsible className="w-full space-y-4">
                    {[
                        {
                            q: "Is this just another software we have to force our technicians to use?",
                            a: "No. We build invisible systems that integrate seamlessly with your existing dispatch and CRM tools. Your field crew won't have to learn another app. We just make the ones they already use communicate automatically."
                        },
                        {
                            q: "How long until we see fewer scheduling errors and more billable hours?",
                            a: "Because we target high-friction bottlenecks first (like duplicate data entry or missed follow-ups), our systems start reclaiming field hours and reducing dispatch chaos within 14 to 21 days of deployment."
                        },
                        {
                            q: "What if our office processes are mostly paper, whiteboards, or just in the owner's head?",
                            a: "That is our ideal starting point. We do not automate chaos; we engineer clarity. Our first step is a rigorous Blueprint phase where we map out your dispatch and quoting flows before writing a single line of logic."
                        },
                        {
                            q: "Do we need an IT guy to maintain this?",
                            a: "Zero internal maintenance is required. We act as your fractional operations engineering department, providing ongoing structural oversight, proactive monitoring, and iterative scaling so you can focus on the field."
                        }
                    ].map((faq, idx) => (
                        <AccordionItem key={idx} value={`item-${idx}`} className="border border-white/10 bg-white/5 backdrop-blur-md rounded-2xl px-6 data-[state=open]:bg-white/10 transition-colors">
                            <AccordionTrigger className="text-left text-xl sm:text-2xl font-bold hover:no-underline py-8 data-[state=open]:text-primary transition-colors">
                                {faq.q}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground font-medium text-lg sm:text-xl leading-relaxed pb-8">
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
