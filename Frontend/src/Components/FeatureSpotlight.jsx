import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import useMousePosition from '../utils/useMousePosition';

const FeatureSpotlight = ({ children, className = "" }) => {
    const divRef = useRef(null);
    const { x, y } = useMousePosition();
    const [opacity, setOpacity] = useState(0);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        if (!divRef.current) return;

        const rect = divRef.current.getBoundingClientRect();
        // Calculate relative position
        mouseX.set(x - rect.left);
        mouseY.set(y - rect.top);
    }, [x, y, mouseX, mouseY]);

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <div
            ref={divRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative w-full overflow-hidden rounded-xl bg-zinc-900 ${className}`}
        >
            {/* The Spotlight Gradient Layer - The "Lines" that glow */}
            <motion.div
                className="pointer-events-none absolute -inset-px transition-opacity duration-300"
                style={{
                    opacity,
                    background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(59, 130, 246, 0.5), transparent 40%)`,
                }}
            />

            {/* The Grid Layout - The "Mask" */}
            <div className="relative grid gap-[1px] bg-transparent p-[1px] md:grid-cols-3 h-full">
                {children}
            </div>
        </div>
    );
};

export const FeatureCard = ({ title, description, icon: Icon }) => {
    return (
        <div className="relative h-full bg-gray-50 p-6 overflow-hidden">
            <div className="relative z-10">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    {Icon && <Icon size={20} />}
                </div>
                <h3 className="mb-2 text-lg font-bold text-gray-900">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default FeatureSpotlight;