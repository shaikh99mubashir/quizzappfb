import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Admin from './AdminScreens/Admin'
import Login from './Login'
import Users from './UsersScreens/Users'
import Regisration from './Regisration'
import ResultScreen from './ResultScreen'
import TrainerRegistration from './TrainerRegistration'
import StudentProfile from './StudentProfile'

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='registration' element={<Regisration/>}/>
        {/* <Route path='signup' element={<Signup/>}/> */}
        <Route path='users/*' element={<Users/>}/>
        <Route path='admin/*' element={<Admin/>}/>
        <Route path='result' element={<ResultScreen/>}/>
        <Route path='trainerregistration' element={<TrainerRegistration/>}/>
        <Route path='studentprofile' element={<StudentProfile/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Routing
