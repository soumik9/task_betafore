import './App.css'
import Home from './views/Home/Home'
import { Route, Routes } from 'react-router-dom';
import Login from './views/Login/Login';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App
