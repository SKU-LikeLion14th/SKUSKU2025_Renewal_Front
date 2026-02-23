# 🦁 about_SKUSKU.md (Project Specification)

> **"Why & What"**
> 이 문서는 SKUSKU 프로젝트의 **기획 의도, 기능 명세, 그리고 비즈니스 로직**을 정의하는 문서입니다.
> 개발 시 기능적인 의문이 생기면 이 문서를 가장 먼저 확인해야 합니다.

---

## 1. Project Overview (프로젝트 개요)

**SKUSKU**는 성결대학교 멋쟁이사자처럼(LikeLion SKU)의 **공식 통합 플랫폼**입니다.
단순한 동아리 홍보 사이트를 넘어, 부원들의 학습을 관리하고 프로젝트를 아카이빙하는 **LMS(Learning Management System)** 기능을 포함하고 있습니다.

### 🎯 Core Objectives (핵심 목표)
1.  **Identity**: 성결대 멋사의 활동(프로젝트, 행사)을 대외적으로 매력적으로 홍보.
2.  **Archive**: 기수별 활동 내역과 산출물을 영구적으로 기록.
3.  **Education**: 'CyberCampus'를 통해 강의 수강, 과제 제출, 피드백의 학습 사이클 제공.

### 👥 Target Audience (타겟 유저)
*   **General User (일반 학생)**: 멋사에 관심 있는 예비 지원자, 교내 학생.
*   **Active Lion (활동 기수)**: 현재 활동 중인 부원 (과제 제출, 강의 수강).
*   **Admin Lion (운영진)**: 멤버 관리, 과제 생성, 프로젝트 등록 권한 보유.

---

## 2. Feature Specifications (기능 명세)

프로젝트는 크게 **User (사용자 페이지)**, **Admin (관리자 페이지)**, **CyberCampus (학습 플랫폼)** 세 가지 모듈로 나뉩니다.

### 🅰️ User Module (일반 사용자)
*   **Main (Landing)**:
    *   동아리 소개("상상을 현실로"), 트랙별 컬러 아이덴티티 강조.
    *   스크롤 인터랙션을 통한 몰입감 있는 브랜드 경험 전달.
*   **Project**: 기수별 프로젝트 결과물 아카이빙 및 조회.
*   **Team**: 운영진 및 부원 소개.
*   **Recruit/Review**: 모집 공고 확인 및 활동 후기 조회.

### 🅱️ CyberCampus Module (LMS)
로그인한 부원들만 접근 가능한 학습 공간입니다.
*   **Lectures**: 주차별 강의 목록 및 상세 내용 조회.
*   **Assignments**: 과제 확인 및 제출 (파일 업로드 기능 포함).
*   **Quiz**: 학습 이해도 확인을 위한 퀴즈 풀이.

### 🆎 Admin Module (관리자)
운영진(`ADMIN_LION`)만 접근 가능한 백오피스입니다.
*   **Dashboard**: 전체 현황(부원 수, 과제 제출률 등) 요약.
*   **Lecture Management**: 강의 커리큘럼 등록 및 수정.
*   **Assignment Management**: 과제 생성, 제출물 확인 및 피드백(댓글).
*   **Member Management**: 기수별/트랙별 부원 관리.

---

## 3. User Flow (사용자 흐름)

### 🔑 Authentication (인증)
*   **Method**: Google OAuth 2.0 기반 로그인.
*   **Role Check**: 로그인 시 서버로부터 `role`(`USER`, `ADMIN_LION`)을 받아 접속 권한을 제어.
*   **AuthContext**: 전역 상태(`src/utils/AuthContext.jsx`)에서 유저 정보를 관리하며, 새로고침 시 세션 유지 확인.

### 🧭 Navigation Logic
1.  **접속**: 클라이언트(`http://localhost:5173`) 접속.
2.  **로그인**: 구글 로그인 버튼 클릭 -> 인증 성공.
3.  **분기**:
    *   일반 유저 -> 메인 페이지 유지, CyberCampus 접근 가능.
    *   운영진 -> 헤더 또는 전용 버튼을 통해 `/Admin` 페이지 접근 가능.

---

## 4. Tech Stack & Convention (기술 스택)

### Frontend Core
*   **Framework**: React 19 + Vite (빠른 빌드 및 HMR).
*   **Styling**: Tailwind CSS v4 (Utility-first).
*   **Animation**: Framer Motion (스크롤 모션, 등작 효과), GSAP.
*   **Routing**: React Router DOM v7 (페이지 라우팅).

### State Management & Utils
*   **State**: React Context API (`AuthContext`), Local State (`useState`).
*   **HTTP Client**: Axios (API 요청 및 인터셉터 설정).
*   **Icons**: react-icons, lucide-react.

---

## 5. Domain Terms (용어 정의)

| 용어 (Term) | 설명 (Description) |
| :--- | :--- |
| **Lion (아기사자)** | 멋쟁이사자처럼 활동 기수 부원을 지칭하는 용어. |
| **Track (트랙)** | 부원의 직군 (Design / Frontend / Backend). |
| **CyberCampus** | 부원 전용 학습 관리 시스템 (LMS). |
| **SSOT** | Single Source of Truth (이 문서와 Design Guide를 의미). |

---
*Last Updated: 2026-01-28*
