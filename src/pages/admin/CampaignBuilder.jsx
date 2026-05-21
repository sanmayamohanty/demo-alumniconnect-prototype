import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import AdminSidebar from '../../components/layout/AdminSidebar';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';
import { 
  Send, 
  MessageSquare, 
  Mail, 
  Smartphone, 
  Bell, 
  Sparkles, 
  HelpCircle,
  CheckCircle,
  Calendar
} from 'lucide-react';

export const CampaignBuilder = () => {
  const { institution } = useApp();
  const [selectedChannel, setSelectedChannel] = useState('whatsapp');
  const [campaignName, setCampaignName] = useState('');
  const [campaignMessage, setCampaignMessage] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  // Audience filters
  const [batch, setBatch] = useState('all');
  const [branch, setBranch] = useState('all');
  const [city, setCity] = useState('all');
  const [status, setStatus] = useState('APPROVED');

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const channels = [
    { id: 'whatsapp', name: 'WhatsApp Broadcast', provider: 'WATI Integration', desc: 'Direct chat messages with 98% open rate', icon: MessageSquare, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { id: 'email', name: 'Email Newsletter', provider: 'Brevo Integration', desc: 'Rich newsletter layouts for professional updates', icon: Mail, color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 'sms', name: 'SMS Blast', provider: 'MSG91 Integration', desc: 'Urgent alerts and critical links verification', icon: Smartphone, color: 'text-amber-500', bg: 'bg-amber-50' },
    { id: 'push', name: 'App Notification', provider: 'FCM Push API', desc: 'In-app notification badge on mobile devices', icon: Bell, color: 'text-purple-500', bg: 'bg-purple-50' },
  ];

  const mergeTags = [
    { tag: '{first_name}', desc: 'Recipient\'s first name' },
    { tag: '{batch_year}', desc: 'Alumnus graduating batch' },
    { tag: '{reunion_link}', desc: 'Personal RSVP page link' },
    { tag: '{donation_sum}', desc: 'Recap of donated funds' },
  ];

  const handleInsertTag = (tag) => {
    setCampaignMessage(prev => prev + ' ' + tag);
    triggerToast(`Inserted merge tag: ${tag}`);
  };

  const handleSendNow = (e) => {
    e.preventDefault();
    if (!campaignName || !campaignMessage) {
      alert('Please enter a campaign name and write a message.');
      return;
    }
    triggerToast(`🚀 Broadcast queued! Campaign "${campaignName}" will be sent to 14,892 verified recipients.`);
    setCampaignName('');
    setCampaignMessage('');
  };

  const handleSchedule = () => {
    if (!campaignName || !campaignMessage) {
      alert('Please enter a campaign name and write a message.');
      return;
    }
    triggerToast(`📅 Campaign "${campaignName}" scheduled successfully for next Monday at 10:00 AM.`);
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
        <section className="border-b border-gray-150 pb-5">
          <h1 className="text-xl md:text-2xl font-extrabold font-sora text-primary flex items-center gap-2">
            <Send className="w-6 h-6 text-accent" />
            <span>Campaign Builder</span>
          </h1>
          <p className="text-xs text-gray-500 font-sans mt-0.5">
            Broadcast messages and drives across SMS, email, and WhatsApp channels
          </p>
        </section>

        {/* Two-Column Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Channel Selector (40%) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xs font-extrabold font-sora text-primary uppercase tracking-wider">
              1. Choose Broadcast Channel
            </h3>

            <div className="grid grid-cols-1 gap-3">
              {channels.map((chan) => {
                const Icon = chan.icon;
                const isSelected = selectedChannel === chan.id;
                return (
                  <button
                    key={chan.id}
                    onClick={() => setSelectedChannel(chan.id)}
                    className={`text-left w-full p-4 rounded-xl border transition-all flex items-start gap-4 ${
                      isSelected 
                        ? 'border-accent bg-white shadow-md ring-1 ring-accent' 
                        : 'border-gray-150 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${chan.bg} ${chan.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold font-sora text-primary">{chan.name}</h4>
                        <span className="text-[8px] text-gray-400 font-mono tracking-tighter uppercase">{chan.provider}</span>
                      </div>
                      <p className="text-[10px] text-gray-450 leading-relaxed mt-1 font-sans">
                        {chan.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Audience + Message (60%) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Audience Section */}
            <div className="space-y-3">
              <h3 className="text-xs font-extrabold font-sora text-primary uppercase tracking-wider">
                2. Target Audience Segment
              </h3>
              
              <Card className="p-4 border border-gray-150 grid grid-cols-2 gap-3 bg-white">
                <div>
                  <label className="text-[9px] font-extrabold font-sora uppercase text-gray-450">Graduation Year</label>
                  <select 
                    value={batch}
                    onChange={(e) => setBatch(e.target.value)}
                    className="mt-1 px-2.5 py-1.5 w-full text-[11px] font-sans border border-gray-200 rounded bg-white text-gray-600 focus:outline-none"
                  >
                    <option value="all">All Batches (1975–2023)</option>
                    <option value="2015">Batch 2015</option>
                    <option value="2014">Batch 2014</option>
                  </select>
                </div>

                <div>
                  <label className="text-[9px] font-extrabold font-sora uppercase text-gray-450">Academic Branch</label>
                  <select 
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="mt-1 px-2.5 py-1.5 w-full text-[11px] font-sans border border-gray-200 rounded bg-white text-gray-600 focus:outline-none"
                  >
                    <option value="all">All Branches</option>
                    <option value="CS">Computer Science</option>
                    <option value="ECE">Electronics</option>
                  </select>
                </div>

                <div>
                  <label className="text-[9px] font-extrabold font-sora uppercase text-gray-450">Regional Hub / City</label>
                  <select 
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="mt-1 px-2.5 py-1.5 w-full text-[11px] font-sans border border-gray-200 rounded bg-white text-gray-600 focus:outline-none"
                  >
                    <option value="all">Global (All Cities)</option>
                    <option value="Hyderabad">Hyderabad Hub</option>
                    <option value="Bangalore">Bangalore Hub</option>
                  </select>
                </div>

                <div>
                  <label className="text-[9px] font-extrabold font-sora uppercase text-gray-450">Approval Status</label>
                  <select 
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="mt-1 px-2.5 py-1.5 w-full text-[11px] font-sans border border-gray-200 rounded bg-white text-gray-600 focus:outline-none"
                  >
                    <option value="APPROVED">Verified Alumni Only</option>
                    <option value="all">All Registered Users</option>
                  </select>
                </div>

                <div className="col-span-2 pt-2 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[10px] text-gray-400 font-sans">Estimated Target Reach:</span>
                  <Badge variant="primary" className="text-[10px] font-bold font-sora">
                    14,892 alumni
                  </Badge>
                </div>
              </Card>
            </div>

            {/* Composer Section */}
            <div className="space-y-3">
              <h3 className="text-xs font-extrabold font-sora text-primary uppercase tracking-wider">
                3. Message Composer
              </h3>

              <Card className="p-5 border border-gray-150 bg-white space-y-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-extrabold font-sora uppercase text-gray-450">Campaign Name</label>
                  <Input
                    type="text"
                    placeholder="e.g. GuruDakshina Launch Drive"
                    value={campaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                    className="w-full text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-[9px] font-extrabold font-sora uppercase text-gray-450">Message Body</label>
                    <span className="text-[9px] text-gray-400 font-mono">{(campaignMessage || '').length} chars</span>
                  </div>
                  <textarea
                    placeholder="Dear {first_name}, hope you are doing well! Gram Vidyapeeth is launching the GuruDakshina Giving Initiative. Support the Class of {batch_year} legacy here: {reunion_link}"
                    value={campaignMessage}
                    onChange={(e) => setCampaignMessage(e.target.value)}
                    rows="5"
                    className="w-full text-xs font-sans border border-gray-200 rounded-md p-3 focus:outline-none focus:border-accent resize-y bg-surface"
                  />
                </div>

                {/* Merge Tags */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-accent" />
                    <span className="text-[9px] font-bold font-sora text-gray-500 uppercase tracking-wider">Dynamic Merge Tags (Click to Insert)</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {mergeTags.map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleInsertTag(item.tag)}
                        className="text-[9px] font-mono bg-light hover:bg-accent hover:text-white text-primary px-2 py-1 rounded border border-gray-200 transition-colors"
                        title={item.desc}
                      >
                        {item.tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleSchedule}
                    className="w-1/2 flex items-center justify-center gap-1.5 py-2 px-3 border border-gray-200 rounded-lg text-xs font-bold text-gray-650 hover:bg-gray-50 hover:text-primary transition-all"
                  >
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>Schedule Release</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleSendNow}
                    className="w-1/2 flex items-center justify-center gap-1.5 py-2 px-3 bg-accent hover:bg-opacity-90 text-white rounded-lg text-xs font-bold font-sans shadow-sm transition-all"
                  >
                    <Send className="w-4 h-4 text-white" />
                    <span>Launch Broadcast</span>
                  </button>
                </div>

              </Card>
            </div>

          </div>

        </section>
      </main>
    </div>
  );
};

export default CampaignBuilder;
