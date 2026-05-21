import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useApp } from './context/AppContext';

// Import Pages
import HomePage from './pages/public/HomePage';
import SignInPage from './pages/public/SignInPage';
import SignUpPage from './pages/public/SignUpPage';
import ForgotPasswordPage from './pages/public/ForgotPasswordPage';

import DashboardHome from './pages/dashboard/DashboardHome';
import MyProfile from './pages/dashboard/MyProfile';
import AlumniDirectory from './pages/dashboard/AlumniDirectory';
import CommunityHub from './pages/dashboard/CommunityHub';
import SupportAlmaMater from './pages/dashboard/SupportAlmaMater';
import Leaderboard from './pages/dashboard/Leaderboard';

import DonationSuccess from './pages/post-payment/DonationSuccess';

import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import CampaignBuilder from './pages/admin/CampaignBuilder';
import CommunityManager from './pages/admin/CommunityManager';
import LeaderboardAdmin from './pages/admin/LeaderboardAdmin';
import ContentManager from './pages/admin/ContentManager';
import Integrations from './pages/admin/Integrations';
import BrandingTheme from './pages/admin/BrandingTheme';

// Import UI Widgets
import PrototypeBadge from './components/ui/PrototypeBadge';
import ScreenNavigator from './components/ui/ScreenNavigator';

// Route animation wrapper
const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
};

// Auth Guard for User/Admin Dashboard
const ProtectedRoute = ({ children }) => {
  const { demoUser } = useApp();
  if (!demoUser) {
    return <Navigate to="/signin" replace />;
  }
  return children;
};

export const App = () => {
  const location = useLocation();

  return (
    <div className="relative min-h-screen">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Public Zones */}
          <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
          <Route path="/signin" element={<PageTransition><SignInPage /></PageTransition>} />
          <Route path="/signup" element={<PageTransition><SignUpPage /></PageTransition>} />
          <Route path="/forgot-password" element={<PageTransition><ForgotPasswordPage /></PageTransition>} />

          {/* User Dashboard Zones */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <PageTransition><DashboardHome /></PageTransition>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/profile" element={
            <ProtectedRoute>
              <PageTransition><MyProfile /></PageTransition>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/directory" element={
            <ProtectedRoute>
              <PageTransition><AlumniDirectory /></PageTransition>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/community" element={
            <ProtectedRoute>
              <PageTransition><CommunityHub /></PageTransition>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/give" element={
            <ProtectedRoute>
              <PageTransition><SupportAlmaMater /></PageTransition>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/leaderboard" element={
            <ProtectedRoute>
              <PageTransition><Leaderboard /></PageTransition>
            </ProtectedRoute>
          } />

          {/* Post Payment Zone */}
          <Route path="/donation-success" element={
            <ProtectedRoute>
              <PageTransition><DonationSuccess /></PageTransition>
            </ProtectedRoute>
          } />

          {/* Admin Panel Zones */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <PageTransition><AdminDashboard /></PageTransition>
            </ProtectedRoute>
          } />
          <Route path="/admin/users" element={
            <ProtectedRoute>
              <PageTransition><UserManagement /></PageTransition>
            </ProtectedRoute>
          } />
          <Route path="/admin/campaigns" element={
            <ProtectedRoute>
              <PageTransition><CampaignBuilder /></PageTransition>
            </ProtectedRoute>
          } />
          <Route path="/admin/community" element={
            <ProtectedRoute>
              <PageTransition><CommunityManager /></PageTransition>
            </ProtectedRoute>
          } />
          <Route path="/admin/leaderboard" element={
            <ProtectedRoute>
              <PageTransition><LeaderboardAdmin /></PageTransition>
            </ProtectedRoute>
          } />
          <Route path="/admin/content" element={
            <ProtectedRoute>
              <PageTransition><ContentManager /></PageTransition>
            </ProtectedRoute>
          } />
          <Route path="/admin/integrations" element={
            <ProtectedRoute>
              <PageTransition><Integrations /></PageTransition>
            </ProtectedRoute>
          } />
          <Route path="/admin/branding" element={
            <ProtectedRoute>
              <PageTransition><BrandingTheme /></PageTransition>
            </ProtectedRoute>
          } />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>

      {/* Global Presentation Widgets */}
      <ScreenNavigator />
      <PrototypeBadge />
    </div>
  );
};

export default App;
