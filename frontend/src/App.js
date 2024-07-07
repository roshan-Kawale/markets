import React from 'react'
import { BrowserRouter as Router , Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

function App() {
  return (
    <div>
       <Router>
      <Routes>
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/signup" element={<SignUpPage/>} />
      </Routes>
    </Router>
    </div>
  )
}

export default App
