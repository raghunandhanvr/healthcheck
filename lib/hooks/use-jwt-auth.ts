"use client"

import { useState, useEffect, useCallback } from "react"
import { jwtHelpers, useSession } from "@/lib/auth/auth-client"
import { jwtApiClient } from "@/lib/api/client"

interface JWTAuthState {
  token: string | null
  isValid: boolean
  isLoading: boolean
  error: string | null
}

export function useJWTAuth() {
  const { data: session } = useSession()
  const [jwtState, setJWTState] = useState<JWTAuthState>({
    token: null,
    isValid: false,
    isLoading: true,
    error: null,
  })

  const getToken = useCallback(async () => {
    setJWTState(prev => ({ ...prev, isLoading: true, error: null }))
    
    try {
      let token = await jwtHelpers.getJWTToken()
      
      if (!token) {
        token = await jwtHelpers.getJWTFromSession()
      }
      
      if (token) {
        const isValid = await jwtHelpers.validateJWTToken(token)
        jwtApiClient.setJWTToken(token)
        
        setJWTState({
          token,
          isValid,
          isLoading: false,
          error: null,
        })
        
        return token
      } else {
        setJWTState({
          token: null,
          isValid: false,
          isLoading: false,
          error: "No JWT token available",
        })
        
        return null
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to get JWT token"
      setJWTState({
        token: null,
        isValid: false,
        isLoading: false,
        error: errorMessage,
      })
      
      return null
    }
  }, [])

  const refreshToken = useCallback(async () => {
    setJWTState(prev => ({ ...prev, isLoading: true, error: null }))
    
    try {
      if (jwtState.token && !jwtHelpers.isTokenExpired(jwtState.token)) {
        return jwtState.token
      }
      
      const newToken = await jwtHelpers.refreshJWTToken()
      
      if (newToken) {
        const isValid = await jwtHelpers.validateJWTToken(newToken)
        jwtApiClient.setJWTToken(newToken)
        
        setJWTState({
          token: newToken,
          isValid,
          isLoading: false,
          error: null,
        })
        
        return newToken
      } else {
        setJWTState({
          token: null,
          isValid: false,
          isLoading: false,
          error: "Failed to refresh JWT token",
        })
        
        return null
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to refresh JWT token"
      setJWTState({
        token: null,
        isValid: false,
        isLoading: false,
        error: errorMessage,
      })
      
      return null
    }
  }, [jwtState.token])

  const clearToken = useCallback(() => {
    jwtApiClient.setJWTToken(null)
    setJWTState({
      token: null,
      isValid: false,
      isLoading: false,
      error: null,
    })
  }, [])

  useEffect(() => {
    if (session?.user) {
      getToken()
    } else {
      clearToken()
    }
  }, [session?.user, getToken, clearToken])

  return {
    ...jwtState,
    getToken,
    refreshToken,
    clearToken,
    apiClient: jwtApiClient,
  }
}