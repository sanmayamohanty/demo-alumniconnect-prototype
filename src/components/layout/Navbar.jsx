import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Menu, X, LogOut, LayoutDashboard, User } from 'lucide-react';
import logoPng from '../../assets/logo.png';
import logoSvg from '../../assets/logo.svg';

export const Navbar = () => {
  const { demoUser, logout, institution } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll to make navbar sticky with glassmorphism styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const getLogo = () => {
    // Both exist, let's prefer the SVG as it's vector
    const logoFile = logoSvg || logoPng;
    if (logoFile) {
      return <img src={logoFile} alt="Alumni Connect" className="h-9 w-auto object-contain" />;
    }
    return (
      <div className="bg-accent text-white font-sora font-extrabold text-sm px-3 py-1.5 rounded-md tracking-wider">
        {institution.shortName}
      </div>
    );
  };

  // Check if current route is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-primary bg-opacity-95 shadow-md py-3 backdrop-blur-md border-b border-white border-opacity-10' 
        : 'bg-primary py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand Name */}
          <Link to="/" className="flex items-center gap-3 group">
            {getLogo()}
            <span className="font-sora font-bold text-white text-base tracking-wide hidden sm:block group-hover:text-accent transition-colors">
              Alumni Connect
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className={`text-xs font-semibold uppercase tracking-wider font-sora transition-colors ${
              isActive('/') ? 'text-accent' : 'text-light text-opacity-80 hover:text-white'
            }`}>
              Home
            </Link>
            <a href="#about" className="text-xs font-semibold uppercase tracking-wider font-sora text-light text-opacity-80 hover:text-white transition-colors">
              About
            </a>
            <a href="#programs" className="text-xs font-semibold uppercase tracking-wider font-sora text-light text-opacity-80 hover:text-white transition-colors">
              Programs
            </a>
            <Link to={demoUser ? "/dashboard/directory" : "/signin"} className="text-xs font-semibold uppercase tracking-wider font-sora text-light text-opacity-80 hover:text-white transition-colors">
              Directory
            </Link>
            <Link to={demoUser ? "/dashboard/give" : "/signin"} className="text-xs font-semibold uppercase tracking-wider font-sora text-light text-opacity-80 hover:text-white transition-colors">
              Give Back
            </Link>
          </div>

          {/* Auth Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {demoUser ? (
              <div className="flex items-center gap-3">
                <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-xs font-semibold bg-accent text-white px-3 py-2 rounded-md hover:bg-opacity-90 active:scale-95 transition-all">
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Dashboard</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold border border-white border-opacity-20 text-white px-3 py-2 rounded-md hover:bg-white hover:bg-opacity-10 active:scale-95 transition-all"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <>
                <Link to="/signin" className="text-xs font-semibold text-white hover:text-accent transition-colors px-3 py-2">
                  Sign In
                </Link>
                <Link to="/signup" className="text-xs font-semibold bg-accent text-white px-4 py-2 rounded-md hover:bg-opacity-90 active:scale-95 transition-all">
                  Create Profile
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-accent p-2 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden bg-primary border-t border-white border-opacity-10 py-4 px-4 space-y-3 absolute w-full left-0 shadow-lg">
          <Link 
            to="/" 
            className="block text-sm font-medium text-white hover:text-accent py-2"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <a 
            href="#about" 
            className="block text-sm font-medium text-white hover:text-accent py-2"
            onClick={() => setIsOpen(false)}
          >
            About
          </a>
          <a 
            href="#programs" 
            className="block text-sm font-medium text-white hover:text-accent py-2"
            onClick={() => setIsOpen(false)}
          >
            Programs
          </a>
          <Link 
            to={demoUser ? "/dashboard/directory" : "/signin"} 
            className="block text-sm font-medium text-white hover:text-accent py-2"
            onClick={() => setIsOpen(false)}
          >
            Directory
          </Link>
          <Link 
            to={demoUser ? "/dashboard/give" : "/signin"} 
            className="block text-sm font-medium text-white hover:text-accent py-2"
            onClick={() => setIsOpen(false)}
          >
            Give Back
          </Link>

          <div className="border-t border-white border-opacity-10 pt-4 mt-2 space-y-2">
            {demoUser ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="w-full flex items-center justify-center gap-2 bg-accent text-white py-2 rounded text-sm font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Go to Dashboard</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 border border-white border-opacity-20 text-white py-2 rounded text-sm font-semibold hover:bg-white hover:bg-opacity-5"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/signin" 
                  className="w-full flex items-center justify-center text-white py-2 rounded text-sm font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
                <Link 
                  to="/signup" 
                  className="w-full flex items-center justify-center bg-accent text-white py-2 rounded text-sm font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  Create Profile
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
