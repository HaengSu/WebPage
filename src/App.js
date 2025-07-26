import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SingupPage from './pages/SingupPage';
import BookmarkPage from './pages/BookmarkPage';


// src/App.js
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/signup' element={<SingupPage/>}/>
        <Route path='/main' element={<MainPage/>}/>
        <Route path='/bookmark' element={<BookmarkPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
