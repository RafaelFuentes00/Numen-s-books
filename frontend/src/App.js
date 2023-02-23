import './App.css';
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage';
import UserState from './context/user/UserState';
import NoPage from './pages/NoPage';
import BooksPage from './pages/BooksPage';
import BookDetailsPage from './pages/BookDetailsPage';
import LastPublishedPage from './pages/LastPublishedPage';
import ProfilePage from './pages/ProfilePage';
import UserBooksPage from './pages/UserBooksPage';
import AddBookPage from './pages/AddBookPage';

function App() {
  return (
    <>
    <UserState>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/last_published' element={<LastPublishedPage/>}/>
        <Route path='/books' element={<BooksPage/>}/>
        <Route path='/books/:idBook' element={<BookDetailsPage/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
        <Route path='/:username/books' element={<UserBooksPage/>}/>
        <Route path='/:username/books/add' element={<AddBookPage/>}/>
      </Routes>
    </BrowserRouter>
    </UserState>
    </>
  );
}

export default App;
