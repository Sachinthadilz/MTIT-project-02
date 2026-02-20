import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context
import { AuthProvider } from './context/AuthContext';

// Components
import Header from './components/layout/Header';
import ProtectedRoute from './utils/ProtectedRoute';

// Pages
import Landing from './pages/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen font-sans bg-gray-50 text-gray-900">
          <Header />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Home />} />
                {/* Add future protected routes like /notes here */}
              </Route>

              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      </Router>
    </AuthProvider>
  );
}

export default App;
