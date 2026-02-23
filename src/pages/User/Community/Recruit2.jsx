import React, { useRef, useEffect } from "react";
import Lenis from "lenis";

import HeroSection from "./Recruit2Components/HeroSection";
import QualificationSection from "./Recruit2Components/QualificationSection";
import EligibilitySection from "./Recruit2Components/EligibilitySection";
import ScheduleSection from "./Recruit2Components/ScheduleSection";
import TracksSection from "./Recruit2Components/TracksSection";
import GrowToWorldSection from "./Recruit2Components/GrowToWorldSection";
import FAQSection from "./Recruit2Components/FAQSection";
import BottomCTASection from "./Recruit2Components/BottomCTASection";

/**
 * Recruit2.jsx (V2 - Toss Style Redesign)
 * Minimal, light-themed container for the 14th LikeLion SKU recruitment page.
 */
export default function Recruit2() {
    const containerRef = useRef();

    useEffect(() => {
        // Initialize Lenis Smooth Scroll
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            touchMultiplier: 2,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        return () => lenis.destroy();
    }, []);

    return (
        <div ref={containerRef} className="relative w-full bg-[#FFFFFF] text-[#333333] overflow-hidden fontRegular selection:bg-[#3B79FF] selection:text-white">
            {/* Main Content (Modular Sections) */}
            <div className="relative z-[1] w-full">
                <HeroSection />
                <QualificationSection />
                <EligibilitySection />
                <ScheduleSection />
                <TracksSection />
                <GrowToWorldSection />
                <FAQSection />
                <BottomCTASection />
            </div>
        </div>
    );
}
