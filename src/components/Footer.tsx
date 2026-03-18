const Footer = () => {
    return (
        <footer className="px-6 py-24 border-t border-white/5 bg-black/50">
            <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-10">
                <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span className="text-sm font-black uppercase tracking-[0.2em] italic">Carrillo Dynamics</span>
                </div>
                <p className="text-[10px] font-black tracking-[0.5em] text-muted-foreground uppercase opacity-40">
                    © {new Date().getFullYear()} Systems Engineering. Chicago, IL.
                </p>
                <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 flex-wrap justify-end">
                    <a href="mailto:engineering@carrillodynamics.com" className="hover:text-primary transition-colors">engineering@carrillodynamics.com</a>
                    <a href="tel:7089059254" className="hover:text-primary transition-colors">708-905-9254</a>
                    <a href="/terms" className="hover:text-primary transition-colors">Terms of Service</a>
                    <a href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
