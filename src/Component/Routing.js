import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Admin from './AdminScreens/Admin'
import Login from './Login'
import Users from './UsersScreens/Users'
import Signup from './Signup'

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='signup' element={<Signup/>}/>
        <Route path='users/*' element={<Users/>}/>
        <Route path='admin/*' element={<Admin/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Routing
