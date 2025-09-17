import React, { Profiler } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import UserRegister from '../pages/UserRegister'
import UserLogin from '../pages/UserLogin'
import FoodPartnerRegister from '../pages/FoodPartnerRegister'
import FoodPartnerLogin from '../pages/FoodPartnerLogin'
import Home from '../pages/general/Home'
import CreateFoodPartner from '../pages/food-partner/CreateFoodPartner'
import Profile from '../pages/food-partner/Profile'

const AppRoutes = () => {
  return (
    <Router>
    <Routes>
      <Route path='/user/register' element={<UserRegister />} />
      <Route path='/user/login' element={<UserLogin />} />
      <Route path='/food-partner/register' element={<FoodPartnerRegister />} />
      <Route path='/food-partner/login' element={<FoodPartnerLogin />} />
      {/* Default entry goes to login */}
      <Route path='/' element={<Navigate to="/user/login" replace />} />
      {/* Explicit home route */}
      <Route path='/home' element={<Home />} />
      <Route path='/create-food' element={<CreateFoodPartner />} />
      <Route path='/food-partner/:id' element={<Profile />} />
    </Routes>
    </Router>
  )
}

export default AppRoutes
