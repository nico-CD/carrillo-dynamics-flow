import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FastTrackNav from "@/components/FastTrackNav";
import { useState } from "react";

const TermsConditions = () => {
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);

  return (
    <div className="mesh-gradient min-h-screen text-foreground selection:bg-primary/30 font-sans flex flex-col">
      <FastTrackNav onVisibilityChange={setIsNavbarHidden} onContactClick={() => window.location.href = "/#consultation"} />
      {!isNavbarHidden && <Navbar />}

      <main className="flex-1 px-6 py-40 mx-auto max-w-4xl w-full">
        <h1 className="text-5xl font-black uppercase tracking-tight mb-12">
          Terms & <span className="text-primary italic">Conditions.</span>
        </h1>
        
        <div className="space-y-8 text-muted-foreground font-medium leading-relaxed">
          <p>Last Updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-black uppercase text-foreground">1. Agreement to Terms</h2>
          <p>By accessing our website and engaging with Carrillo Dynamics, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree with any part of these terms, you must not use our website or services.</p>

          <h2 className="text-2xl font-black uppercase text-foreground">2. Communication Options</h2>
          <p>By providing your phone number (via our inbound line 708-905-9254 or through inquiry forms), you agree to receive communicative messages related to your project and inquiry. Standard message and data rates may apply. You can opt out at any time by replying "STOP".</p>

          <h2 className="text-2xl font-black uppercase text-foreground">3. Service Limitations</h2>
          <p>Carrillo Dynamics provides operational engineering consulting. Results, return on investment, and timeline metrics depend heavily on client collaboration and operational complexity. We do not guarantee generic deliverables or results outside defined statements of work.</p>

          <h2 className="text-2xl font-black uppercase text-foreground">4. Governing Law</h2>
          <p>These terms shall be governed by and construed in accordance with the laws of the United States. Any disputes relating to these terms and conditions will be subject to the exclusive jurisdiction of the US courts.</p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsConditions;
