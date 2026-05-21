import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Facebook, Twitter, Linkedin, Heart, ExternalLink } from 'lucide-react';
import logoPng from '../../assets/logo.png';
import logoSvg from '../../assets/logo.svg';

export const Footer = () => {
  const { institution } = useApp();

  const getLogo = () => {
    const logoFile = logoSvg || logoPng;
    if (logoFile) {
      return <img src={logoFile} alt="Alumni Connect" className="h-8 w-auto object-contain" />;
    }
    return (
      <div className="bg-accent text-white font-sora font-extrabold text-[10px] px-2 py-1 rounded">
        {institution.shortName}
      </div>
    );
  };

  return (
    <footer className="bg-primary-dark text-white pt-16 pb-8 border-t border-white border-opacity-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Column 1: About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {getLogo()}
              <span className="font-sora font-bold text-sm tracking-wide">
                Alumni Connect
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              Connecting graduates of {institution.name} across generations, fields, and geographies. Empowering alumni to support students and shape the future.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#facebook" className="text-gray-400 hover:text-accent transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#twitter" className="text-gray-400 hover:text-accent transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#linkedin" className="text-gray-400 hover:text-accent transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-sora font-bold text-xs uppercase tracking-wider mb-4 text-accent">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-gray-400 font-sans">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Alumni Home</Link>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">About Association</a>
              </li>
              <li>
                <Link to="/signin" className="hover:text-white transition-colors">Search Directory</Link>
              </li>
              <li>
                <a href="#news" className="hover:text-white transition-colors">News & Events</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h4 className="font-sora font-bold text-xs uppercase tracking-wider mb-4 text-accent">
              Support Alma Mater
            </h4>
            <ul className="space-y-2 text-xs text-gray-400 font-sans">
              <li>
                <Link to="/signin" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>GuruDakshina Fund</span>
                  <ExternalLink className="w-3 h-3 text-gray-500" />
                </Link>
              </li>
              <li>
                <Link to="/signin" className="hover:text-white transition-colors">Student Scholarships</Link>
              </li>
              <li>
                <Link to="/signin" className="hover:text-white transition-colors">Infrastructure Donations</Link>
              </li>
              <li>
                <Link to="/signin" className="hover:text-white transition-colors">Mentorship Program</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="font-sora font-bold text-xs uppercase tracking-wider mb-4 text-accent">
              Alumni Affairs Office
            </h4>
            <ul className="space-y-2 text-xs text-gray-400 font-sans">
              <li>{institution.name}</li>
              <li>Campus Admin Block, Room 102</li>
              <li>Email: alumni@{institution.shortName.toLowerCase()}.edu.in</li>
              <li>Phone: +91 040 2345 6789</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white border-opacity-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-[10px] text-gray-500 font-sans">
            &copy; {new Date().getFullYear()} {institution.name}. All rights reserved.
          </p>
          <p className="text-[10px] text-gray-500 flex items-center gap-1 font-sans">
            <span>Powered by</span>
            <span className="font-semibold text-gray-400">Alumni Connect</span>
            <span>· Made with</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
