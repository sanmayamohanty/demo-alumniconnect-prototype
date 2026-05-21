import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  Home, 
  Users, 
  UsersRound, 
  Heart, 
  Trophy, 
  User, 
  LogOut, 
  Building
} from 'lucide-react';
import logoPng from '../../assets/logo.png';
import logoSvg from '../../assets/logo.svg';

export const Sidebar = () => {
  const { demoUser, logout, institution } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Home', path: '/dashboard', icon: Home },
    { name: 'Directory', path: '/dashboard/directory', icon: Users },
    { name: 'Community', path: '/dashboard/community', icon: UsersRound },
    { name: 'Give Back', path: '/dashboard/give', icon: Heart },
    { name: 'Leaderboard', path: '/dashboard/leaderboard', icon: Trophy },
    { name: 'My Profile', path: '/dashboard/profile', icon: User },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getLogo = () => {
    const logoFile = logoSvg || logoPng;
    if (logoFile) {
      return <img src={logoFile} alt="Logo" className="h-7 w-auto object-contain md:mx-auto lg:mx-0" />;
    }
    return (
      <div className="bg-accent text-white font-sora font-extrabold text-xs px-2 py-1 rounded md:mx-auto lg:mx-0">
        {institution.shortName}
      </div>
    );
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Sidebar for Desktop / Tablet */}
      <aside className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 z-40 bg-primary text-white border-r border-white border-opacity-5 transition-all duration-300 md:w-20 lg:w-56">
        {/* Brand/Institution Section */}
        <div className="p-4 border-b border-white border-opacity-10 flex items-center justify-between gap-3 h-16">
          <Link to="/" className="flex items-center gap-2.5 overflow-hidden w-full">
            {getLogo()}
            <span className="font-sora font-extrabold text-xs tracking-wider hidden lg:block uppercase truncate">
              {institution.shortName}
            </span>
          </Link>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold font-sora transition-all group ${
                  active 
                    ? 'bg-accent text-white shadow-md' 
                    : 'text-light text-opacity-70 hover:text-white hover:bg-white hover:bg-opacity-5'
                } justify-center lg:justify-start`}
                title={item.name}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 ${active ? 'text-white' : 'text-light text-opacity-65 group-hover:text-white'}`} />
                <span className="hidden lg:block truncate">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Account / Footer */}
        <div className="p-3 border-t border-white border-opacity-10 bg-primary-dark">
          {demoUser && (
            <div className="flex items-center gap-3 p-1 rounded-lg overflow-hidden justify-center lg:justify-start">
              <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold font-sora text-xs flex-shrink-0 shadow-sm border border-white border-opacity-10">
                {demoUser.initials}
              </div>
              <div className="hidden lg:block min-w-0 flex-1">
                <p className="text-[11px] font-bold font-sora truncate leading-tight text-white">{demoUser.name}</p>
                <p className="text-[9px] text-light text-opacity-50 font-sans mt-0.5 truncate">Batch of {demoUser.batch}</p>
              </div>
            </div>
          )}
          
          <button
            onClick={handleLogout}
            className="w-full mt-3 flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold font-sora text-light text-opacity-70 hover:text-white hover:bg-red-950 hover:bg-opacity-35 hover:text-red-300 transition-all justify-center lg:justify-start group"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4 text-light text-opacity-65 group-hover:text-white" />
            <span className="hidden lg:block">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Bottom Nav Bar for Mobile devices (screen width < 768px) */}
      <nav className="flex md:hidden fixed bottom-0 left-0 right-0 z-50 bg-primary border-t border-white border-opacity-10 h-16 shadow-lg items-center justify-around px-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={index}
              to={item.path}
              className={`flex flex-col items-center justify-center flex-1 h-full py-1 text-[10px] font-sora font-semibold transition-all ${
                active ? 'text-accent' : 'text-light text-opacity-60'
              }`}
            >
              <Icon className="w-4 h-4 mb-1" />
              <span className="scale-90 font-medium tracking-tight truncate max-w-[60px]">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
};

export default Sidebar;
