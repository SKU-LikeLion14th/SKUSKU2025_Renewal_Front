import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function GrowToWorldSection() {
    const containerRef = useRef(null);
    const svgContainerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: svgContainerRef,
        offset: ["start 70%", "end center"]
    });

    // Theme Transition Logic: White -> Dark at the end of timeline
    const backgroundColor = useTransform(scrollYProgress, [0.8, 1], ["#FFFFFF", "#050505"]);
    const textColor = useTransform(scrollYProgress, [0.8, 1], ["#111111", "#FFFFFF"]);
    const descColor = useTransform(scrollYProgress, [0.8, 1], ["#555555", "#CCCCCC"]);

    // 속도를 늦추고 부드러운 관성을 주기 위해 useSpring 적용
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 40,
        damping: 20,
        restDelta: 0.001
    });

    const pathLength = useTransform(smoothProgress, [0, 1], [0, 1]);

    return (
        <motion.section
            ref={containerRef}
            style={{ backgroundColor }}
            className="relative py-32 w-full px-4 sm:px-6 overflow-hidden transition-colors duration-500"
        >
            <div className="max-w-4xl mx-auto relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center mb-32"
                >
                    <h2 className="text-[36px] sm:text-[40px] md:text-[56px] fontBlack text-[#0060C6] tracking-tight leading-[1.3] break-keep">
                        아이디어가 <br className="block sm:hidden" />
                        현실이 되는 <br />
                        새로운 여정
                    </h2>
                </motion.div>

                <div ref={svgContainerRef} className="relative flex flex-col justify-between items-center min-h-[1600px] w-full mt-20">

                    {/* SVG Curve Background */}
                    <div className="absolute inset-0 pointer-events-none z-0 hidden md:block w-full h-full flex justify-center mt-32">
                        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" className="overflow-visible absolute top-0 left-0 w-full h-full">
                            <defs>
                                <linearGradient id="verticalCurveGradient" x1="0" y1="0" x2="0" y2="100%" gradientUnits="userSpaceOnUse">
                                    <stop offset="0%" stopColor="#E6F2FF" />
                                    <stop offset="100%" stopColor="#0060C6" />
                                </linearGradient>
                            </defs>
                            <motion.path
                                initial={{ pathLength: 0 }}
                                d="M50,0 C50,25 20,35 20,50 C20,65 80,75 80,100"
                                stroke="url(#verticalCurveGradient)"
                                strokeWidth="4"
                                fill="none"
                                strokeLinecap="round"
                                style={{ pathLength }}
                                className="drop-shadow-[0_10px_20px_rgba(0,96,198,0.4)]"
                            />
                        </svg>
                    </div>

                    {/* Nodes Container */}
                    <div className="w-full h-full flex flex-col justify-between items-center relative z-10 py-10">

                        {/* Node 1: 3월 모집 */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="w-full md:w-[50%] bg-white/95 backdrop-blur-xl p-6 sm:p-8 md:p-10 rounded-[28px] md:rounded-[32px] border border-[#E5E5E5] shadow-[0_20px_40px_rgba(0,0,0,0.06)] md:self-end md:mr-4 mt-0 overflow-hidden"
                        >
                            <div className="fontBlack text-2xl sm:text-3xl mb-4 flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-center">
                                <span className="text-[#FF6A15] whitespace-nowrap">3월</span>
                                <span className="text-[#111111] opacity-30 hidden sm:block">|</span>
                                <span className="text-[#FF6A15] whitespace-nowrap">14기 아기사자 모집</span>
                            </div>
                            <p className="text-[#555555] text-base sm:text-lg fontMedium break-keep leading-relaxed border-t border-[#E5E5E5] pt-4">
                                26년을 함께 성장해 나갈 아기사자를 모집합니다.
                            </p>
                        </motion.div>

                        {/* Node 2: 5월 아이디어톤 */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="w-full md:w-[50%] bg-white/95 backdrop-blur-xl p-6 sm:p-8 md:p-10 rounded-[28px] md:rounded-[32px] border border-[#E5E5E5] shadow-[0_20px_40px_rgba(0,0,0,0.06)] md:self-start md:ml-4 mt-24 overflow-hidden"
                        >
                            <div className="fontBlack text-2xl sm:text-3xl mb-4 flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-center">
                                <span className="text-[#FF6A15] whitespace-nowrap">5월</span>
                                <span className="text-[#111111] opacity-30 hidden sm:block">|</span>
                                <span className="text-[#FF6A15] whitespace-nowrap">아이디어톤</span>
                            </div>
                            <p className="text-[#555555] text-base sm:text-lg fontMedium break-keep leading-relaxed border-t border-[#E5E5E5] pt-4">
                                제시되는 주제에 대한 톡톡 튀는 아이디어로 승부합니다.
                            </p>
                        </motion.div>

                        {/* Node 3: 8월 중앙 해커톤 */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="w-full md:w-[50%] bg-white/95 backdrop-blur-xl p-6 sm:p-8 md:p-10 rounded-[28px] md:rounded-[32px] border border-[#E5E5E5] shadow-[0_20px_40px_rgba(0,0,0,0.06)] md:self-end md:mr-4 mt-24 overflow-hidden"
                        >
                            <div className="fontBlack text-2xl sm:text-3xl mb-4 flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-center">
                                <span className="text-[#FF6A15] whitespace-nowrap">8월</span>
                                <span className="text-[#111111] opacity-30 hidden sm:block">|</span>
                                <span className="text-[#FF6A15] whitespace-nowrap">중앙 해커톤</span>
                            </div>
                            <p className="text-[#555555] text-base sm:text-lg fontMedium break-keep leading-relaxed border-t border-[#E5E5E5] pt-4">
                                멋대가 자부하는 국내 최대 규모의 무박 2일 해커톤 행사입니다.
                            </p>
                        </motion.div>

                        {/* Node 4: 9~12월 해커톤 */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="w-full md:w-[50%] bg-white/95 backdrop-blur-xl p-6 sm:p-8 md:p-10 rounded-[28px] md:rounded-[32px] border border-[#E5E5E5] shadow-[0_20px_40px_rgba(0,0,0,0.06)] md:self-start md:ml-4 mt-24 overflow-hidden"
                        >
                            <div className="fontBlack text-2xl sm:text-3xl mb-4 flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-start">
                                <span className="text-[#FF6A15] whitespace-nowrap mt-1">9~12월</span>
                                <span className="text-[#111111] opacity-30 mt-1 hidden sm:block">|</span>
                                <div className="flex flex-row flex-wrap sm:flex-col gap-2 mt-2 sm:mt-0 pr-4 text-left">
                                    <span className="text-[#FF6A15] break-keep">권역별 연합 해커톤</span>
                                    <span className="text-[#FF6A15] break-keep">기업 연계 해커톤</span>
                                </div>
                            </div>
                            <p className="text-[#555555] text-base sm:text-lg fontMedium break-keep leading-relaxed mt-2 border-t border-[#E5E5E5] pt-4">
                                학교 울타리를 넘어 권역별 해커톤을 참여하고, 기업의 문제를 해결하는 솔루션을 개발하며 협업합니다.
                            </p>
                        </motion.div>

                    </div>
                </div>
            </div>
        </motion.section>
    );
}
