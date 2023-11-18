import './App.css'
import Home from './views/Home/Home'
import { Route, Routes } from 'react-router-dom';
import Login from './views/Login/Login';
import RequireAuth from './compoents/RequiredAuth';

function App() {

  return (
    <Routes>

      {/* home page */}
      <Route path="/" element={<RequireAuth>
        <Home />
      </RequireAuth>} />

      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App
