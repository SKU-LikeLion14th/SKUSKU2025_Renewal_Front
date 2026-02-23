import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FaPlus } from 'react-icons/fa';

const FAQ_DATA = [
    {
        q: "동아리 활동 시 노트북이 필요한가요?",
        a: "네, 노트북은 필수예요! 💻 세션 실습과 과제, 팀 프로젝트 진행에 꼭 필요해요."
    },
    {
        q: "트랙 간 중복 지원이 가능한가요?",
        a: "중복 지원은 불가능해요 🙅‍♀️ 중복 지원이 확인되면 모든 지원서가 무효 처리돼요. 또한 지원 후 파트 변경도 불가하니 신중하게 선택해주세요."
    },
    {
        q: "코딩 경험이 없는 비전공자입니다. 지원해도 될까요?",
        a: "물론이에요! 비전공/초보도 지원 가능해요 🙌 경험이 없어도 괜찮아요. 대신 열정, 성장 의지, 꾸준히 참여할 마음이 있다면 충분해요!"
    },
    {
        q: "2학기에도 모집하나요?",
        a: "아니요, 2학기 모집은 없어요 😢 저희 멋쟁이 사자처럼은 1년 단위 활동이라 추가 모집을 진행하지 않아요. 이번 모집 기간에 꼭 지원해주세요!"
    },
    {
        q: "전체/파트별 모집 인원이 궁금해요",
        a: "전체는 40명 내외로 모집 예정이에요 👥 파트별 모집은 기획·디자인 : 프론트엔드 : 백엔드 = 1 : 2 : 2 비율을 예상하고 있어요. 상황에 따라 일부 변동될 수 있어요."
    },
    {
        q: "동아리 관련 기타 문의는 어디로 하나요?",
        a: "DM 또는 카카오톡 채널로 문의해주세요 💬\nDM: @likelion_sku\n카카오톡 채널: 멋쟁이사자처럼 성결대\n편하게 연락 주시면 안내드릴게요!"
    }
];

const AccordionItem = ({ question, answer, isOpen, onClick }) => {
    return (
        <motion.div
            onClick={onClick}
            style={{
                borderColor: isOpen ? "#3B79FF" : "rgba(255, 255, 255, 0.1)",
                backgroundColor: isOpen ? "rgba(59, 121, 255, 0.1)" : "rgba(255, 255, 255, 0.03)"
            }}
            className={`cursor-pointer overflow-hidden rounded-[24px] transition-all duration-300 relative border ${isOpen ? "shadow-[0_8px_30px_rgba(59,121,255,0.2)]" : "hover:border-[#3B79FF]/50"
                }`}
        >
            <div className="p-6 md:p-8 flex items-center justify-between gap-4">
                <h3
                    className={`text-xl md:text-2xl fontBold transition-colors duration-300 ${isOpen ? "text-[#3B79FF]" : "text-white"}`}
                >
                    <span className="text-[#3B79FF] mr-3">Q.</span> {question}
                </h3>
                <motion.div
                    className={`text-2xl transition-all duration-300 ${isOpen ? "text-[#3B79FF]" : "text-white/30"}`}
                    animate={{ rotate: isOpen ? 45 : 0 }}
                >
                    <FaPlus />
                </motion.div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div
                            className="px-6 md:px-8 pb-6 md:pb-8 text-white/70 text-lg fontMedium leading-relaxed border-t border-white/5 pt-6"
                        >
                            <span className="text-[#3B79FF] fontBold mr-3">A.</span> {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default function FAQSection() {
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <section
            className="py-40 relative z-10 w-full px-4 bg-[#050505]"
        >
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center mb-20"
                >
                    <h2
                        className="text-[44px] md:text-[68px] fontBlack text-white tracking-tight"
                    >
                        자주 묻는 질문
                    </h2>
                </motion.div>

                <div className="flex flex-col gap-6 max-w-4xl mx-auto">
                    {FAQ_DATA.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <AccordionItem
                                question={item.q}
                                answer={item.a}
                                isOpen={activeIndex === idx}
                                onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                            />
                        </motion.div>
                    ))}
                </div>

                <div className="mt-24 text-center">
                    <p
                        className="text-white/60 text-xl fontMedium"
                    >
                        더 궁금한 점이 있으신가요?<br className="md:hidden" /> 언제든 인스타그램 <span className="text-[#3B79FF] fontBlack">@likelion_sku</span> 또는<br className="md:hidden" /> 카카오톡 채널 <span className="text-[#3B79FF] fontBlack">멋쟁이사자처럼 성결대</span> 로 편하게 문의주세요!
                    </p>
                </div>
            </div>
        </section>
    );
}
