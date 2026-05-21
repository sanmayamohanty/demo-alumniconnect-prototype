import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import AdminSidebar from '../../components/layout/AdminSidebar';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { mockLeaderboard } from '../../data/mockData';
import { 
  TrendingUp, 
  Download, 
  Share2, 
  Heart, 
  Users, 
  MessageSquare, 
  Award, 
  CheckCircle,
  X,
  Sparkles,
  AwardIcon,
  BadgeAlert
} from 'lucide-react';

export const LeaderboardAdmin = () => {
  const { institution } = useApp();
  const [toastMessage, setToastMessage] = useState('');
  const [timePeriod, setTimePeriod] = useState('all-time');
  const [showShareModal, setShowShareModal] = useState(false);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleExportCSV = () => {
    triggerToast('Generating CSV report: greenfield_leaderboard_data.csv');
  };

  const handleShareStats = () => {
    setShowShareModal(true);
  };

  const handleCopyLink = () => {
    triggerToast('Copied public statistics link to clipboard!');
  };

  // Summary statistics
  const summaryKpis = [
    { label: 'Total Contributions', value: '₹4.23 Cr', desc: '14,892 verified donors', icon: Heart, color: 'text-rose-500', bg: 'bg-rose-50' },
    { label: 'Active Mentors', value: '320+', desc: '1,420 connection hours', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Referrals & Invites', value: '2,891', desc: '82% registration conversion', icon: MessageSquare, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'Avg Alumni Impact Score', value: '62.4 pts', desc: 'Class of 2015 leads (84.1)', icon: Award, color: 'text-accent', bg: 'bg-amber-50' },
  ];

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
              <TrendingUp className="w-6 h-6 text-accent" />
              <span>Leaderboard & Stats</span>
            </h1>
            <p className="text-xs text-gray-500 font-sans mt-0.5">
              Review aggregate alumni engagement metrics and leaderboard standings
            </p>
          </div>
          
          <div className="flex gap-2 items-center flex-wrap">
            <select
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              className="px-3 py-2 text-xs font-sans border border-gray-250 rounded-md bg-white text-gray-600 focus:outline-none focus:border-accent"
            >
              <option value="all-time">All-Time Standing</option>
              <option value="quarter">This Quarter</option>
              <option value="month">This Month</option>
            </select>
            
            <Button
              variant="outline"
              size="sm"
              className="text-xs font-semibold px-3 py-2 bg-white text-gray-700 border-gray-200 flex items-center gap-1.5"
              onClick={handleExportCSV}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </Button>
            
            <Button
              variant="accent"
              size="sm"
              className="text-xs font-semibold px-3 py-2 flex items-center gap-1.5"
              onClick={handleShareStats}
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Stats Card</span>
            </Button>
          </div>
        </section>

        {/* Summary KPI Cards Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {summaryKpis.map((kpi, idx) => {
            const Icon = kpi.icon;
            return (
              <Card key={idx} className="p-5 border border-gray-150 flex items-center gap-4 bg-white">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${kpi.bg} ${kpi.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider font-sora">{kpi.label}</p>
                  <p className="text-base font-extrabold font-sora text-primary mt-0.5">{kpi.value}</p>
                  <p className="text-[10px] text-gray-450 mt-0.5 font-sans leading-none">{kpi.desc}</p>
                </div>
              </Card>
            );
          })}
        </section>

        {/* Full Leaderboard standings table */}
        <section className="space-y-3">
          <h3 className="text-xs font-extrabold font-sora text-primary uppercase tracking-wider">
            Verified Alumni Score Standings
          </h3>

          <Card className="overflow-hidden border border-gray-150 bg-white">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-center text-[10px] font-bold font-sora text-gray-500 uppercase tracking-wider">Rank</th>
                    <th className="px-6 py-3 text-left text-[10px] font-bold font-sora text-gray-500 uppercase tracking-wider">Alumnus Name</th>
                    <th className="px-6 py-3 text-center text-[10px] font-bold font-sora text-gray-500 uppercase tracking-wider">Verification Status</th>
                    <th className="px-6 py-3 text-center text-[10px] font-bold font-sora text-gray-500 uppercase tracking-wider">Impact Score</th>
                    <th className="px-6 py-3 text-center text-[10px] font-bold font-sora text-gray-500 uppercase tracking-wider">Donations</th>
                    <th className="px-6 py-3 text-center text-[10px] font-bold font-sora text-gray-500 uppercase tracking-wider">Mentees</th>
                    <th className="px-6 py-3 text-center text-[10px] font-bold font-sora text-gray-500 uppercase tracking-wider">Referrals</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {mockLeaderboard.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-center text-xs font-bold font-sora text-gray-500">
                        #{item.rank}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center font-bold text-[10px]">
                            {item.initials}
                          </div>
                          <div>
                            <div className="text-xs font-bold font-sora text-gray-800">{item.name}</div>
                            <div className="text-[10px] text-gray-400 font-sans mt-0.5">Batch of {item.batch}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className="bg-emerald-50 text-emerald-600 text-[8px] font-bold font-sora px-1.5 py-0.5 rounded border border-emerald-100 uppercase inline-flex items-center gap-0.5">
                          <span>✓ Verified</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className="bg-primary bg-opacity-5 px-2 py-0.5 rounded text-primary font-bold text-xs font-sora">
                          {item.score} pts
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-xs font-semibold text-gray-700 font-sans">
                        ₹{item.donated.toLocaleString('en-IN')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-xs font-semibold text-gray-700 font-sans">
                        {item.mentored} mentees
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-xs font-semibold text-gray-700 font-sans">
                        {item.referred} invites
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>

        {/* Share Modal */}
        {showShareModal && (
          <div className="fixed inset-0 bg-[#0F2238] bg-opacity-50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-sm p-6 border border-gray-100 shadow-2xl relative bg-white space-y-4">
              <button 
                onClick={() => setShowShareModal(false)}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center space-y-2">
                <Sparkles className="w-8 h-8 text-accent mx-auto" />
                <h3 className="text-base font-extrabold font-sora text-primary">Institution Impact Summary</h3>
                <p className="text-xs text-gray-500 font-sans">
                  Generate a shareable card highlighting our aggregate success metrics
                </p>
              </div>

              {/* Stats Card Mock Preview */}
              <div className="p-4 bg-primary text-white rounded-xl border border-white border-opacity-10 text-center bg-dot-grid relative overflow-hidden space-y-3">
                <div className="text-[10px] text-accent uppercase font-bold tracking-widest font-sora">
                  {institution.name}
                </div>
                <div className="space-y-0.5">
                  <p className="text-2xl font-extrabold font-sora text-white">₹4.23 Cr Raised</p>
                  <p className="text-[9px] text-light text-opacity-70 font-sans">Across 15,248 Verified Alumni Donors</p>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white border-opacity-10">
                  <div>
                    <p className="text-base font-extrabold font-sora text-accent">320+</p>
                    <p className="text-[8px] text-light text-opacity-50 uppercase leading-none font-semibold">Active Mentors</p>
                  </div>
                  <div>
                    <p className="text-base font-extrabold font-sora text-accent">2.8k+</p>
                    <p className="text-[8px] text-light text-opacity-50 uppercase leading-none font-semibold">Alumni Referrals</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-1/2 text-xs font-semibold"
                  onClick={handleCopyLink}
                >
                  Copy Stats URL
                </Button>
                <Button
                  variant="accent"
                  size="sm"
                  className="w-1/2 text-xs font-semibold"
                  onClick={() => triggerToast('In the live portal, this shares the summary image to Twitter / LinkedIn.')}
                >
                  Share to LinkedIn
                </Button>
              </div>
            </Card>
          </div>
        )}

      </main>
    </div>
  );
};

export default LeaderboardAdmin;
