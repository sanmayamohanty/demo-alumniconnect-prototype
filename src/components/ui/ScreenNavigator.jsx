import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Menu, X, Monitor, UserCheck, CreditCard, ShieldAlert } from 'lucide-react';

export const ScreenNavigator = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { loginAsDemo, demoUser } = useApp();

  const zones = [
    {
      title: 'Zone 1 — Public Portal',
      icon: <Monitor className="w-4 h-4 text-blue-500" />,
      screens: [
        { name: 'Landing Homepage', path: '/' },
        { name: 'Sign In Page', path: '/signin' },
        { name: 'Sign Up (Multi-Step)', path: '/signup' },
        { name: 'Forgot Password / OTP', path: '/forgot-password' },
      ]
    },
    {
      title: 'Zone 2 — Alumni Dashboard',
      icon: <UserCheck className="w-4 h-4 text-emerald-500" />,
      requiresAuth: true,
      screens: [
        { name: 'Dashboard Home', path: '/dashboard' },
        { name: 'My Profile Settings', path: '/dashboard/profile' },
        { name: 'Alumni Directory', path: '/dashboard/directory' },
        { name: 'Community Whatsapp/FB Hub', path: '/dashboard/community' },
        { name: 'Support Alma Mater (GuruDakshina)', path: '/dashboard/give' },
        { name: 'Impact Leaderboard', path: '/dashboard/leaderboard' },
      ]
    },
    {
      title: 'Zone 3 — Post-Payment',
      icon: <CreditCard className="w-4 h-4 text-amber-500" />,
      requiresAuth: true,
      screens: [
        { name: 'Donation Success & Cards', path: '/donation-success' },
      ]
    },
    {
      title: 'Zone 4 — Admin Panel',
      icon: <ShieldAlert className="w-4 h-4 text-red-500" />,
      requiresAuth: true,
      screens: [
        { name: 'Admin Stats Dashboard', path: '/admin' },
        { name: 'User Directory Management', path: '/admin/users' },
        { name: 'Campaign WATI WhatsApp Builder', path: '/admin/campaigns' },
        { name: 'Community WhatsApp Manager', path: '/admin/community' },
        { name: 'Leaderboard & Analytics Admin', path: '/admin/leaderboard' },
        { name: 'Landing Content Manager', path: '/admin/content' },
        { name: 'Integrations & API Keys', path: '/admin/integrations' },
        { name: 'Theme & Dynamic Live Preview', path: '/admin/branding' },
      ]
    }
  ];

  const handleNavigate = (screen, zone) => {
    if (zone.requiresAuth && !demoUser) {
      // Auto login so that they don't get redirected
      loginAsDemo();
    }
    navigate(screen.path);
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 z-[9999] bg-primary text-white p-3 rounded-full shadow-lg border border-white border-opacity-10 hover:bg-accent hover:scale-105 active:scale-95 transition-all duration-200"
        title="Prototype Screen Navigator"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Drawer Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-[99999] flex justify-start backdrop-blur-xs transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        >
          {/* Drawer Content */}
          <div 
            className="w-full max-w-sm bg-white h-full shadow-2xl flex flex-col animate-slide-in relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-primary text-white">
              <div>
                <h3 className="font-sora font-semibold text-sm">Screen Navigator</h3>
                <p className="text-xs text-light text-opacity-70 mt-0.5">Jump directly to any of the 19 screens</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-accent p-1.5 rounded-full hover:bg-primary-dark transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Screen List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {zones.map((zone, zIdx) => (
                <div key={zIdx} className="space-y-2">
                  <div className="flex items-center gap-2 pb-1 border-b border-gray-100">
                    {zone.icon}
                    <h4 className="font-sora font-semibold text-xs text-gray-400 uppercase tracking-wider">
                      {zone.title}
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 gap-1">
                    {zone.screens.map((screen, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => handleNavigate(screen, zone)}
                        className="text-left w-full px-3 py-2 rounded-md text-xs font-medium text-gray-700 hover:bg-light hover:text-primary transition-all duration-150 flex items-center justify-between group border border-transparent hover:border-gray-200"
                      >
                        <span>{screen.name}</span>
                        <span className="text-[10px] text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100 group-hover:bg-accent group-hover:text-white group-hover:border-transparent transition-colors">
                          {screen.path}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Drawer Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 text-center text-[10px] text-gray-500 font-sans">
              Currently testing: <span className="font-semibold text-primary">{demoUser ? 'Arjun Kumar (Demo Active)' : 'Guest Session'}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ScreenNavigator;
