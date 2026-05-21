import React from 'react';
import { useApp } from '../../context/AppContext';
import { Award, Heart, Share2, Calendar, ShieldCheck } from 'lucide-react';
import logo from '../../assets/logo.png'; // Will fallback if missing

export const ShareCard = ({ styleType, customAmount }) => {
  const { demoUser, institution } = useApp();
  
  // Use customAmount if passed, else fallback to demoUser's total donated or default 10000
  const displayAmount = customAmount || (demoUser ? demoUser.donated : 10000);
  const formattedAmount = `₹${Number(displayAmount).toLocaleString('en-IN')}`;

  const renderLogo = () => {
    return logo ? (
      <img src={logo} alt="Logo" className="h-6 w-auto object-contain" />
    ) : (
      <div className="bg-accent text-white font-sora font-extrabold text-[10px] px-2 py-0.5 rounded">
        {institution.shortName}
      </div>
    );
  };

  if (styleType === 'story') {
    // 9:16 portrait style card
    return (
      <div className="w-full max-w-[280px] aspect-[9/16] bg-primary text-white p-6 rounded-xl flex flex-col justify-between shadow-xl border border-white border-opacity-10 bg-dot-grid relative overflow-hidden mx-auto">
        {/* Dynamic primary bg gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary-dark via-primary to-transparent opacity-80 pointer-events-none" />
        
        {/* Top Header */}
        <div className="relative z-10 flex items-center justify-between border-b border-white border-opacity-10 pb-3">
          {renderLogo()}
          <span className="text-[8px] font-sora tracking-widest font-semibold opacity-60">
            STORY PREVIEW
          </span>
        </div>

        {/* Mid Section */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center my-6 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-accent bg-opacity-20 flex items-center justify-center text-accent">
            <Heart className="w-7 h-7 fill-accent" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-sora tracking-wider text-accent font-bold">
              GuruDakshina Contributor
            </p>
            <h2 className="text-2xl font-extrabold font-sora mt-1 tracking-tight text-white">
              {demoUser?.name || 'Arjun Kumar'}
            </h2>
            <p className="text-[10px] text-light text-opacity-70 mt-0.5">
              Batch of {demoUser?.batch || 2015} · CS
            </p>
          </div>
          
          <div className="bg-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-15 p-4 rounded-lg w-full">
            <p className="text-[9px] uppercase tracking-wider text-light text-opacity-60">Contributed Amount</p>
            <p className="text-3xl font-extrabold text-accent mt-0.5 font-sora tracking-tight">{formattedAmount}</p>
            <p className="text-[9px] text-light text-opacity-80 italic mt-2">"Supporting excellence in technical education"</p>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="relative z-10 border-t border-white border-opacity-10 pt-4 flex flex-col items-center justify-center text-center space-y-1.5">
          <div className="flex gap-4 text-center justify-center w-full">
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-sora font-bold text-accent">#{demoUser?.rank || 14}</span>
              <span className="text-[7px] text-light text-opacity-50 uppercase">Global Rank</span>
            </div>
            <div className="w-px bg-white bg-opacity-10 h-6" />
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-sora font-bold text-accent">{demoUser?.impactScore || 42} pts</span>
              <span className="text-[7px] text-light text-opacity-50 uppercase">Impact Score</span>
            </div>
          </div>
          <span className="text-[8px] text-light text-opacity-40 font-mono select-all">
            alumni.gitc.edu/give?ref=AK2015
          </span>
        </div>
      </div>
    );
  }

  if (styleType === 'certificate') {
    // Elegant bordered certificate style card
    return (
      <div className="w-full max-w-[480px] bg-[#FAF8F5] text-gray-800 p-8 rounded-xl shadow-lg border-4 border-double border-[#C49A22] relative overflow-hidden mx-auto font-sans">
        {/* Certificate Seal Placeholder */}
        <div className="absolute right-6 bottom-6 opacity-10 flex flex-col items-center">
          <Award className="w-20 h-20 text-accent" />
          <span className="text-[9px] font-extrabold tracking-widest font-sora mt-1 text-center">GITC SEAL</span>
        </div>

        {/* Certificate Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex flex-col">
            <span className="text-[10px] font-sora tracking-widest font-bold text-accent uppercase">
              {institution.name}
            </span>
            <span className="text-[8px] text-gray-400 font-sans">Established {institution.establishedYear}</span>
          </div>
          {renderLogo()}
        </div>

        {/* Main Certificate Content */}
        <div className="text-center space-y-4 my-8">
          <h2 className="text-lg font-bold font-sora tracking-wide text-primary border-b border-accent border-opacity-20 pb-2 max-w-xs mx-auto">
            CERTIFICATE OF CONTRIBUTION
          </h2>
          <p className="text-[11px] text-gray-500 font-sans">
            This certificate is gratefully presented to
          </p>
          <h3 className="text-2xl font-extrabold text-primary font-sora tracking-tight">
            {demoUser?.name || 'Arjun Kumar'}
          </h3>
          <p className="text-[11px] text-gray-500 max-w-sm mx-auto leading-relaxed">
            for their generous donation of <span className="font-bold text-accent">{formattedAmount}</span> to the **GuruDakshina** Annual Giving Program in support of student scholarship funds and institutional research excellence.
          </p>
        </div>

        {/* Certificate Footer */}
        <div className="flex justify-between items-end border-t border-gray-100 pt-4 mt-6">
          <div className="flex flex-col">
            <span className="text-[9px] font-mono text-gray-400">REF: AK2015-DON-V1</span>
            <span className="text-[8px] text-gray-400 font-sans mt-0.5">Date: {new Date().toLocaleDateString('en-IN')}</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 border-b border-gray-400 h-6 mb-1 relative flex items-center justify-center">
              <span className="text-[9px] font-sora italic text-accent opacity-70">GitcAlumni</span>
            </div>
            <span className="text-[8px] text-gray-400 font-bold uppercase font-sora">Alumni President</span>
          </div>
        </div>
      </div>
    );
  }

  // Default 'wrapped' style card
  return (
    <div className="w-full max-w-[380px] bg-primary text-white p-6 rounded-xl shadow-lg border border-white border-opacity-10 bg-dot-grid relative overflow-hidden mx-auto">
      {/* Background radial accent flare */}
      <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-accent opacity-15 filter blur-3xl" />
      
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white border-opacity-10 pb-3 mb-4">
        <div className="flex items-center gap-2">
          {renderLogo()}
          <span className="text-[9px] font-sora font-semibold tracking-wider text-light text-opacity-80">
            {institution.shortName} ALUMNI IMPACT
          </span>
        </div>
        <span className="bg-accent text-white font-sora font-bold text-[8px] px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
          <Heart className="w-2 h-2 fill-white" /> GuruDakshina
        </span>
      </div>

      {/* Main Stats Row */}
      <div className="my-6">
        <span className="text-[10px] uppercase font-sora tracking-widest text-accent font-semibold">
          Donated Amount
        </span>
        <div className="text-4xl font-extrabold font-sora text-accent tracking-tight mt-1 flex items-baseline">
          {formattedAmount}
        </div>
      </div>

      {/* Profile Details */}
      <div className="flex items-center justify-between border-t border-b border-white border-opacity-10 py-4 my-4">
        <div>
          <div className="font-sora font-bold text-sm text-white">
            {demoUser?.name || 'Arjun Kumar'}
          </div>
          <div className="text-xs text-light text-opacity-60 mt-0.5">
            Batch of {demoUser?.batch || 2015} · CS
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-light text-opacity-60">Global Rank</div>
          <div className="font-sora font-extrabold text-sm text-accent mt-0.5">
            #{demoUser?.rank || 14}
          </div>
        </div>
      </div>

      {/* Stats Summary Footnotes */}
      <div className="flex items-center justify-between text-[10px] text-light text-opacity-70 mt-4">
        <div className="flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5 text-accent" />
          <span>Impact: {demoUser?.impactScore || 42} pts</span>
        </div>
        <span className="text-[9px] font-mono text-opacity-40">
          ref=AK2015
        </span>
      </div>
    </div>
  );
};

export default ShareCard;
