import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { SavedPropertiesProvider } from './context/SavedPropertiesContext';
import { ProtectedRoute } from './components/common/ProtectedRoute';

// Pages
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { SavedPropertiesPage } from './pages/SavedPropertiesPage';
import { AboutPage } from './pages/AboutPage';
import { PropertyDashboardPage } from './pages/PropertyDashboardPage';

export function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <SavedPropertiesProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Auth Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />

              {/* Protected Routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Navigate to="/home" replace />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/search"
                element={
                  <ProtectedRoute>
                    <SearchPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/saved"
                element={
                  <ProtectedRoute>
                    <SavedPropertiesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/about"
                element={
                  <ProtectedRoute>
                    <AboutPage />
                  </ProtectedRoute>
                }
              />

              {/* Property Dashboard Routes with 9 Tab parameters */}
              <Route
                path="/property/:bbl"
                element={
                  <ProtectedRoute>
                    <PropertyDashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/property/:bbl/:tab"
                element={
                  <ProtectedRoute>
                    <PropertyDashboardPage />
                  </ProtectedRoute>
                }
              />

              {/* Fallback wildcard */}
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
          </BrowserRouter>
        </SavedPropertiesProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
