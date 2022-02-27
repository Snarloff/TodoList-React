import { Route, Routes, BrowserRouter } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import {PrivateRoute} from './services/private'

const Router = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home/>} path="/" />
        <Route element={<Login/>} path="/login" />
        <Route element={<Register/>} path="/register" />
        <Route element={<PrivateRoute/>} path="/dashboard" />
      </Routes>
    </BrowserRouter>
  )
}

export default Router