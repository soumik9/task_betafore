/* eslint-disable no-unused-vars */
import './App.css'
import Home from './views/Home/Home'
import { Route, Routes } from 'react-router-dom';
import Login from './views/Login/Login';
import RequireAuth from './compoents/RequiredAuth';
import Checkout from './views/Checkout/Checkout';
import CheckoutSuccess from './views/CheckoutResult/CheckoutSuccess';
import CheckoutCancel from './views/CheckoutResult/CheckoutCancel';
import Layoout from './compoents/Layoout';
import useAuthCheck from './hooks/useAuthCheck';
import { useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import { useAtom } from 'jotai';
import { atomIsAuthenticate, atomToken, atomUser } from './hooks/atomState';
import { removeFromLocalStorage } from './hooks/helpers';
import toast from 'react-hot-toast';
import Signup from './views/Signup/Signup';
import MyOrders from './views/MyOrders/MyOrders';

function App() {

  // authentication checking
  const authChecked = useAuthCheck();

  // states
  const [token, setToken] = useAtom(atomToken);
  const [isAuthenticate, setIsAuthenticate] = useAtom(atomIsAuthenticate);
  const [user, setUser] = useAtom(atomUser);

  // logout function
  const logout = () => {
    // atom sates
    setToken('');
    setIsAuthenticate(false);
    setUser(null);

    // remove from storage
    removeFromLocalStorage('token');
  }

  const checkTokenValidity = () => {
    try {
      const decodedToken = jwtDecode(token);

      // Check token expiration
      if (decodedToken.exp * 1000 < Date.now()) {
        logout()
      }
    } catch (error) {
      logout();
      toast.error('Invalid token!');
    }
  };

  useEffect(() => {
    // Check token validity every two minutes
    const intervalId = setInterval(() => {
      checkTokenValidity();
    }, 2 * 60 * 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // checking authentication
  if (!authChecked) return <div className='text-center'>Checking authentication....</div>

  return (
    <Routes>

      {/* home page */}
      <Route path="/" element={<RequireAuth>
        <Layoout> <Home /> </Layoout>
      </RequireAuth>} />

      {/* my orders page */}
      <Route path="/my-orders" element={<RequireAuth>
        <Layoout> <MyOrders /> </Layoout>
      </RequireAuth>} />

      {/* checkout page */}
      <Route path="/checkout" element={<RequireAuth>
        <Checkout />
      </RequireAuth>} />

      <Route path="/checkout/success" element={<RequireAuth>
        <CheckoutSuccess />
      </RequireAuth>} />

      <Route path="/checkout/cancel" element={<RequireAuth>
        <CheckoutCancel />
      </RequireAuth>} />

      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App
