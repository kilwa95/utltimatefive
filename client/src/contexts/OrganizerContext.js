import { createContext, useState, useEffect } from 'react'

import levelHttp from '../http/levelHttp'
import matchHttp from '../http/matchHttp'
export const OrganizerContext = createContext()

export default function OrganizerProvider({ children }) {
  const [levels, setLevels] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getLevels = async () => {
    setLoading(true)
    try {
      const levels = await levelHttp.getListLevels()
      setLevels(levels)
    } catch (error) {
      setError(error)
      setLoading(false)
    }
  }

  const saveMatch = async (data) => {
    setLoading(true)
    try {
      const match = await matchHttp.saveMatche(data)
      setLoading(false)
      return match
    } catch (error) {
      setError(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getLevels()
  }, [])

  return (
    <OrganizerContext.Provider value={{ levels, saveMatch }}>
      {children}
    </OrganizerContext.Provider>
  )
}
