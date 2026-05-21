import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Sidebar from '../../components/layout/Sidebar';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import DonationCard from '../../components/features/DonationCard';
import { 
  Heart, 
  Award, 
  Trophy, 
  Lock, 
  CheckCircle2, 
  AlertCircle, 
  Users, 
  Calendar, 
  BookOpen, 
  GraduationCap, 
  Coins 
} from 'lucide-react';

export const SupportAlmaMater = () => {
  const navigate = useNavigate();
  const { setDonationAmount, updateDemoUser, demoUser } = useApp();
  
  const [customAmount, setCustomAmount] = useState('');
  const [selectedTierAmount, setSelectedTierAmount] = useState(10000); // Champion tier default
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const donationTiers = [
    {
      amount: 2500,
      name: 'Supporter Tier',
      description: 'Fund textbook bundles, engineering software licenses, and e-library access tokens for meritorious students in need.',
      impact: 'Sponsors resource kits for 10 undergraduate scholars.',
      popular: false,
      icon: Heart
    },
    {
      amount: 10000,
      name: 'Champion Tier',
      description: 'Directly sponsor tuition fees and semester accommodation subsidies for bright engineering students from underprivileged rural backgrounds.',
      impact: 'Covers one semester tuition fee for a merit scholar.',
      popular: true,
      icon: Award
    },
    {
      amount: 25000,
      name: 'Legacy Tier',
      description: 'Establish class-sponsored incubation funds, advanced research lab kits, incubation equipment, or host national technical symposia.',
      impact: 'Directly funds incubation lab prototyping kits.',
      popular: false,
      icon: Trophy
    }
  ];

  const handleSelectTier = (amount) => {
    setSelectedTierAmount(amount);
    setCustomAmount(''); // Clear custom amount
    showToast(`Selected ₹${amount.toLocaleString('en-IN')} tier. Click 'Pay' to proceed.`, 'info');
  };

  const handleCustomChange = (val) => {
    setCustomAmount(val);
    setSelectedTierAmount(null); // Unselect pre-defined tier
  };

  const handleProceedPayment = () => {
    const finalAmount = customAmount ? parseFloat(customAmount) : selectedTierAmount;
    
    if (!finalAmount || isNaN(finalAmount) || finalAmount <= 0) {
      showToast('Please select a tier or enter a valid custom amount.', 'error');
      return;
    }

    // Save in context
    setDonationAmount(finalAmount);

    // Update demo user's donated stats in context (just for local persistence)
    if (demoUser) {
      const currentDonated = Number(demoUser.donated || 0);
      updateDemoUser({
        donated: currentDonated + Number(finalAmount),
        impactScore: Number(demoUser.impactScore || 0) + Math.floor(finalAmount / 1000) * 10
      });
    }

    // Navigate to success screen
    navigate('/donation-success');
  };

  const handleOtherWays = (option) => {
    showToast(`Form for "${option}" will be active in the live portal.`, 'info');
  };

  return (
    <div className="min-h-screen flex bg-surface font-sans pb-16 md:pb-0">
      <Sidebar />

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-[99999] flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-xs font-semibold font-sora border animate-slide-in backdrop-blur-sm ${
          toast.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
          toast.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
          'bg-blue-50 border-blue-200 text-blue-800'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : <AlertCircle className="w-4 h-4 text-blue-600" />}
          <span>{toast.message}</span>
        </div>
      )}

      <main className="flex-1 md:ml-20 lg:ml-56 p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* Header Title */}
        <section className="flex items-center justify-between pb-2 border-b border-gray-200">
          <div>
            <h1 className="text-xl font-extrabold font-sora text-primary">GuruDakshina Initiative</h1>
            <p className="text-xs text-gray-500 font-sans">Give back to support institutional growth and student success</p>
          </div>
          <Badge variant="accent" className="font-sora font-semibold">GuruDakshina 2026</Badge>
        </section>

        {/* Giving Tiers Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {donationTiers.map((tier, index) => (
            <div 
              key={index} 
              className={`h-full cursor-pointer rounded-xl transition-all ${
                selectedTierAmount === tier.amount ? 'ring-2 ring-accent scale-[1.01]' : ''
              }`}
              onClick={() => handleSelectTier(tier.amount)}
            >
              <DonationCard
                tier={tier}
                onSelect={() => handleSelectTier(tier.amount)}
              />
            </div>
          ))}
        </section>

        {/* Custom amount & Razorpay checkout band */}
        <section className="space-y-6">
          {/* Custom Amount Form */}
          <Card className="p-6 border border-gray-150 flex flex-col sm:flex-row items-end gap-4 max-w-2xl">
            <div className="flex-1 w-full">
              <Input
                label="Or enter a custom contribution amount (₹)"
                type="number"
                placeholder="Enter custom amount e.g. 5000"
                value={customAmount}
                onChange={(e) => handleCustomChange(e.target.value)}
              />
            </div>
            <Button
              variant="secondary"
              className="w-full sm:w-auto px-6 py-2.5 font-bold text-xs uppercase tracking-wider h-10 flex items-center justify-center gap-1.5"
              onClick={handleProceedPayment}
            >
              <Coins className="w-4 h-4" />
              <span>Proceed to payment</span>
            </Button>
          </Card>

          {/* Secure Checkout Band */}
          <div className="bg-primary text-white p-5 rounded-xl border border-white border-opacity-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow bg-dot-grid relative overflow-hidden">
            <div className="absolute inset-0 bg-primary-dark bg-opacity-30 pointer-events-none" />
            <div className="relative z-10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white bg-opacity-10 flex items-center justify-center text-accent">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold font-sora text-white">Pay securely via Razorpay Checkout</h4>
                <p className="text-[10px] text-light text-opacity-70 font-sans mt-0.5 leading-none">
                  Supports UPI, Net Banking, Credit/Debit cards & wallets.
                </p>
              </div>
            </div>
            
            <div className="relative z-10 flex items-center gap-4 w-full md:w-auto">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider select-none hidden sm:inline">SSL Secure 256-Bit</span>
              <Button
                variant="primary"
                size="lg"
                className="w-full md:w-auto font-bold text-xs uppercase tracking-wider py-3 px-6 shadow-md hover:scale-[1.02] active:scale-95"
                onClick={handleProceedPayment}
              >
                Pay with Razorpay →
              </Button>
            </div>
          </div>
        </section>

        {/* Other ways to give back */}
        <section className="space-y-3">
          <h3 className="text-xs uppercase tracking-wider font-bold text-gray-400 font-sora">
            Other Engagement Opportunities
          </h3>
          <Card className="p-6 border border-gray-150 bg-gray-50 bg-opacity-50">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <button 
                onClick={() => handleOtherWays('Become a mentor')}
                className="p-4 rounded-lg bg-white border border-gray-100 hover:border-accent hover:text-accent font-bold text-xs text-gray-700 font-sora transition-all flex flex-col items-center gap-2"
              >
                <Users className="w-5 h-5 text-primary" />
                <span>Become a mentor</span>
              </button>
              <button 
                onClick={() => handleOtherWays('Fund a scholarship')}
                className="p-4 rounded-lg bg-white border border-gray-100 hover:border-accent hover:text-accent font-bold text-xs text-gray-700 font-sora transition-all flex flex-col items-center gap-2"
              >
                <GraduationCap className="w-5 h-5 text-primary" />
                <span>Fund a scholarship</span>
              </button>
              <button 
                onClick={() => handleOtherWays('Guest lecture')}
                className="p-4 rounded-lg bg-white border border-gray-100 hover:border-accent hover:text-accent font-bold text-xs text-gray-700 font-sora transition-all flex flex-col items-center gap-2"
              >
                <BookOpen className="w-5 h-5 text-primary" />
                <span>Guest lecture</span>
              </button>
              <button 
                onClick={() => handleOtherWays('Refer an alumni')}
                className="p-4 rounded-lg bg-white border border-gray-100 hover:border-accent hover:text-accent font-bold text-xs text-gray-700 font-sora transition-all flex flex-col items-center gap-2"
              >
                <Calendar className="w-5 h-5 text-primary" />
                <span>Refer an alumni</span>
              </button>
            </div>
          </Card>
        </section>

      </main>
    </div>
  );
};

export default SupportAlmaMater;
