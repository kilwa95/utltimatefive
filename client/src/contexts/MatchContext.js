import { createContext, useState, useEffect, useMemo, useCallback } from 'react'

import matchHttp from '../http/matchHttp'
export const MatchContext = createContext()

export default function MatchProvider({ children }) {
  const [matches, setMatches] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState(null)

  const getMatches = useCallback(async () => {
    setIsError(false)
    setIsLoading(true)
    try {
      const { data } = await matchHttp.getListMatches()
      setMatches(data)
    } catch (error) {
      setIsError(true)
      setError(error)
    }
    setIsLoading(false)
  }, [])

  const saveMatch = useCallback(
    async (match) => {
      setIsError(false)
      setIsLoading(true)
      try {
        const { data } = await matchHttp.saveMatche(match)
        setMatches([...matches, data])
      } catch (error) {
        setIsError(true)
        setError(error)
      }
      setIsLoading(false)
    },
    [matches],
  )

  useEffect(() => {
    getMatches()
  }, [getMatches])

  return (
    <MatchContext.Provider
      value={{
        saveMatch,
        matches,
        isLoading,
        isError,
        error,
      }}
    >
      {children}
    </MatchContext.Provider>
  )
}
