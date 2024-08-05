import React from 'react'
import { BrowserRouter as Router , Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import DetailPage from './pages/DetailPage';
import Protected from './auth/protected';
import ProductCreatePage from './pages/ProductCreatePage';
import ProductDetailPage from './pages/ProductDetailPage';

function App() {
  return (
    <div>
       <Router>
      <Routes>
      <Route path="/" element={<Protected><HomePage></HomePage></Protected>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/signup" element={<SignUpPage/>} />
      <Route path="/profile/:userId" element={<ProfilePage/>} />
      <Route path="/detail" element={<DetailPage/>} />
      <Route path="/productcreate" element={<ProductCreatePage/>} />
      <Route path="/productdetail" element={<ProductDetailPage/>} />
      </Routes>
    </Router>
    </div>
  )
}

export default App
