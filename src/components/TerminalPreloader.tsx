import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TerminalPreloader() {
    const [stage, setStage] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Lock body scroll right away
        document.body.style.overflow = 'hidden';

        const stages = [
            { delay: 100 },
            { delay: 500 },
            { delay: 900 },
            { delay: 1300 },
            { delay: 1800 } // Final wait before fading out
        ];

        let currentDelay = 0;
        const timeouts: NodeJS.Timeout[] = [];

        stages.forEach((s, idx) => {
            currentDelay += s.delay;
            const timeout = setTimeout(() => {
                setStage(idx + 1);
                if (idx === stages.length - 1) {
                    setIsVisible(false);
                    // Unlock body scroll once it starts fading out
                    document.body.style.overflow = '';
                }
            }, currentDelay);
            timeouts.push(timeout);
        });

        return () => {
            timeouts.forEach(clearTimeout);
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    key="preloader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="fixed inset-0 z-[999] bg-background flex flex-col justify-start p-8 pt-24 lg:pt-32 font-mono text-xs sm:text-sm"
                >
                    <div className="max-w-3xl space-y-2 text-primary/80">
                        {stage > 0 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{`> [INITIATING CARRILLO ENGINE]...`}</motion.div>}
                        {stage > 1 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{`> [LOADING MODULES]: ARCHITECTURE, WORKFLOW, SYNC`}</motion.div>}
                        {stage > 2 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{`> [VERIFYING DETERMINISTIC OUTCOMES]... SUCCESS`}</motion.div>}
                        {stage > 3 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{`> [ACCESS GRANTED]: SYSTEM ONLINE.`}</motion.div>}
                        {stage > 4 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-4 w-2 bg-primary animate-pulse" />}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
