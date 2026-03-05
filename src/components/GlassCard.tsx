import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

const GlassCard = ({ children, className, delay = 0 }: GlassCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }}
            whileHover={{ y: -4, scale: 1.01 }}
            className={cn(
                "glass rounded-3xl p-8 transition-shadow hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)]",
                className
            )}
        >
            {children}
        </motion.div>
    );
};

export default GlassCard;
