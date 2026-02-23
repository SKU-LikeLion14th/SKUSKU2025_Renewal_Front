import React from 'react';
import { motion } from 'framer-motion';

export default function BottomCTASection() {
    return (
        <section
            className="relative pt-80 pb-80 min-h-[60vh] flex flex-col items-center justify-center text-center z-10 px-4 bg-[#050505]"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center"
            >
                <h2
                    className="fontBlack text-white leading-[1.1] mb-12 tracking-tighter break-keep flex flex-col items-center"
                >
                    <span className="text-[48px] sm:text-[90px] md:text-[120px] lg:text-[144px] text-center">
                        당신의 상상 <br />
                        세상 밖으로!
                    </span>
                    <span className="text-[#3B79FF] text-[36px] sm:text-[50px] md:text-[70px] lg:text-[90px] mt-8 text-center px-4">
                        망설이지 말고 <br />
                        지원하세요.
                    </span>
                </h2>

                <p
                    className="text-white/70 text-xl md:text-2xl fontMedium mb-16 max-w-2xl mx-auto leading-relaxed"
                >
                    성결대 멋쟁이사자처럼 14기와 함께<br />
                    당신의 숨겨진 가능성을 맘껏 펼치세요!
                </p>

                <a
                    href="https://forms.gle/iUKyRxowKLMufkJy5"
                    target="_blank"
                    rel="noreferrer"
                    className="group relative px-14 py-6 bg-[#3B79FF] text-white text-[22px] fontBold rounded-3xl overflow-hidden hover:bg-[#2D5ABB] hover:shadow-[0_20px_40px_rgba(59,121,255,0.3)] transition-all duration-300 cursor-pointer"
                >
                    <span className="relative z-10">14기 지원하기</span>
                </a>
            </motion.div>
        </section>
    );
}
