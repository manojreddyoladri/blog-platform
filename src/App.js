import React, {useContext} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminArticlesPage from './components/Admin/AdminArticlesPage'; 
import ArticleDetail from './components/Admin/ArticleDetail'; 
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import './styles/styles.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <MainRoutes />
      </Router>
    </AuthProvider>
  );
};

const MainRoutes = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {!user ? (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      ) : (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<ProtectedRoute element={<AdminDashboard />} />} />
            <Route path="/admin/articles" element={<ProtectedRoute element={<AdminArticlesPage />} />} />
            <Route path="/articles/:id" element={<ProtectedRoute element={<ArticleDetail />} />} />
          </Routes>
          <Footer />
        </>
      )}
    </>
  );
};

export default App;
