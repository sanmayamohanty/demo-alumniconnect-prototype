import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import ShareCard from '../../components/features/ShareCard';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { ArrowLeft, CheckCircle2, MessageSquare, Facebook, Instagram, Link2, Download, Award, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const DonationSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { donationAmount, selectedCardStyle, setSelectedCardStyle, demoUser } = useApp();

  // Check if navigating from leaderboard
  const searchParams = new URLSearchParams(location.search);
  const fromLeaderboard = searchParams.get('fromLeaderboard') === 'true';

  useEffect(() => {
    // Confetti explosion on load!
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#1A3A5C', '#C49A22', '#EEF3F9']
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#1A3A5C', '#C49A22', '#EEF3F9']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  const handleShareClick = (platform) => {
    alert(`In the live portal, this opens the native share sheet or pre-fills a message for ${platform}.`);
  };

  const currentAmount = donationAmount || 10000;

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-2xl space-y-6">
        
        {/* Main Success Container */}
        <Card className="p-6 md:p-8 border border-gray-150 shadow-md text-center space-y-6">
          
          <div className="flex flex-col items-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mb-2 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h1 className="text-xl md:text-2xl font-extrabold font-sora tracking-tight text-primary">
              {fromLeaderboard ? 'Your Alumni Impact Card' : 'Thank You, Arjun!'}
            </h1>
            <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
              {fromLeaderboard 
                ? 'Below is your custom, shareable engagement card summarizing your rank and contributions.' 
                : `Your GuruDakshina contribution of ₹${Number(currentAmount).toLocaleString('en-IN')} was successfully processed. Order #pay_gd_${Math.floor(Math.random() * 900000 + 100000)}.`
              }
            </p>
          </div>

          <hr className="border-gray-100" />

          {/* Card Style Selector */}
          <div className="space-y-3">
            <label className="text-[10px] font-bold font-sora tracking-wider text-gray-400 uppercase">
              Choose your shareable card style
            </label>
            <div className="flex justify-center gap-2">
              {[
                { id: 'wrapped', label: '🎵 Wrapped' },
                { id: 'story', label: '📱 Story (9:16)' },
                { id: 'certificate', label: '🏅 Certificate' }
              ].map((style) => (
                <button
                  key={style.id}
                  onClick={() => setSelectedCardStyle(style.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold font-sora border transition-all ${
                    selectedCardStyle === style.id
                      ? 'bg-primary border-primary text-white shadow-sm'
                      : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>

          {/* Share Card Render Area */}
          <div className="py-4 flex justify-center bg-gray-50 rounded-xl border border-dashed border-gray-200 p-4 min-h-[300px] items-center">
            <ShareCard styleType={selectedCardStyle} customAmount={currentAmount} />
          </div>

          {/* Share Platforms Buttons Grid */}
          <div className="space-y-3">
            <p className="text-[10px] font-bold font-sora tracking-wider text-gray-400 uppercase">
              Share to your network
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => handleShareClick('WhatsApp')}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-lg text-xs font-bold font-sans shadow-sm transition-all hover:scale-[1.02]"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>WhatsApp</span>
              </button>
              <button
                onClick={() => handleShareClick('Facebook')}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#1877F2] hover:bg-[#1464cc] text-white rounded-lg text-xs font-bold font-sans shadow-sm transition-all hover:scale-[1.02]"
              >
                <Facebook className="w-4 h-4 fill-white" />
                <span>Facebook</span>
              </button>
              <button
                onClick={() => handleShareClick('Instagram')}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white rounded-lg text-xs font-bold font-sans shadow-sm transition-all hover:scale-[1.02]"
              >
                <Instagram className="w-4 h-4" />
                <span>Instagram</span>
              </button>
              <button
                onClick={() => handleShareClick('Copy Link')}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-bold font-sans transition-all hover:scale-[1.02]"
              >
                <Link2 className="w-4 h-4" />
                <span>Copy Link</span>
              </button>
            </div>
          </div>

        </Card>

        {/* Back Link Wrapper */}
        <div className="text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/dashboard')}
            className="text-xs font-bold text-gray-500 hover:text-primary transition-colors flex items-center gap-1 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Button>
        </div>

      </div>
    </div>
  );
};

export default DonationSuccess;
