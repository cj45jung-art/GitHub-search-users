import { Link } from 'react-router-dom'
import { ExternalLink, GitBranch, Users } from 'lucide-react'

function UserCard({ user }) {
  const { login, avatar_url, html_url, type, score } = user

  return (
    <div
      className="group flex items-center gap-4 rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-0.5 animate-fade-in sm:p-5"
      style={{
        backgroundColor: 'var(--color-bg-secondary)',
        borderColor: 'var(--color-border)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-accent)'
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(88, 166, 255, 0.12)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border)'
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.3)'
      }}
    >
      {/* 아바타 */}
      <div className="relative flex-shrink-0">
        <img
          src={avatar_url}
          alt={`${login}의 프로필 이미지`}
          className="h-14 w-14 rounded-full border-2 object-cover transition-transform duration-300 group-hover:scale-105 sm:h-16 sm:w-16"
          style={{ borderColor: 'var(--color-border)' }}
          loading="lazy"
        />
        {/* 타입 배지 */}
        <span
          className="absolute -bottom-1 -right-1 rounded-full px-1.5 py-0.5 text-xs font-medium"
          style={{
            backgroundColor:
              type === 'Organization'
                ? 'rgba(63, 185, 80, 0.15)'
                : 'rgba(88, 166, 255, 0.15)',
            color:
              type === 'Organization'
                ? 'var(--color-success)'
                : 'var(--color-accent)',
            border: `1px solid ${
              type === 'Organization'
                ? 'var(--color-success)'
                : 'var(--color-accent)'
            }`,
          }}
        >
          {type === 'Organization' ? 'Org' : 'User'}
        </span>
      </div>

      {/* 사용자 정보 */}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-center gap-2">
          <h3
            className="truncate text-sm font-semibold sm:text-base"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {login}
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <span
            className="flex items-center gap-1 text-xs"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            <Users size={11} />
            {type === 'Organization' ? '조직' : '개발자'}
          </span>
          {score && (
            <span
              className="flex items-center gap-1 text-xs"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              <GitBranch size={11} />
              점수 {Math.round(score)}
            </span>
          )}
        </div>
        {/* 프로필 URL */}
        <p
          className="truncate text-xs"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          github.com/{login}
        </p>
      </div>

      {/* 액션 버튼 */}
      <div className="flex flex-shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
        <Link
          to={`/user/${login}`}
          className="rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200 whitespace-nowrap"
          style={{
            backgroundColor: 'var(--color-accent)',
            color: '#0d1117',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-accent-hover)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-accent)'
          }}
        >
          프로필 보기
        </Link>
        <a
          href={html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center rounded-lg border p-1.5 transition-all duration-200"
          style={{
            borderColor: 'var(--color-border)',
            color: 'var(--color-text-secondary)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-accent)'
            e.currentTarget.style.color = 'var(--color-accent)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-border)'
            e.currentTarget.style.color = 'var(--color-text-secondary)'
          }}
          aria-label={`${login} GitHub 페이지 열기`}
        >
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  )
}

export default UserCard
