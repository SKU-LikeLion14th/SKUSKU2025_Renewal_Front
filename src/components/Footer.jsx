import { Link } from "react-router-dom";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative z-50 bg-[#050505] text-white px-12 pt-16 pb-12">
      <div>
        {/* 위: 기존 메뉴 링크 */}
        <div className="flex space-x-28 border-b border-[#202020] pb-16">
          {/* project */}
          <div className="flex flex-col pl-28">
            <Link to="/project" className="text-[#2D5ABB] fontBold mb-2">
              PROJECT
            </Link>
            <Link to="/project?tab=14" className="text-[#B0B0B0] my-3">14기</Link>
            <Link to="/project?tab=13" className="text-[#B0B0B0] my-3">13기</Link>
            <Link to="/project?tab=12" className="text-[#B0B0B0] my-3">12기</Link>
            <Link to="/project?tab=11" className="text-[#B0B0B0] my-3">11기</Link>
          </div>
          {/* team */}
          <div className="flex flex-col">
            <Link to="/team" className="text-[#2D5ABB] fontBold mb-2">
              TEAM
            </Link>
            <Link to="/team?tab=14" className="text-[#B0B0B0] my-3">14기</Link>
            <Link to="/team?tab=13" className="text-[#B0B0B0] my-3">13기</Link>
            <Link to="/team?tab=12" className="text-[#B0B0B0] my-3">12기</Link>
            <Link to="/team?tab=11" className="text-[#B0B0B0] my-3">11기</Link>
          </div>
          {/* contact */}
          <div className="flex flex-col">
            <Link to="/" className="text-[#2D5ABB] fontBold mb-2">
              COMMUNITY
            </Link>
            <div className="flex flex-col">
              <Link to="/community/recruit2" className="text-[#B0B0B0] my-2">모집공고</Link>
            </div>
          </div>
        </div>

        {/* 아래: 왼쪽(INFO|CONTACT) + 오른쪽(TOP|Copyright) */}
        <div className="pl-28 py-10 flex justify-between items-end">

          {/* 왼쪽 섹션: INFO | CONTACT */}
          <div className="flex items-start">
            {/* INFO 파트 */}
            <div className="flex flex-col">
              <h2 className="text-white fontBold text-[16px] mb-4">INFO</h2>
              <div className="text-[#B0B0B0] text-[13px] space-y-1">
                <p>멋쟁이사자처럼 성결대학교 | 대표자 조승민</p>
                <p>실습실: 경기도 안양시 만안구 성결대학로 53(안양동) 성결관, 성결대학교</p>
                <p>동아리방: 경기도 안양시 만안구 성결대학로 53(안양동) 중생관 B11호</p>
              </div>
            </div>

            {/* 중앙 세로 구분선 */}
            <div className="mx-16 self-center w-[1px] h-10 bg-[#202020]"></div>

            {/* CONTACT 파트 */}
            <div className="flex flex-col">
              <h2 className="text-white fontBold text-[16px] mb-4 ml-11">CONTACT</h2>
              <div className="flex items-center space-x-6">
                <a href="https://www.instagram.com/likelion_sku" target="_blank" rel="noopener noreferrer" className="bg-white p-2 rounded-full hover:bg-gray-200 transition-colors">
                  <img src="/assets/images/instagram.png" alt="Instagram" className="w-6 h-6" />
                </a>
                <a href="http://pf.kakao.com/_vxixlaxj" target="_blank" rel="noopener noreferrer" className="bg-white p-2 rounded-full hover:bg-gray-200 transition-colors">
                  <img src="/assets/images/kakaotalk.png" alt="Kakao" className="w-6 h-6" />
                </a>
                {/* 메일: 모든 로직을 태그 안에 삽입 & 말풍선 아래쪽 배치 */}
                <a
                  href="mailto:sungkyul.univ@likelion.org"
                  onClick={() => navigator.clipboard.writeText("sungkyul.univ@likelion.org")}
                  className="bg-white p-2 rounded-full hover:bg-gray-200 transition-all relative group flex items-center justify-center"
                >
                  <img src="/assets/images/mail.png" alt="Mail" className="w-6 h-6" />
                  <span className="absolute top-full mt-3 left-1/2 -translate-x-1/2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all bg-gray-800 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap shadow-lg z-[60]">
                    sungkyul.univ@likelion.org (클릭 시 복사)
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-gray-800"></span>
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
              className="text-[#B0B0B0] text-[14px] fontBold mb-6 hover:text-white transition-colors"
            >
              TOP ▲
            </button>

            {/* Copyright 파트 */}
            <div className="fontSB text-[12px] text-[#4F4F4F] text-right">
              <p>SKU LIKELION 14th Edition</p>
              <p>Copyright © 2026 SKU LIKELION. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}