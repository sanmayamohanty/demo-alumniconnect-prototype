import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Sidebar from '../../components/layout/Sidebar';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { 
  Trophy, 
  Heart, 
  Users, 
  Award, 
  ArrowRight, 
  Calendar, 
  ChevronRight, 
  CheckCircle2, 
  MessageSquare, 
  UserCheck, 
  AlertTriangle 
} from 'lucide-react';

export const DashboardHome = () => {
  const navigate = useNavigate();
  const { demoUser, institution } = useApp();

  // If session bypassed/not set, wait, ScreenNavigator will auto log in.
  // But let's double-check or fallback just in case:
  const user = demoUser || {
    name: 'Arjun Kumar',
    initials: 'AK',
    batch: 2015,
    rank: 14,
    donated: 5000,
    mentees: 3,
    impactScore: 42,
    profileComplete: 65
  };

  const stats = [
    { label: 'Your Rank', value: `#${user.rank}`, icon: Trophy, color: 'text-yellow-500', bg: 'bg-yellow-50' },
    { label: 'Total Donated', value: `₹${user.donated.toLocaleString('en-IN')}`, icon: Heart, color: 'text-red-500', bg: 'bg-red-50' },
    { label: 'Active Mentees', value: `${user.mentees}`, icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Impact Score', value: `${user.impactScore} pts`, icon: Award, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  ];

  const activities = [
    { id: 1, type: 'donation', title: 'Contributed ₹5,000 to GuruDakshina Campaign', desc: 'Transaction Successful · Order ID #pay_73921', time: '2 days ago', icon: Heart, iconColor: 'text-red-500', iconBg: 'bg-red-50' },
    { id: 2, type: 'mentor', title: 'Accepted mentorship request from Nitin Gupta (Batch 2018)', desc: 'CS Branch · Direct Message channel active', time: '1 week ago', icon: UserCheck, iconColor: 'text-blue-500', iconBg: 'bg-blue-50' },
    { id: 3, type: 'profile', title: 'Updated profile information', desc: 'Visibility settings set to: Public (Approved)', time: '1 week ago', icon: CheckCircle2, iconColor: 'text-emerald-500', iconBg: 'bg-emerald-50' },
    { id: 4, type: 'system', title: 'Successfully registered and verified on Alumni Connect Portal', desc: 'Auto-verification matching Roll No CS15B042', time: '2 weeks ago', icon: Award, iconColor: 'text-purple-500', iconBg: 'bg-purple-50' },
  ];

  const quickActions = [
    { label: 'Browse Alumni Directory', desc: 'Find batchmates & mentors', path: '/dashboard/directory', icon: Users },
    { label: 'Contribute to GuruDakshina', desc: 'Support campus infrastructure', path: '/dashboard/give', icon: Heart },
    { label: 'Find a Mentee / Group', desc: 'Join batch WhatsApp channel', path: '/dashboard/community', icon: MessageSquare },
    { label: 'Register for Reunion Gala', desc: 'December Homecoming RSVP', path: '/dashboard/give', icon: Calendar },
  ];

  return (
    <div className="min-h-screen flex bg-surface font-sans pb-16 md:pb-0">
      {/* Sidebar navigation */}
      <Sidebar />

      {/* Main dashboard content area */}
      <main className="flex-1 md:ml-20 lg:ml-56 p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* Welcome Banner */}
        <section className="bg-primary text-white p-6 md:p-8 rounded-xl shadow-sm bg-dot-grid relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="absolute inset-0 bg-primary-dark bg-opacity-30 pointer-events-none" />
          <div className="relative z-10 space-y-2">
            <h1 className="text-xl md:text-2xl font-extrabold font-sora tracking-tight">
              Welcome back, {user.name} 👋
            </h1>
            <p className="text-xs text-light text-opacity-80 leading-relaxed font-sans max-w-md">
              Class of {user.batch} · {user.branch} · {institution.shortName} Alumnus
            </p>
          </div>
          <div className="relative z-10 flex gap-3 flex-wrap">
            <Button
              variant="primary"
              size="sm"
              className="text-xs font-semibold px-4 py-2 hover:scale-[1.02] transition-transform"
              onClick={() => navigate('/dashboard/community')}
            >
              Join Batch Community
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs font-semibold px-4 py-2 bg-transparent border-white border-opacity-30 text-white hover:bg-white hover:bg-opacity-10"
              onClick={() => navigate('/dashboard/profile')}
            >
              View Profile
            </Button>
          </div>
        </section>

        {/* Profile Completeness Nudge */}
        {user.profileComplete < 100 && (
          <section className="bg-amber-50 border-l-4 border-accent p-4 rounded-r-xl flex items-start gap-3 shadow-xs">
            <AlertTriangle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="font-sora font-semibold text-xs text-amber-800">
                  Your profile is {user.profileComplete}% complete
                </h4>
                <p className="text-[11px] text-amber-700 leading-relaxed mt-0.5">
                  Add your current employer and LinkedIn URL to unlock direct messaging and full alumni directory access.
                </p>
              </div>
              <Link 
                to="/dashboard/profile"
                className="text-xs font-bold text-accent hover:text-primary transition-colors flex items-center gap-0.5 whitespace-nowrap"
              >
                <span>Complete now</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </Link>
            </div>
          </section>
        )}

        {/* Impact Stats Row */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-5 flex items-center gap-4 border border-gray-150">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${stat.bg} ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider font-sora">
                    {stat.label}
                  </p>
                  <p className="text-lg font-bold font-sora text-primary mt-0.5">
                    {stat.value}
                  </p>
                </div>
              </Card>
            );
          })}
        </section>

        {/* Lower Two-Column Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Recent Activity (60%) */}
          <div className="lg:col-span-7">
            <Card className="p-6 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
                  <h3 className="text-sm font-bold font-sora text-primary">
                    Recent Activity
                  </h3>
                  <Badge variant="info" className="text-[9px]">Verified History</Badge>
                </div>

                <div className="space-y-4">
                  {activities.map((act) => {
                    const Icon = act.icon;
                    return (
                      <div key={act.id} className="flex gap-3 items-start group">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${act.iconBg} ${act.iconColor}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-semibold text-gray-800 leading-snug group-hover:text-primary transition-colors">
                            {act.title}
                          </h4>
                          <p className="text-[10px] text-gray-400 leading-tight mt-0.5 font-sans">
                            {act.desc}
                          </p>
                        </div>
                        <span className="text-[9px] text-gray-400 font-medium whitespace-nowrap">{act.time}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 mt-6 text-center">
                <button 
                  onClick={() => navigate('/dashboard/profile')}
                  className="text-xs font-bold text-primary hover:text-accent transition-colors flex items-center gap-1 mx-auto"
                >
                  <span>View all activity logs</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </Card>
          </div>

          {/* Right Column: Quick Actions (40%) */}
          <div className="lg:col-span-5">
            <Card className="p-6 h-full flex flex-col justify-between">
              <div>
                <div className="border-b border-gray-100 pb-4 mb-4">
                  <h3 className="text-sm font-bold font-sora text-primary">
                    Quick Actions
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {quickActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <button
                        key={index}
                        onClick={() => navigate(action.path)}
                        className="text-left w-full p-3 rounded-lg border border-gray-100 hover:border-accent hover:bg-light hover:bg-opacity-30 transition-all flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gray-50 text-gray-500 flex items-center justify-center flex-shrink-0 group-hover:bg-accent group-hover:text-white transition-colors">
                            <Icon className="w-4.5 h-4.5" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-gray-700 font-sora group-hover:text-primary transition-colors">
                              {action.label}
                            </h4>
                            <p className="text-[10px] text-gray-400 font-sans mt-0.5 leading-none">
                              {action.desc}
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="w-4.5 h-4.5 text-gray-300 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 mt-6 text-center text-[10px] text-gray-400 leading-relaxed font-sans">
                Logged in under Level 1 Security Session.
              </div>
            </Card>
          </div>

        </section>
      </main>
    </div>
  );
};

export default DashboardHome;
