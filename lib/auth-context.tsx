"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface DoctorUser {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
  phone: string
  specialization: string
  is_doctor: boolean
  is_active: boolean
  date_joined: string
}

interface AuthContextType {
  user: DoctorUser | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  updateProfile: (data: Partial<DoctorUser>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const mockDoctor: DoctorUser = {
  id: 1,
  username: "dr_arun",
  email: "dr.arun@medcare.com",
  first_name: "Arun",
  last_name: "Mehta",
  phone: "+91 99887 76655",
  specialization: "Pediatric Neurology",
  is_doctor: true,
  is_active: true,
  date_joined: "2024-01-01T10:00:00Z",
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DoctorUser | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const storedAuth = localStorage.getItem("doctor_auth")
    if (storedAuth) {
      const parsed = JSON.parse(storedAuth)
      setUser(parsed)
      setIsAuthenticated(true)
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in production, this would call an API
    if (email && password.length >= 4) {
      const doctorData = { ...mockDoctor, email }
      setUser(doctorData)
      setIsAuthenticated(true)
      localStorage.setItem("doctor_auth", JSON.stringify(doctorData))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("doctor_auth")
  }

  const updateProfile = (data: Partial<DoctorUser>) => {
    if (user) {
      const updated = { ...user, ...data }
      setUser(updated)
      localStorage.setItem("doctor_auth", JSON.stringify(updated))
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
