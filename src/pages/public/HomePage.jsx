import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { homeStats } from '../../data/mockData';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import StatsBar from '../../components/ui/StatsBar';
import ProgramCard from '../../components/features/ProgramCard';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { 
  Heart, 
  Users, 
  Award, 
  Calendar, 
  Gift, 
  GraduationCap, 
  BookOpen, 
  Sparkles, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const HomePage = () => {
  const navigate = useNavigate();
  const { institution } = useApp();

  const programList = [
    {
      title: 'GuruDakshina Campaign',
      description: 'Our annual giving program to support needy students, merit scholarships, and infrastructure expansion. Legacy contributions shape the future of our campus.',
      badge: 'Active drive',
      path: '/dashboard/give',
      icon: Gift
    },
    {
      title: 'Mentorship Circle',
      description: 'Connect with junior alumni and final-year students to share career advice, industry insights, resume reviews, and internship referrals.',
      badge: 'Core Program',
      path: '/signin',
      icon: BookOpen
    },
    {
      title: 'Alumni Scholarship Fund',
      description: 'Directly fund tuition fees for bright students from economically challenged background. Track their academic journey and unlock their potential.',
      badge: 'Need-Based',
      path: '/signin',
      icon: Award
    },
    {
      title: 'Annual Alumni Reunion',
      description: 'Join us on campus for the annual homecoming gala, department meetups, batch dinners, and cultural evenings. Reconnect with old friends and professors.',
      badge: 'December 2026',
      path: '/signin',
      icon: Calendar
    }
  ];

  const infoGrid = [
    {
      title: 'Community First',
      description: 'Stay connected with batch WhatsApp groups and region-specific networking circles.',
      icon: Users
    },
    {
      title: 'Alumni of the Year',
      description: 'Nominations are open for distinguished achievements in entrepreneurship and public service.',
      icon: Award
    },
    {
      title: 'Annual Reunion',
      description: 'Homecoming dinner on the 3rd Saturday of December. Registration is open.',
      icon: Calendar
    },
    {
      title: 'Give Back',
      description: 'Support critical infrastructure upgrades and research labs through the GuruDakshina drive.',
      icon: Heart
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-surface overflow-x-hidden font-sans">
      {/* Sticky Header Navbar */}
      <Navbar />

      {/* Hero Section */}
      <header className="relative bg-primary pt-32 pb-24 md:pt-40 md:pb-36 text-white overflow-hidden bg-dot-grid">
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary to-primary-dark opacity-90" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-accent opacity-10 filter blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center md:text-left">
          <div className="max-w-3xl space-y-6">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-1.5 bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-10 text-accent font-sora font-semibold text-[10px] md:text-xs uppercase tracking-wider px-3 py-1.5 rounded-full select-none">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>{institution.name} Alumni Network — Est. {institution.establishedYear}</span>
            </div>

            {/* H1 Heading */}
            <h1 className="text-3xl md:text-5xl font-extrabold font-sora tracking-tight leading-tight text-white">
              Where <span className="text-accent">{institution.shortName}</span> graduates stay connected.
            </h1>

            {/* Subtitle */}
            <p className="text-sm md:text-base text-light text-opacity-80 font-sans leading-relaxed max-w-2xl">
              Welcome back to your official alumni home. Reconnect with lost batchmates, explore professional opportunities, find mentors, and give back to support the growth of our beloved alma mater.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center md:justify-start">
              <Button 
                variant="primary" 
                size="lg" 
                className="w-full sm:w-auto shadow-md"
                onClick={() => navigate('/signup')}
              >
                Create your profile
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-white hover:bg-opacity-10"
                onClick={() => navigate('/signin')}
              >
                Sign in
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <StatsBar stats={homeStats} />

      {/* Alumni Affairs Spotlights */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs uppercase tracking-widest font-bold text-accent font-sora block">
                Office of Alumni Affairs
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold font-sora text-primary leading-tight">
                Supporting your journey beyond graduation.
              </h2>
              <div className="space-y-4 text-xs text-gray-500 leading-relaxed font-sans">
                <p>
                  The Office of Alumni Affairs serves as a vital bridge between our alumni community and the institution. We strive to foster lifelong connections, celebrate the accomplishments of our graduates, and build a culture of shared growth and giving.
                </p>
                <p>
                  Through mentorship networks, batch reunions, and institutional developmental campaigns like the GuruDakshina drive, we provide pathways for alumni to make an impact and support the next generation of innovators.
                </p>
              </div>
              <div className="pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1.5 border-primary text-primary hover:bg-primary hover:text-white"
                  onClick={() => navigate('/signin')}
                >
                  <span>Read Annual Report</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>

            {/* Right 2x2 Grid Column */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {infoGrid.map((info, index) => {
                const Icon = info.icon;
                return (
                  <Card key={index} className="p-6 border border-gray-100 hover:border-gray-200 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-light text-primary flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold font-sora text-primary mb-2">
                      {info.title}
                    </h3>
                    <p className="text-[11px] text-gray-500 leading-relaxed font-sans">
                      {info.description}
                    </p>
                  </Card>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-widest font-bold text-accent font-sora block">
              Engagement & Giving
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold font-sora text-primary">
              Alumni Programs & Initiatives
            </h2>
            <p className="text-xs text-gray-500 font-sans">
              Discover opportunities to guide current students, network with fellow alumni, and support key institutional development projects.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {programList.map((prog, index) => (
              <ProgramCard
                key={index}
                title={prog.title}
                description={prog.description}
                badge={prog.badge}
                path={prog.path}
                icon={prog.icon}
              />
            ))}
          </div>

        </div>
      </section>

      {/* CTA Band */}
      <section className="bg-primary text-white py-16 text-center bg-dot-grid relative overflow-hidden">
        <div className="absolute inset-0 bg-primary-dark bg-opacity-70 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <h2 className="text-2xl md:text-4xl font-extrabold font-sora tracking-tight">
            Be part of something bigger.
          </h2>
          <p className="text-xs md:text-sm text-light text-opacity-80 max-w-xl mx-auto leading-relaxed font-sans">
            Join 15,000+ graduates around the world. Verification takes less than 2 minutes. Get started today.
          </p>
          <div className="pt-2">
            <Button 
              variant="primary" 
              size="lg" 
              className="shadow-lg hover:scale-105 transition-all"
              onClick={() => navigate('/signup')}
            >
              Create your alumni profile
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
