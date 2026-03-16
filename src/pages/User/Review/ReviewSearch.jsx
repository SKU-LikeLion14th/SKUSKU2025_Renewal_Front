import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";

export default function ReviewSearch({
  totalPosts,
  totalPages,
  currentPage,
  onPageChange,
  onSearch,
}) {
  const [inputPage, setInputPage] = useState("1");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setInputPage(currentPage.toString());
  }, [currentPage]);

  const handlePageInputChange = (e) => {
    setInputPage(e.target.value);
  };

  const handlePageChange = () => {
    const page = parseInt(inputPage, 10);
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handlePageChange();
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
    onPageChange(1); // 검색 시 페이지를 1로 초기화
  };

  const handleKeyDownSearch = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Pagination logic
  const pageNumbers = [];
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex w-full sm:mb-40 mb-20">
          <div className="flex justify-between w-full p-2 items-center sm:text-[14px] text-[10px]">
            <div className="flex sm:flex-row flex-col items-start">
              <div className="flex mr-3">
                전체 게시물: <span className="text-[#3B79FF] ml-1">{totalPosts}</span>
              </div>
    
              <div className="flex mr-3 sm:mb-0 mb-0.5">
                전체 페이지: <span className="text-[#FF7816] ml-1">{totalPages}</span>
              </div>
    
              <div className="flex">
                <input
                  type="text"
                  value={inputPage}
                  onChange={handlePageInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="페이지"
                  className="flex sm:w-[50px] w-[30px] sm:py-1 sm:px-2 py-0.5 px-1 mr-3 text-center border-[#D8D8D8] border-[1.8px] rounded-[5.14px]"
                />
                <button
                  onClick={handlePageChange}
                  className="sm:w-[60px] w-[50px] sm:py-1.25 sm:px-3 px-1 py-0.5 items-center text-center sm:text-[13.5px] text-[8px] border-[#D8D8D8] border-[1.8px] rounded-[5.14px] cursor-pointer"
                >
                  보기
                </button>
              </div>
            </div>
    
            <div className="flex items-center justify-center space-x-1 sm:text-[14px] text-[10px] font-medium">
              <button
                onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-2 py-1 rounded border border-[#D8D8D8] bg-white disabled:opacity-50 cursor-pointer"
              >
                &lt;
              </button>
              
              {startPage > 1 && (
                <>
                  <button onClick={() => onPageChange(1)} className="px-2 py-1 rounded border border-[#D8D8D8] bg-white cursor-pointer">1</button>
                  {startPage > 2 && <span className="px-1">...</span>}
                </>
              )}

              {pageNumbers.map((p) => (
                <button
                  key={p}
                  onClick={() => onPageChange(p)}
                  className={`px-3 py-1 rounded border cursor-pointer ${
                    currentPage === p
                      ? "bg-[#3B79FF] text-white border-[#3B79FF] font-bold"
                      : "bg-white border-[#D8D8D8]"
                  }`}
                >
                  {p}
                </button>
              ))}

              {endPage < totalPages && (
                <>
                  {endPage < totalPages - 1 && <span className="px-1">...</span>}
                  <button onClick={() => onPageChange(totalPages)} className="px-2 py-1 rounded border border-[#D8D8D8] bg-white cursor-pointer">{totalPages}</button>
                </>
              )}

              <button
                onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-2 py-1 rounded border border-[#D8D8D8] bg-white disabled:opacity-50 cursor-pointer"
              >
                &gt;
              </button>
            </div>
    
            {/* 검색 */}
            <div className="flex w-fit items-center pr-1.5 py-1 text-[#707070] border-[#C2C2C2] border-[1.8px] rounded-[5.14px]">
              <select
                name="reviewSearch"
                id="reviewSearch"
                className="sm:px-2 px-0.5 border-r-[1.8px] border-[#CED4DA]"
              >
                <option value="title">제목</option>
              </select>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDownSearch}
                placeholder="검색어를 입력하세요."
                className="flex w-[50%] sm:w-fit sm:px-4 px-2 text-[#C2C2C2]"
              />
              <FiSearch className="sm:mx-2 mx-1 text-[#D8D8D8]" onClick={handleSearch} />
            </div>
          </div>
        </div>
      );
    }