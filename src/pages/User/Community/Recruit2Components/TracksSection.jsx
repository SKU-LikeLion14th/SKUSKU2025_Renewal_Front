import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPencilAlt, FaCode, FaServer } from 'react-icons/fa';

const tracksData = [
    {
        id: "design",
        title: "기획 & 디자인",
        subtitle: "아이디어를 사용자 경험으로",
        color: "#3B79FF", // Toss Style: Main Blue for everything active
        icon: <FaPencilAlt />,
        desc: "문제 정의부터 시작하는 서비스 기획\n사용자 흐름(UX) 중심 아이디어 구체화\nFigma 활용 와이어프레임 & UI 디자인\n전체 서비스 개발 흐름 소통 과정",
        bgImage: "/assets/images/image 26.png"
    },
    {
        id: "frontend",
        title: "프론트엔드",
        subtitle: "사용자와 가장 가까운 화면",
        color: "#3B79FF",
        icon: <FaCode />,
        desc: "HTML/CSS 기초 및 Tailwind CSS 활용\nJavaScript를 통한 동적 화면 구성\nReact 기반 컴포넌트 단위 UI 설계\nTypeScript로 타입 안정성 강화",
        bgImage: "/assets/images/image 25.png"
    },
    {
        id: "backend",
        title: "백엔드",
        subtitle: "서비스의 핵심 로직 설계",
        color: "#3B79FF",
        icon: <FaServer />,
        desc: "Java & Spring Boot 기반 서버 구조 이해\nCRUD 기능 구현 및 API 설계\n데이터베이스 설계 및 관리\n클라이언트-서버 통신 및 Security",
        bgImage: "/assets/images/image 24.png"
    }
];

export default function TracksSection() {
    const [activeId, setActiveId] = useState("design");
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Desktop Accordion Gallery (Toss Style: Clean, White Borders)
    if (!isMobile) {
        return (
            <section className="py-32 max-w-7xl mx-auto px-6 relative z-10 hidden lg:block bg-[#FFFFFF]">
                <div className="text-center mb-16">
                    {/* Chip completely removed per user request */}
                    <h2 className="text-[56px] fontBlack text-[#111111] tracking-tight">3개의 전문 트랙</h2>
                    <p className="text-[#666666] text-[20px] mt-4 fontMedium">자신의 강점에 맞는 파트를 선택하여 1년간 집중적으로 성장합니다.</p>
                </div>

                <div className="flex w-full h-[600px] gap-6">
                    {tracksData.map((track) => {
                        const isActive = activeId === track.id;
                        return (
                            <motion.div
                                key={track.id}
                                layout
                                onMouseEnter={() => setActiveId(track.id)}
                                onClick={() => setActiveId(track.id)}
                                className={`relative rounded-[32px] overflow-hidden cursor-pointer transition-all duration-500 bg-white border ${isActive ? "flex-[4] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-transparent" : "flex-[1] shadow-sm border-[#E5E5E5]"
                                    }`}
                            >
                                {/* Background Image */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                                    style={{
                                        backgroundImage: `url('${track.bgImage}')`,
                                        transform: isActive ? 'scale(1.05)' : 'scale(1)',
                                        filter: isActive ? 'brightness(0.9)' : 'brightness(0.3) grayscale(0.2)'
                                    }}
                                />

                                {/* Overlay Gradient for readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 transition-opacity duration-300" />

                                {/* Content */}
                                <div className={`absolute inset-0 flex flex-col justify-end ${isActive ? "p-10" : "p-6 pb-12"}`}>
                                    <div className={`flex ${isActive ? "flex-row items-center gap-4" : "flex-col items-center gap-3 text-center"} mb-4`}>
                                        <div
                                            className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-2xl shrink-0 backdrop-blur-md border border-white/20 text-white"
                                        >
                                            {track.icon}
                                        </div>
                                        {isActive ? (
                                            <motion.h3
                                                layoutId={`title-${track.id}`}
                                                className="text-4xl fontBlack text-white whitespace-nowrap drop-shadow-lg"
                                            >
                                                {track.title}
                                            </motion.h3>
                                        ) : (
                                            <div className="hidden min-[1200px]:block text-xl fontBold text-white opacity-60 break-keep">
                                                {track.title}
                                            </div>
                                        )}
                                    </div>

                                    <AnimatePresence>
                                        {isActive && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.3, delay: 0.1 }}
                                            >
                                                <p className="text-[22px] fontBold text-white mb-6 drop-shadow-md">
                                                    {track.subtitle}
                                                </p>
                                                <div className="text-white/90 fontMedium leading-relaxed whitespace-pre-line text-lg bg-black/40 backdrop-blur-md p-8 rounded-[24px] border border-white/20 inline-block w-full max-w-xl">
                                                    {track.desc}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>
        );
    }

    // Mobile Scroll Stacking Cards (Sticky Stack)
    return (
        <section className="py-24 px-4 relative z-10 lg:hidden min-h-[150vh] bg-[#FFFFFF]">
            <div className="text-center mb-16 sticky top-24 z-50">
                {/* Chip completely removed per user request */}
                <h2 className="text-[40px] fontBlack text-[#111111]">3개의 전문 트랙</h2>
            </div>

            <div className="flex flex-col gap-8 pb-32">
                {tracksData.map((track, idx) => (
                    <div
                        key={track.id}
                        className="sticky w-full h-[65vh] max-h-[550px] rounded-[32px] overflow-hidden border border-[#E5E5E5] shadow-[0_20px_40px_rgba(0,0,0,0.1)] origin-top transition-all"
                        style={{
                            top: `${140 + idx * 24}px`,
                            zIndex: 10 + idx
                        }}
                    >
                        {/* Background */}
                        <div className="absolute inset-0 bg-cover bg-center brightness-[0.7]" style={{ backgroundImage: `url('${track.bgImage}')` }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                        {/* Content */}
                        <div className="relative h-full flex flex-col justify-end p-8 z-10">
                            <div className="flex items-center gap-4 mb-4">
                                <div
                                    className="w-12 h-12 rounded-full flex items-center justify-center text-xl backdrop-blur-md bg-white/20 border border-white/30 text-white shadow-sm"
                                >
                                    {track.icon}
                                </div>
                                <h3 className="text-3xl fontBlack text-white drop-shadow-md">{track.title}</h3>
                            </div>
                            <p className="text-[20px] fontBold mb-6 text-white drop-shadow-sm">{track.subtitle}</p>
                            <div className="bg-black/40 backdrop-blur-xl p-6 rounded-[20px] border border-white/20 text-white/95 text-[16px] leading-relaxed whitespace-pre-line shadow-lg fontMedium">
                                {track.desc}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
