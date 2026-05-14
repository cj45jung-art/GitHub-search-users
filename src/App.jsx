import { Routes, Route } from 'react-router-dom'
import { GithubProvider } from './context/GithubContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import UserDetail from './pages/UserDetail'

function App() {
  return (
    <GithubProvider>
      <div
        className="flex min-h-screen flex-col"
        style={{ backgroundColor: 'var(--color-bg-primary)' }}
      >
        {/* 네비게이션 바 */}
        <Navbar />

        {/* 메인 콘텐츠 */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/:login" element={<UserDetail />} />
          {/* 404 페이지 */}
          <Route
            path="*"
            element={
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-20 text-center">
                <h2
                  className="text-6xl font-bold"
                  style={{ color: 'var(--color-accent)' }}
                >
                  404
                </h2>
                <p
                  className="text-xl font-semibold"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  페이지를 찾을 수 없습니다
                </p>
                <p
                  className="text-sm"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  요청하신 페이지가 존재하지 않거나 이동되었습니다.
                </p>
                <a
                  href="/"
                  className="mt-2 rounded-lg px-6 py-2.5 text-sm font-semibold transition-all duration-200"
                  style={{
                    backgroundColor: 'var(--color-accent)',
                    color: '#0d1117',
                  }}
                >
                  홈으로 돌아가기
                </a>
              </div>
            }
          />
        </Routes>

        {/* 푸터 */}
        <footer
          className="mt-auto border-t py-6 text-center text-sm"
          style={{
            borderColor: 'var(--color-border)',
            color: 'var(--color-text-secondary)',
          }}
        >
          <p>
            GitHub Finder &mdash; GitHub API를 활용한 사용자 검색 앱
          </p>
        </footer>
      </div>
    </GithubProvider>
  )
}

export default App
