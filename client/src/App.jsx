import React from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/Signup'
import CollectInformation from './components/collectInformation'
import ForgotPassword from './components/forgotPassword'
import CheckYourEmail from './components/checkYourEmail'
import SetNewPassword from './components/setNewPassword'
import PasswordReset from './components/passwordReset'
import Home from './pages/Home'
import SideBar from './components/SideBar'
import NavBar from './components/NavBar'
import GeneratedContent from './pages/GeneratedContent'
import PostReady from './components/PostReady'

const LayoutRoutes = ['/home', '/generatedcontent','/postready']

function AppLayout() {
  const location = useLocation()
  const showLayout = LayoutRoutes.includes(location.pathname.toLowerCase())

  return (
    <div className='flex'>
      {showLayout && <SideBar />}
      <div className='flex-1'>
        {showLayout && <NavBar />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/collectInformation" element={<CollectInformation />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/checkYourEmail" element={<CheckYourEmail />} />
          <Route path="/setNewPassword" element={<SetNewPassword />} />
          <Route path="/passwordReset" element={<PasswordReset />} />
          <Route path="/home" element={<Home />} />
          <Route path="/generatedcontent" element={<GeneratedContent />} />
          <Route path="/postReady" element={<PostReady />} />
        </Routes>
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}

export default App
