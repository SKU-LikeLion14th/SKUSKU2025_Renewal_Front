import React, { useRef, useEffect, useState } from "react";
// R3F & Drei: 3D 렌더링을 위한 라이브러리 (React Three Fiber)
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, Sparkles, PerspectiveCamera, Torus, Sphere } from "@react-three/drei";
// Lenis: 부드러운 스크롤을 위한 라이브러리
import Lenis from "lenis";
// React Icons: 아이콘 에셋
import {
    FaPencilAlt, FaCode, FaServer,
    FaChevronDown, FaPlus
} from "react-icons/fa";
import { IoArrowForward } from "react-icons/io5";
// Framer Motion: 스크롤 애니메이션 및 인터랙션
import { motion, AnimatePresence } from "framer-motion";

/* -------------------------------------------------------------------------- */
/*                                CONSTANTS (Data)                            */
/* -------------------------------------------------------------------------- */

// 1. 타임라인 데이터 (연간 일정)
const TIMELINE_DATA = [
    {
        month: "5월",
        color: "#3B79FF",
        title: "중앙 아이디어톤",
        subtitle: "\"상상을 구체화하는 시간\"",
        desc: "막연했던 아이디어를 기획과 디자인으로 구체화합니다.\nFigma와 PPT를 활용해 서로의 아이디어를 공유하며,\n더 나은 세상을 위한 첫 걸음을 내딛습니다."
    },
    {
        month: "8월",
        color: "#F75222",
        title: "중앙 해커톤",
        subtitle: "\"아이디어가 현실이 되는 순간\"",
        desc: "밤을 새우며 몰입하는 즐거움.\n기획부터 디자인, 개발까지 팀원들과 협업하여\n나만의 독창적인 실제 서비스를 완성합니다."
    },
    {
        month: "9월 - 12월",
        color: "#0ACF83",
        title: "연합 & 기업 해커톤",
        subtitle: "\"학교를 넘어 세상으로\"",
        desc: "연합 해커톤: 타 대학 학생들과의 네트워킹 및 교류.\n기업 해커톤: 실제 기업의 문제를 해결하는 솔루션 개발.\n실무 경험과 폭넓은 인맥을 동시에 쌓을 수 있습니다."
    }
];

// 2. 트랙 데이터 (모집 분야)
const TRACK_DATA = [
    {
        name: "UX/UI",
        color: "#FF669D",
        icon: <FaPencilAlt />,
        desc: "사용자의 니즈를 분석하고,\n심미적이고 논리적인 UI/UX를 설계합니다."
    },
    {
        name: "FRONTEND",
        color: "#F75222",
        icon: <FaCode />,
        desc: "브라우저 위에서 사용자와 가장 먼저 만나는\n인터랙티브한 웹 애플리케이션을 구현합니다."
    },
    {
        name: "BACKEND",
        color: "#0ACF83",
        icon: <FaServer />,
        desc: "서비스의 두뇌 역할을 하며,\n안정적인 데이터 처리와 서버 아키텍처를 설계합니다."
    }
];

// 3. 채용 프로세스 데이터
const PROCESS_DATA = [
    { step: "01", title: "서류 접수", date: "02.24 - 03.11", desc: "구글 폼을 통해 지원서를 작성합니다." },
    { step: "02", title: "서류 합격자 발표", date: "03.13", desc: "문자 및 이메일로 개별 통보합니다." },
    { step: "03", title: "대면 면접", date: "03.14 - 03.16", desc: "성결대학교 내 강의실에서 진행합니다." },
    { step: "04", title: "최종 합격자 발표", date: "03.18", desc: "14기 아기사자로 최종 선발됩니다." }
];

// 4. 자주 묻는 질문 (FAQ) 데이터
const FAQ_DATA = [
    { q: "코딩을 한 번도 안 해봤는데 지원할 수 있나요?", a: "물론입니다! 멋쟁이사자처럼은 '성장'을 가장 중요하게 생각합니다. 전공,나이,실력에 상관없이 열정만 있다면 기초부터 함께 배울 수 있습니다." },
    { q: "정기 세션은 언제, 어떻게 진행되나요?", a: "매주 목요일 오후 7시, 성결대학교 강의실에서 오프라인으로 진행됩니다. 시험 기간 2주는 휴식기를 가집니다." },
    { q: "노트북이 필수인가요?", a: "네, 모든 세션은 실습 위주로 진행되므로 개인 노트북 지참이 필수입니다. (OS 무관)" },
    { q: "트랙 간 이동이나 중복 지원이 가능한가요?", a: "기본적으로 한 가지 트랙을 선택해 깊이 있게 학습하는 것을 권장드리나, 프로젝트 기간에는 트랙 경계 없이 자유롭게 협업하게 됩니다." },
];

/* -------------------------------------------------------------------------- */
/*                                3D COMPONENTS                               */
/* -------------------------------------------------------------------------- */

/**
 * @component MysticOrbit
 * @description V11 Refined: "Sophisticated Metallic Glow"
 * 3D 씬의 핵심 오브젝트. 가운데 구체(Core)와 주변을 도는 링(Ring)으로 구성됨.
 */
const MysticOrbit = () => {
    const groupRef = useRef();
    const ring1 = useRef();
    const ring2 = useRef();
    const ring3 = useRef();

    // useFrame: 매 프레임마다 실행되는 루프 (애니메이션 로직)
    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        // 1. 전체 그룹의 부유감 (Parallax)
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(t * 0.1) * 0.1;
            groupRef.current.position.y = Math.sin(t * 0.2) * 0.2 + -1.5;
        }

        // 2. 각 링의 회전 애니메이션
        // Ring 1 (복잡한 회전)
        if (ring1.current) {
            ring1.current.rotation.x = t * 0.3;
            ring1.current.rotation.y = t * 0.1;
            ring1.current.scale.setScalar(1 + Math.sin(t * 0.5) * 0.05); // 숨쉬는 듯한 스케일링
        }
        // Ring 2 (빠른 회전)
        if (ring2.current) {
            ring2.current.rotation.x = t * 0.2 + 1;
            ring2.current.rotation.z = t * -0.4;
        }
        // Ring 3 (우아한 회전)
        if (ring3.current) {
            ring3.current.rotation.y = t * -0.25;
            ring3.current.rotation.z = t * 0.15;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={1}>
            <group ref={groupRef} scale={1.2} position={[0, -1.5, 0]}>

                {/* 1. Core: Dark Glass Sphere (중심 구체) */}
                <Sphere args={[1.2, 128, 128]}>
                    <meshPhysicalMaterial
                        color="#050510"      // 아주 어두운 남색
                        transmission={0.9}   // 투명도 (0~1)
                        opacity={1}
                        roughness={0.1}      // 매끄러운 표면
                        metalness={0.6}      // 금속성 질감
                        clearcoat={1}        // 코팅막
                        clearcoatRoughness={0}
                        ior={1.6}            // 굴절률 (유리 느낌)
                        thickness={2.5}      // 두께감
                        attenuationColor="#3B79FF"
                        attenuationDistance={2}
                    />
                </Sphere>

                {/* 2. Point Lights (내부 발광 효과) */}
                <pointLight position={[3, 2, 3]} intensity={5} color="#3B79FF" distance={10} />
                <pointLight position={[-3, -2, -3]} intensity={5} color="#8A2BE2" distance={10} />
                <pointLight position={[0, 4, 0]} intensity={3} color="#00FFFF" distance={10} />

                {/* 3. Rings: Metallic Glow (주변 링) */}
                {/* Ring 1 - Main Blue */}
                <group ref={ring1}>
                    <Torus args={[2.2, 0.02, 64, 100]} rotation={[Math.PI / 2, 0, 0]}>
                        <meshStandardMaterial
                            color="#3B79FF"
                            emissive="#3B79FF"
                            emissiveIntensity={2} // 자체 발광 강도
                            roughness={0.2}
                            metalness={1}
                        />
                    </Torus>
                </group>

                {/* Ring 2 - Cyan */}
                <group ref={ring2} rotation={[0, Math.PI / 4, 0]}>
                    <Torus args={[2.5, 0.03, 64, 100]}>
                        <meshStandardMaterial
                            color="#00FFFF"
                            emissive="#00FFFF"
                            emissiveIntensity={1.5}
                            roughness={0.2}
                            metalness={1}
                        />
                    </Torus>
                </group>

                {/* Ring 3 - White Accent */}
                <group ref={ring3} rotation={[Math.PI / 3, 0, Math.PI / 3]}>
                    <Torus args={[2.8, 0.015, 64, 100]}>
                        <meshStandardMaterial
                            color="#FFFFFF"
                            emissive="#FFFFFF"
                            emissiveIntensity={1.5}
                            roughness={0.2}
                            metalness={1}
                        />
                    </Torus>
                </group>

                {/* 4. Particles (주변 입자) */}
                <Sparkles count={120} scale={10} size={2} speed={0.5} opacity={0.5} color="#3B79FF" />
            </group>
        </Float>
    );
};

const Scene = () => {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 9]} fov={50} />
            <ambientLight intensity={0.2} color="#000000" />
            <Environment preset="city" />
            <MysticOrbit />
        </>
    );
};

/* -------------------------------------------------------------------------- */
/*                                UI COMPONENTS                               */
/* -------------------------------------------------------------------------- */

/**
 * @component FadeInText
 * @description 스크롤 시 아래에서 위로 부드럽게 떠오르는 텍스트 애니메이션 컴포넌트
 */
const FadeInText = ({ children, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: delay, ease: "easeOut" }}
    >
        {children}
    </motion.div>
);

/**
 * @component AccordionItem
 * @description FAQ 섹션의 개별 질문 아이템 (Click to Expand)
 * V13.1 Update: backdrop-blur-md 적용으로 가독성 향상
 */
const AccordionItem = ({ question, answer, isOpen, onClick }) => {
    return (
        <motion.div
            layout
            onClick={onClick}
            className={`cursor-pointer overflow-hidden rounded-2xl border transition-all duration-300 relative group backdrop-blur-md
                ${isOpen ? "bg-[#3B79FF]/20 border-[#3B79FF] shadow-[0_0_30px_rgba(59,121,255,0.2)]" : "bg-black/40 border-white/10 hover:border-white/30 hover:bg-black/60"}
            `}
        >
            {/* Glow Effect (활성화 시 은은한 빛) */}
            {isOpen && <motion.div layoutId="glow" className="absolute inset-0 bg-[#3B79FF]/5 blur-xl" />}

            <div className="relative z-10 p-6 flex items-center justify-between">
                <h3 className={`text-xl fontBold ${isOpen ? "text-white" : "text-[#E5E5E5]"}`}>
                    Q. {question}
                </h3>
                <div className={`text-xl transition-transform duration-300 ${isOpen ? "rotate-45 text-[#3B79FF]" : "text-[#666]"}`}>
                    <FaPlus />
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="px-6 pb-6 text-[#A2A2A2] leading-relaxed border-t border-white/5 pt-4">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

const DynamicFAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <section className="py-32 max-w-4xl mx-auto px-4">
            <FadeInText>
                <h2 className="text-center text-[40px] fontBlack mb-16 text-white">FAQ</h2>
            </FadeInText>
            <div className="flex flex-col gap-4">
                {FAQ_DATA.map((item, idx) => (
                    <AccordionItem
                        key={idx}
                        question={item.q}
                        answer={item.a}
                        isOpen={activeIndex === idx}
                        onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                    />
                ))}
            </div>
        </section>
    );
};

/* -------------------------------------------------------------------------- */
/*                                MAIN PAGE                                   */
/* -------------------------------------------------------------------------- */

export default function Recruitment() {
    const containerRef = useRef();

    useEffect(() => {
        // Smooth Scroll (Lenis) 초기화
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            touchMultiplier: 2,
        });

        // Animation Frame Loop
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Clean up
        return () => lenis.destroy();
    }, []);

    const handleApplyClick = () => {
        // 실제 지원 링크로 교체 필요
        window.open("https://forms.google.com/...", "_blank");
    };

    return (
        <div ref={containerRef} className="relative w-full bg-[#050505] text-white overflow-hidden fontRegular selection:bg-[#3B79FF] selection:text-white">

            {/* ---------------- Background (Moving Gradient) ---------------- */}
            {/* 배경에서 은은하게 움직이는 오로라 효과 */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-[#0A1A40] rounded-full mix-blend-screen filter blur-[120px] opacity-40 animate-[pulse_8s_infinite]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-[#001030] rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-[pulse_10s_infinite_reverse]" />
            </div>

            {/* ---------------- 3D Canvas Layer ---------------- */}
            {/* R3F 캔버스가 전체 화면 뒤에 깔림 */}
            <div className="fixed inset-0 z-0 h-screen w-full pointer-events-none opacity-100">
                <Canvas gl={{ antialias: true, alpha: true }} dpr={[1, 2]}>
                    <Scene />
                </Canvas>
            </div>

            {/* ---------------- Navbar Scroll Mask (z-9) ---------------- */}
            {/* 스크롤 시 상단 네비게이션 바와 겹치지 않도록 그라데이션 마스크 처리 */}
            <div className="fixed top-0 left-0 w-full h-[100px] z-[9] bg-gradient-to-b from-[#050505] via-[#050505]/80 to-transparent pointer-events-none" />

            {/* ---------------- HTML Content Layer (z-1) ---------------- */}
            {/* 실제 내용이 담기는 레이어 */}
            <div className="relative z-[1] w-full px-4 sm:px-6">

                {/* --- Section 1: Hero (메인 타이틀) --- */}
                <section className="relative h-screen flex flex-col items-center justify-center text-center">
                    <FadeInText>
                        <div className="min-w-[100px] min-h-[30px]" /> {/* Spacer */}
                        <div className="mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md inline-block">
                            <span className="text-[#3B79FF] fontBold text-sm tracking-widest uppercase">
                                LIKELION SKU 14TH
                            </span>
                        </div>
                    </FadeInText>

                    <FadeInText delay={0.2}>
                        {/* 타이틀 가독성을 위한 Radial Gradient 배경 */}
                        <div className="relative mb-12">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-[radial-gradient(circle,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0)_60%)] blur-2xl -z-10" />
                            <h1 className="text-[50px] sm:text-[90px] leading-[1.1] fontBlack text-white tracking-tight drop-shadow-2xl">
                                당신의 상상<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B79FF] to-[#8DB7FF]">세상 밖으로!</span>
                            </h1>
                        </div>
                    </FadeInText>

                    <FadeInText delay={0.4}>
                        <p className="max-w-2xl mx-auto text-[#E5E5E5] text-lg fontLight mb-12 bg-black/40 backdrop-blur-sm p-8 rounded-2xl border border-white/5 leading-relaxed whitespace-pre-line">
                            멋쟁이사자처럼 대학은 2025년 기준 국내외 100여 개 대학에서<br />
                            <strong className="text-white">수천 명의 학생들이 함께 활동하는 IT 창업·개발 동아리</strong>입니다.<br /><br />
                            아이디어가 현실이 되기까지,<br />
                            도전과 실패를 거쳐 완성해 나가는 전 과정을 함께합니다.
                        </p>
                    </FadeInText>

                    <FadeInText delay={0.6}>
                        <button
                            onClick={handleApplyClick}
                            className="group relative px-12 py-5 bg-[#3B79FF] text-white text-[18px] fontBold rounded-full overflow-hidden hover:bg-white hover:text-black transition-colors duration-300 shadow-[0_0_40px_rgba(59,121,255,0.4)]"
                        >
                            <span className="relative z-10 flex items-center gap-2">14기 지원하기 <IoArrowForward /></span>
                        </button>
                    </FadeInText>

                    <div className="absolute bottom-10 animate-bounce">
                        <FaChevronDown className="text-white/30 text-2xl" />
                    </div>
                </section>

                {/* --- Section 2: Journey Timeline (연간 일정) --- */}
                <section className="py-32 max-w-5xl mx-auto px-4">
                    <FadeInText>
                        <h2 className="text-center text-[40px] fontBlack mb-4 text-white">GROW TO WORLD</h2>
                        <p className="text-center text-[#A2A2A2] mb-20 text-lg">성결대 멋쟁이사자처럼의 2026년 여정</p>
                    </FadeInText>

                    {/* 세로 타임라인 선 */}
                    <div className="relative space-y-24 before:absolute before:inset-0 before:left-1/2 before:w-0.5 before:bg-gradient-to-b before:from-[#3B79FF] before:via-[#3B79FF]/20 before:to-transparent before:-translate-x-1/2 before:z-0 md:before:block before:hidden">
                        {TIMELINE_DATA.map((item, idx) => (
                            <div key={idx} className="relative z-10 flex flex-col items-center">
                                <div
                                    className="w-auto px-8 h-20 rounded-full border-[6px] border-[#050505] flex items-center justify-center text-white text-xl fontBold mb-6"
                                    style={{ backgroundColor: item.color, boxShadow: `0 0 30px ${item.color}` }}
                                >
                                    {item.month}
                                </div>
                                <div
                                    className="bg-[#1B1B1B] border border-white/10 rounded-[40px] p-10 max-w-2xl w-full text-center hover:border-current transition-colors duration-500 group relative overflow-hidden"
                                    style={{ color: item.color }} // 호버 시 테두리 색상 상속
                                >
                                    <div
                                        className="absolute inset-0 bg-gradient-to-b from-current to-transparent opacity-0 group-hover:opacity-5 transition-opacity"
                                    />
                                    <h3 className="text-3xl fontBold text-white mb-2 relative z-10">{item.title}</h3>
                                    <p className="fontBold mb-6 text-lg relative z-10" style={{ color: item.color }}>{item.subtitle}</p>
                                    <p className="text-[#A2A2A2] leading-relaxed relative z-10 text-lg whitespace-pre-line">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- Section 3: Tracks (모집 분야) --- */}
                <section className="py-32 max-w-7xl mx-auto px-4">
                    <FadeInText>
                        <h2 className="text-center text-[40px] fontBlack mb-8 text-white">TRACKS</h2>
                        <p className="text-center text-[#A2A2A2] mb-20 max-w-2xl mx-auto">
                            자신의 강점에 맞는 트랙을 선택하세요.<br />
                            선발된 인원은 1년간 해당 트랙의 전문가로 성장합니다.
                        </p>
                    </FadeInText>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {TRACK_DATA.map((track, idx) => (
                            <div
                                key={idx}
                                className="bg-[#1B1B1B] rounded-[40px] p-10 border border-white/5 transition-colors duration-500 group"
                                style={{ borderColor: `${track.color}33` }} // 20% opacity border
                                onMouseEnter={(e) => e.currentTarget.style.borderColor = track.color}
                                onMouseLeave={(e) => e.currentTarget.style.borderColor = `${track.color}33`}
                            >
                                <div
                                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform"
                                    style={{ backgroundColor: `${track.color}1A`, color: track.color }}
                                >
                                    {track.icon}
                                </div>
                                <h3 className="text-3xl fontBold text-white mb-4">{track.name}</h3>
                                <p className="text-[#A2A2A2] mb-8 leading-relaxed whitespace-pre-line">
                                    {track.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- Section 4: Process (채용 절차) --- */}
                <section className="py-32 max-w-4xl mx-auto px-4">
                    <FadeInText>
                        <h2 className="text-center text-[40px] fontBlack mb-16 text-white">RECRUITMENT PROCESS</h2>
                    </FadeInText>
                    <div className="space-y-6">
                        {PROCESS_DATA.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-6 p-6 bg-[#1B1B1B] rounded-2xl border border-white/5 hover:border-[#3B79FF]/50 transition-colors">
                                <div className="text-2xl fontBlack text-[#3B79FF] opacity-50">{item.step}</div>
                                <div className="flex-1">
                                    <h3 className="text-xl fontBold text-white">{item.title}</h3>
                                    <p className="text-[#A2A2A2] text-sm">{item.desc}</p>
                                </div>
                                <div className="text-white fontBold bg-white/10 px-4 py-2 rounded-lg text-sm whitespace-nowrap">
                                    {item.date}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- Section 5: FAQ (질의 응답) --- */}
                <DynamicFAQ />

                {/* --- Pre-Footer Call (하단 CTA) --- */}
                <section className="py-40 text-center relative overflow-hidden">
                    <h2 className="relative z-10 text-[60px] sm:text-[90px] fontBlack mb-12 text-white drop-shadow-2xl">
                        JOIN THE<br />NEXT ERA
                    </h2>
                    <button
                        onClick={handleApplyClick}
                        className="relative z-20 px-16 py-6 bg-white text-black text-2xl fontBold rounded-full hover:scale-105 transition-transform shadow-[0_0_80px_rgba(255,255,255,0.4)]"
                    >
                        14기 지원하기
                    </button>
                    <p className="mt-8 text-white/80 fontBold text-lg relative z-20 flex items-center justify-center gap-2">
                        문의: <a href="https://instagram.com/likelion_sku" className="text-[#3B79FF] hover:text-white underline transition-colors">@likelion_sku</a>
                    </p>
                </section>

            </div>
        </div>
    );
}
