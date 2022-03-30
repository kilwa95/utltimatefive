import { createContext, useState, useCallback } from 'react'
import usersHttp from '../http/usersHttp'
export const UserContext = createContext()

export default function UserProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState(null)

  const signup = useCallback(async (values) => {
    setIsError(false)
    setIsLoading(true)
    try {
      await usersHttp.registerUser(values)
    } catch (error) {
      setIsError(true)
      setError(error)
    }
    setIsLoading(false)
  })
  return (
    <UserContext.Provider value={{ isLoading, isError, error, signup }}>
      {children}
    </UserContext.Provider>
  )
}
