import { createContext, useState } from 'react'
import usersHttp from '../http/usersHttp'

export const UserContext = createContext()
export default function UserProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState(null)
  const [userCurrent, setUser] = useState(null)

  const signup = async (values) => {
    setIsError(false)
    setIsLoading(true)
    try {
      await usersHttp.registerPlayer(values)
    } catch (error) {
      setIsError(true)
      setError(error)
    }
    setIsLoading(false)
  }

  const signupOrganizer = async (values) => {
    setIsError(false)
    setIsLoading(true)
    try {
      await usersHttp.registerOrganizer(values)
    } catch (error) {
      setIsError(true)
      setError(error)
    }
    setIsLoading(false)
  }

  const getUserInfo = async (uid) => {
    setIsError(false)
    setIsLoading(true)
    try {
      const result = await usersHttp.getUserById()
      setUser(result.data.data)
    } catch (error) {
      setIsError(true)
      setError(error)
    }
    setIsLoading(false)
  }

  const updateUser = async (uid, values) => {
    setIsError(false)
    setIsLoading(true)
    try {
      await usersHttp.updateUser(uid, values)
    } catch (error) {
      setIsError(true)
      setError(error)
    }
    setIsLoading(false)
  }

  return (
    <UserContext.Provider
      value={{
        isLoading,
        isError,
        error,
        userCurrent,
        signup,
        signupOrganizer,
        updateUser,
        getUserInfo,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
