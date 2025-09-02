import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SingupPage from './pages/SingupPage';
import BookmarkPage from './pages/BookmarkPage';
import Layout from './component/Layout';


// src/App.js
function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SingupPage />} />
        <Route path='/bookmark' element={<BookmarkPage />} />
      </Routes>
    </Layout>

  );
}

export default App;
