import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dasboard';
import Products from './pages/Products';
import Settings from './pages/Settings';

function App() {
  return (
    < >
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/product' element={<Products />}></Route>
        <Route path='/settings' element={<Settings />}></Route>




      </Routes>
    </>
  );
}

export default App;
