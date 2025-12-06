"use client";

import { createContext, useContext, useState } from "react"

type AuthContextType = {
  organizationId: string;
  userRole: 'admin' | 'member' | string
}

const AuthContext = createContext<AuthContextType>({
  organizationId: '92e450cb-2764-450e-9f8e-d2473a4ce204',
  userRole: 'member' 
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [organizationId] = useState("92e450cb-2764-450e-9f8e-d2473a4ce204")
  const [userRole] = useState("admin")

  return (
    <AuthContext.Provider value={{ organizationId, userRole }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
