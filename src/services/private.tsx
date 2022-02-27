import React from 'react'
import Dashboard from '../pages/Dashboard'
import { Navigate } from 'react-router-dom'
import { isLogged } from './auth'

export const PrivateRoute: React.FC = ({ component, ...rest }: any) => {
  let isAuthenticated = isLogged()
  return isAuthenticated ? <Dashboard/> : <Navigate to="/login" />
}
