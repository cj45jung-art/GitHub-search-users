# 🔍 GitHub Finder

GitHub 사용자를 검색하고 프로필, 저장소, 활동 정보를 한눈에 확인할 수 있는 웹 애플리케이션입니다.

---

## 🚀 기술 스택

| 기술 | 버전 | 용도 |
|------|------|------|
| React | 19.x | UI 컴포넌트 |
| Vite | 8.x | 빌드 도구 |
| Tailwind CSS | 4.x (`@tailwindcss/vite`) | 스타일링 |
| Lucide React | 최신 | 아이콘 |
| React Router DOM | 7.x | 클라이언트 라우팅 |
| GitHub REST API | v3 | 데이터 소스 |

---

## 📁 폴더 구조

```
GitHub-search-users/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── LoadingSpinner.jsx   # 로딩 스피너 (sm/md/lg, overlay 모드)
│   │   ├── Navbar.jsx           # 반응형 네비게이션 바
│   │   ├── SearchBar.jsx        # 검색창 (드롭다운, 최근 검색어)
│   │   ├── UserCard.jsx         # 유저 카드 (가로형 레이아웃)
│   │   └── UserList.jsx         # 유저 목록 (2열 그리드)
│   ├── context/
│   │   └── GithubContext.jsx    # 전역 상태 (Context API + useReducer)
│   ├── pages/
│   │   ├── Home.jsx             # 홈 페이지 (히어로 + 검색 결과)
│   │   └── UserDetail.jsx       # 유저 상세 (프로필 사이드바 + 저장소)
│   ├── App.jsx                  # 루트 컴포넌트 + 라우팅
│   ├── main.jsx                 # 진입점 (BrowserRouter)
│   └── index.css                # Tailwind + 글로벌 스타일
├── index.html
├── vite.config.js
├── vercel.json
└── package.json
```

---

## ⚙️ 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview
```

개발 서버 실행 후 [http://localhost:5173](http://localhost:5173) 에서 확인하세요.

---

## ✨ 주요 기능

### 🔍 사용자 검색
- GitHub 사용자명으로 실시간 검색
- 검색창 포커스 시 **최근 검색어** 및 **추천 개발자** 드롭다운 표시
- 최근 검색어 localStorage 저장 (최대 5개, 개별 삭제 가능)
- 검색 중 입력 비활성화 + 로딩 스피너 표시

### 📋 검색 결과 목록
- 모바일 **1열** / 데스크탑(768px+) **2열** 반응형 그리드
- 스켈레톤 로딩 애니메이션
- 에러 상태 / 결과 없음 상태 UI

### 👤 유저 상세 페이지
- **2단 레이아웃**: 좌측 프로필 사이드바(sticky) + 우측 저장소 목록
- 모바일에서는 1열 스택 레이아웃
- 프로필: 아바타, 이름, 바이오, 위치, 블로그, 트위터, 가입일
- 통계: 저장소 수, 팔로워, 팔로잉
- 저장소: 이름, 설명, 언어, 스타, 포크, 업데이트 날짜

### 🛡️ 에러 처리
- GitHub API Rate Limit (403/429) 친절한 한국어 메시지
- AbortController로 이전 요청 자동 취소 (race condition 방지)
- 네트워크 오류 처리

---

## 🎨 디자인 시스템

GitHub 다크 테마 기반 CSS 변수:

```css
--color-bg-primary:    #0d1117  /* 배경 */
--color-bg-secondary:  #161b22  /* 카드 배경 */
--color-bg-tertiary:   #21262d  /* 입력 배경 */
--color-border:        #30363d  /* 테두리 */
--color-text-primary:  #e6edf3  /* 주요 텍스트 */
--color-text-secondary:#8b949e  /* 보조 텍스트 */
--color-accent:        #58a6ff  /* 강조색 (파란색) */
--color-success:       #3fb950  /* 성공 */
--color-danger:        #f85149  /* 오류 */
```

---

## 🗺️ 페이지 라우팅

| 경로 | 컴포넌트 | 설명 |
|------|----------|------|
| `/` | `Home` | 검색 홈 + 결과 목록 |
| `/user/:login` | `UserDetail` | 유저 상세 프로필 |
| `*` | 인라인 404 | 페이지 없음 |

---

## 📡 사용 API

| 엔드포인트 | 용도 |
|-----------|------|
| `GET /search/users?q={query}&per_page=12` | 사용자 검색 |
| `GET /users/{login}` | 유저 상세 정보 |
| `GET /users/{login}/repos?sort=updated&per_page=10` | 유저 저장소 목록 |

> ⚠️ GitHub API는 인증 없이 시간당 60회 요청 제한이 있습니다.  
> 더 많은 요청이 필요하다면 [Personal Access Token](https://github.com/settings/tokens)을 발급받아 헤더에 추가하세요.

---

## 📱 반응형 브레이크포인트

| 구간 | 너비 | 레이아웃 |
|------|------|----------|
| 모바일 | `< 768px` | 1열, 햄버거 메뉴 |
| 태블릿 | `768px ~` | 2열 그리드 |
| 데스크탑 | `1024px ~` | 2단 레이아웃 (사이드바) |

---

## ☁️ 배포 (Vercel)

이 프로젝트는 **Vercel**을 통해 배포되어 있습니다.

### 배포 URL
> Vercel 대시보드에서 확인한 URL을 여기에 입력하세요.  
> 예: `https://github-search-users-xxx.vercel.app`

### 배포 방법
1. [vercel.com](https://vercel.com)에서 GitHub 계정으로 로그인
2. **New Project** → GitHub 저장소(`GitHub-search-users`) 선택
3. 빌드 설정 자동 감지 (Vite 프로젝트 자동 인식)
4. **Deploy** 클릭

### 자동 재배포
- `main` 브랜치에 push할 때마다 **자동으로 재배포**됩니다.

### SPA 라우팅 처리
React Router의 클라이언트 사이드 라우팅을 위해 `vercel.json`을 추가했습니다.  
이 설정이 없으면 `/user/:login` URL로 직접 접근하거나 새로고침 시 404 에러가 발생합니다.

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```
