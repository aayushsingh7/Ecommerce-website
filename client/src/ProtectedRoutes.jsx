import React, { useContext, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Login from './pages/Login'
import { AppContext } from './context/Context'


const ProtectedRoutes = () => {
  const {user} = useContext(AppContext)

     return user._id ? <Outlet/> : <Login/>
}

export default ProtectedRoutes