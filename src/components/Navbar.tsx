import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const Navbar = () => {
    const handleNavigation = (id: string) => {
        if (window.location.pathname !== "/") {
            window.location.href = `/#${id}`;
        } else {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 glass transition-all duration-300"
        >
            <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/10 shadow-lg">
                    <img
                        src="/bull_PNGs/bull-apple-touch-icon.png"
                        alt="Carrillo Dynamics Logo"
                        className="h-full w-full object-cover"
                    />
                </div>
                <span className="text-sm font-black uppercase tracking-[0.2em]">Carrillo Dynamics</span>
            </div>

            <div className="hidden items-center gap-10 md:flex">
                <button onClick={() => handleNavigation('process')} className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground transition-colors hover:text-primary">Our Process</button>
                <button onClick={() => handleNavigation('success')} className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground transition-colors hover:text-primary">Your Success</button>
            </div>

            <Button
                onClick={() => handleNavigation('consultation')}
                size="sm"
                className="h-10 rounded-full px-8 text-[11px] font-black uppercase tracking-[0.2em] bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all"
            >
                Initiate Blueprint
            </Button>
        </motion.nav>
    );
};

export default Navbar;
