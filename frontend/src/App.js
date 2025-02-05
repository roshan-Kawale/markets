import React from 'react'
import { BrowserRouter as Router , Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import Protected from './auth/protected';
import ProductCreatePage from './pages/ProductCreatePage';
import ProductDetailPage from './pages/ProductDetailPage';
import ShopkeeperProfileEdit from './components/ShopkeeperProfileEdit';
import ProductEditPage from './pages/ProductEditPage';
import EmailVerify from './components/EmailVerify';
import NotificationFeed from './components/NotificationFeed';
import GoogleMap from './components/GoogleMap';
import CustomerProfile from './components/CustomerProfile';
import ShopkeeperProfilePage from './pages/ShopkeeperProfilePage';
import AdminPage from './pages/AdminPage';
import NewProductCardPage from './pages/NewProductCardPage';
import SavedPage from './pages/SavedPage';

function App() {
  return (
    <div>
       <Router>
      <Routes>
      {/* <Route path="/" element={<Protected><HomePage></HomePage></Protected>} /> */}
      <Route path="/" element={<HomePage></HomePage>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/signup" element={<SignUpPage/>} />
      <Route path="/profile/:userId" element={<ShopkeeperProfilePage/>} />
      <Route path="/customer/:userId" element={<CustomerProfile/>} />
      <Route path="/admin/:userId" element={<AdminPage/>} />
      <Route path="/detail" element={<DetailPage/>} />
      <Route path="/productcreate" element={<ProductCreatePage/>} />
      <Route path="/productdetail/:productId" element={<ProductDetailPage/>} />
      <Route path="/profileEdit" element={<ShopkeeperProfileEdit/>} />
      <Route path="/productEdit/:productId" element={<ProductEditPage/>} />
      <Route path="/api/auth/:id/verify/:token" element={<EmailVerify/>} />
      <Route path="/notifications" element={<NotificationFeed/>} />
      <Route path="/map" element={<GoogleMap/>} />
      <Route path="/new" element={<NewProductCardPage />} />
      <Route path="/saved" element={<SavedPage />} />
      </Routes>
    </Router>
    </div>
  )
}

export default App
