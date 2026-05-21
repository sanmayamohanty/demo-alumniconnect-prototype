import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import AdminSidebar from '../../components/layout/AdminSidebar';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';
import { 
  Palette, 
  Check, 
  UploadCloud, 
  Sparkles,
  Info,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import logoPng from '../../assets/logo.png';
import logoSvg from '../../assets/logo.svg';

export const BrandingTheme = () => {
  const { institution, setInstitution } = useApp();
  const [toastMessage, setToastMessage] = useState('');

  // Local state for branding controls
  const [instName, setInstName] = useState(institution.name);
  const [shortName, setShortName] = useState(institution.shortName);
  const [primaryCol, setPrimaryCol] = useState(institution.primaryColor);
  const [accentCol, setAccentCol] = useState(institution.accentColor);
  const [established, setEstablished] = useState(institution.establishedYear);
  const [fontFamily, setFontFamily] = useState('Sora');

  const heroHeadline = `Where ${shortName} graduates stay connected.`;

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleApplyChanges = (e) => {
    e.preventDefault();
    setInstitution({
      name: instName,
      shortName: shortName,
      primaryColor: primaryCol,
      accentColor: accentCol,
      establishedYear: Number(established)
    });
    triggerToast('Theme applied across the portal successfully!');
  };

  const handleReset = () => {
    setInstName('Gram Vidyapeeth Inter College');
    setShortName('GITC');
    setPrimaryCol('#1A3A5C');
    setAccentCol('#C49A22');
    setEstablished(1975);
    setFontFamily('Sora');
    triggerToast('Values reset to system defaults.');
  };

  const logoFile = logoSvg || logoPng;

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
              <Palette className="w-6 h-6 text-accent" />
              <span>Branding & Theme</span>
            </h1>
            <p className="text-xs text-gray-500 font-sans mt-0.5">
              Customize portal colors, naming convention, and institution logo assets
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-xs font-semibold px-4 py-2 bg-white text-gray-600 border-gray-200"
              onClick={handleReset}
            >
              Reset Defaults
            </Button>
            <Button
              variant="accent"
              size="sm"
              className="text-xs font-semibold px-4 py-2 hover:scale-[1.02] transition-transform flex items-center gap-1.5"
              onClick={handleApplyChanges}
            >
              <Check className="w-4 h-4" />
              <span>Apply Changes Live</span>
            </Button>
          </div>
        </section>

        {/* Two Column Layout */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Color pickers & forms (50%) */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xs font-extrabold font-sora text-primary uppercase tracking-wider">
              Branding Configurations
            </h3>

            <Card className="p-5 bg-white border border-gray-150 space-y-4">
              <div className="space-y-1">
                <label className="text-[9px] font-extrabold font-sora uppercase text-gray-450">Institution Full Name</label>
                <Input
                  type="text"
                  value={instName}
                  onChange={(e) => setInstName(e.target.value)}
                  className="w-full text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[9px] font-extrabold font-sora uppercase text-gray-450">Abbreviation</label>
                  <Input
                    type="text"
                    value={shortName}
                    onChange={(e) => setShortName(e.target.value)}
                    className="w-full text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-extrabold font-sora uppercase text-gray-450">Est. Year</label>
                  <Input
                    type="number"
                    value={established}
                    onChange={(e) => setEstablished(e.target.value)}
                    className="w-full text-xs"
                  />
                </div>
              </div>

              {/* Logo asset detector */}
              <div className="space-y-1">
                <label className="text-[9px] font-extrabold font-sora uppercase text-gray-450">Logo Graphic</label>
                <div className="border border-dashed border-emerald-200 bg-emerald-50 bg-opacity-30 p-3 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <UploadCloud className="w-4 h-4 text-emerald-600" />
                    <div>
                      <p className="text-[10px] font-bold text-emerald-800">logo.png / logo.svg detected</p>
                      <p className="text-[8px] text-emerald-650 leading-none">Located in source assets folder</p>
                    </div>
                  </div>
                  <Badge variant="success" className="text-[8px] font-bold font-sora">ACTIVE</Badge>
                </div>
              </div>

              {/* Color Pickers */}
              <div className="space-y-3 pt-2 border-t border-gray-100">
                <label className="text-[9px] font-extrabold font-sora uppercase text-gray-450 block">Portal Theme Colors</label>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-150">
                    <input
                      type="color"
                      value={primaryCol}
                      onChange={(e) => setPrimaryCol(e.target.value)}
                      className="w-8 h-8 rounded cursor-pointer border border-gray-300"
                    />
                    <div>
                      <p className="text-[9px] font-bold text-gray-500 uppercase leading-none">Primary</p>
                      <p className="text-[10px] font-mono font-semibold text-gray-800 mt-1">{primaryCol}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-150">
                    <input
                      type="color"
                      value={accentCol}
                      onChange={(e) => setAccentCol(e.target.value)}
                      className="w-8 h-8 rounded cursor-pointer border border-gray-300"
                    />
                    <div>
                      <p className="text-[9px] font-bold text-gray-500 uppercase leading-none">Accent/Gold</p>
                      <p className="text-[10px] font-mono font-semibold text-gray-800 mt-1">{accentCol}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fonts */}
              <div className="space-y-1">
                <label className="text-[9px] font-extrabold font-sora uppercase text-gray-450">Typography Set</label>
                <select
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value)}
                  className="px-2.5 py-1.5 w-full text-xs font-sans border border-gray-250 rounded bg-white text-gray-650 focus:outline-none"
                >
                  <option value="Sora">Sora (Headings) + DM Sans (Body)</option>
                  <option value="Inter">Inter UI (Modern Clean)</option>
                  <option value="Roboto">Roboto (Standard Web)</option>
                </select>
              </div>

            </Card>
          </div>

          {/* Right Column: Live mini preview (70%) */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-xs font-extrabold font-sora text-primary uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-accent" />
              <span>2. Real-time Layout Preview</span>
            </h3>

            {/* Simulated Homepage View */}
            <div className="border border-gray-200 rounded-xl overflow-hidden shadow-md bg-white font-sans">
              
              {/* Simulated Header Navbar */}
              <div className="p-3 border-b border-gray-100 flex items-center justify-between text-[9px] font-semibold" style={{ borderTop: `4px solid ${primaryCol}` }}>
                <div className="flex items-center gap-1.5">
                  {logoFile ? (
                    <img src={logoFile} alt="Logo" className="h-4 w-auto object-contain" />
                  ) : (
                    <div className="text-white font-bold text-[8px] px-1.5 py-0.5 rounded" style={{ backgroundColor: accentCol }}>
                      {shortName}
                    </div>
                  )}
                  <span className="font-sora font-extrabold text-[10px]" style={{ color: primaryCol }}>{instName}</span>
                </div>
                <div className="flex gap-2 text-gray-500 scale-90">
                  <span>About</span>
                  <span>Programs</span>
                  <span>Give Back</span>
                </div>
                <div className="scale-90">
                  <span className="text-white px-2 py-0.5 rounded text-[8px] font-bold" style={{ backgroundColor: accentCol }}>Sign Up</span>
                </div>
              </div>

              {/* Simulated Hero Section */}
              <div className="p-8 text-center text-white relative overflow-hidden bg-dot-grid" style={{ backgroundColor: primaryCol }}>
                <div className="absolute inset-0 bg-black bg-opacity-20" />
                <div className="relative z-10 space-y-2">
                  <span className="text-[7px] tracking-widest font-extrabold font-sora uppercase px-2 py-0.5 rounded-full bg-white bg-opacity-10 text-white">
                    {shortName} Alumni Network · Est. {established}
                  </span>
                  <h4 className="text-sm font-extrabold font-sora tracking-tight max-w-xs mx-auto leading-snug">
                    {heroHeadline}
                  </h4>
                  <p className="text-[9px] text-light text-opacity-80 max-w-sm mx-auto leading-relaxed">
                    Build connections, mentor juniors, and support your alma mater.
                  </p>
                  
                  <div className="pt-2 flex justify-center gap-2 scale-90">
                    <button className="px-3 py-1 rounded text-[8px] font-extrabold font-sora" style={{ backgroundColor: accentCol, color: '#fff' }}>
                      Create Profile
                    </button>
                    <button className="px-3 py-1 rounded text-[8px] font-extrabold font-sora border border-white border-opacity-30 bg-transparent text-white">
                      Sign In
                    </button>
                  </div>
                </div>
              </div>

              {/* Simulated Stats Bar */}
              <div className="p-2.5 grid grid-cols-3 gap-1 text-center text-[8px]" style={{ backgroundColor: accentCol, color: '#fff' }}>
                <div>
                  <p className="font-extrabold font-sora text-[10px]">15,000+</p>
                  <p className="text-[6px] uppercase tracking-wider font-semibold opacity-80 leading-none">Alumni Globally</p>
                </div>
                <div className="border-l border-white border-opacity-20">
                  <p className="font-extrabold font-sora text-[10px]">₹4.2 Cr</p>
                  <p className="text-[6px] uppercase tracking-wider font-semibold opacity-80 leading-none">Funds Raised</p>
                </div>
                <div className="border-l border-white border-opacity-20">
                  <p className="font-extrabold font-sora text-[10px]">320+</p>
                  <p className="text-[6px] uppercase tracking-wider font-semibold opacity-80 leading-none">Active Mentors</p>
                </div>
              </div>

              {/* Preview Footer Notes */}
              <div className="p-3 bg-gray-50 flex items-center justify-between text-[8px] text-gray-400 border-t border-gray-150">
                <span>Powered by Alumni Connect</span>
                <span className="flex items-center gap-0.5"><Info className="w-2.5 h-2.5 text-gray-300" /> Interactive Preview</span>
              </div>

            </div>
          </div>

        </section>
      </main>
    </div>
  );
};

export default BrandingTheme;
