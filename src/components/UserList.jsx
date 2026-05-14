import { useGithub } from '../context/GithubContext'
import UserCard from './UserCard'
import { AlertCircle, SearchX, Users } from 'lucide-react'

function UserList() {
  const { users, loading, error, searchQuery } = useGithub()

  // 로딩 스켈레톤
  if (loading) {
    return (
      <div className="flex flex-col gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 rounded-2xl border p-4 sm:p-5"
            style={{
              backgroundColor: 'var(--color-bg-secondary)',
              borderColor: 'var(--color-border)',
            }}
          >
            {/* 아바타 스켈레톤 */}
            <div className="skeleton h-14 w-14 flex-shrink-0 rounded-full sm:h-16 sm:w-16" />
            {/* 텍스트 스켈레톤 */}
            <div className="flex flex-1 flex-col gap-2">
              <div className="skeleton h-4 w-32 rounded" />
              <div className="skeleton h-3 w-20 rounded" />
              <div className="skeleton h-3 w-40 rounded" />
            </div>
            {/* 버튼 스켈레톤 */}
            <div className="flex flex-shrink-0 flex-col gap-2 sm:flex-row">
              <div className="skeleton h-7 w-20 rounded-lg" />
              <div className="skeleton h-7 w-7 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  // 에러 상태
  if (error) {
    return (
      <div
        className="flex flex-col items-center gap-4 rounded-2xl border p-12 text-center"
        style={{
          backgroundColor: 'rgba(248, 81, 73, 0.05)',
          borderColor: 'rgba(248, 81, 73, 0.3)',
        }}
      >
        <div
          className="flex h-14 w-14 items-center justify-center rounded-full"
          style={{ backgroundColor: 'rgba(248, 81, 73, 0.1)' }}
        >
          <AlertCircle size={28} style={{ color: 'var(--color-danger)' }} />
        </div>
        <div>
          <h3
            className="mb-1 text-lg font-semibold"
            style={{ color: 'var(--color-danger)' }}
          >
            오류가 발생했습니다
          </h3>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            {error}
          </p>
        </div>
      </div>
    )
  }

  // 검색 결과 없음
  if (searchQuery && users.length === 0) {
    return (
      <div
        className="flex flex-col items-center gap-4 rounded-2xl border p-12 text-center"
        style={{
          backgroundColor: 'var(--color-bg-secondary)',
          borderColor: 'var(--color-border)',
        }}
      >
        <div
          className="flex h-14 w-14 items-center justify-center rounded-full"
          style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
        >
          <SearchX size={28} style={{ color: 'var(--color-text-secondary)' }} />
        </div>
        <div>
          <h3
            className="mb-1 text-lg font-semibold"
            style={{ color: 'var(--color-text-primary)' }}
          >
            검색 결과가 없습니다
          </h3>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            <span style={{ color: 'var(--color-accent)' }}>"{searchQuery}"</span>
            에 해당하는 GitHub 사용자를 찾을 수 없습니다.
          </p>
        </div>
      </div>
    )
  }

  // 검색 결과 목록
  if (users.length > 0) {
    return (
      <div className="flex flex-col gap-4">
        {/* 결과 헤더 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users size={16} style={{ color: 'var(--color-accent)' }} />
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              <span style={{ color: 'var(--color-accent)' }}>"{searchQuery}"</span>
              {' '}검색 결과{' '}
              <span
                className="font-semibold"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {users.length}
              </span>
              개
            </p>
          </div>
        </div>

        {/* 유저 카드 그리드 - 모바일 1열 / 데스크탑 2열 */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </div>
    )
  }

  return null
}

export default UserList
