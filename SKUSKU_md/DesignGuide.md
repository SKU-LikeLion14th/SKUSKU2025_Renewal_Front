# 🎨 SKUSKU Design Guide (SSOT)

> **"Imagination to Reality"**
> 이 문서는 SKUSKU 프로젝트의 디자인 진실의 원천(SSOT)입니다. 새로운 페이지나 컴포넌트 제작 시 반드시 이 가이드를 준수해야 합니다.

---

## 1. Design Philosophy (디자인 철학)

SKUSKU의 디자인은 **"신뢰할 수 있는 역동성(Trustworthy Dynamism)"**을 지향합니다. 대학생 개발 동아리로서의 **열정(Young)**과 **전문성(Tech)**을 동시에 전달해야 합니다.

### 🔑 Key Mood & Keywords
*   **Trust (신뢰)**: 메인 블루 컬러를 통해 안정감과 신뢰를 전달.
*   **Growth (성장)**: 트랙별 포인트 컬러로 개성과 다양성 표현.
*   **Modern (현대적)**: Pretendard 폰트와 절제된 여백, 깔끔한 카드 UI 사용.

### 🏢 Reference Benchmarks (유사 대기업 레퍼런스)
AI는 새 페이지 디자인 시 다음 서비스들의 특징을 벤치마킹하여 SKUSKU 무드에 맞게 변형 적용해야 합니다.
1.  **Toss (토스)**: 과감한 폰트 사이즈 대비, 시원한 블루 컬러 활용, 군더더기 없는 레이아웃. (정보 전달 페이지)
2.  **Apple (애플)**: 프리미엄한 Dark Mode, 고해상도 이미지와 텍스트의 조화, 부드러운 스크롤 인터랙션. (랜딩/홍보 페이지)
3.  **Wanted (원티드)**: 깔끔한 카드형 리스트, 직관적인 태그 및 배지 시스템. (게시판/리스트 페이지)

---

## 2. Color System (컬러 시스템)

모든 컬러는 Tailwind CSS 클래스 혹은 Hex Code로 정확히 사용해야 합니다.

### 🔵 Primary (Brand Color)
*   **Main Blue**: `#3B79FF`
    *   **사용처**: 로고 포인트, 주요 버튼, 링크, 강조 텍스트, 캘린더 오늘 날짜, 캘린더 일정 포인트.
*   **Deep Blue**: `#2D5ABB`
    *   **사용처**: `CCBtn` 기본 배경, 중요 버튼 호버 상태.
*   **Light Blue**: `#8DB7FF`
    *   **사용처**: `CCBtn` 호버 배경, 서브 강조.
*   **Sky Blue**: `#72A6FF`
    *   **사용처**: `ProgramCard` 하이라이트 텍스트.

### 🌈 Track Colors (직군별 포인트)
사용자 트랙(역할)을 나타내는 배지나 프로필 아이콘에 사용합니다.
*   **DESIGN (기획/디자인)**: `#FF669D` (Hot Pink)
*   **FRONTEND (프론트엔드)**: `#F75222` (Vibrant Orange)
*   **BACKEND (백엔드)**: `#0ACF83` (Mint Green)

### 🌑 Grayscale (기본 배색)
*   **Background (Dark)**: `#121212`, `#000000` (페이지 배경)
*   **Card Background**: `#1B1B1B` (팀 소개 등 내부 카드 배경)
*   **Text (Primary)**: `#FFFFFF` (Dark 모드 기본)
*   **Text (Secondary)**: `#E5E5E5`, `#A2A2A2` (부제목, 프로젝트 설명)
*   **Text (Tertiary)**: `#666666`, `#9E9E9E`, `text-gray-400` (소극적 정보)
*   **Border**: `#B7B7B7`

---

## 3. Typography (타이포그래피)

단일 폰트 패밀리 **Pretendard**를 사용합니다. `fonts.css`에 정의된 클래스명을 우선 사용하십시오.

*   **Font Family**: `Pretendard`, sans-serif

### 🔠 Font Weights & Classes
| Weight | Class Name | Usage |
| :--- | :--- | :--- |
| **Black (900)** | `.fontBlack` | 메인 로고, 임팩트 있는 헤드라인 |
| **ExtraBold (800)** | `.fontEB` | 강조된 타이틀 |
| **Bold (700)** | `.fontBold` | 섹션 제목, 중요 버튼 텍스트 |
| **SemiBold (600)** | `.fontSB` | 서브 타이틀, 카드 제목 |
| **Medium (500)** | `.fontMedium` | 네비게이션, 일반 버튼 |
| **Regular (400)** | `.fontRegular` | 본문 기본 텍스트 |
| **Light (300)** | `.fontLight` | 부가 설명, 마이크로 카피 |
| **Thin (100)** | `.fontThin` | 감성적인 문구, 배경성 텍스트 |

---

## 4. Layout & Spacing (레이아웃 및 간격)

*   **Responsive Breakpoints**: Tailwind 기본 브레이크포인트를 준수합니다.
    *   `sm` (640px): 모바일
    *   `md` (768px): 태블릿
    *   `lg` (1024px): 작은 데스크탑
    *   `xl` (1280px): 데스크탑
*   **Container**: `mx-auto`, `px-4 sm:px-6 lg:px-8` (기본), 혹은 `w-4/5 mx-auto` (프로젝트 리스트 등 넓은 뷰)를 사용합니다.
*   **Spacing**: 요소 간 간격은 `4px` 단위(Tailwind `gap-4`, `my-8` 등)를 사용하여 리듬감을 유지합니다.

---

## 5. Components & UI Patterns (컴포넌트 패턴)

### 🖱️ Buttons (CCBtn Style)
*   **Colors**: 기본 `#2D5ABB` -> 호버 `#8DB7FF` (텍스트 블랙으로 반전).
*   **Shape**: `rounded-sm` (직각에 가까운) 혹은 `rounded-full` (완전 둥근).
*   **Interaction**: 단순 색상 반전 혹은 `scale` 변화.

### 🃏 Cards (`ProgramCard` & `TeamSection` Style)
*   **Background**: 투명 혹은 `#1B1B1B` (팀 카드).
*   **Radius**: `rounded-sm` ~ `rounded-[15px]`까지 다양하게 사용.
*   **Animation**: `framer-motion`의 `useInView`를 활용하여 스크롤 시 `fadeUp` 효과 필수.

### 🖼️ Images & Visuals
*   **Overlay**: 텍스트 가독성을 위해 `bg-black opacity-80` 사용.
*   **Responsive**: `hidden sm:block` 등을 활용하여 모바일/데스크탑 이미지를 최적화하여 분기.

---

## 6. AI Checklist for Page Generation (AI 제작 체크리스트)

새로운 페이지를 코딩할 때 다음 항목을 반드시 검증하십시오.

1.  **[Font]** `.fontSB`, `.fontRegular` 등 Pretendard 전용 클래스를 사용했는가?
2.  **[Color]** `#3B79FF`(Main), `#2D5ABB`(Deep), `#8DB7FF`(Light) 등 지정된 블루 계열을 상황에 맞게 사용했는가?
3.  **[Bg Color]** 카드 배경에 `#1B1B1B`를, 텍스트에 `#E5E5E5`, `#A2A2A2` 등 구체적인 그레이스케일을 사용했는가?
4.  **[Motion]** `framer-motion`을 사용하여 등장 애니메이션을 적용했는가?
5.  **[Responsive]** 모바일(`sm` 미만)과 데스크탑(`xl`) 뷰를 모두 고려했는가?

---
*Last Updated: 2026-01-28*
