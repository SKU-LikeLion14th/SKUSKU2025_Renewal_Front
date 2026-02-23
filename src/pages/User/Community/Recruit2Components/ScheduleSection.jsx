import React from 'react';
import { motion } from 'framer-motion';

const scheduleData = [
    { title: "서류 모집", duration: "02.23 (월) - 03.06 18시 (금)", date: "02.23", status: "Active" },
    { title: "서류 결과 발표", duration: "03.07 (토) 개별 안내", date: "03.07", status: "Upcoming" },
    { title: "면접 기간", duration: "03.09 (월) - 03.13 (금)", date: "03.09", status: "Upcoming" },
    { title: "최종 합격 발표", duration: "03.14 (토) 14:00", date: "03.14", status: "Upcoming" }
];

export default function ScheduleSection() {
    return (
        <section className="py-32 max-w-4xl mx-auto px-4 relative z-10 bg-[#FFFFFF]">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-center mb-20"
            >
                {/* Chip completely removed per user request */}
                <h2 className="text-[40px] md:text-[56px] fontBlack text-[#111111] mb-4 tracking-tight">모집 일정</h2>
                <p className="text-[#666666] text-lg">14기 합류를 위한 상세 일정입니다.</p>
            </motion.div>

            {/* Toss Style Vertical Timeline Cards */}
            <div className="relative pl-6 md:pl-0">
                {/* Vertical Line for Mobile/Tablet */}
                <div className="absolute left-[39px] md:left-[50%] top-0 bottom-0 w-[2px] bg-[#EEEEEE] -translate-x-1/2" />

                <div className="space-y-12 relative z-10">
                    {scheduleData.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: idx * 0.1 }}
                            className={`flex flex-col md:flex-row items-start md:items-center w-full ${idx % 2 === 0 ? "md:flex-row-reverse" : ""
                                }`}
                        >
                            {/* Card Content */}
                            <div className={`w-full md:w-1/2 pt-2 md:pt-0 ${idx % 2 === 0 ? "md:pl-16" : "md:pr-16 text-left md:text-right"}`}>
                                <div className="bg-white p-8 rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#F0F0F0] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300">
                                    <p className="text-[#3B79FF] fontBlack text-2xl mb-2">{item.date}</p>
                                    <h4 className="text-[#111111] fontBold text-xl mb-4">{item.title}</h4>
                                    <p className="text-[#666666] fontMedium bg-[#F9FAFB] inline-block px-4 py-2 rounded-xl text-sm border border-[#EEEEEE]">{item.duration}</p>
                                </div>
                            </div>

                            {/* Center Dot */}
                            <div className="absolute left-6 md:left-1/2 w-[32px] h-[32px] bg-white border-[4px] border-[#3B79FF] rounded-full -translate-x-1/2 flex items-center justify-center shadow-sm">
                                <div className="w-2.5 h-2.5 bg-[#3B79FF] rounded-full" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
