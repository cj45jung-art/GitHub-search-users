import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { GitBranch, Menu, X } from 'lucide-react'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { to: '/', label: '홈' },
    { to: '/about', label: '소개' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav
      className="sticky top-0 z-50 w-full border-b"
      style={{
        backgroundColor: 'var(--color-bg-secondary)',
        borderColor: 'var(--color-border)',
      }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* 로고 */}
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold transition-opacity hover:opacity-80"
            style={{ color: 'var(--color-text-primary)' }}
          >
            <GitBranch size={28} style={{ color: 'var(--color-accent)' }} />
            <span>GitHub Finder</span>
          </Link>

          {/* 데스크탑 네비게이션 */}
          <div className="hidden items-center gap-1 sm:flex">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="rounded-md px-4 py-2 text-sm font-medium transition-all duration-200"
                style={{
                  color: isActive(link.to)
                    ? 'var(--color-accent)'
                    : 'var(--color-text-secondary)',
                  backgroundColor: isActive(link.to)
                    ? 'rgba(88, 166, 255, 0.1)'
                    : 'transparent',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* 모바일 햄버거 버튼 */}
          <button
            className="flex items-center justify-center rounded-md p-2 transition-colors sm:hidden"
            style={{ color: 'var(--color-text-secondary)' }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="메뉴 토글"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* 모바일 드롭다운 메뉴 */}
      {isMenuOpen && (
        <div
          className="border-t sm:hidden"
          style={{
            backgroundColor: 'var(--color-bg-secondary)',
            borderColor: 'var(--color-border)',
          }}
        >
          <div className="space-y-1 px-4 py-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block rounded-md px-3 py-2 text-sm font-medium transition-all duration-200"
                style={{
                  color: isActive(link.to)
                    ? 'var(--color-accent)'
                    : 'var(--color-text-secondary)',
                  backgroundColor: isActive(link.to)
                    ? 'rgba(88, 166, 255, 0.1)'
                    : 'transparent',
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
