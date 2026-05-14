import { GitBranch, Star, GitFork, Users } from 'lucide-react'
import SearchBar from '../components/SearchBar'
import UserList from '../components/UserList'
import { useGithub } from '../context/GithubContext'

function Home() {
  const { users, searchQuery } = useGithub()
  const hasSearched = searchQuery.length > 0

  return (
    <main className="flex-1">
      {/* 히어로 섹션 */}
      {!hasSearched && (
        <section className="flex flex-col items-center justify-center px-4 py-20 text-center sm:py-28">
          {/* 아이콘 */}
          <div
            className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border"
            style={{
              backgroundColor: 'rgba(88, 166, 255, 0.1)',
              borderColor: 'rgba(88, 166, 255, 0.3)',
            }}
          >
            <GitBranch size={40} style={{ color: 'var(--color-accent)' }} />
          </div>

          {/* 타이틀 */}
          <h1
            className="mb-3 text-4xl font-bold tracking-tight sm:text-5xl"
            style={{ color: 'var(--color-text-primary)' }}
          >
            GitHub{' '}
            <span style={{ color: 'var(--color-accent)' }}>Finder</span>
          </h1>
          <p
            className="mb-10 max-w-md text-base sm:text-lg"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            GitHub 사용자를 검색하고 프로필, 저장소, 활동 정보를 한눈에
            확인하세요.
          </p>

          {/* 검색바 */}
          <div className="w-full max-w-2xl px-4">
            <SearchBar />
          </div>

          {/* 통계 배지 */}
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {[
              { icon: Users, label: '수백만 명의 개발자' },
              { icon: Star, label: '수십억 개의 스타' },
              { icon: GitFork, label: '수억 개의 저장소' },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm"
                style={{
                  backgroundColor: 'var(--color-bg-secondary)',
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                <Icon size={14} style={{ color: 'var(--color-accent)' }} />
                {label}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 검색 후 레이아웃 */}
      {hasSearched && (
        <section className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            {/* 상단 검색바 */}
            <div className="mb-8">
              <SearchBar />
            </div>
            {/* 결과 목록 */}
            <UserList />
          </div>
        </section>
      )}
    </main>
  )
}

export default Home
