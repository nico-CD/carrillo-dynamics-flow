import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Layers, Rocket, Check, X, Shield, Cog, ArrowDown, Activity, ExternalLink,
  ChevronRight, Gem, Truck, HeartPulse, Boxes, BarChart3, Quote, Loader2
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
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import GlassCard from "@/components/GlassCard";
import InteractiveCalculator from "@/components/InteractiveCalculator";
import FastTrackNav from "@/components/FastTrackNav";
import CountUp from "@/components/CountUp";
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
  const successContainerRef = useRef<HTMLDivElement>(null);

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

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;

      if (!webhookUrl) {
        console.error("VITE_N8N_WEBHOOK_URL is not defined");
        toast({
          variant: "destructive",
          title: "Configuration Error",
          description: "Webhook URL is missing. Please contact support.",
        });
        setIsLoading(false);
        return;
      }

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast({
          title: "Submission Received",
          description: "We'll be in touch within 24 hours to schedule your Systems Consultation.",
        });
        form.reset();
        setTimeout(() => {
          const y = successContainerRef.current ? successContainerRef.current.getBoundingClientRect().top + window.scrollY - 40 : 0;
          if (y > 0) {
            window.scrollTo({ top: y, behavior: "smooth" });
          }
        }, 50);
      } else {
        throw new Error("Failed to submit");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "There was a problem sending your application. Please try again or email us directly.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const cyclingWords = ["Sheet Sprawl", "Manual Syncing", "Invoice Chasing", "Email Purgatory", "CRM Bloat", "Lead Leakage"];
  const [wordIndex, setWordIndex] = useState(0);
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % cyclingWords.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mesh-gradient min-h-screen text-foreground selection:bg-primary/30 font-sans">
      <FastTrackNav onContactClick={scrollToForm} onVisibilityChange={setIsNavbarHidden} />
      {!isNavbarHidden && <Navbar />}

      {/* 1. HERO SECTION */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-40 text-center overflow-hidden pb-40">
        <div className="max-w-5xl z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[0.85] uppercase flex flex-col items-center justify-center pt-10 sm:pt-0"
          >
            <div className="flex flex-wrap justify-center gap-x-[0.3em] whitespace-normal sm:whitespace-nowrap">
              <span>Engineer</span> <span className="text-primary italic">Flow.</span>
            </div>
            <div className="flex flex-wrap justify-center gap-x-[0.3em] text-muted-foreground/30 whitespace-normal sm:whitespace-nowrap">
              <span>Eliminate</span> <span>Friction.</span>
            </div>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto mt-12 max-w-3xl text-xl text-muted-foreground sm:text-2xl font-medium leading-relaxed"
          >
            <p className="mb-6 flex flex-wrap justify-center items-center gap-x-2 min-h-[5.5rem] sm:min-h-[2.5rem]">
              <span>Your team is spending hours on</span>
              <span className="relative inline-flex items-center justify-center min-w-[12ch] h-10 text-primary font-bold italic">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={cyclingWords[wordIndex]}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute text-center w-full"
                  >
                    {cyclingWords[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span>that shouldn't require a human.</span>
            </p>
            <p>
              We replace business bottlenecks with engineered leverage.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-14"
          >
            <Button
              onClick={scrollToForm}
              size="lg"
              className="h-16 sm:h-20 rounded-full bg-primary px-8 sm:px-12 text-base sm:text-lg font-black uppercase tracking-widest transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(16,185,129,0.4)] shadow-xl"
            >
              Request Consultation
              <ChevronRight className="ml-2 h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
          </motion.div>
        </div>

        {/* Subtle decorative grid */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </section>

      {/* 2. PARTNERED SECTION (Sector Trust) */}
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

      {/* 3. OPERATIONAL CLARITY SECTION (Qualification Bento) */}
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

      {/* 4. OUR PROCESS SECTION */}
      <section id="process" className="px-6 py-40 border-t border-white/5">
        <div className="mx-auto max-w-7xl">
          <div className="mb-24">
            <h2 className="text-5xl font-black tracking-tight sm:text-8xl uppercase">
              Our <span className="text-primary italic">Process.</span>
            </h2>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Live System Schematic (Animated Lines) */}
            <div className="absolute top-[60px] left-[15%] right-[15%] h-px hidden md:block z-0 pointer-events-none">
              <svg className="w-full h-[300px] overflow-visible">
                <motion.path
                  d="M 0 0 C 100 0, 100 200, 200 200 C 300 200, 300 0, 400 0"
                  fill="none"
                  stroke="url(#gradient-line)"
                  strokeWidth="2"
                  strokeDasharray="10 10"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: false, amount: 0.1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
                <defs>
                  <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(16,185,129,0)" />
                    <stop offset="50%" stopColor="rgba(16,185,129,0.5)" />
                    <stop offset="100%" stopColor="rgba(16,185,129,0)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

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

      {/* 5. RECLAIM YOUR TIME SECTION (Automation Calculator) */}
      <section id="calculator" className="px-6 py-40 border-b border-white/5 bg-black/40">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight mb-4">
              Reclaim <span className="text-primary italic">Your Time.</span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
              Personalized ROI projection for your current operational structure.
            </p>
          </div>
          <InteractiveCalculator />
        </div>
      </section>

      {/* 6. SNAPSHOTS OF SUCCESS SECTION */}
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
                end: 0, suffix: "", decimals: 0,
                label: "Manual Errors",
                win: "Eliminated reporting discrepancies for a healthcare provider through deterministic data sync.",
              },
            ].map((s, idx) => (
              <GlassCard key={idx} delay={idx * 0.1} className="flex flex-col gap-8 group">
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-black text-primary tracking-tighter">
                    <CountUp end={s.end} decimals={s.decimals} suffix={s.suffix} duration={2} />
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

      {/* 7. STATEMENT OF INTENT SECTION (Founder's Statement) */}
      <section className="px-6 py-40 border-b border-white/5">
        <div className="mx-auto max-w-4xl">
          <GlassCard className="p-12 sm:p-20 relative overflow-hidden border-primary/20 bg-primary/[0.02]">
            <Quote className="absolute top-10 left-10 h-20 w-20 text-primary/5 -z-10" />
            <div className="space-y-8 relative z-10">
              <h3 className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Founder's Statement.</h3>
              <p className="text-xl sm:text-3xl font-bold leading-relaxed text-foreground">
                "I started Carrillo Dynamics because I saw too many talented teams drowning in 'manual' work, the kind that moves spreadsheets instead of adding zeros.<br /><br />My goal is to turn your operational chaos into a deterministic engine that wins on repeat by design."
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

      {/* 8. CONTACT US SECTION (Intake Form) */}
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

          <div ref={successContainerRef} className="glass p-10 md:p-20 rounded-[4rem] shadow-2xl relative border-white/10 overflow-hidden min-h-[600px] flex flex-col justify-center">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
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
                          <h3 className="text-sm font-black uppercase tracking-[0.3em] text-foreground">Company Information</h3>
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
                        disabled={isLoading}
                        className="w-full h-20 sm:h-24 rounded-[1.5rem] bg-primary text-lg sm:text-2xl font-black uppercase tracking-[0.1em] sm:tracking-[0.3em] transition-all hover:shadow-[0_0_60px_rgba(16,185,129,0.5)] shadow-xl active:scale-95 px-4 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <div className="flex items-center gap-3">
                            <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin" />
                            <span>Processing...</span>
                          </div>
                        ) : (
                          "Confirm Application"
                        )}
                      </Button>
                    </form>
                  </Form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex flex-col items-center justify-center text-center space-y-8 w-full py-20"
                >
                  <div className="h-24 w-24 rounded-full bg-primary/20 flex items-center justify-center mb-4 border border-primary/30">
                    <Check className="h-10 w-10 text-primary flex-shrink-0" />
                  </div>
                  <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-foreground">
                    Application <span className="text-primary italic">Received.</span>
                  </h3>
                  <p className="text-xl text-muted-foreground font-medium max-w-lg mx-auto leading-relaxed">
                    Your profile has been routed to our engineering team. We will review your context and reach out within 24 hours to schedule your consultation.
                  </p>
                  <Button
                    onClick={() => {
                      setIsSubmitted(false);
                      form.reset();
                    }}
                    variant="outline"
                    className="mt-8 h-14 rounded-full border-white/20 hover:bg-white/10 text-white font-bold tracking-widest uppercase px-8"
                  >
                    Submit Another Inquiry
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 9. OPERATIONS FAQ SECTION */}
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

      {/* 10. FOOTER */}
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
