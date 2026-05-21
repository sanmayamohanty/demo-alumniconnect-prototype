import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import AdminSidebar from '../../components/layout/AdminSidebar';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { 
  Users, 
  Heart, 
  Send, 
  TrendingUp, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Plus, 
  Mail, 
  Smartphone,
  ShieldCheck
} from 'lucide-react';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const { institution } = useApp();
  const [toastMessage, setToastMessage] = useState('');
  const [pendingApprovals, setPendingApprovals] = useState([
    { id: 6, name: 'Arun Thomas', initials: 'AT', batch: 2017, branch: 'CS', city: 'Hyderabad' },
    { id: 10, name: 'Karthik Reddy', initials: 'KR', batch: 2018, branch: 'CS', city: 'Hyderabad' },
    { id: 15, name: 'Sanjana Sen', initials: 'SS', batch: 2021, branch: 'ECE', city: 'Mumbai' },
  ]);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleApprove = (id, name) => {
    setPendingApprovals(prev => prev.filter(u => u.id !== id));
    triggerToast(`Approved registration for ${name}! Notification sent via WhatsApp.`);
  };

  const handleReject = (id, name) => {
    setPendingApprovals(prev => prev.filter(u => u.id !== id));
    triggerToast(`Rejected registration for ${name}.`);
  };

  const kpis = [
    { label: 'Total Alumni Registered', value: '15,248', change: '+42 this week', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Pending Approvals', value: pendingApprovals.length.toString(), change: 'Needs review', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50', isAlert: true },
    { label: 'GuruDakshina Funds', value: '₹4.23 Cr', change: '+₹1.2L this month', icon: Heart, color: 'text-rose-500', bg: 'bg-rose-50' },
    { label: 'Active Campaigns', value: '4', change: '2 scheduled', icon: Send, color: 'text-purple-500', bg: 'bg-purple-50' },
    { label: 'Leaderboard Entries', value: '8,401', change: '100% Verified', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'WhatsApp Groups', value: '48', change: 'All links active', icon: MessageSquare, color: 'text-teal-500', bg: 'bg-teal-50' },
  ];

  const campaigns = [
    { id: 1, name: 'GuruDakshina 2026 Phase 1 Launch', channel: 'WhatsApp', reach: '8,420 alumni', status: 'LIVE', statusColor: 'success' },
    { id: 2, name: 'Dec Reunion Registration Nudge', channel: 'Email', reach: '12,980 alumni', status: 'SCHEDULED', statusColor: 'info' },
    { id: 3, name: 'Golden Jubilee Souvenir Invitation', channel: 'SMS', reach: '5,100 alumni', status: 'LIVE', statusColor: 'success' },
    { id: 4, name: 'Mentorship Circle Feedback', channel: 'WhatsApp', reach: '420 mentors', status: 'PAUSED', statusColor: 'warning' },
  ];

  return (
    <div className="min-h-screen flex bg-surface font-sans pb-16 md:pb-0">
      {/* Admin Sidebar */}
      <AdminSidebar />

      {/* Main Area */}
      <main className="flex-1 md:ml-20 lg:ml-56 p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-4 right-4 z-50 bg-[#0F2238] text-white text-xs font-semibold py-3 px-5 rounded-lg shadow-xl border border-accent flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-accent" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Admin Header */}
        <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-150 pb-5">
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold font-sora text-primary flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-accent" />
              <span>Admin Dashboard</span>
            </h1>
            <p className="text-xs text-gray-500 font-sans mt-0.5">
              Control Panel for {institution.name}
            </p>
          </div>
          <div>
            <Button
              variant="primary"
              size="sm"
              className="text-xs font-semibold px-4 py-2 hover:scale-[1.02] transition-transform flex items-center gap-1.5"
              onClick={() => navigate('/admin/users')}
            >
              <Plus className="w-4 h-4" />
              <span>Add User Manually</span>
            </Button>
          </div>
        </section>

        {/* KPIs Grid */}
        <section className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {kpis.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <Card key={index} className="p-4 border border-gray-150 flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${kpi.bg} ${kpi.color}`}>
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <Badge variant={kpi.isAlert ? 'warning' : 'outline'} className="text-[8px] font-bold font-sora">
                    {kpi.change}
                  </Badge>
                </div>
                <div>
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider font-sora">
                    {kpi.label}
                  </p>
                  <p className="text-base font-extrabold font-sora text-primary mt-0.5">
                    {kpi.value}
                  </p>
                </div>
              </Card>
            );
          })}
        </section>

        {/* Lower Two-Column Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Pending Approvals (60%) */}
          <div className="lg:col-span-7">
            <Card className="p-5 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
                  <h3 className="text-xs font-extrabold font-sora text-primary uppercase tracking-wider">
                    Registration Pending Approvals
                  </h3>
                  <Badge variant="warning" className="text-[9px] font-bold">Action Required</Badge>
                </div>

                <div className="divide-y divide-gray-100">
                  {pendingApprovals.length === 0 ? (
                    <div className="py-8 text-center text-xs text-gray-400 font-sans">
                      🎉 No pending registrations! All clear.
                    </div>
                  ) : (
                    pendingApprovals.map((user) => (
                      <div key={user.id} className="py-3.5 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs">
                            {user.initials}
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-gray-800 font-sora">{user.name}</h4>
                            <p className="text-[10px] text-gray-400 font-sans mt-0.5">
                              Batch of {user.batch} · {user.branch} · {user.city}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleApprove(user.id, user.name)}
                            className="bg-emerald-50 hover:bg-emerald-100 text-emerald-600 p-1.5 rounded-lg border border-emerald-200 transition-colors flex items-center justify-center"
                            title="Approve Alumnus"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleReject(user.id, user.name)}
                            className="bg-rose-50 hover:bg-rose-100 text-rose-600 p-1.5 rounded-lg border border-rose-200 transition-colors flex items-center justify-center"
                            title="Reject"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 mt-6 text-center">
                <button 
                  onClick={() => navigate('/admin/users')}
                  className="text-xs font-bold text-primary hover:text-accent transition-colors"
                >
                  View All Registration Logs
                </button>
              </div>
            </Card>
          </div>

          {/* Right Column: Active Campaigns (40%) */}
          <div className="lg:col-span-5">
            <Card className="p-5 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
                  <h3 className="text-xs font-extrabold font-sora text-primary uppercase tracking-wider">
                    Recent Broadcasts
                  </h3>
                  <button 
                    onClick={() => navigate('/admin/campaigns')}
                    className="text-[10px] font-bold text-accent hover:text-primary transition-colors"
                  >
                    + Create Campaign
                  </button>
                </div>

                <div className="space-y-3">
                  {campaigns.map((camp) => (
                    <div key={camp.id} className="p-3 bg-light bg-opacity-40 rounded-lg border border-gray-100 flex items-center justify-between gap-3 hover:border-gray-300 transition-colors">
                      <div className="space-y-1 min-w-0">
                        <h4 className="text-xs font-bold text-gray-700 truncate font-sora leading-tight">
                          {camp.name}
                        </h4>
                        <div className="flex items-center gap-2 text-[9px] text-gray-400 font-medium">
                          <span>{camp.channel}</span>
                          <span>·</span>
                          <span>{camp.reach}</span>
                        </div>
                      </div>
                      <Badge variant={camp.statusColor} className="text-[8px] font-bold font-sora uppercase">
                        {camp.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 mt-6 text-center text-[10px] text-gray-400 font-sans">
                Admin Panel V1 · Level 1 Security Session
              </div>
            </Card>
          </div>

        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
