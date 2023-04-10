import React, { useContext, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Fevorates from './pages/Fevorates'
import Login from './pages/Login'
import Register from './pages/Register'
import SearchResults from './pages/SearchResults'
import Product from './pages/Product'
import Navbar from './components/Navbar'
import BottomNavbar from './components/BottomNavbar'
import Verifying from './pages/Verifying'
import { AppContext } from './context/Context'
import Account from './pages/Account'
import Order from './pages/Order'
import ResetPassword from './pages/ResetPassword'
import Logout from './pages/Logout'
import Notification from './components/Notification'
import ProtectedRoutes from './ProtectedRoutes'

const App = () => {
  const navigate = useNavigate()
  const { windowWidth, setWindowWidth } = useContext(AppContext)

  useEffect(() => {
    navigate('/verify')
  }, [])



  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [window.innerWidth]);


  return (
    <div className="App">
      <Notification />
      <div className="App-contents">
        <Navbar />
        <Routes>
          <Route path='/login' element={<Login />} exact />
          <Route path='/register' element={<Register />} exact />
          <Route path='/' element={<Home />} exact />
          <Route path='/search' element={<SearchResults />} exact />
          <Route path='/verify' element={<Verifying />} exact />
          <Route path='/reset-password' element={<ResetPassword />} exact />
          <Route path='/product/:id' element={<Product />} exact />

          <Route element={<ProtectedRoutes />}>
            <Route path='/cart' element={<Cart />} exact />
            <Route path='/wishlist' element={<Fevorates />} exact />
            <Route path='/account' element={<Account />} exact />
            <Route path="/order" element={<Order />} exact />
            <Route path='/logout' element={<Logout />} exact />
          </Route>

        </Routes>
        <BottomNavbar />
      </div>
    </div>
  )
}

export default App