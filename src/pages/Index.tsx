import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import Navbar from "@/components/Navbar";
import InteractiveCalculator from "@/components/InteractiveCalculator";
import FastTrackNav from "@/components/FastTrackNav";
import { useState } from "react";

// Modular Sections
import Hero from "@/components/sections/Hero";
import SectorTrust from "@/components/sections/SectorTrust";
import QualificationBento from "@/components/sections/QualificationBento";
import Process from "@/components/sections/Process";
import SuccessSnapshots from "@/components/sections/SuccessSnapshots";
import FounderStatement from "@/components/sections/FounderStatement";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/Footer";

// Logic & Types
import { intakeSchema, IntakeValues } from "@/types/intake";
import { useIntake } from "@/hooks/useIntake";

const Index = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const successContainerRef = useRef<HTMLDivElement>(null);
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);

  const { isLoading, submitIntake } = useIntake();
  const [formStep, setFormStep] = useState<'step1' | 'step2' | 'generating' | 'success'>('step1');

  const form = useForm<IntakeValues>({
    resolver: zodResolver(intakeSchema),
    defaultValues: {
      firstName: "", lastName: "", email: "", companyName: "", website: "",
      role: "", companySize: "", annualRevenue: "", projectBudget: "",
      howCanWeHelp: "", automationGoal: "", anythingElse: "",
    },
  });

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const onSubmit = async (data: IntakeValues) => {
    if (formStep === 'step1') {
      const success = await submitIntake(data, 1);
      if (success) {
        setFormStep('step2');
        setTimeout(() => {
          const y = successContainerRef.current ? successContainerRef.current.getBoundingClientRect().top + window.scrollY - 40 : 0;
          if (y > 0) {
            window.scrollTo({ top: y, behavior: "smooth" });
          }
        }, 50);
      }
    } else if (formStep === 'step2') {
      const success = await submitIntake(data, 2);
      if (success) {
        setFormStep('generating');
        form.reset();
        
        // Scroll to success container to show the generating animation
        setTimeout(() => {
          const y = successContainerRef.current ? successContainerRef.current.getBoundingClientRect().top + window.scrollY - 40 : 0;
          if (y > 0) {
            window.scrollTo({ top: y, behavior: "smooth" });
          }
        }, 50);

        // Simulate blueprint generation for prestige feel
        setTimeout(() => {
          setFormStep('success');
        }, 2500);
      }
    }
  };

  const resetForm = () => {
    form.reset();
    setFormStep('step1');
  };

  const revealProps = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }
  };

  return (
    <div className="mesh-gradient min-h-screen text-foreground selection:bg-primary/30 font-sans">
      <FastTrackNav onContactClick={scrollToForm} onVisibilityChange={setIsNavbarHidden} />
      {!isNavbarHidden && <Navbar />}

      <Hero onContactClick={scrollToForm} />

      <motion.div {...revealProps}>
        <SectorTrust />
      </motion.div>

      <motion.div {...revealProps}>
        <QualificationBento />
      </motion.div>

      <motion.div {...revealProps}>
        <Process />
      </motion.div>

      <motion.section 
        id="calculator" 
        className="px-6 py-40 border-b border-white/5 bg-black/40"
        {...revealProps}
      >
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
      </motion.section>

      <motion.div {...revealProps}>
        <SuccessSnapshots />
      </motion.div>

      <motion.div {...revealProps}>
        <FounderStatement />
      </motion.div>

      {/* INTAKE FORM SECTION */}
      <section id="consultation" className="px-6 py-40 bg-black/40">
        <motion.div 
          ref={formRef} 
          className="mx-auto max-w-5xl scroll-mt-24"
          {...revealProps}
        >
          <div className="mb-24 text-center">
            <h2 className="text-6xl font-black tracking-tight sm:text-8xl uppercase mb-6">
              Systems <span className="text-primary italic">Intake.</span>
            </h2>
            <div className="bg-primary/10 border border-primary/20 inline-block px-8 py-3 rounded-2xl">
              <p className="text-primary font-black text-sm tracking-[0.05em] uppercase">Complete the fields below. All information is reviewed internally prior to scheduling.</p>
            </div>
          </div>

          <div ref={successContainerRef} className="glass p-10 md:p-20 rounded-[4rem] shadow-2xl relative border-white/10 overflow-hidden min-h-[600px] flex flex-col justify-center">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

            <AnimatePresence mode="wait">
              {formStep === 'step1' || formStep === 'step2' ? (
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
                      {/* Form sections preserved exactly as requested in original requirement to keep visual branding */}
                      {formStep === 'step1' && (
                        <>
                          <div className="space-y-10">
                        <div className="flex items-center gap-6">
                          <span className="text-xs font-black uppercase tracking-[0.3em] text-primary bg-primary/20 border border-primary/30 px-5 py-2 rounded-2xl">Part 01</span>
                          <h3 className="text-sm font-black uppercase tracking-[0.3em] text-foreground">General Information</h3>
                          <div className="flex-1 h-px bg-white/10" />
                        </div>

                        <div className="grid gap-10 md:grid-cols-2">
                          <FormField control={form.control} name="firstName" render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm sm:text-base uppercase font-black tracking-[0.2em] text-foreground/70 mb-3 block">First Name</FormLabel>
                              <FormControl><Input placeholder="John" className="h-16 rounded-[1.25rem] border-white/10 bg-white/5 px-8 text-lg focus:bg-white/10 focus:border-primary transition-all font-bold placeholder:text-white/40" {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                          <FormField control={form.control} name="lastName" render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm sm:text-base uppercase font-black tracking-[0.2em] text-foreground/70 mb-3 block">Last Name</FormLabel>
                              <FormControl><Input placeholder="Doe" className="h-16 rounded-[1.25rem] border-white/10 bg-white/5 px-8 text-lg focus:bg-white/10 focus:border-primary transition-all font-bold placeholder:text-white/40" {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                        </div>

                        <div className="grid gap-10 md:grid-cols-2">
                          <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm sm:text-base uppercase font-black tracking-[0.2em] text-foreground/70 mb-3 block">Corporate Email</FormLabel>
                              <FormControl><Input type="email" placeholder="john@company.com" className="h-16 rounded-[1.25rem] border-white/10 bg-white/5 px-8 text-lg focus:bg-white/10 focus:border-primary transition-all font-bold placeholder:text-white/40" {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                          <FormField control={form.control} name="companyName" render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm sm:text-base uppercase font-black tracking-[0.2em] text-foreground/70 mb-3 block">Company Name</FormLabel>
                              <FormControl><Input placeholder="Acme Inc." className="h-16 rounded-[1.25rem] border-white/10 bg-white/5 px-8 text-lg focus:bg-white/10 focus:border-primary transition-all font-bold placeholder:text-white/40" {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                        </div>
                        <FormField control={form.control} name="howCanWeHelp" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm sm:text-base uppercase font-black tracking-[0.2em] text-foreground/70 mb-3 block">Current Friction Points</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Describe your structural operational challenges..." className="min-h-[180px] rounded-[1.5rem] border-white/10 bg-white/5 p-8 text-lg focus:bg-white/10 focus:border-primary transition-all font-bold placeholder:text-white/40" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>
                        </>
                      )}

                      {formStep === 'step2' && (
                        <>
                      {/* Section 2: Company Profile */}
                      <div className="space-y-10">
                        <div className="flex items-center gap-6">
                          <span className="text-xs font-black uppercase tracking-[0.3em] text-primary bg-primary/20 border border-primary/30 px-5 py-2 rounded-2xl">Part 02</span>
                          <h3 className="text-sm font-black uppercase tracking-[0.3em] text-foreground">Company Information</h3>
                          <div className="flex-1 h-px bg-white/10" />
                        </div>

                        <FormField control={form.control} name="website" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm sm:text-base uppercase font-black tracking-[0.2em] text-foreground/70 mb-3 block">Company Website</FormLabel>
                            <FormControl><Input placeholder="https://" className="h-16 rounded-[1.25rem] border-white/10 bg-white/5 px-8 text-lg focus:bg-white/10 focus:border-primary transition-all font-bold placeholder:text-white/40" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />

                        <div className="grid gap-10 md:grid-cols-2">
                          <FormField control={form.control} name="role" render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm sm:text-base uppercase font-black tracking-[0.2em] text-foreground/70 mb-3 block">Operational Role</FormLabel>
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
                              <FormLabel className="text-sm sm:text-base uppercase font-black tracking-[0.2em] text-foreground/70 mb-3 block">Company Scale</FormLabel>
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
                              <FormLabel className="text-sm sm:text-base uppercase font-black tracking-[0.2em] text-foreground/70 mb-3 block">Annual Revenue</FormLabel>
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
                              <FormLabel className="text-sm sm:text-base uppercase font-black tracking-[0.2em] text-foreground/70 mb-3 block">Implementation Budget</FormLabel>
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
                            <FormLabel className="text-sm sm:text-base uppercase font-black tracking-[0.2em] text-foreground/70 mb-3 block">Most Important Objective</FormLabel>
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



                        <FormField control={form.control} name="anythingElse" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm sm:text-base uppercase font-black tracking-[0.2em] text-foreground/70 mb-3 block">Additional Notes (Optional)</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Additional context..." className="min-h-[120px] rounded-[1.5rem] border-white/10 bg-white/5 p-8 text-lg focus:bg-white/10 focus:border-primary transition-all font-bold placeholder:text-white/40" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>
                      </>
                      )}

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
                          "Submit"
                        )}
                      </Button>
                      
                      {formStep === 'step2' && (
                        <div className="flex justify-center mt-6">
                            <button 
                              type="button" 
                              onClick={() => {
                                setFormStep('generating');
                                // Scroll to success container to show the generating animation
                                setTimeout(() => {
                                  const y = successContainerRef.current ? successContainerRef.current.getBoundingClientRect().top + window.scrollY - 40 : 0;
                                  if (y > 0) {
                                    window.scrollTo({ top: y, behavior: "smooth" });
                                  }
                                }, 50);

                                // Simulate blueprint generation
                                setTimeout(() => {
                                  setFormStep('success');
                                }, 2500);
                              }} 
                              className="text-muted-foreground hover:text-white font-bold tracking-widest uppercase transition-colors text-sm"
                            >
                              Skip & Finish
                            </button>
                        </div>
                      )}
                    </form>
                  </Form>
                </motion.div>
              ) : formStep === 'generating' ? (
                <motion.div
                  key="generating"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center space-y-8 w-full py-20"
                >
                  <div className="relative h-32 w-32 mb-8">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 border-t-2 border-primary rounded-full"
                    />
                    <motion.div 
                      animate={{ rotate: -360 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-4 border-r-2 border-primary/40 rounded-full"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Loader2 className="h-8 w-8 text-primary animate-spin" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-3xl font-black uppercase tracking-tight text-foreground">
                      Generating <span className="text-primary italic">Blueprint...</span>
                    </h3>
                    <div className="flex gap-2 justify-center">
                      {[0, 1, 2].map((i) => (
                        <motion.div 
                          key={i}
                          animate={{ opacity: [0.2, 1, 0.2] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                          className="h-1.5 w-8 bg-primary/40 rounded-full"
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground font-medium uppercase text-xs tracking-[0.2em] mt-4">Analyzing systems architecture</p>
                  </div>
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
                    onClick={resetForm}
                    variant="outline"
                    className="mt-8 h-14 rounded-full border-white/20 hover:bg-white/10 text-white font-bold tracking-widest uppercase px-8"
                  >
                    Submit Another Inquiry
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </section>

      <motion.div {...revealProps}>
        <FAQ />
      </motion.div>

      <Footer />
    </div>
  );
};

export default Index;
