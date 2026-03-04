import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Search, Layers, Rocket, Check, X, Shield, Cog, ArrowDown,
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

// --- Page ---
const Index = () => {
  const { toast } = useToast();
  const formRef = useRef<HTMLDivElement>(null);

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
    <div className="min-h-screen bg-background text-foreground">
      {/* ===== HERO ===== */}
      <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div className="animate-fade-in-up max-w-3xl">
          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl">
            Engineer Flow.
            <br />
            <span className="text-primary">Eliminate Friction.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground sm:text-xl">
            We replace manual bottlenecks with engineered leverage. Transforming chaotic service operations into deterministic digital systems.
          </p>
          <Button
            onClick={scrollToForm}
            size="lg"
            className="mt-10 gap-2 rounded-md bg-primary px-8 py-6 text-base font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Request a Systems Consultation
            <ArrowDown className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* ===== WHO IT'S FOR / NOT FOR ===== */}
      <Section className="px-6 py-28">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-16 text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Qualification Criteria
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {/* Built For */}
            <div className="rounded-lg border border-primary/20 bg-card p-8">
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
            <div className="rounded-lg border border-border bg-card p-8">
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

      {/* ===== PROCESS ===== */}
      <Section className="px-6 py-28">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-16 text-center text-3xl font-bold tracking-tight sm:text-4xl">
            The Process
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
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
                className="group rounded-lg border-t-2 border-primary/40 bg-card p-8 transition-colors hover:border-primary"
              >
                <div className="mb-4 flex items-center gap-3">
                  <Icon className="h-5 w-5 text-primary" />
                  <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">{step}</span>
                </div>
                <h3 className="mb-3 text-lg font-semibold">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ===== CREDIBILITY ===== */}
      <Section className="px-6 py-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-6 flex items-center justify-center gap-3">
            <Shield className="h-6 w-6 text-primary" />
            <Cog className="h-6 w-6 text-primary" />
          </div>
          <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
            Engineering-Grade Foundation
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Carrillo Dynamics is built on a foundation of formal mechanical engineering and corporate operations management. This isn't basic software scripting — it's rigorous, structural systems thinking applied to digital infrastructure. Every engagement is architected with the precision and accountability of an engineering discipline.
          </p>
          <div className="mx-auto mt-8 h-px w-16 bg-primary/40" />
        </div>
      </Section>

      {/* ===== INTAKE FORM ===== */}
      <Section className="px-6 py-28">
        <div ref={formRef} className="mx-auto max-w-3xl scroll-mt-12">
          <h2 className="mb-4 text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Begin the Process
          </h2>
          <p className="mb-12 text-center text-sm text-muted-foreground">
            Complete the fields below. All information is reviewed internally prior to scheduling.
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Name row */}
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField control={form.control} name="firstName" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">First Name</FormLabel>
                    <FormControl><Input placeholder="First name" className="border-border bg-card text-foreground placeholder:text-muted-foreground/50" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="lastName" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">Last Name</FormLabel>
                    <FormControl><Input placeholder="Last name" className="border-border bg-card text-foreground placeholder:text-muted-foreground/50" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              {/* Email */}
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">Email Address</FormLabel>
                  <FormControl><Input type="email" placeholder="you@company.com" className="border-border bg-card text-foreground placeholder:text-muted-foreground/50" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              {/* Company row */}
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField control={form.control} name="companyName" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">Company Name</FormLabel>
                    <FormControl><Input placeholder="Company name" className="border-border bg-card text-foreground placeholder:text-muted-foreground/50" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="website" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">Website</FormLabel>
                    <FormControl><Input placeholder="https://" className="border-border bg-card text-foreground placeholder:text-muted-foreground/50" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              {/* Role */}
              <FormField control={form.control} name="role" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">Your Role</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="border-border bg-card text-foreground">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="border-border bg-card">
                      {["Owner", "Executive", "Manager", "Operations", "Technical", "Sales", "Marketing", "Finance", "Other"].map((r) => (
                        <SelectItem key={r} value={r.toLowerCase()}>{r}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />

              {/* Company Size & Revenue */}
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField control={form.control} name="companySize" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">Company Size</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="border-border bg-card text-foreground">
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="border-border bg-card">
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
                        <SelectTrigger className="border-border bg-card text-foreground">
                          <SelectValue placeholder="Select revenue" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="border-border bg-card">
                        {["Under $500K", "$500K - $1M", "$1M - $5M", "$5M - $10M", "$10M+"].map((r) => (
                          <SelectItem key={r} value={r}>{r}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              {/* Budget */}
              <FormField control={form.control} name="projectBudget" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">Project Budget</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="border-border bg-card text-foreground">
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="border-border bg-card">
                      {["Less than $10K", "$10K - $50K", "$50K - $100K", "More than $100K"].map((b) => (
                        <SelectItem key={b} value={b}>{b}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />

              {/* How can we help */}
              <FormField control={form.control} name="howCanWeHelp" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">How can we help?</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe your current challenges or goals..." className="min-h-[100px] border-border bg-card text-foreground placeholder:text-muted-foreground/50" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              {/* Automation Goal */}
              <FormField control={form.control} name="automationGoal" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">What are you hoping to improve with automation?</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="border-border bg-card text-foreground">
                        <SelectValue placeholder="Select area" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="border-border bg-card">
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

              {/* Anything else */}
              <FormField control={form.control} name="anythingElse" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">Anything else we should know before reaching out? <span className="text-muted-foreground/60">(Optional)</span></FormLabel>
                  <FormControl>
                    <Textarea placeholder="Additional context..." className="min-h-[80px] border-border bg-card text-foreground placeholder:text-muted-foreground/50" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <Button
                type="submit"
                size="lg"
                className="w-full rounded-md bg-primary py-6 text-base font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Proceed to Booking Calendar
              </Button>
            </form>
          </Form>
        </div>
      </Section>

      {/* ===== WHAT HAPPENS NEXT ===== */}
      <Section className="px-6 py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-6 text-2xl font-bold tracking-tight sm:text-3xl">
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
