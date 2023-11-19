import './App.css'
import Home from './views/Home/Home'
import { Route, Routes } from 'react-router-dom';
import Login from './views/Login/Login';
import RequireAuth from './compoents/RequiredAuth';
import Checkout from './views/Checkout/Checkout';
import CheckoutSuccess from './views/CheckoutResult/CheckoutSuccess';
import CheckoutCancel from './views/CheckoutResult/CheckoutCancel';

function App() {

  return (
    <Routes>

      {/* home page */}
      <Route path="/" element={<RequireAuth>
        <Home />
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
