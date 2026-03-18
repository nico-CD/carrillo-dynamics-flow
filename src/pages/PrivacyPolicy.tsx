import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FastTrackNav from "@/components/FastTrackNav";
import { useState } from "react";

const PrivacyPolicy = () => {
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);

  return (
    <div className="mesh-gradient min-h-screen text-foreground selection:bg-primary/30 font-sans flex flex-col">
      <FastTrackNav onVisibilityChange={setIsNavbarHidden} onContactClick={() => window.location.href = "/#consultation"} />
      {!isNavbarHidden && <Navbar />}

      <main className="flex-1 px-6 py-40 mx-auto max-w-4xl w-full">
        <h1 className="text-5xl font-black uppercase tracking-tight mb-12">
          Privacy <span className="text-primary italic">Policy.</span>
        </h1>
        
        <div className="space-y-8 text-muted-foreground font-medium leading-relaxed">
          <p>Last Updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-black uppercase text-foreground">1. Introduction</h2>
          <p>Carrillo Dynamics ("we," "our," or "us") respects your privacy and is committed to protecting it through our compliance with this policy. This Privacy Policy describes the types of information we may collect from you or that you may provide when you visit our website.</p>

          <h2 className="text-2xl font-black uppercase text-foreground">2. Information Collection & Use</h2>
          <p>We collect several types of information from and about users of our website, including information by which you may be personally identified, such as name, postal address, e-mail address, and telephone number. This information is strictly used for communication, project fulfillment, and consultation scheduling.</p>

          <div className="p-8 border-l-4 border-primary bg-primary/5 rounded-xl block">
            <h2 className="text-xl font-black uppercase text-foreground mb-4">3. Mobile Communication & SMS Policy</h2>
            <p className="text-white/80 font-bold">
              Mobile information will not be shared with third parties or affiliates for marketing or promotional purposes. All the above categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties under any circumstances.
            </p>
          </div>

          <h2 className="text-2xl font-black uppercase text-foreground">4. Disclosure of Your Information</h2>
          <p>We DO NOT share, sell, rent, or trade your personal information with third parties for their commercial purposes.</p>

          <h2 className="text-2xl font-black uppercase text-foreground">5. Your Consent</h2>
          <p>By using our site, you consent to our website's Privacy Policy. If you interact with our business number (708-905-9254), you are granting us permission to text you regarding your inquiry, project scope, and system maintenance.</p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
