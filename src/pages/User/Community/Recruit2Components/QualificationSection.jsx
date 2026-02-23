import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const RevealText = ({ children }) => {
    const textRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: textRef,
        offset: ["start 85%", "end 50%"]
    });

    const color = useTransform(scrollYProgress, [0, 1], ["#D1D5DB", "#111111"]);

    return (
        <motion.p
            ref={textRef}
            style={{ color }}
            className="text-[24px] sm:text-[42px] md:text-[56px] fontBlack leading-[1.3] mb-6 tracking-tight break-keep"
        >
            {children}
        </motion.p>
    );
};

export default function QualificationSection() {
    return (
        <section className="relative py-32 md:py-40 min-h-[90vh] flex flex-col justify-center z-10 px-6 bg-[#FFFFFF]">
            <div className="max-w-[1240px] mx-auto flex flex-col items-center w-full">

                <div className="text-center mb-20 md:mb-28 w-full">
                    <RevealText>
                        <span className="whitespace-nowrap">전공이나 경험보다 중요한 건</span><br />
                        <span className="text-[#0060C6]">성장 의지</span>입니다
                    </RevealText>
                    <p className="text-[#6B7280] text-lg sm:text-xl fontMedium mt-4 max-w-2xl mx-auto leading-relaxed">
                        완벽한 실력보다는 끝까지 포기하지 않고 함께 완주하려는 열정이 더 중요해요!
                    </p>
                </div>

                {/* 3 Solid Color Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 w-full">

                    {/* Card 1 */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        className="bg-[#E0ECFF] rounded-[32px] p-8 sm:p-10 shadow-sm flex flex-col justify-between h-auto min-h-[300px] relative overflow-hidden"
                    >
                        <div className="relative z-10 w-[70%]">
                            <h3 className="text-2xl fontBlack text-[#111111] mb-6 flex items-center justify-between">
                                열정과 몰입
                            </h3>
                            <p className="text-[#555555] text-[17px] leading-[1.7] fontMedium break-keep">
                                코딩 경험이 없어도 괜찮습니다.<br />
                                <strong className="text-[#0060C6]">끊임없이 몰입할 의지</strong>를 봅니다.
                            </p>
                        </div>
                        <img
                            src="/assets/images/TK/fire.png"
                            alt="열정"
                            className="absolute bottom-[-10px] right-[-10px] w-[130px] md:w-[160px] lg:w-[180px] h-auto object-contain pointer-events-none"
                        />
                    </motion.div>

                    {/* Card 2 */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: 0.1 }}
                        className="bg-[#E0ECFF] rounded-[32px] p-8 sm:p-10 shadow-sm flex flex-col justify-between h-auto min-h-[300px] relative overflow-hidden"
                    >
                        <div className="relative z-10 w-[70%]">
                            <h3 className="text-2xl fontBlack text-[#111111] mb-6 flex items-center justify-between">
                                정기 세션
                            </h3>
                            <p className="text-[#555555] text-[17px] leading-[1.7] fontMedium mb-8 break-keep">
                                매주 <strong className="text-[#0060C6]">목요일 오후 6시</strong><br />
                                성결대학교 내에서 진행되는<br />
                                대면 세션 참석은 <strong className="text-[#0060C6]">필수</strong>입니다.
                            </p>
                            <span className="text-[13px] fontBold text-[#A1A1AA] bg-[#F4F4F5] px-4 py-2 rounded-lg inline-block w-fit">
                                시험 기간 제외
                            </span>
                        </div>
                        <img
                            src="/assets/images/TK/calender.png"
                            alt="달력"
                            className="absolute bottom-2 right-2 w-[120px] md:w-[140px] lg:w-[160px] h-auto object-contain pointer-events-none"
                        />
                    </motion.div>

                    {/* Card 3 */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: 0.2 }}
                        className="bg-[#E0ECFF] rounded-[32px] p-8 sm:p-10 shadow-sm flex flex-col justify-between h-auto min-h-[300px] relative overflow-hidden"
                    >
                        <div className="relative z-10 w-[70%]">
                            <h3 className="text-2xl fontBlack text-[#111111] mb-6 flex items-center justify-between">
                                실전 프로젝트
                            </h3>
                            <p className="text-[#555555] text-[17px] leading-[1.7] fontMedium break-keep">
                                <strong className="text-[#0060C6]">아이디어톤과 연합 해커톤</strong>에<br />
                                참가하여 서비스를 실제 배포해냅니다.
                            </p>
                        </div>
                        <img
                            src="/assets/images/TK/rocket.png"
                            alt="로켓"
                            className="absolute bottom-[-10px] right-[-10px] w-[130px] md:w-[160px] lg:w-[180px] h-auto object-contain pointer-events-none"
                        />
                    </motion.div>

                </div>

            </div>
        </section>
    );
}
