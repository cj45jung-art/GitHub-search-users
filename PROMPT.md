# 📝 PROMPT.md — AI 협업 작업 기록

> GitHub Finder 프로젝트를 AI(Cline)와 함께 단계별로 구현한 프롬프트 및 작업 과정 기록입니다.

---

## 📅 작업 일시
2026년 5월 14일

---

## 🧑‍💻 사용 AI
- **Cline** (VS Code 확장 AI 코딩 어시스턴트)
- 모드: Plan Mode → Act Mode 전환 방식

---

## 📋 단계별 작업 기록

---

### STEP 1 — 프로젝트 초기 구성

**프롬프트 요약:**
> 너는 지금부터 숙련된 프론트엔드 개발자야. 'GitHub Finder' 앱을 만들 예정이야.  
> 기술 스택은 React(Vite), Tailwind CSS, Lucide-react(아이콘용)를 사용할 거야.
> 1. 프로젝트를 구성하기 위해 필요한 폴더 구조와 파일 설정을 알려줘.
> 2. index.html과 style.css(Tailwind 설정 포함), 그리고 기본 App.jsx 구조를 작성해줘.
> 3. 모바일과 PC에서 모두 세련되게 보이도록 반응형 레이아웃(Flexbox/Grid)을 고려한 기본 뼈대를 만들어줘.

**구현 내용:**
- `npm create vite@latest` 로 React 프로젝트 생성
- `tailwindcss`, `@tailwindcss/vite`, `lucide-react`, `react-router-dom` 설치
- `vite.config.js`에 `@tailwindcss/vite` 플러그인 추가
- `index.html` — Google Fonts(Inter) 연결, 메타 태그 설정
- `src/index.css` — Tailwind v4 `@import "tailwindcss"` + GitHub 다크 테마 CSS 변수 + 스켈레톤/애니메이션
- `src/main.jsx` — `BrowserRouter` 래핑
- `src/App.jsx` — `GithubProvider` + `Navbar` + `Routes` + Footer 구조
- `src/context/GithubContext.jsx` — Context API + useReducer 전역 상태
- `src/components/Navbar.jsx` — 반응형 네비게이션 (모바일 햄버거 메뉴)
- `src/components/SearchBar.jsx` — 검색 입력 + 로딩 스피너
- `src/components/UserCard.jsx` — 유저 카드 컴포넌트
- `src/components/UserList.jsx` — 그리드 목록 + 스켈레톤 + 에러/빈 상태
- `src/pages/Home.jsx` — 히어로 섹션 + 검색 결과 레이아웃
- `src/pages/UserDetail.jsx` — 유저 상세 프로필 + 저장소 목록

---

### STEP 2 — lucide-react 아이콘 오류 수정 (1차)

**발생 오류:**
```
Uncaught SyntaxError: The requested module ... does not provide an export named 'Github'
```

**원인 분석:**
- `lucide-react`는 GitHub, Twitter 등 **브랜드 아이콘을 제공하지 않음**
- `Github`라는 export가 존재하지 않음

**해결:**
- `Navbar.jsx`: `Github` → `GitBranch`
- `Home.jsx`: `Github` → `GitBranch`

---

### STEP 3 — lucide-react 아이콘 오류 수정 (2차)

**발생 오류:**
```
Uncaught SyntaxError: The requested module ... does not provide an export named 'Twitter'
```

**원인 분석:**
- `Twitter`도 브랜드 아이콘으로 `lucide-react`에 없음
- 전체 파일 아이콘 import 전수 검사 실시

**해결:**
- `UserDetail.jsx`: `Twitter` → `AtSign` (@ 기호로 트위터 계정 표현)
- 나머지 아이콘(`Users`, `MapPin`, `ExternalLink`, `AlertCircle`, `SearchX`, `Search`, `X`, `GitBranch`, `Star`, `GitFork`, `ArrowLeft`, `Building`, `BookOpen`, `Calendar`, `Menu` 등) 모두 정상 확인

---

### STEP 4 — UI 화면 구현 개선

**프롬프트 요약:**
> 1. 사용자명 입력 검색창(Search Bar) 컴포넌트를 만들어줘.
> 2. 검색 결과가 표시될 프로필 카드 영역과 저장소 목록 영역을 위한 컴포넌트 구조를 설계해줘.
> 3. Tailwind CSS를 사용하여 깔끔하고 현대적인 디자인(다크 모드나 카드형 디자인)을 적용하고,  
>    모바일에서는 1열, 데스크탑에서는 2열로 배치되는 반응형 디자인을 작성해줘.

**구현 내용:**

#### SearchBar.jsx 개선
- 통합형 검색바 (아이콘 + 입력 + 버튼이 하나의 박스)
- 포커스 시 파란 글로우 효과 (`box-shadow: 0 0 0 3px rgba(88,166,255,0.15)`)
- 드롭다운 메뉴:
  - **최근 검색어** (localStorage 저장, 최대 5개, 개별 삭제)
  - **추천 개발자** 목록 (torvalds, gaearon 등)

#### UserCard.jsx 개선
- 세로형 → **가로형 레이아웃** (아바타 → 정보 → 버튼)
- 아바타, 사용자명, 타입 배지, 점수, URL 표시
- 호버 시 파란 테두리 + 그림자 효과

#### UserList.jsx 개선
- **모바일 1열 / 데스크탑(md) 2열** 그리드 (`grid-cols-1 md:grid-cols-2`)
- 스켈레톤 로딩도 가로형 카드에 맞게 업데이트
- 에러/빈 상태 UI 개선 (아이콘 원형 배경 추가)

#### UserDetail.jsx 개선
- **2단 레이아웃**: 좌측 프로필 사이드바(sticky) + 우측 저장소 목록
- 모바일에서는 1열 스택
- 저장소 카드에 업데이트 날짜, 호버 시 배경색 변경 추가

---

### STEP 5 — 데이터 통신 기능 구현

**프롬프트 요약:**
> 1. GitHub REST API(https://api.github.com/users/{username})를 호출하여 데이터를 가져오는 함수를 작성해줘.
> 2. useState와 useEffect를 사용하여 사용자가 검색창에 입력하고 엔터를 치거나 검색 버튼을 눌렀을 때 API가 호출되도록 해줘.
> 3. 데이터 요청 중일 때 보여줄 로딩 상태(Loading Spinner)와 데이터를 성공적으로 받아왔을 때 데이터를 렌더링하는 로직을 작성해줘.

**구현 내용:**

#### GithubContext.jsx 강화
```
사용자 입력 → SearchBar (form submit / Enter)
    ↓
GithubContext.searchUsers(query)
    ↓ dispatch SET_LOADING(true)
    ↓ fetch('/search/users?q=...')  ← AbortController 적용
    ↓ dispatch SET_USERS(data) or SET_ERROR(msg)
    ↓
UserList → loading ? <Skeleton> : <UserCard 목록>
```

- **AbortController**: 빠른 연속 검색 시 이전 요청 자동 취소 (race condition 방지)
- **로딩 상태 분리**: `loading`(검색) / `userLoading`(상세 페이지) 독립 관리
- **Rate Limit 처리**: HTTP 상태 코드별 한국어 에러 메시지
  - 403/429 → "GitHub API 요청 한도를 초과했습니다."
  - 404 → "사용자를 찾을 수 없습니다."
  - 422 → "검색어가 너무 짧거나 유효하지 않습니다."
  - 500+ → "GitHub 서버에 일시적인 문제가 발생했습니다."

#### LoadingSpinner.jsx 신규 생성
```jsx
<LoadingSpinner size="sm" />           // 인라인 소형
<LoadingSpinner size="lg" message="로딩 중..." />  // 메시지 포함
<LoadingSpinner overlay />             // 전체 화면 오버레이
```

#### SearchBar.jsx 개선
- 검색 중 입력 필드 `disabled` 처리
- 검색 아이콘 → `LoadingSpinner`로 교체
- 검색 버튼 스피너 + "검색 중..." 텍스트

#### UserDetail.jsx 개선
- `loading` → `userLoading` 상태로 교체 (검색과 독립)
- `LoadingSpinner` import 추가

---

## 🐛 발생한 오류 및 해결 목록

| # | 오류 | 원인 | 해결 |
|---|------|------|------|
| 1 | `'Github' is not exported` | lucide-react 브랜드 아이콘 미지원 | `GitBranch`로 대체 |
| 2 | `'Twitter' is not exported` | lucide-react 브랜드 아이콘 미지원 | `AtSign`으로 대체 |
| 3 | Vite 대화형 프롬프트 | `npm create vite` 인터랙티브 모드 | 터미널에서 직접 Enter 입력 |

---

## 📦 최종 파일 목록

```
src/
├── components/
│   ├── LoadingSpinner.jsx  ← 신규
│   ├── Navbar.jsx
│   ├── SearchBar.jsx       ← 개선
│   ├── UserCard.jsx        ← 개선
│   └── UserList.jsx        ← 개선
├── context/
│   └── GithubContext.jsx   ← 개선
├── pages/
│   ├── Home.jsx
│   └── UserDetail.jsx      ← 개선
├── App.jsx
├── main.jsx
└── index.css
```

---

## 💡 학습 포인트

1. **Tailwind CSS v4** — `@import "tailwindcss"` 방식 (v3의 `@tailwind base/components/utilities` 대신)
2. **`@tailwindcss/vite`** — 별도 `postcss.config.js` 없이 Vite 플러그인으로 통합
3. **lucide-react** — 브랜드 아이콘(GitHub, Twitter 등) 미포함, 대체 아이콘 사용 필요
4. **AbortController** — React에서 fetch 요청 취소로 race condition 방지
5. **Context API + useReducer** — Redux 없이 전역 상태 관리
6. **CSS 변수** — Tailwind와 함께 사용하여 일관된 디자인 시스템 구축
