import SignUp from './pages/Sign-up';
import SignIn from './pages/Sign-in';
import Home from './pages/Home';

import { getItem } from './utils/storage';

import { Routes, Route, Outlet, Navigate } from 'react-router-dom';

function ProtectedRoutes({ redirectTo }) {
  const isAuthenticated = getItem('token'); //se não encontrar, retora null

  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
}

function MainRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedRoutes redirectTo="/" />}>
        <Route path="/home" element={<Home />} />
      </Route>

      <Route path="/" element={<SignIn />} />

      <Route path="/sign-up" element={<SignUp />} />
    </Routes>
  );
}

export default MainRoutes;
