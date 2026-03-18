import React from "react";
import { Link } from "react-router-dom";

const CCFooter = () => {
  // 푸터 공통: 상단 이동 기능 추가
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-[#FAFAFA] text-[#343434] px-12 pt-16 mt-12 pb-12">
      {/* 상단 네비게이션 */}
      <div className="flex space-x-28 border-b border-[#DCDCDC] pb-12">
        {/* PROJECT */}
        <div className="flex flex-col pl-28">
          <Link to="/project" className="text-[#72A6FF] fontBold mb-4">
            PROJECT
          </Link>
          {[14, 13, 12, 11].map((gen) => (
            <Link key={gen} to={`/project?tab=${gen}`} className="my-2 text-[#7f7f7f] hover:text-[#343434]">
              {gen}기
            </Link>
          ))}
        </div>

        {/* TEAM */}
        <div className="flex flex-col">
          <Link to="/team" className="text-[#72A6FF] fontBold mb-4">
            TEAM
          </Link>
          {[14, 13, 12, 11].map((gen) => (
            <Link key={gen} to={`/team?tab=${gen}`} className="my-2 text-[#7f7f7f] hover:text-[#343434]">
              {gen}기
            </Link>
          ))}
        </div>

        {/* CONTACT -> COMMUNITY 변경 및 링크 매핑 */}
        <div className="flex flex-col">
          <Link to="/" className="text-[#72A6FF] fontBold mb-4">
            COMMUNITY
          </Link>
          <div className="flex flex-col">
            <Link to="/community/recruit2" className="my-2 text-[#7f7f7f] hover:text-[#343434]">
              모집공고
            </Link>
          </div>
        </div>
      </div>

      {/* 하단 주소 및 저작권 (메인 Footer 내용 반영) */}
      <div className="pl-28 py-10 flex justify-between items-end">

        {/* 왼쪽 섹션: INFO | CONTACT */}
        <div className="flex items-start">
          {/* INFO 파트 */}
          <div className="flex flex-col">
            <h2 className="text-[#343434] fontBold text-[16px] mb-4">INFO</h2>
            <div className="text-[#7f7f7f] text-[13px] space-y-1">
              <p>멋쟁이사자처럼 성결대학교 | 대표자 조승민</p>
              <p>실습실: 경기도 안양시 만안구 성결대학로 53(안양동) 성결관, 성결대학교</p>
              <p>동아리방: 경기도 안양시 만안구 성결대학로 53(안양동) 중생관 B11호</p>
            </div>
          </div>

          {/* 중앙 세로 구분선 */}
          <div className="mx-16 self-center w-[1px] h-10 bg-[#DCDCDC]"></div>

          {/* CONTACT 파트 (아이콘) */}
          <div className="flex flex-col">
            <h2 className="text-[#343434] fontBold text-[16px] mb-4 ml-11">CONTACT</h2>
            <div className="flex items-center space-x-6">
              <a href="https://www.instagram.com/likelion_sku" target="_blank" rel="noopener noreferrer" className="bg-[#FFFFFF] border border-[#EEEEEE] p-2 rounded-full hover:bg-gray-100 transition-colors">
                <img src="/assets/images/instagram.png" alt="Instagram" className="w-6 h-6" />
              </a>
              <a href="http://pf.kakao.com/_vxixlaxj" target="_blank" rel="noopener noreferrer" className="bg-[#FFFFFF] border border-[#EEEEEE] p-2 rounded-full hover:bg-gray-100 transition-colors">
                <img src="/assets/images/kakaotalk.png" alt="Kakao" className="w-6 h-6" />
              </a>
              {/* 메일 */}
              <a
                href="mailto:sungkyul.univ@likelion.org"
                onClick={() => navigator.clipboard.writeText("sungkyul.univ@likelion.org")}
                className="bg-[#FFFFFF] border border-[#EEEEEE] p-2 rounded-full hover:bg-gray-100 transition-all relative group flex items-center justify-center"
              >
                <img src="/assets/images/mail.png" alt="Mail" className="w-6 h-6" />
                <span className="absolute top-full mt-3 left-1/2 -translate-x-1/2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all bg-[#343434] text-white text-[10px] px-2 py-1 rounded whitespace-nowrap shadow-lg z-[60]">
                  sungkyul.univ@likelion.org (클릭 시 복사)
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-[#343434]"></span>
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* 오른쪽 섹션: TOP 버튼 + Copyright */}
        <div className="flex flex-col items-end">
          {/* TOP 버튼 */}
          <button
            onClick={scrollToTop}
            className="text-[#7f7f7f] text-[14px] fontBold mb-6 hover:text-[#343434] transition-colors"
          >
            TOP ▲
          </button>

          {/* Copyright 파트 */}
          <div className="fontSB text-[12px] text-[#A8A8A8] text-right">
            <p>SKU LIKELION 14th Edition</p>
            <p>Copyright © 2026 SKU LIKELION. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CCFooter;
