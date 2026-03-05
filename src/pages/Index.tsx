import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import {
  Search, Layers, Rocket, Check, X, Shield, Cog, ArrowDown, Activity, ExternalLink,
  ChevronRight,
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
import Navbar from "@/components/Navbar";
import GlassCard from "@/components/GlassCard";
import { cn } from "@/lib/utils";

// --- Form schema --- (Preserved exactly)
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
    <div className="mesh-gradient min-h-screen text-foreground selection:bg-primary/30 font-sans">
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-40 text-center overflow-hidden pb-40">
        <div className="max-w-5xl z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl font-black tracking-tight sm:text-7xl lg:text-8xl xl:text-9xl leading-[0.85] uppercase flex flex-col items-center justify-center"
          >
            <div className="flex flex-wrap justify-center gap-x-[0.3em] whitespace-normal sm:whitespace-nowrap">
              <span>Engineer</span> <span className="text-primary italic">Flow.</span>
            </div>
            <div className="flex flex-wrap justify-center gap-x-[0.3em] text-muted-foreground/30 whitespace-normal sm:whitespace-nowrap">
              <span>Eliminate</span> <span>Friction.</span>
            </div>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto mt-12 max-w-3xl text-xl text-muted-foreground sm:text-2xl font-medium leading-relaxed"
          >
            <span className="block mb-2">We replace manual bottlenecks with engineered leverage.</span>
            <span className="block">Turning chaotic operations into consistent revenue.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-14"
          >
            <Button
              onClick={scrollToForm}
              size="lg"
              className="h-24 rounded-full bg-primary px-16 text-xl font-black uppercase tracking-widest transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(16,185,129,0.4)] shadow-xl"
            >
              Request Consultation
              <ChevronRight className="ml-2 h-8 w-8" />
            </Button>
          </motion.div>
        </div>

        {/* Subtle decorative grid */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </section>

      {/* ===== QUALIFICATION BENTO ===== */}
      <section id="qualification" className="px-6 py-40 border-t border-white/5 bg-black/20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-24">
            <h2 className="text-5xl font-black tracking-tight sm:text-8xl uppercase">
              Operational <span className="text-primary">Clarity.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-[360px]">
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

      {/* ===== OUR PROCESS ===== */}
      <section id="process" className="px-6 py-40 border-t border-white/5">
        <div className="mx-auto max-w-7xl">
          <div className="mb-24">
            <h2 className="text-5xl font-black tracking-tight sm:text-8xl uppercase">
              Our <span className="text-primary italic">Process.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Process Cards */}
            {[
              {
                icon: Search,
                step: "01",
                title: "Systems Analysis",
                desc: "Rigorous mapping of existing operational debt and performance bottlenecks.",
              },
              {
                icon: Layers,
                step: "02",
                title: "Architecture Design",
                desc: "Custom-engineered infrastructure layers designed for long-term scalability.",
              },
              {
                icon: Rocket,
                step: "03",
                title: "Deterministic Scale",
                desc: "Deployment of high-ROI systems that automate complex business logic.",
              },
            ].map((p, idx) => (
              <GlassCard key={idx} delay={idx * 0.1} className="flex flex-col justify-between group cursor-default hover:bg-white/[0.08] relative overflow-hidden border-white/5 min-h-[360px]">
                <div className="absolute top-4 right-4 text-7xl font-black text-white/[0.03] select-none group-hover:text-primary/10 transition-colors">{p.step}</div>
                <div className="flex justify-between items-start">
                  <div className="p-5 rounded-3xl bg-white/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-lg">
                    <p.icon className="h-12 w-12" />
                  </div>
                </div>
                <div className="border-l-4 border-white/5 group-hover:border-primary/50 transition-all pl-6 py-2">
                  <h4 className="text-3xl font-black uppercase mb-4 tracking-tight">{p.title}</h4>
                  <p className="text-lg text-muted-foreground font-medium leading-relaxed">{p.desc}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CREDIBILITY ===== */}
      <section className="px-6 py-40 bg-white/[0.01] border-y border-white/5 shadow-inner">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-block p-6 rounded-[2.5rem] bg-white/5 mb-14 border border-white/10"
          >
            <Cog className="h-14 w-14 text-primary animate-[spin_10s_linear_infinite]" />
          </motion.div>
          <h2 className="text-5xl font-black tracking-tight sm:text-7xl lg:text-8xl uppercase mb-12 leading-tight">
            Engineering-Grade <br /><span className="text-primary italic">Foundation.</span>
          </h2>
          <p className="text-2xl leading-relaxed text-foreground/80 font-medium">
            Carrillo Dynamics is built on a foundation of formal engineering and corporate operations management. This isn't basic software scripting, it's rigorous, structural systems thinking applied to digital infrastructure. Every engagement is architected with the precision and accountability of an engineering discipline.
          </p>
        </div>
      </section>

      {/* ===== INTAKE FORM ===== */}
      <section id="consultation" className="px-6 py-40 bg-black/40">
        <div ref={formRef} className="mx-auto max-w-5xl scroll-mt-24">
          <div className="mb-24 text-center">
            <h2 className="text-6xl font-black tracking-tight sm:text-8xl uppercase mb-6">
              Contact <span className="text-primary italic">Us.</span>
            </h2>
            <div className="bg-primary/10 border border-primary/20 inline-block px-8 py-3 rounded-2xl">
              <p className="text-primary font-black text-sm tracking-[0.05em] uppercase">Complete the fields below. All information is reviewed internally prior to scheduling.</p>
            </div>
          </div>

          <div className="glass p-10 md:p-20 rounded-[4rem] shadow-2xl relative border-white/10">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-16">

                {/* Section 1: Personal Information */}
                <div className="space-y-10">
                  <div className="flex items-center gap-6">
                    <span className="text-xs font-black uppercase tracking-[0.3em] text-primary bg-primary/20 border border-primary/30 px-5 py-2 rounded-2xl">Part 01</span>
                    <h3 className="text-sm font-black uppercase tracking-[0.3em] text-foreground">General Information</h3>
                    <div className="flex-1 h-px bg-white/10" />
                  </div>

                  <div className="grid gap-10 md:grid-cols-2">
                    <FormField control={form.control} name="firstName" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase font-black tracking-[0.2em] text-foreground/70 mb-3 block">First Name</FormLabel>
                        <FormControl><Input placeholder="John" className="h-16 rounded-[1.25rem] border-white/10 bg-white/5 px-8 text-lg focus:bg-white/10 focus:border-primary transition-all font-bold placeholder:text-white/10" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="lastName" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase font-black tracking-[0.2em] text-foreground/70 mb-3 block">Last Name</FormLabel>
                        <FormControl><Input placeholder="Doe" className="h-16 rounded-[1.25rem] border-white/10 bg-white/5 px-8 text-lg focus:bg-white/10 focus:border-primary transition-all font-bold placeholder:text-white/10" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase font-black tracking-[0.2em] text-foreground/70 mb-3 block">Corporate Email</FormLabel>
                      <FormControl><Input type="email" placeholder="john@company.com" className="h-16 rounded-[1.25rem] border-white/10 bg-white/5 px-8 text-lg focus:bg-white/10 focus:border-primary transition-all font-bold placeholder:text-white/10" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                {/* Section 2: Company Profile */}
                <div className="space-y-10">
                  <div className="flex items-center gap-6">
                    <span className="text-xs font-black uppercase tracking-[0.3em] text-primary bg-primary/20 border border-primary/30 px-5 py-2 rounded-2xl">Part 02</span>
                    <h3 className="text-sm font-black uppercase tracking-[0.3em] text-foreground">Company Intelligence</h3>
                    <div className="flex-1 h-px bg-white/10" />
                  </div>

                  <div className="grid gap-10 md:grid-cols-2">
                    <FormField control={form.control} name="companyName" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase font-black tracking-[0.2em] text-foreground/70 mb-3 block">Company Name</FormLabel>
                        <FormControl><Input placeholder="Acme Inc." className="h-16 rounded-[1.25rem] border-white/10 bg-white/5 px-8 text-lg focus:bg-white/10 focus:border-primary transition-all font-bold placeholder:text-white/10" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="website" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase font-black tracking-[0.2em] text-foreground/70 mb-3 block">Digital HQ (URL)</FormLabel>
                        <FormControl><Input placeholder="https://" className="h-16 rounded-[1.25rem] border-white/10 bg-white/5 px-8 text-lg focus:bg-white/10 focus:border-primary transition-all font-bold placeholder:text-white/10" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <div className="grid gap-10 md:grid-cols-2">
                    <FormField control={form.control} name="role" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase font-black tracking-[0.2em] text-foreground/70 mb-3 block">Operational Role</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-16 rounded-[1.25rem] border-white/10 bg-white/5 px-8 text-lg font-bold">
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="glass border-white/10 rounded-2xl">
                            {["Owner", "Executive", "Manager", "Operations", "Technical", "Sales", "Marketing", "Finance", "Other"].map((r) => (
                              <SelectItem key={r} value={r.toLowerCase()} className="hover:bg-primary/20 cursor-pointer">{r}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="companySize" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase font-black tracking-[0.2em] text-foreground/70 mb-3 block">Entity Scale</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-16 rounded-[1.25rem] border-white/10 bg-white/5 px-8 text-lg font-bold">
                              <SelectValue placeholder="Select size" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="glass border-white/10 rounded-2xl">
                            {["1-10", "11-50", "51-200", "201-500", "500+"].map((s) => (
                              <SelectItem key={s} value={s}>{s} employees</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                </div>

                {/* Section 3: Project Goals */}
                <div className="space-y-10">
                  <div className="flex items-center gap-6">
                    <span className="text-xs font-black uppercase tracking-[0.3em] text-primary bg-primary/20 border border-primary/30 px-5 py-2 rounded-2xl">Part 03</span>
                    <h3 className="text-sm font-black uppercase tracking-[0.3em] text-foreground">Systems Strategy</h3>
                    <div className="flex-1 h-px bg-white/10" />
                  </div>

                  <div className="grid gap-10 md:grid-cols-2">
                    <FormField control={form.control} name="annualRevenue" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase font-black tracking-[0.2em] text-foreground/70 mb-3 block">Annual Revenue</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-16 rounded-[1.25rem] border-white/10 bg-white/5 px-8 text-lg font-bold">
                              <SelectValue placeholder="Select revenue" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="glass border-white/10 rounded-2xl">
                            {["Under $500K", "$500K - $1M", "$1M - $5M", "$5M - $10M", "$10M+"].map((r) => (
                              <SelectItem key={r} value={r}>{r}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="projectBudget" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase font-black tracking-[0.2em] text-foreground/70 mb-3 block">Implementation Budget</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-16 rounded-[1.25rem] border-white/10 bg-white/5 px-8 text-lg font-bold">
                              <SelectValue placeholder="Select budget" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="glass border-white/10 rounded-2xl">
                            {["Less than $10K", "$10K - $50K", "$50K - $100K", "More than $100K"].map((b) => (
                              <SelectItem key={b} value={b}>{b}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <FormField control={form.control} name="automationGoal" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase font-black tracking-[0.2em] text-foreground/70 mb-3 block">Primary Optimization Objective</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-16 rounded-[1.25rem] border-white/10 bg-white/5 px-8 text-lg font-bold">
                            <SelectValue placeholder="Select target area" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="glass border-white/10 rounded-2xl">
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

                  <FormField control={form.control} name="howCanWeHelp" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase font-black tracking-[0.2em] text-foreground/70 mb-3 block">Current Friction Points</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Describe your structural operational challenges..." className="min-h-[180px] rounded-[1.5rem] border-white/10 bg-white/5 p-8 text-lg focus:bg-white/10 focus:border-primary transition-all font-bold placeholder:text-white/10" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="anythingElse" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase font-black tracking-[0.2em] text-foreground/70 mb-3 block">Additional Architecture Considerations (Optional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Additional context..." className="min-h-[120px] rounded-[1.5rem] border-white/10 bg-white/5 p-8 text-lg focus:bg-white/10 focus:border-primary transition-all font-bold placeholder:text-white/10" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-24 rounded-[1.5rem] bg-primary text-2xl font-black uppercase tracking-[0.3em] transition-all hover:shadow-[0_0_60px_rgba(16,185,129,0.5)] shadow-xl active:scale-95"
                >
                  Confirm Application
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="px-6 py-24 border-t border-white/5 bg-black/50">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-sm font-black uppercase tracking-[0.2em] italic">Carrillo Dynamics</span>
          </div>
          <p className="text-[10px] font-black tracking-[0.5em] text-muted-foreground uppercase opacity-40">
            © {new Date().getFullYear()} Systems Engineering. Chicago, IL.
          </p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
            <a href="#" className="hover:text-primary transition-colors">Digital Integrity</a>
            <a href="#" className="hover:text-primary transition-colors">Privacy Ops</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
