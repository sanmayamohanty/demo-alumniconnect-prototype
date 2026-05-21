import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  Users, 
  Send, 
  Share2, 
  TrendingUp, 
  FileText, 
  Key, 
  Palette,
  LogOut,
  ShieldCheck
} from 'lucide-react';
import logoPng from '../../assets/logo.png';
import logoSvg from '../../assets/logo.svg';

export const AdminSidebar = () => {
  const { logout, institution } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'Campaigns', path: '/admin/campaigns', icon: Send },
    { name: 'Community', path: '/admin/community', icon: Share2 },
    { name: 'Leaderboard', path: '/admin/leaderboard', icon: TrendingUp },
    { name: 'Content', path: '/admin/content', icon: FileText },
    { name: 'Integrations', path: '/admin/integrations', icon: Key },
    { name: 'Branding', path: '/admin/branding', icon: Palette },
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
      <div className="bg-accent text-white font-sora font-extrabold text-[10px] px-2 py-0.5 rounded md:mx-auto lg:mx-0">
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
      <aside className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 z-40 bg-admin text-white border-r border-white border-opacity-5 transition-all duration-300 md:w-20 lg:w-56 font-sans">
        {/* Brand / Admin Section */}
        <div className="p-4 border-b border-white border-opacity-15 flex items-center gap-2.5 h-16 bg-admin bg-opacity-70">
          <Link to="/" className="flex items-center gap-2.5 overflow-hidden w-full">
            {getLogo()}
            <div className="hidden lg:flex flex-col min-w-0">
              <span className="font-sora font-extrabold text-[11px] tracking-wider uppercase truncate leading-none text-accent">
                {institution.shortName} Admin
              </span>
              <span className="text-[8px] text-gray-400 mt-1 font-semibold flex items-center gap-0.5 font-sans">
                <ShieldCheck className="w-2.5 h-2.5 text-accent" /> Control Center
              </span>
            </div>
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
                    : 'text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-5'
                } justify-center lg:justify-start`}
                title={item.name}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 ${active ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
                <span className="hidden lg:block truncate">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Admin User / Footer */}
        <div className="p-3 border-t border-white border-opacity-15 bg-[#081521]">
          <div className="flex items-center gap-3 p-1 rounded-lg overflow-hidden justify-center lg:justify-start">
            <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold font-sora text-xs flex-shrink-0 shadow-sm border border-white border-opacity-15">
              AD
            </div>
            <div className="hidden lg:block min-w-0 flex-1">
              <p className="text-[11px] font-bold font-sora truncate leading-tight text-white">Administrator</p>
              <p className="text-[8px] text-gray-400 font-sans mt-0.5 truncate">Level 1 Security</p>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="w-full mt-3 flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold font-sora text-gray-300 hover:text-white hover:bg-red-950 hover:bg-opacity-35 hover:text-red-350 transition-all justify-center lg:justify-start group"
            title="Exit Admin Panel"
          >
            <LogOut className="w-4 h-4 text-gray-400 group-hover:text-white" />
            <span className="hidden lg:block">Exit Admin</span>
          </button>
        </div>
      </aside>

      {/* Bottom Nav Bar for Mobile devices (screen width < 768px) */}
      <nav className="flex md:hidden fixed bottom-0 left-0 right-0 z-50 bg-admin border-t border-white border-opacity-15 h-16 shadow-lg items-center justify-around px-1 overflow-x-auto">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={index}
              to={item.path}
              className={`flex flex-col items-center justify-center flex-shrink-0 w-11 h-full py-1 text-[9px] font-sora font-semibold transition-all ${
                active ? 'text-accent' : 'text-gray-400'
              }`}
            >
              <Icon className="w-4 h-4 mb-0.5" />
              <span className="scale-90 font-medium tracking-tighter truncate max-w-[44px]">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
};

export default AdminSidebar;
