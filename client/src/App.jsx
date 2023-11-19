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

function App() {

  // authentication checking
  const authChecked = useAuthCheck();
  if (!authChecked) return <div className='text-center'>Checking authentication....</div>

  return (
    <Routes>

      {/* home page */}
      <Route path="/" element={<RequireAuth>
        <Layoout> <Home /> </Layoout>
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

      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App
