import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import logoPng from '../../assets/logo.png';
import logoSvg from '../../assets/logo.svg';
import { Lock, Mail, Chrome, Facebook, AlertCircle, CheckCircle2 } from 'lucide-react';

export const SignInPage = () => {
  const { loginAsDemo, institution } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleDemoLogin = () => {
    loginAsDemo();
    showToast('Logged in as demo user Arjun Kumar!', 'success');
    setTimeout(() => {
      navigate('/dashboard');
    }, 800);
  };

  const handleEmailLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please fill in all credentials.', 'error');
      return;
    }
    // Auto login for presentation convenience
    loginAsDemo();
    showToast('Signed in successfully!', 'success');
    setTimeout(() => {
      navigate('/dashboard');
    }, 800);
  };

  const handleSocialClick = (platform) => {
    showToast(`${platform} login is disabled in prototype mode. Please use "Enter as Demo User".`, 'warning');
  };

  const getLogo = () => {
    const logoFile = logoSvg || logoPng;
    if (logoFile) {
      return <img src={logoFile} alt="Logo" className="h-10 w-auto object-contain mx-auto" />;
    }
    return (
      <div className="bg-accent text-white font-sora font-extrabold text-base px-3 py-1.5 rounded-md inline-block">
        {institution.shortName}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-light bg-opacity-40 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative font-sans">
      
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-[99999] flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-xs font-semibold font-sora border animate-slide-in backdrop-blur-sm ${
          toast.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
          toast.type === 'warning' ? 'bg-amber-50 border-amber-200 text-amber-800' :
          toast.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
          'bg-blue-50 border-blue-200 text-blue-800'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : <AlertCircle className="w-4 h-4 text-amber-600" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Main Login Card */}
      <Card className="max-w-md w-full p-8 space-y-6 bg-white border border-gray-100 shadow-xl relative">
        <div className="text-center space-y-3">
          {getLogo()}
          <h2 className="text-xl font-extrabold font-sora text-primary">
            Welcome back
          </h2>
          <p className="text-xs text-gray-500 font-sans">
            Stay connected with the {institution.shortName} alumni family
          </p>
        </div>

        {/* Demo User Fast-Track Button */}
        <div className="pt-2">
          <Button
            variant="primary"
            size="lg"
            className="w-full flex items-center justify-center gap-2 bg-accent text-white font-bold font-sora text-xs uppercase tracking-wider py-3 shadow-md hover:scale-[1.01] active:scale-95 transition-all"
            onClick={handleDemoLogin}
          >
            👤 Enter as Demo User (Arjun Kumar, Batch 2015)
          </Button>
        </div>

        {/* Divider */}
        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-4 text-[10px] text-gray-400 font-semibold uppercase tracking-wider">or sign in with</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleSocialClick('Google')}
            className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 text-xs font-semibold text-gray-700 transition-colors"
          >
            <Chrome className="w-4 h-4 text-red-500" />
            <span>Google</span>
          </button>
          <button
            type="button"
            onClick={() => handleSocialClick('Facebook')}
            className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 text-xs font-semibold text-gray-700 transition-colors"
          >
            <Facebook className="w-4 h-4 text-blue-600" />
            <span>Facebook</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-4 text-[10px] text-gray-400 font-semibold uppercase tracking-wider">or credentials</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleEmailLogin}>
          <div className="space-y-3">
            <Input
              label="Registered Email Address"
              type="email"
              placeholder="e.g. arjun@google.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="space-y-1">
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="text-right">
                <Link
                  to="/forgot-password"
                  className="text-[10px] font-semibold text-accent hover:text-primary transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            variant="secondary"
            className="w-full py-2.5 font-bold text-xs uppercase tracking-wider"
          >
            Sign In with Email
          </Button>
        </form>

        {/* Bottom register link */}
        <div className="text-center pt-2 text-xs font-sans text-gray-500">
          <span>Don't have an account? </span>
          <Link to="/signup" className="font-semibold text-accent hover:text-primary transition-colors">
            Create profile
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default SignInPage;
