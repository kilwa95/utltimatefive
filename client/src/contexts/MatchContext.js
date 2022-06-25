import { createContext, useState, useEffect } from 'react'

import matchHttp from '../http/matchHttp'
export const MatchContext = createContext()

export default function MatchProvider({ children }) {
  const [matches, setMatches] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState(null)

  const getMatches = async () => {
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
  }

  useEffect(() => {
    getMatches()
  }, [])

  return (
    <MatchContext.Provider
      value={{
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
