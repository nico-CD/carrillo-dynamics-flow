import { useEffect, useRef } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

interface CountUpProps {
    end: number;
    duration?: number;
    decimals?: number;
    suffix?: string;
    prefix?: string;
}

export default function CountUp({ end, duration = 2, decimals = 0, suffix = "", prefix = "" }: CountUpProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const springValue = useSpring(0, {
        bounce: 0,
        duration: duration * 1000,
    });

    const displayValue = useTransform(springValue, (current) => {
        return prefix + current.toFixed(decimals) + suffix;
    });

    useEffect(() => {
        if (isInView) {
            springValue.set(end);
        }
    }, [isInView, end, springValue]);

    return <motion.span ref={ref}>{displayValue}</motion.span>;
}
