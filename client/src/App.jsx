import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/Signup'
import CollectInformation from './components/collectInformation'
import ForgotPassword from './components/forgotPassword'
import CheckYourEmail from './components/checkYourEmail'
import SetNewPassword from './components/setNewPassword'
import PasswordReset from './components/passwordReset'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={< Login/>} />
        <Route path="/signup" element={< SignUp/>} />
        <Route path="/collectInformation" element={< CollectInformation/>} />
        <Route path="/forgotpassword" element={< ForgotPassword/>} />
        <Route path="/checkYourEmail" element={< CheckYourEmail/>} />
        <Route path="/setNewPassword" element={< SetNewPassword/>} />
        <Route path="/passwordReset" element={< PasswordReset/>} />
      </Routes>
    </Router>
  )
}

export default App
