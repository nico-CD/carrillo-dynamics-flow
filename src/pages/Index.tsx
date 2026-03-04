import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Search, Layers, Rocket, Check, X, Shield, Cog, ArrowDown, ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

// --- Scroll animation hook ---
function useFadeInOnScroll() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useFadeInOnScroll();
  return <section ref={ref} className={`fade-in-section ${className}`}>{children}</section>;
};

const SectionDivider = () => <div className="section-divider mx-auto max-w-5xl" />;

// --- Form schema ---
const formSchema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email("Valid email required"),
  companyName: z.string().min(1, "Required"),
  website: z.string().optional(),
  role: z.string().min(1, "Required"),
  companySize: z.string().min(1, "Required"),
  annualRevenue: z.string().min(1, "Required"),
  projectBudget: z.string().min(1, "Required"),
  howCanWeHelp: z.string().min(1, "Required"),
  automationGoal: z.string().min(1, "Required"),
  anythingElse: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// --- Sticky Nav ---
const StickyNav = ({ visible, onCta }: { visible: boolean; onCta: () => void }) => (
  <nav
    className={`sticky-nav fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
    }`}
  >
    <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <span className="text-sm font-semibold tracking-widest text-foreground/80 uppercase">
        Carrillo Dynamics
      </span>
      <Button
        onClick={onCta}
        size="sm"
        className="glow-button rounded-md bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
      >
        Request Consultation
      </Button>
    </div>
  </nav>
);

// --- Page ---
const Index = () => {
  const { toast } = useToast();
  const formRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const obs = new IntersectionObserver(
      ([entry]) => setShowNav(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "", lastName: "", email: "", companyName: "", website: "",
      role: "", companySize: "", annualRevenue: "", projectBudget: "",
      howCanWeHelp: "", automationGoal: "", anythingElse: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
    toast({
      title: "Submission Received",
      description: "We'll be in touch within 24 hours to schedule your Systems Consultation.",
    });
    form.reset();
  };

  return (
    <div className="noise-bg relative min-h-screen bg-background text-foreground">
      <StickyNav visible={showNav} onCta={scrollToForm} />

      {/* ===== HERO ===== */}
      <section ref={heroRef} className="hero-glow relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div className="relative z-10 max-w-4xl">
          <h1 className="animate-hero-1 text-5xl font-bold tracking-tighter opacity-0 sm:text-7xl lg:text-8xl xl:text-9xl">
            Engineer Flow.
          </h1>
          <h1 className="animate-hero-2 mt-2 text-5xl font-bold tracking-tighter opacity-0 sm:text-7xl lg:text-8xl xl:text-9xl">
            <span className="gradient-text">Eliminate Friction.</span>
          </h1>

          {/* Glowing line */}
          <div className="animate-hero-3 mx-auto mt-8 h-px w-24 opacity-0" style={{ background: 'linear-gradient(90deg, transparent, hsl(160 84% 39% / 0.6), transparent)' }} />

          <p className="animate-hero-3 mx-auto mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground opacity-0 sm:text-xl">
            We replace manual bottlenecks with engineered leverage. Transforming chaotic service operations into deterministic digital systems.
          </p>
          <div className="animate-hero-4 opacity-0">
            <Button
              onClick={scrollToForm}
              size="lg"
              className="glow-button mt-10 gap-2 rounded-md bg-primary px-8 py-6 text-base font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Request a Systems Consultation
              <ArrowDown className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <ChevronDown className="scroll-indicator h-5 w-5 text-muted-foreground/40" />
        </div>
      </section>

      <SectionDivider />

      {/* ===== WHO IT'S FOR / NOT FOR ===== */}
      <Section className="px-6 py-32">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-16 text-center text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl">
            Qualification Criteria
          </h2>
          <div className="stagger-children grid gap-8 md:grid-cols-2">
            {/* Built For */}
            <div className="glass-card rounded-lg p-8">
              <h3 className="mb-6 text-lg font-semibold text-primary">Built For</h3>
              <ul className="space-y-4">
                {[
                  "Businesses with real operations and bottlenecks",
                  "Teams doing repetitive manual work at scale",
                  "Founders who want engineered clarity before investing capital",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-foreground/80">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* Not For */}
            <div className="glass-card rounded-lg p-8">
              <h3 className="mb-6 text-lg font-semibold text-muted-foreground">Not For</h3>
              <ul className="space-y-4">
                {[
                  "People looking for magic buttons or instant fixes",
                  "Hobby projects without operational infrastructure",
                  "Anyone expecting results without structural changes",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <X className="mt-0.5 h-4 w-4 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <SectionDivider />

      {/* ===== PROCESS ===== */}
      <Section className="px-6 py-32">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-16 text-center text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl">
            The Process
          </h2>
          <div className="stagger-children grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Search,
                step: "01",
                title: "Systems Analysis",
                desc: "Map the current operational pipeline to identify friction points, redundancies, and cost leaks.",
              },
              {
                icon: Layers,
                step: "02",
                title: "Infrastructure Architecture",
                desc: "Design practical, custom automations to handle routing, sequencing, and internal operations.",
              },
              {
                icon: Rocket,
                step: "03",
                title: "Deployment & Measurement",
                desc: "Deploy systems alongside the current workforce to deliver measurable cost retrieval.",
              },
            ].map(({ icon: Icon, step, title, desc }) => (
              <div
                key={step}
                className="glass-card rounded-lg p-8"
              >
                <div className="mb-4 flex items-center gap-3">
                  <Icon className="icon-glow h-5 w-5 text-primary" />
                  <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">{step}</span>
                </div>
                <h3 className="mb-3 text-lg font-semibold">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <SectionDivider />

      {/* ===== CREDIBILITY ===== */}
      <Section className="px-6 py-32">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-6 flex items-center justify-center gap-4">
            <Shield className="icon-glow h-7 w-7 text-primary" />
            <div className="h-6 w-px bg-border" />
            <Cog className="icon-glow h-7 w-7 text-primary" />
          </div>
          <h2 className="mb-6 text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl">
            Engineering-Grade Foundation
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Carrillo Dynamics is built on a foundation of formal mechanical engineering and corporate operations management. This isn't basic software scripting — it's rigorous, structural systems thinking applied to digital infrastructure. Every engagement is architected with the precision and accountability of an engineering discipline.
          </p>
          <div className="mx-auto mt-8 h-px w-24" style={{ background: 'linear-gradient(90deg, transparent, hsl(160 84% 39% / 0.4), transparent)' }} />
        </div>
      </Section>

      <SectionDivider />

      {/* ===== INTAKE FORM ===== */}
      <Section className="px-6 py-32">
        <div ref={formRef} className="mx-auto max-w-3xl scroll-mt-24">
          <h2 className="mb-4 text-center text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl">
            Begin the Process
          </h2>
          <p className="mb-12 text-center text-sm text-muted-foreground">
            Complete the fields below. All information is reviewed internally prior to scheduling.
          </p>

          <div className="glass-form rounded-xl p-8 sm:p-10">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Group: Personal Info */}
                <div className="space-y-1">
                  <p className="text-[11px] font-medium tracking-widest text-primary/60 uppercase">Personal Information</p>
                  <div className="h-px w-full bg-border/40" />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField control={form.control} name="firstName" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">First Name</FormLabel>
                      <FormControl><Input placeholder="First name" className="input-glow border-border bg-background text-foreground placeholder:text-muted-foreground/40" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="lastName" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">Last Name</FormLabel>
                      <FormControl><Input placeholder="Last name" className="input-glow border-border bg-background text-foreground placeholder:text-muted-foreground/40" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">Email Address</FormLabel>
                    <FormControl><Input type="email" placeholder="you@company.com" className="input-glow border-border bg-background text-foreground placeholder:text-muted-foreground/40" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                {/* Group: Company Info */}
                <div className="space-y-1 pt-4">
                  <p className="text-[11px] font-medium tracking-widest text-primary/60 uppercase">Company Details</p>
                  <div className="h-px w-full bg-border/40" />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField control={form.control} name="companyName" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">Company Name</FormLabel>
                      <FormControl><Input placeholder="Company name" className="input-glow border-border bg-background text-foreground placeholder:text-muted-foreground/40" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="website" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">Website</FormLabel>
                      <FormControl><Input placeholder="https://" className="input-glow border-border bg-background text-foreground placeholder:text-muted-foreground/40" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                <FormField control={form.control} name="role" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">Your Role</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="input-glow border-border bg-background text-foreground">
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="border-border bg-popover">
                        {["Owner", "Executive", "Manager", "Operations", "Technical", "Sales", "Marketing", "Finance", "Other"].map((r) => (
                          <SelectItem key={r} value={r.toLowerCase()}>{r}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField control={form.control} name="companySize" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">Company Size</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="input-glow border-border bg-background text-foreground">
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="border-border bg-popover">
                          {["1-10", "11-50", "51-200", "201-500", "500+"].map((s) => (
                            <SelectItem key={s} value={s}>{s} employees</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="annualRevenue" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">Annual Revenue</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="input-glow border-border bg-background text-foreground">
                            <SelectValue placeholder="Select revenue" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="border-border bg-popover">
                          {["Under $500K", "$500K - $1M", "$1M - $5M", "$5M - $10M", "$10M+"].map((r) => (
                            <SelectItem key={r} value={r}>{r}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                {/* Group: Project Details */}
                <div className="space-y-1 pt-4">
                  <p className="text-[11px] font-medium tracking-widest text-primary/60 uppercase">Project Details</p>
                  <div className="h-px w-full bg-border/40" />
                </div>

                <FormField control={form.control} name="projectBudget" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">Project Budget</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="input-glow border-border bg-background text-foreground">
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="border-border bg-popover">
                        {["Less than $10K", "$10K - $50K", "$50K - $100K", "More than $100K"].map((b) => (
                          <SelectItem key={b} value={b}>{b}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="howCanWeHelp" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">How can we help?</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe your current challenges or goals..." className="input-glow min-h-[100px] border-border bg-background text-foreground placeholder:text-muted-foreground/40" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="automationGoal" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">What are you hoping to improve with automation?</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="input-glow border-border bg-background text-foreground">
                          <SelectValue placeholder="Select area" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="border-border bg-popover">
                        {[
                          "Lead generation or sales",
                          "Customer support",
                          "Internal operations",
                          "Data processing or reporting",
                          "Content or marketing workflows",
                          "Not sure yet",
                        ].map((g) => (
                          <SelectItem key={g} value={g.toLowerCase()}>{g}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="anythingElse" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">Anything else we should know? <span className="text-muted-foreground/50">(Optional)</span></FormLabel>
                    <FormControl>
                      <Textarea placeholder="Additional context..." className="input-glow min-h-[80px] border-border bg-background text-foreground placeholder:text-muted-foreground/40" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <Button
                  type="submit"
                  size="lg"
                  className="glow-button w-full rounded-md bg-primary py-6 text-base font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  Proceed to Booking Calendar
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </Section>

      <SectionDivider />

      {/* ===== WHAT HAPPENS NEXT ===== */}
      <Section className="px-6 py-32">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-6 text-2xl font-bold tracking-tighter sm:text-3xl lg:text-4xl">
            What Happens Next
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            All engagements begin with a comprehensive Systems Consultation. During this session, we map your current infrastructure, identify friction points, and deliver a clear, actionable report — regardless of whether we proceed further.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            The consultation fee is credited in full toward final deployment costs should a build commence. No pressure. Just clear recommendations.
          </p>
        </div>
      </Section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-border px-6 py-12">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs tracking-widest text-muted-foreground uppercase">
            © {new Date().getFullYear()} Carrillo Dynamics. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
