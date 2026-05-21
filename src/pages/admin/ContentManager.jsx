import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import AdminSidebar from '../../components/layout/AdminSidebar';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';
import { 
  FileText, 
  Check, 
  HelpCircle,
  Eye,
  EyeOff,
  Edit2,
  CheckCircle
} from 'lucide-react';

export const ContentManager = () => {
  const { institution } = useApp();
  const [toastMessage, setToastMessage] = useState('');

  // Hero section states
  const [heroHeadline, setHeroHeadline] = useState('Where Gram Vidyapeeth graduates stay connected');
  const [heroSubtitle, setHeroSubtitle] = useState('Build meaningful connections, mentor the next generation of builders, and support academic excellence at Gram Vidyapeeth Inter College.');

  // Stats states
  const [stat1, setStat1] = useState('15,000+');
  const [stat2, setStat2] = useState('42');
  const [stat3, setStat3] = useState('48');
  const [stat4, setStat4] = useState('₹4.2 Cr');
  const [stat5, setStat5] = useState('320+');

  // Program Card Toggles
  const [programs, setPrograms] = useState([
    { id: 1, name: 'GuruDakshina Initiative', desc: 'Support campus infrastructure development', visible: true },
    { id: 2, name: 'Mentorship Circle', desc: 'Guide and support junior students', visible: true },
    { id: 3, name: 'Alumni Scholarship Fund', desc: 'Sponsor academic costs for undergraduates', visible: true },
    { id: 4, name: 'Annual Homecoming Reunion', desc: 'RSVP to the December reunion gala', visible: true },
  ]);

  const [announcements, setAnnouncements] = useState('GuruDakshina Donation Drive 2026 is officially live. Batch leaders are requested to share links.');

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handlePublish = (e) => {
    e.preventDefault();
    triggerToast('Changes published to homepage! Dynamic elements updated successfully.');
  };

  const toggleProgramVisibility = (id) => {
    setPrograms(prev => prev.map(p => p.id === id ? { ...p, visible: !p.visible } : p));
    const prog = programs.find(p => p.id === id);
    triggerToast(`${prog.name} visibility toggled.`);
  };

  return (
    <div className="min-h-screen flex bg-surface font-sans pb-16 md:pb-0">
      <AdminSidebar />

      <main className="flex-1 md:ml-20 lg:ml-56 p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* Toast */}
        {toastMessage && (
          <div className="fixed top-4 right-4 z-50 bg-[#0F2238] text-white text-xs font-semibold py-3 px-5 rounded-lg shadow-xl border border-accent flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-accent" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Header */}
        <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-150 pb-5">
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold font-sora text-primary flex items-center gap-2">
              <FileText className="w-6 h-6 text-accent" />
              <span>Content Manager</span>
            </h1>
            <p className="text-xs text-gray-500 font-sans mt-0.5">
              Edit text blocks and display toggles across the public facing portal
            </p>
          </div>
          
          <div>
            <Button
              variant="accent"
              size="sm"
              className="text-xs font-semibold px-4 py-2 hover:scale-[1.02] transition-transform flex items-center gap-1.5"
              onClick={handlePublish}
            >
              <Check className="w-4 h-4" />
              <span>Publish Changes</span>
            </Button>
          </div>
        </section>

        {/* Two-Column Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Hero & Stats Editor (50%) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Hero Card */}
            <div className="space-y-3">
              <h3 className="text-xs font-extrabold font-sora text-primary uppercase tracking-wider">
                Homepage Hero Section
              </h3>
              <Card className="p-4 border border-gray-150 bg-white space-y-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-extrabold font-sora uppercase text-gray-450">Main Headline</label>
                  <Input 
                    type="text"
                    value={heroHeadline}
                    onChange={(e) => setHeroHeadline(e.target.value)}
                    className="w-full text-xs font-sora font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-extrabold font-sora uppercase text-gray-450">Hero Subtitle</label>
                  <textarea
                    value={heroSubtitle}
                    onChange={(e) => setHeroSubtitle(e.target.value)}
                    rows="3"
                    className="w-full text-xs font-sans border border-gray-200 rounded-md p-3 focus:outline-none focus:border-accent resize-none bg-surface"
                  />
                </div>
              </Card>
            </div>

            {/* Stats Card */}
            <div className="space-y-3">
              <h3 className="text-xs font-extrabold font-sora text-primary uppercase tracking-wider">
                Core Metrics / Impact Stats
              </h3>
              <Card className="p-4 border border-gray-150 bg-white space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[9px] font-extrabold font-sora uppercase text-gray-450">Stat 1 (Alumni)</label>
                    <Input type="text" value={stat1} onChange={(e) => setStat1(e.target.value)} className="text-xs mt-0.5" />
                  </div>
                  <div>
                    <label className="text-[9px] font-extrabold font-sora uppercase text-gray-450">Stat 2 (Countries)</label>
                    <Input type="text" value={stat2} onChange={(e) => setStat2(e.target.value)} className="text-xs mt-0.5" />
                  </div>
                  <div>
                    <label className="text-[9px] font-extrabold font-sora uppercase text-gray-450">Stat 3 (Batches)</label>
                    <Input type="text" value={stat3} onChange={(e) => setStat3(e.target.value)} className="text-xs mt-0.5" />
                  </div>
                  <div>
                    <label className="text-[9px] font-extrabold font-sora uppercase text-gray-450">Stat 4 (Funds)</label>
                    <Input type="text" value={stat4} onChange={(e) => setStat4(e.target.value)} className="text-xs mt-0.5" />
                  </div>
                </div>

                <div>
                  <label className="text-[9px] font-extrabold font-sora uppercase text-gray-450">Stat 5 (Mentors)</label>
                  <Input type="text" value={stat5} onChange={(e) => setStat5(e.target.value)} className="text-xs mt-0.5 w-1/2" />
                </div>
              </Card>
            </div>

          </div>

          {/* Right Column: Program Cards & Announcements (50%) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Program Cards Toggles */}
            <div className="space-y-3">
              <h3 className="text-xs font-extrabold font-sora text-primary uppercase tracking-wider">
                Featured Programs Visibility
              </h3>
              <Card className="p-4 border border-gray-150 bg-white space-y-3">
                {programs.map((prog) => (
                  <div key={prog.id} className="p-3 bg-light bg-opacity-40 rounded-lg border border-gray-100 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-gray-700 font-sora leading-tight">{prog.name}</h4>
                      <p className="text-[9px] text-gray-400 font-sans truncate mt-0.5">{prog.desc}</p>
                    </div>

                    <button
                      onClick={() => toggleProgramVisibility(prog.id)}
                      className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold font-sora flex items-center gap-1 border transition-all ${
                        prog.visible
                          ? 'bg-primary text-white border-primary'
                          : 'bg-white text-gray-400 border-gray-200'
                      }`}
                    >
                      {prog.visible ? (
                        <>
                          <Eye className="w-3.5 h-3.5" />
                          <span>Visible</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3.5 h-3.5" />
                          <span>Hidden</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </Card>
            </div>

            {/* Announcements Card */}
            <div className="space-y-3">
              <h3 className="text-xs font-extrabold font-sora text-primary uppercase tracking-wider">
                Announcements Bar Content
              </h3>
              <Card className="p-4 border border-gray-150 bg-white space-y-3">
                <div>
                  <label className="text-[9px] font-extrabold font-sora uppercase text-gray-450">Announcements Text</label>
                  <textarea
                    value={announcements}
                    onChange={(e) => setAnnouncements(e.target.value)}
                    rows="3"
                    className="w-full text-xs font-sans border border-gray-200 rounded-md p-3 focus:outline-none focus:border-accent mt-0.5 resize-none bg-surface"
                  />
                </div>
              </Card>
            </div>

          </div>

        </section>
      </main>
    </div>
  );
};

export default ContentManager;
