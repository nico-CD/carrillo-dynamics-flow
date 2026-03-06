import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import React, { MouseEvent } from "react";

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    spotlight?: boolean;
}

const GlassCard = ({ children, className, delay = 0, spotlight = true }: GlassCardProps) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }}
            whileHover={{ y: -4, scale: 1.01 }}
            onMouseMove={spotlight ? handleMouseMove : undefined}
            className={cn(
                "glass rounded-3xl p-8 transition-all hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] relative group overflow-hidden",
                className
            )}
        >
            {spotlight && (
                <motion.div
                    className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
                    style={{
                        background: useMotionTemplate`
                            radial-gradient(
                                650px circle at ${mouseX}px ${mouseY}px,
                                rgba(16, 185, 129, 0.1),
                                transparent 80%
                            )
                        `,
                    }}
                />
            )}
            <div className="relative z-10 h-full flex flex-col">{children}</div>
        </motion.div>
    );
};

export default GlassCard;
