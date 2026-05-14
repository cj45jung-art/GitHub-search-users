/**
 * LoadingSpinner 컴포넌트
 * @param {string} size - 'sm' | 'md' | 'lg' (기본값: 'md')
 * @param {string} message - 로딩 메시지 (선택)
 * @param {boolean} overlay - 전체 화면 오버레이 여부 (기본값: false)
 */
function LoadingSpinner({ size = 'md', message, overlay = false }) {
  const sizeMap = {
    sm: { spinner: 'h-5 w-5', border: 'border-2', text: 'text-xs' },
    md: { spinner: 'h-8 w-8', border: 'border-2', text: 'text-sm' },
    lg: { spinner: 'h-12 w-12', border: 'border-[3px]', text: 'text-base' },
  }

  const { spinner, border, text } = sizeMap[size] || sizeMap.md

  const spinnerEl = (
    <div className="flex flex-col items-center justify-center gap-3">
      {/* 스피너 원 */}
      <div className="relative">
        {/* 배경 원 */}
        <div
          className={`${spinner} ${border} rounded-full`}
          style={{ borderColor: 'var(--color-border)' }}
        />
        {/* 회전 원 */}
        <div
          className={`${spinner} ${border} absolute inset-0 animate-spin rounded-full`}
          style={{
            borderColor: 'transparent',
            borderTopColor: 'var(--color-accent)',
          }}
        />
      </div>

      {/* 로딩 메시지 */}
      {message && (
        <p className={`${text} font-medium`} style={{ color: 'var(--color-text-secondary)' }}>
          {message}
        </p>
      )}
    </div>
  )

  // 오버레이 모드
  if (overlay) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ backgroundColor: 'rgba(13, 17, 23, 0.8)', backdropFilter: 'blur(4px)' }}
      >
        {spinnerEl}
      </div>
    )
  }

  return spinnerEl
}

export default LoadingSpinner
