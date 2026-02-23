import React from 'react';
import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';

const ELIGIBILITY_ITEMS = [
    <>성결대학교 소속 <span className="text-[#0060C6] fontBlack">재학생 및 휴학생</span></>,
    <>매주 <span className="text-[#0060C6] fontBlack">목요일 오후 6시 정기 세션</span>에 성실히 참여할 수 있는 분</>,
    <>웹 서비스 <span className="text-[#0060C6] fontBlack">기획·디자인·개발</span>에 관심이 있고, 기초 지식이 없어도 <span className="text-[#0060C6] fontBlack">열정적으로 배우고자 하는 분</span></>,
    <><span className="text-[#0060C6] fontBlack">협업</span>을 통해 함께 성장하며, 맡은 역할에 <span className="text-[#0060C6] fontBlack">책임감</span>을 가지고 끝까지 완수할 수 있는 분</>,
    <>아이디어를 <span className="text-[#0060C6] fontBlack">실제 서비스로 구현</span>하는 경험을 해보고 싶은 분</>
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
};

export default function EligibilitySection() {
    return (
        <section className="relative py-32 md:py-48 bg-[#FFFFFF] overflow-hidden z-10 w-full px-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 md:mb-24"
                >
                    <h2 className="text-[32px] sm:text-[42px] md:text-[56px] fontBlack text-[#111111] leading-[1.2] tracking-tight break-keep">
                        이런 분들을 <br className="sm:hidden" />
                        기다리고 있어요
                    </h2>
                </motion.div>

                {/* Checklist Content */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="flex flex-col gap-8 md:gap-12"
                >
                    {ELIGIBILITY_ITEMS.map((text, idx) => (
                        <motion.div
                            key={idx}
                            variants={itemVariants}
                            className="flex items-start gap-5 md:gap-8 group"
                        >
                            <div className="mt-1 md:mt-2 shrink-0">
                                <motion.div
                                    initial={{ scale: 0, rotate: -45 }}
                                    whileInView={{ scale: 1, rotate: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + (idx * 0.15), type: "spring", stiffness: 200 }}
                                    className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#E0ECFF] flex items-center justify-center text-[#0060C6] shadow-sm"
                                >
                                    <FiCheck size={20} className="stroke-[3]" />
                                </motion.div>
                            </div>
                            <p className="text-xl sm:text-2xl md:text-[28px] fontMedium text-[#333333] leading-[1.5] break-keep tracking-tight">
                                {text}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
