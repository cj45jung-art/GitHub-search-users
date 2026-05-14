import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft,
  MapPin,
  Link as LinkIcon,
  AtSign,
  Building,
  Users,
  BookOpen,
  Star,
  GitFork,
  ExternalLink,
  Calendar,
  GitBranch,
} from 'lucide-react'
import { useGithub } from '../context/GithubContext'
import LoadingSpinner from '../components/LoadingSpinner'

function UserDetail() {
  const { login } = useParams()
  const { user, repos, userLoading, error, getUser, getUserRepos } = useGithub()

  useEffect(() => {
    if (login) {
      getUser(login)
      getUserRepos(login)
    }
  }, [login, getUser, getUserRepos])

  // 로딩 상태
  if (userLoading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        {/* 뒤로가기 스켈레톤 */}
        <div className="skeleton mb-6 h-4 w-36 rounded" />

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          {/* 프로필 카드 스켈레톤 */}
          <div
            className="w-full rounded-2xl border p-6 lg:w-72 lg:flex-shrink-0"
            style={{
              backgroundColor: 'var(--color-bg-secondary)',
              borderColor: 'var(--color-border)',
            }}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="skeleton h-24 w-24 rounded-full" />
              <div className="skeleton h-6 w-32 rounded" />
              <div className="skeleton h-4 w-24 rounded" />
              <div className="skeleton h-16 w-full rounded" />
              <div className="flex w-full flex-col gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="skeleton h-4 w-full rounded" />
                ))}
              </div>
            </div>
          </div>

          {/* 저장소 스켈레톤 */}
          <div className="flex flex-1 flex-col gap-3">
            <div className="skeleton h-6 w-28 rounded" />
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-xl border p-4"
                style={{
                  backgroundColor: 'var(--color-bg-secondary)',
                  borderColor: 'var(--color-border)',
                }}
              >
                <div className="skeleton mb-2 h-4 w-40 rounded" />
                <div className="skeleton h-3 w-full rounded" />
                <div className="skeleton mt-2 h-3 w-3/4 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // 에러 상태
  if (error) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10 text-center sm:px-6">
        <p className="text-lg" style={{ color: 'var(--color-danger)' }}>
          {error}
        </p>
        <Link
          to="/"
          className="mt-4 inline-flex items-center gap-2 text-sm"
          style={{ color: 'var(--color-accent)' }}
        >
          <ArrowLeft size={16} />
          홈으로 돌아가기
        </Link>
      </div>
    )
  }

  if (!user) return null

  const {
    name,
    avatar_url,
    bio,
    location,
    blog,
    twitter_username,
    company,
    public_repos,
    followers,
    following,
    html_url,
    created_at,
  } = user

  const joinDate = new Date(created_at).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* 뒤로가기 */}
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-2 text-sm transition-colors"
        style={{ color: 'var(--color-text-secondary)' }}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
      >
        <ArrowLeft size={16} />
        검색 결과로 돌아가기
      </Link>

      {/* 2단 레이아웃: 모바일 1열 / 데스크탑 2열 */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">

        {/* ===== 좌측: 프로필 카드 (사이드바) ===== */}
        <aside className="w-full lg:w-72 lg:flex-shrink-0">
          <div
            className="sticky top-24 rounded-2xl border p-6"
            style={{
              backgroundColor: 'var(--color-bg-secondary)',
              borderColor: 'var(--color-border)',
            }}
          >
            {/* 아바타 + 이름 */}
            <div className="flex flex-col items-center gap-3 text-center">
              <img
                src={avatar_url}
                alt={`${login}의 프로필 이미지`}
                className="h-24 w-24 rounded-full border-4"
                style={{ borderColor: 'var(--color-border)' }}
              />
              <div>
                <h1
                  className="text-xl font-bold"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {name || login}
                </h1>
                <p
                  className="text-sm"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  @{login}
                </p>
              </div>

              {/* GitHub 링크 버튼 */}
              <a
                href={html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl border py-2 text-sm font-medium transition-all duration-200"
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
              >
                <ExternalLink size={14} />
                GitHub에서 보기
              </a>
            </div>

            {/* 바이오 */}
            {bio && (
              <p
                className="mt-4 text-sm leading-relaxed text-center"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {bio}
              </p>
            )}

            {/* 구분선 */}
            <div
              className="my-4 border-t"
              style={{ borderColor: 'var(--color-border)' }}
            />

            {/* 통계 */}
            <div className="grid grid-cols-3 gap-2 text-center">
              {[
                { icon: BookOpen, label: '저장소', value: public_repos },
                { icon: Users, label: '팔로워', value: followers },
                { icon: Users, label: '팔로잉', value: following },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1 rounded-xl p-2"
                  style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
                >
                  <Icon size={14} style={{ color: 'var(--color-accent)' }} />
                  <span
                    className="text-base font-bold"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {value?.toLocaleString() ?? 0}
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* 구분선 */}
            <div
              className="my-4 border-t"
              style={{ borderColor: 'var(--color-border)' }}
            />

            {/* 메타 정보 */}
            <div className="flex flex-col gap-2.5">
              {company && (
                <div
                  className="flex items-center gap-2 text-sm"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  <Building size={14} className="flex-shrink-0" />
                  <span className="truncate">{company}</span>
                </div>
              )}
              {location && (
                <div
                  className="flex items-center gap-2 text-sm"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  <MapPin size={14} className="flex-shrink-0" />
                  <span className="truncate">{location}</span>
                </div>
              )}
              {blog && (
                <a
                  href={blog.startsWith('http') ? blog : `https://${blog}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm transition-colors"
                  style={{ color: 'var(--color-accent)' }}
                >
                  <LinkIcon size={14} className="flex-shrink-0" />
                  <span className="truncate">{blog}</span>
                </a>
              )}
              {twitter_username && (
                <a
                  href={`https://twitter.com/${twitter_username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm transition-colors"
                  style={{ color: 'var(--color-accent)' }}
                >
                  <AtSign size={14} className="flex-shrink-0" />
                  <span className="truncate">@{twitter_username}</span>
                </a>
              )}
              <div
                className="flex items-center gap-2 text-sm"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                <Calendar size={14} className="flex-shrink-0" />
                <span>{joinDate} 가입</span>
              </div>
            </div>
          </div>
        </aside>

        {/* ===== 우측: 저장소 목록 ===== */}
        <main className="flex-1 min-w-0">
          <div className="mb-4 flex items-center gap-2">
            <GitBranch size={18} style={{ color: 'var(--color-accent)' }} />
            <h2
              className="text-lg font-bold"
              style={{ color: 'var(--color-text-primary)' }}
            >
              최근 저장소
            </h2>
            {repos.length > 0 && (
              <span
                className="rounded-full px-2 py-0.5 text-xs font-medium"
                style={{
                  backgroundColor: 'rgba(88, 166, 255, 0.15)',
                  color: 'var(--color-accent)',
                }}
              >
                {repos.length}
              </span>
            )}
          </div>

          {repos.length === 0 ? (
            <div
              className="flex flex-col items-center gap-3 rounded-2xl border p-10 text-center"
              style={{
                backgroundColor: 'var(--color-bg-secondary)',
                borderColor: 'var(--color-border)',
              }}
            >
              <BookOpen size={32} style={{ color: 'var(--color-text-secondary)' }} />
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                공개 저장소가 없습니다.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {repos.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-3 rounded-2xl border p-4 transition-all duration-200 sm:p-5"
                  style={{
                    backgroundColor: 'var(--color-bg-secondary)',
                    borderColor: 'var(--color-border)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-accent)'
                    e.currentTarget.style.backgroundColor = 'var(--color-bg-tertiary)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-border)'
                    e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)'
                  }}
                >
                  {/* 저장소 이름 + 외부 링크 */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <BookOpen
                        size={15}
                        className="flex-shrink-0"
                        style={{ color: 'var(--color-accent)' }}
                      />
                      <h3
                        className="truncate text-sm font-semibold"
                        style={{ color: 'var(--color-accent)' }}
                      >
                        {repo.name}
                      </h3>
                    </div>
                    <ExternalLink
                      size={14}
                      className="flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                      style={{ color: 'var(--color-text-secondary)' }}
                    />
                  </div>

                  {/* 설명 */}
                  {repo.description && (
                    <p
                      className="line-clamp-2 text-xs leading-relaxed"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {repo.description}
                    </p>
                  )}

                  {/* 메타 정보 */}
                  <div
                    className="flex flex-wrap items-center gap-4 text-xs"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {repo.language && (
                      <span className="flex items-center gap-1.5">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: 'var(--color-accent)' }}
                        />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Star size={12} />
                      {repo.stargazers_count.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork size={12} />
                      {repo.forks_count.toLocaleString()}
                    </span>
                    {repo.updated_at && (
                      <span>
                        업데이트:{' '}
                        {new Date(repo.updated_at).toLocaleDateString('ko-KR', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    )}
                  </div>
                </a>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default UserDetail
