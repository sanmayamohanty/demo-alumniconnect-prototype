import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Sidebar from '../../components/layout/Sidebar';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import LeaderboardRow from '../../components/features/LeaderboardRow';
import { mockLeaderboard } from '../../data/mockData';
import { Trophy, Award, Heart, MessageSquare, Users, Share2, Sparkles, TrendingUp } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

export const Leaderboard = () => {
  const navigate = useNavigate();
  const { demoUser, institution } = useApp();
  const [activeTab, setActiveTab] = useState('overall');

  const user = demoUser || {
    name: 'Arjun Kumar',
    initials: 'AK',
    batch: 2015,
    rank: 14,
    donated: 5000,
    mentees: 3,
    impactScore: 42,
    referred: 7
  };

  const tabs = [
    { id: 'overall', label: 'Overall Impact', icon: Sparkles },
    { id: 'donations', label: 'Donations', icon: Heart },
    { id: 'mentorship', label: 'Mentorship', icon: Users },
    { id: 'referrals', label: 'Referrals', icon: MessageSquare },
  ];

  // Sorting logic based on active tab for high fidelity feel
  const getSortedData = () => {
    const dataCopy = [...mockLeaderboard];
    // Ensure current user is in the list
    if (!dataCopy.some(item => item.isCurrentUser)) {
      dataCopy.push({
        rank: user.rank,
        initials: user.initials,
        name: user.name,
        batch: user.batch,
        score: user.impactScore,
        donated: user.donated,
        mentored: user.mentees,
        referred: user.referred,
        events: 2,
        isCurrentUser: true
      });
    }

    if (activeTab === 'donations') {
      return dataCopy.sort((a, b) => b.donated - a.donated).map((item, idx) => ({ ...item, rank: idx + 1 }));
    } else if (activeTab === 'mentorship') {
      return dataCopy.sort((a, b) => b.mentored - a.mentored).map((item, idx) => ({ ...item, rank: idx + 1 }));
    } else if (activeTab === 'referrals') {
      return dataCopy.sort((a, b) => b.referred - a.referred).map((item, idx) => ({ ...item, rank: idx + 1 }));
    }
    // Default overall sorted by score
    return dataCopy.sort((a, b) => b.score - a.score);
  };

  const sortedLeaderboard = getSortedData();

  // Top 5 for Recharts representation
  const chartData = sortedLeaderboard.slice(0, 5).map(item => ({
    name: item.name.split(' ')[0], // First name only for clean XAxis
    Score: activeTab === 'donations' ? item.donated / 1000 : activeTab === 'mentorship' ? item.mentored : activeTab === 'referrals' ? item.referred : item.score,
    fullName: item.name,
    isCurrentUser: item.isCurrentUser
  }));

  const getMetricLabel = () => {
    if (activeTab === 'donations') return 'Donated (k₹)';
    if (activeTab === 'mentorship') return 'Mentees';
    if (activeTab === 'referrals') return 'Referrals';
    return 'Impact Pts';
  };

  return (
    <div className="min-h-screen flex bg-surface font-sans pb-16 md:pb-0">
      {/* Sidebar navigation */}
      <Sidebar />

      {/* Main content area */}
      <main className="flex-1 md:ml-20 lg:ml-56 p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* Personal Rank Banner Card */}
        <section className="bg-primary text-white p-6 rounded-xl shadow-sm bg-dot-grid relative overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="absolute inset-0 bg-primary-dark bg-opacity-30 pointer-events-none" />
          <div className="relative z-10 flex items-center gap-5">
            <div className="w-16 h-16 rounded-xl bg-accent bg-opacity-25 border border-accent border-opacity-40 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] text-accent uppercase font-bold tracking-wider font-sora">Rank</span>
              <span className="text-2xl font-extrabold font-sora text-accent">#{user.rank}</span>
            </div>
            <div className="space-y-1">
              <h1 className="text-lg font-extrabold font-sora tracking-tight">Your Engagement Standing</h1>
              <p className="text-xs text-light text-opacity-80 leading-relaxed font-sans">
                You are in the top 5% of active alumni. Complete activities to rise in rankings!
              </p>
            </div>
          </div>

          <div className="relative z-10 flex flex-wrap items-center gap-4 lg:gap-6">
            <div className="flex gap-4">
              <div className="text-center">
                <p className="text-[10px] text-light text-opacity-60 uppercase font-semibold">Impact pts</p>
                <p className="text-base font-bold font-sora text-accent mt-0.5">{user.impactScore}</p>
              </div>
              <div className="w-px bg-white bg-opacity-15 h-8" />
              <div className="text-center">
                <p className="text-[10px] text-light text-opacity-60 uppercase font-semibold">Donated</p>
                <p className="text-base font-bold font-sora text-accent mt-0.5">₹{user.donated.toLocaleString('en-IN')}</p>
              </div>
              <div className="w-px bg-white bg-opacity-15 h-8" />
              <div className="text-center">
                <p className="text-[10px] text-light text-opacity-60 uppercase font-semibold">Mentored</p>
                <p className="text-base font-bold font-sora text-accent mt-0.5">{user.mentees}</p>
              </div>
            </div>

            <Button
              variant="accent"
              size="sm"
              className="text-xs font-semibold px-4 py-2 hover:scale-[1.02] transition-transform flex items-center gap-1.5 ml-auto lg:ml-0"
              onClick={() => navigate('/donation-success?fromLeaderboard=true')}
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share My Card</span>
            </Button>
          </div>
        </section>

        {/* Recharts Visual Dashboard */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Card className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold font-sora text-primary flex items-center gap-2 mb-3">
                  <Trophy className="w-4 h-4 text-accent" />
                  <span>Leaderboard Highlights</span>
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed font-sans mb-4">
                  {institution.shortName} graduates contribute across multiple pillars. Select tabs to check rankings in specific domains.
                </p>
                <div className="space-y-2">
                  <div className="p-3 bg-light bg-opacity-50 rounded-lg border border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-700 font-sora">Top Contributor</span>
                    <Badge variant="accent" className="text-[9px]">Suresh Kapoor (128 pts)</Badge>
                  </div>
                  <div className="p-3 bg-light bg-opacity-50 rounded-lg border border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-700 font-sora">Most Referrals</span>
                    <Badge variant="primary" className="text-[9px]">Suresh Kapoor (14 signups)</Badge>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-emerald-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-[11px] font-semibold font-sans">Leaderboard refreshes daily at midnight</span>
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-8">
            <Card className="p-6">
              <h3 className="text-sm font-bold font-sora text-primary mb-4">
                Top 5 Visual Comparison ({getMetricLabel()})
              </h3>
              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis dataKey="name" tick={{ fontSize: 10, fontFamily: 'DM Sans', fill: '#6B7280' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fontFamily: 'DM Sans', fill: '#6B7280' }} axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ background: '#0F2238', color: '#fff', borderRadius: '8px', fontSize: '11px', fontFamily: 'DM Sans', border: 'none' }}
                      labelStyle={{ fontWeight: 'bold', fontFamily: 'Sora', color: '#C49A22' }}
                    />
                    <Bar dataKey="Score" radius={[4, 4, 0, 0]} barSize={32}>
                      {chartData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.isCurrentUser ? institution.accentColor : institution.primaryColor} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </section>

        {/* Leaderboard Table Section */}
        <section className="space-y-4">
          {/* Dimension Tabs */}
          <div className="flex border-b border-gray-200 overflow-x-auto scrollbar-none gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-3 px-4 font-sora font-semibold text-xs border-b-2 transition-all whitespace-nowrap ${
                    isActive 
                      ? 'border-accent text-accent' 
                      : 'border-transparent text-gray-500 hover:text-primary hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Table Container */}
          <Card className="overflow-hidden border border-gray-150 shadow-xs">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-250">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-center text-[10px] font-bold font-sora text-gray-500 uppercase tracking-wider">Rank</th>
                    <th className="px-6 py-3 text-left text-[10px] font-bold font-sora text-gray-500 uppercase tracking-wider">Alumni</th>
                    <th className="px-6 py-3 text-center text-[10px] font-bold font-sora text-gray-500 uppercase tracking-wider">Impact Score</th>
                    <th className="px-6 py-3 text-center text-[10px] font-bold font-sora text-gray-500 uppercase tracking-wider">Total Donated</th>
                    <th className="px-6 py-3 text-center text-[10px] font-bold font-sora text-gray-500 uppercase tracking-wider">Mentorship</th>
                    <th className="px-6 py-3 text-center text-[10px] font-bold font-sora text-gray-500 uppercase tracking-wider">Referrals</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {sortedLeaderboard.map((entry, idx) => (
                    <LeaderboardRow key={idx} entry={entry} index={idx} />
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>

      </main>
    </div>
  );
};

export default Leaderboard;
