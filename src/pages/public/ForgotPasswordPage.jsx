import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import logoPng from '../../assets/logo.png';
import logoSvg from '../../assets/logo.svg';
import { Lock, Mail, Key, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ForgotPasswordPage = () => {
  const { institution } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [state, setState] = useState(1); // 1 = Email, 2 = OTP / Reset
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!email) {
      showToast('Please enter your email.', 'error');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    showToast('OTP sent successfully!', 'success');
    setState(2);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!otp) {
      showToast('Please enter the 6-digit OTP.', 'error');
      return;
    }
    if (otp.length !== 6) {
      showToast('OTP must be exactly 6 digits.', 'error');
      return;
    }
    if (!newPassword || !confirmPassword) {
      showToast('Please fill in password fields.', 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast('Passwords do not match.', 'error');
      return;
    }
    showToast('Password reset successfully! Redirecting...', 'success');
    setTimeout(() => {
      navigate('/signin');
    }, 2000);
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

      {/* Forgot Password Card */}
      <Card className="max-w-md w-full p-8 space-y-6 bg-white border border-gray-100 shadow-xl relative">
        <div className="text-center space-y-3">
          {getLogo()}
          <div className="w-12 h-12 bg-light text-primary rounded-full flex items-center justify-center mx-auto shadow-sm">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-extrabold font-sora text-primary">
            Reset your password
          </h2>
          <p className="text-xs text-gray-500 font-sans px-4">
            {state === 1 
              ? "Enter your registered email. We'll send an OTP to your mobile number."
              : "Enter the OTP sent to your WhatsApp number and set your new password."
            }
          </p>
        </div>

        {/* State 1: Email Input */}
        {state === 1 && (
          <form className="space-y-4" onSubmit={handleSendOtp}>
            <Input
              label="Registered Email Address"
              type="email"
              placeholder="e.g. arjun@google.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            
            <Button
              type="submit"
              variant="secondary"
              className="w-full py-2.5 font-bold text-xs uppercase tracking-wider"
            >
              Send OTP
            </Button>
          </form>
        )}

        {/* State 2: OTP Entry + Reset Passwords */}
        {state === 2 && (
          <form className="space-y-4 animate-fade-in" onSubmit={handleResetPassword}>
            {/* Banner */}
            <div className="bg-amber-50 border-l-4 border-accent p-3 rounded text-xs text-amber-900 font-sans leading-relaxed">
              <span>OTP sent to <strong>+91 98765 43210</strong> (Arjun's registered number).</span>
            </div>

            <Input
              label="6-Digit OTP"
              type="text"
              maxLength={6}
              placeholder="123456"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
              className="text-center font-mono text-lg tracking-[0.5em] focus:tracking-[0.5em]"
              required
            />

            <Input
              label="New Password"
              type="password"
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

            <Input
              label="Confirm New Password"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full py-2.5 font-bold text-xs uppercase tracking-wider shadow"
            >
              Verify and reset
            </Button>
          </form>
        )}

        {/* Back Link */}
        <div className="text-center pt-2">
          <Link to="/signin" className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-primary transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Sign In</span>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
