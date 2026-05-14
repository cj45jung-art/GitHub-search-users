import { useState, useRef } from 'react'
import { Search, X, Clock, TrendingUp } from 'lucide-react'
import { useGithub } from '../context/GithubContext'
import LoadingSpinner from './LoadingSpinner'

// 추천 검색어
const SUGGESTIONS = ['torvalds', 'gaearon', 'sindresorhus', 'tj', 'yyx990803']

function SearchBar() {
  const [inputValue, setInputValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('gh-recent-searches') || '[]')
    } catch {
      return []
    }
  })
  const inputRef = useRef(null)
  const { searchUsers, clearUsers, loading } = useGithub()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputValue.trim() && !loading) {
      performSearch(inputValue.trim())
    }
  }

  const performSearch = (query) => {
    searchUsers(query)
    setInputValue(query)
    setIsFocused(false)
    inputRef.current?.blur()

    // 최근 검색어 저장 (최대 5개)
    const updated = [query, ...recentSearches.filter((s) => s !== query)].slice(0, 5)
    setRecentSearches(updated)
    localStorage.setItem('gh-recent-searches', JSON.stringify(updated))
  }

  const handleClear = () => {
    setInputValue('')
    clearUsers()
    inputRef.current?.focus()
  }

  const removeRecent = (e, term) => {
    e.stopPropagation()
    const updated = recentSearches.filter((s) => s !== term)
    setRecentSearches(updated)
    localStorage.setItem('gh-recent-searches', JSON.stringify(updated))
  }

  const showDropdown = isFocused && !loading && (recentSearches.length > 0 || SUGGESTIONS.length > 0)

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div
          className="flex items-center gap-3 rounded-2xl border px-4 py-2 transition-all duration-200"
          style={{
            backgroundColor: 'var(--color-bg-tertiary)',
            borderColor: isFocused ? 'var(--color-accent)' : 'var(--color-border)',
            boxShadow: isFocused ? '0 0 0 3px rgba(88, 166, 255, 0.15)' : 'none',
            opacity: loading ? 0.85 : 1,
          }}
        >
          {/* 검색 아이콘 또는 로딩 스피너 */}
          {loading ? (
            <LoadingSpinner size="sm" />
          ) : (
            <Search
              size={18}
              className="flex-shrink-0"
              style={{ color: isFocused ? 'var(--color-accent)' : 'var(--color-text-secondary)' }}
            />
          )}

          {/* 입력 필드 */}
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 150)}
            placeholder={loading ? '검색 중...' : 'GitHub 사용자 이름을 검색하세요...'}
            className="flex-1 bg-transparent text-sm outline-none"
            style={{
              color: 'var(--color-text-primary)',
              cursor: loading ? 'not-allowed' : 'text',
            }}
            autoComplete="off"
            disabled={loading}
          />

          {/* 초기화 버튼 */}
          {inputValue && !loading && (
            <button
              type="button"
              onClick={handleClear}
              className="flex-shrink-0 rounded-full p-1 transition-colors"
              style={{ color: 'var(--color-text-secondary)' }}
              aria-label="검색어 지우기"
            >
              <X size={14} />
            </button>
          )}

          {/* 구분선 */}
          <div
            className="h-5 w-px flex-shrink-0"
            style={{ backgroundColor: 'var(--color-border)' }}
          />

          {/* 검색 버튼 */}
          <button
            type="submit"
            disabled={!inputValue.trim() || loading}
            className="flex flex-shrink-0 items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50"
            style={{
              backgroundColor: 'var(--color-accent)',
              color: '#0d1117',
            }}
            onMouseEnter={(e) => {
              if (!e.currentTarget.disabled) {
                e.currentTarget.style.backgroundColor = 'var(--color-accent-hover)'
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-accent)'
            }}
          >
            {loading ? (
              <>
                <svg
                  className="h-4 w-4 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span className="hidden sm:inline">검색 중...</span>
              </>
            ) : (
              <>
                <Search size={15} />
                <span className="hidden sm:inline">검색</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* 드롭다운 */}
      {showDropdown && (
        <div
          className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border shadow-xl"
          style={{
            backgroundColor: 'var(--color-bg-secondary)',
            borderColor: 'var(--color-border)',
            boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
          }}
        >
          {/* 최근 검색어 */}
          {recentSearches.length > 0 && (
            <div className="p-2">
              <p
                className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                최근 검색
              </p>
              {recentSearches.map((term) => (
                <div
                  key={term}
                  className="flex cursor-pointer items-center justify-between rounded-xl px-3 py-2 transition-colors"
                  style={{ color: 'var(--color-text-primary)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-bg-tertiary)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }}
                  onClick={() => performSearch(term)}
                >
                  <div className="flex items-center gap-2.5">
                    <Clock size={13} style={{ color: 'var(--color-text-secondary)' }} />
                    <span className="text-sm">{term}</span>
                  </div>
                  <button
                    onClick={(e) => removeRecent(e, term)}
                    className="rounded-full p-0.5 transition-colors"
                    style={{ color: 'var(--color-text-secondary)' }}
                    aria-label={`${term} 삭제`}
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* 구분선 */}
          {recentSearches.length > 0 && (
            <div className="mx-3 border-t" style={{ borderColor: 'var(--color-border)' }} />
          )}

          {/* 추천 검색어 */}
          <div className="p-2">
            <p
              className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              추천 개발자
            </p>
            {SUGGESTIONS.map((term) => (
              <div
                key={term}
                className="flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 transition-colors"
                style={{ color: 'var(--color-text-primary)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-bg-tertiary)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }}
                onClick={() => performSearch(term)}
              >
                <TrendingUp size={13} style={{ color: 'var(--color-accent)' }} />
                <span className="text-sm">{term}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchBar
