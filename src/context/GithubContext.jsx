import { createContext, useContext, useReducer, useCallback, useRef } from 'react'

// ===== 초기 상태 =====
const initialState = {
  users: [],
  user: null,
  repos: [],
  loading: false,       // 검색 로딩
  userLoading: false,   // 유저 상세 로딩
  error: null,
  searchQuery: '',
  totalCount: 0,        // 검색 결과 총 개수
}

// ===== 액션 타입 =====
const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_USER_LOADING: 'SET_USER_LOADING',
  SET_USERS: 'SET_USERS',
  SET_USER: 'SET_USER',
  SET_REPOS: 'SET_REPOS',
  SET_ERROR: 'SET_ERROR',
  CLEAR_USERS: 'CLEAR_USERS',
  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
}

// ===== 리듀서 =====
function githubReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload, error: null }
    case ACTIONS.SET_USER_LOADING:
      return { ...state, userLoading: action.payload, error: null }
    case ACTIONS.SET_USERS:
      return {
        ...state,
        users: action.payload.items,
        totalCount: action.payload.totalCount,
        loading: false,
      }
    case ACTIONS.SET_USER:
      return { ...state, user: action.payload, userLoading: false }
    case ACTIONS.SET_REPOS:
      return { ...state, repos: action.payload, userLoading: false }
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false, userLoading: false }
    case ACTIONS.CLEAR_USERS:
      return { ...state, users: [], searchQuery: '', totalCount: 0, error: null }
    case ACTIONS.SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload }
    default:
      return state
  }
}

// ===== Context 생성 =====
const GithubContext = createContext()

// GitHub API 기본 URL
const GITHUB_API_URL = 'https://api.github.com'

// Rate Limit 에러 메시지 파싱
function parseApiError(status, message) {
  if (status === 403 || status === 429) {
    return 'GitHub API 요청 한도를 초과했습니다. 잠시 후 다시 시도해 주세요.'
  }
  if (status === 404) {
    return '사용자를 찾을 수 없습니다.'
  }
  if (status === 422) {
    return '검색어가 너무 짧거나 유효하지 않습니다.'
  }
  if (status >= 500) {
    return 'GitHub 서버에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.'
  }
  return message || `API 오류가 발생했습니다. (${status})`
}

// ===== Provider 컴포넌트 =====
export function GithubProvider({ children }) {
  const [state, dispatch] = useReducer(githubReducer, initialState)

  // AbortController ref - 이전 요청 취소용
  const searchAbortRef = useRef(null)
  const userAbortRef = useRef(null)

  // ===== 사용자 검색 =====
  const searchUsers = useCallback(async (query) => {
    if (!query.trim()) return

    // 이전 검색 요청 취소
    if (searchAbortRef.current) {
      searchAbortRef.current.abort()
    }
    searchAbortRef.current = new AbortController()

    dispatch({ type: ACTIONS.SET_LOADING, payload: true })
    dispatch({ type: ACTIONS.SET_SEARCH_QUERY, payload: query })

    try {
      const response = await fetch(
        `${GITHUB_API_URL}/search/users?q=${encodeURIComponent(query)}&per_page=12`,
        { signal: searchAbortRef.current.signal }
      )

      if (!response.ok) {
        throw new Error(parseApiError(response.status))
      }

      const data = await response.json()
      dispatch({
        type: ACTIONS.SET_USERS,
        payload: { items: data.items, totalCount: data.total_count },
      })
    } catch (error) {
      // AbortError는 무시 (의도적 취소)
      if (error.name === 'AbortError') return
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message })
    }
  }, [])

  // ===== 특정 사용자 정보 가져오기 =====
  const getUser = useCallback(async (login) => {
    // 이전 유저 요청 취소
    if (userAbortRef.current) {
      userAbortRef.current.abort()
    }
    userAbortRef.current = new AbortController()

    dispatch({ type: ACTIONS.SET_USER_LOADING, payload: true })

    try {
      const response = await fetch(
        `${GITHUB_API_URL}/users/${login}`,
        { signal: userAbortRef.current.signal }
      )

      if (!response.ok) {
        throw new Error(parseApiError(response.status))
      }

      const data = await response.json()
      dispatch({ type: ACTIONS.SET_USER, payload: data })
    } catch (error) {
      if (error.name === 'AbortError') return
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message })
    }
  }, [])

  // ===== 사용자 저장소 가져오기 =====
  const getUserRepos = useCallback(async (login) => {
    try {
      const response = await fetch(
        `${GITHUB_API_URL}/users/${login}/repos?sort=updated&per_page=10`,
        { signal: userAbortRef.current?.signal }
      )

      if (!response.ok) {
        throw new Error(parseApiError(response.status))
      }

      const data = await response.json()
      dispatch({ type: ACTIONS.SET_REPOS, payload: data })
    } catch (error) {
      if (error.name === 'AbortError') return
      // 저장소 오류는 치명적이지 않으므로 빈 배열로 처리
      dispatch({ type: ACTIONS.SET_REPOS, payload: [] })
    }
  }, [])

  // ===== 검색 결과 초기화 =====
  const clearUsers = useCallback(() => {
    if (searchAbortRef.current) {
      searchAbortRef.current.abort()
    }
    dispatch({ type: ACTIONS.CLEAR_USERS })
  }, [])

  const value = {
    ...state,
    searchUsers,
    getUser,
    getUserRepos,
    clearUsers,
  }

  return (
    <GithubContext.Provider value={value}>
      {children}
    </GithubContext.Provider>
  )
}

// ===== 커스텀 훅 =====
export function useGithub() {
  const context = useContext(GithubContext)
  if (!context) {
    throw new Error('useGithub은 GithubProvider 내부에서 사용해야 합니다.')
  }
  return context
}

export default GithubContext
