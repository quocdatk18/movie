import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import AdminAddChapterPage from './pages/AdminAddChapterPage';
import AdminCreatePage from './pages/AdminCreatePage';
import AdminHomePage from './pages/AdminHomePage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminUpdateChapterPage from './pages/AdminUpdateChapterPage';
import AdminUpdatePage from './pages/AdminUpdatePage';
import AdminUserPage from './pages/AdminUserPage';
import AdminvideoChapterPage from './pages/AdminVideoChapterPage';
import AdminVideoPage from './pages/AdminVideoPage';
import { loadUser } from './store/reducers/users/UserSlice';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    (async () => {
      await dispatch(loadUser())

    })()
  }, [dispatch])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<AdminLoginPage />} />
          <Route path='/' element={<AdminHomePage />} />

          <Route path='/customer' element={<AdminUserPage />} />
          <Route path='/videos' element={<AdminVideoPage
          />} />
          <Route path='/videos/:id' element={<AdminvideoChapterPage
          />} />

          <Route path='/create' element={<AdminCreatePage />} />
          <Route path='/update/:id' element={<AdminUpdatePage />} />
          <Route path='/addchapter/:id' element={<AdminAddChapterPage />} />
          <Route path='/updatechapter/:id' element={<AdminUpdateChapterPage />} />







        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
