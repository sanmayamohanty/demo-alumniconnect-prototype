import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { batchGroups } from '../../data/mockData';
import Sidebar from '../../components/layout/Sidebar';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { Facebook, MessageSquare, AlertCircle, CheckCircle2, ShieldCheck, Share2 } from 'lucide-react';

export const CommunityHub = () => {
  const { demoUser, institution } = useApp();
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleConnectSocial = (platform) => {
    showToast(`OAuth flow for ${platform} will trigger in the live portal.`, 'info');
  };

  const handleChannelClick = (year, channel) => {
    showToast(`Redirecting to verified Class of ${year} ${channel} group in live site...`, 'success');
  };

  const userBatch = demoUser?.batch || 2015;

  return (
    <div className="min-h-screen flex bg-surface font-sans pb-16 md:pb-0">
      <Sidebar />

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-[99999] flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-xs font-semibold font-sora border animate-slide-in backdrop-blur-sm ${
          toast.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
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
            <h1 className="text-xl font-extrabold font-sora text-primary">Community Hub</h1>
            <p className="text-xs text-gray-500 font-sans">Join batch-specific discussions and social groups</p>
          </div>
          <Badge variant="success" className="font-sora font-semibold">Active Channels</Badge>
        </section>

        {/* Connect Accounts Card (Glassmorphism layout) */}
        <section>
          <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-indigo-100 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="space-y-1 text-center md:text-left">
              <h3 className="text-sm font-bold font-sora text-primary flex items-center gap-1.5 justify-center md:justify-start">
                <Share2 className="w-4.5 h-4.5 text-accent" />
                <span>Connect your social accounts</span>
              </h3>
              <p className="text-xs text-gray-500 font-sans leading-relaxed max-w-md">
                Verify your profile identity via WhatsApp or Facebook to auto-join batch groups and receive alumni newsletters.
              </p>
            </div>
            
            <div className="flex gap-3 flex-wrap">
              <Button
                variant="outline"
                size="sm"
                className="text-xs font-semibold flex items-center gap-1.5 bg-white border-blue-300 text-blue-600 hover:bg-blue-50"
                onClick={() => handleConnectSocial('Facebook')}
              >
                <Facebook className="w-4 h-4 fill-blue-600 text-blue-600" />
                <span>Connect Facebook</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs font-semibold flex items-center gap-1.5 bg-white border-green-300 text-green-600 hover:bg-green-50"
                onClick={() => handleConnectSocial('WhatsApp')}
              >
                <MessageSquare className="w-4 h-4 text-green-600" />
                <span>Verify WhatsApp</span>
              </Button>
            </div>
          </Card>
        </section>

        {/* Batch Communities Title */}
        <section className="space-y-1">
          <h3 className="text-xs uppercase tracking-wider font-bold text-gray-400 font-sora">
            Class Directories & Groups
          </h3>
          <p className="text-xs text-gray-400 font-sans">Select your class batch year to access verified channels</p>
        </section>

        {/* Batch Groups Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {batchGroups.map((group, index) => {
            const isCurrentUserBatch = group.year === userBatch;
            return (
              <Card 
                key={index} 
                className={`p-6 border flex flex-col justify-between h-full transition-all duration-300 relative ${
                  isCurrentUserBatch 
                    ? 'border-accent shadow-md ring-1 ring-accent bg-gradient-to-b from-white to-light to-opacity-20' 
                    : 'border-gray-150 hover:border-gray-300'
                }`}
              >
                {/* Your Batch Badge highlight */}
                {isCurrentUserBatch && (
                  <span className="absolute -top-2.5 right-6 bg-accent text-white text-[8px] uppercase tracking-wider font-sora font-extrabold px-2.5 py-0.5 rounded-full border border-white">
                    Your Batch
                  </span>
                )}

                <div>
                  <h4 className="text-lg font-extrabold font-sora text-primary flex items-baseline gap-1.5">
                    <span>Class of {group.year}</span>
                    <span className="text-[10px] text-gray-400 font-medium font-sans">({group.members} members)</span>
                  </h4>
                  <p className="text-xs text-gray-500 font-sans leading-relaxed mt-2 mb-6">
                    Join peer networks for {group.year} grads. Discuss career advancements, reunion updates, and coordinate contributions.
                  </p>
                </div>

                {/* WhatsApp & Facebook CTA buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant={isCurrentUserBatch ? 'secondary' : 'outline'}
                    size="sm"
                    className="flex items-center justify-center gap-1 bg-green-600 text-white border-transparent hover:bg-green-700 font-bold"
                    onClick={() => handleChannelClick(group.year, 'WhatsApp')}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center justify-center gap-1 border-blue-300 text-blue-600 hover:bg-blue-50 font-bold"
                    onClick={() => handleChannelClick(group.year, 'Facebook')}
                  >
                    <Facebook className="w-3.5 h-3.5 fill-blue-600 text-blue-600" />
                    <span>Facebook</span>
                  </Button>
                </div>
              </Card>
            );
          })}
        </section>

      </main>
    </div>
  );
};

export default CommunityHub;
