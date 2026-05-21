import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Sidebar from '../../components/layout/Sidebar';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Toggle from '../../components/ui/Toggle';
import { 
  User, 
  Mail, 
  Phone, 
  GraduationCap, 
  MapPin, 
  Briefcase, 
  Linkedin, 
  MessageSquare, 
  Facebook, 
  FileText,
  CheckCircle2, 
  AlertCircle,
  Edit3,
  Save,
  Eye
} from 'lucide-react';

export const MyProfile = () => {
  const { demoUser, updateDemoUser } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [toast, setToast] = useState(null);

  // Fallback initial values
  const user = demoUser || {
    name: 'Arjun Kumar',
    initials: 'AK',
    batch: 2015,
    branch: 'Computer Science',
    rollNo: 'CS15B042',
    city: 'Hyderabad',
    employer: 'Google India',
    linkedin: 'linkedin.com/in/arjunkumar',
    whatsapp: '+91 98765 43210',
    facebook: 'facebook.com/arjunkumar',
    profileComplete: 65
  };

  // Local Form States
  const [fields, setFields] = useState({
    name: user.name,
    email: 'arjun@google.com',
    whatsapp: user.whatsapp,
    batch: user.batch,
    branch: user.branch,
    rollNo: user.rollNo,
    city: user.city,
    employer: user.employer,
    linkedin: user.linkedin,
    facebook: user.facebook,
  });

  // Local Toggles
  const [visibility, setVisibility] = useState({
    showEmail: false,
    showEmployer: true,
    showCity: true,
    allowDms: true
  });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleToggleChange = (key, val) => {
    setVisibility(prev => ({ ...prev, [key]: val }));
    showToast(`Visibility setting updated!`, 'success');
  };

  const handleFieldChange = (key, val) => {
    setFields(prev => ({ ...prev, [key]: val }));
  };

  const handleSave = () => {
    // Calculate new completeness (simple mock logic)
    let filledCount = 0;
    Object.values(fields).forEach(v => {
      if (v && v.trim() && v !== '—') filledCount++;
    });
    const completeness = Math.min(Math.floor((filledCount / 10) * 100), 100);

    // Save to global context
    updateDemoUser({
      name: fields.name,
      batch: Number(fields.batch),
      branch: fields.branch,
      rollNo: fields.rollNo,
      city: fields.city,
      employer: fields.employer,
      linkedin: fields.linkedin,
      whatsapp: fields.whatsapp,
      facebook: fields.facebook,
      profileComplete: completeness
    });

    setIsEditing(false);
    showToast('Profile updated successfully!', 'success');
  };

  const handleCancel = () => {
    setFields({
      name: user.name,
      email: 'arjun@google.com',
      whatsapp: user.whatsapp,
      batch: user.batch,
      branch: user.branch,
      rollNo: user.rollNo,
      city: user.city,
      employer: user.employer,
      linkedin: user.linkedin,
      facebook: user.facebook,
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen flex bg-surface font-sans pb-16 md:pb-0">
      <Sidebar />

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-[99999] flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-xs font-semibold font-sora border animate-slide-in backdrop-blur-sm ${
          toast.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
          'bg-blue-50 border-blue-200 text-blue-800'
        }`}>
          <CheckCircle2 className="w-4 h-4 text-green-600" />
          <span>{toast.message}</span>
        </div>
      )}

      <main className="flex-1 md:ml-20 lg:ml-56 p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* Header Title */}
        <section className="flex items-center justify-between pb-2 border-b border-gray-200">
          <div>
            <h1 className="text-xl font-extrabold font-sora text-primary">My Profile</h1>
            <p className="text-xs text-gray-500 font-sans">Manage your personal and professional profile details</p>
          </div>
          {!isEditing ? (
            <Button
              variant="secondary"
              size="sm"
              className="flex items-center gap-1.5 text-xs font-semibold"
              onClick={() => setIsEditing(true)}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-xs font-semibold"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="flex items-center gap-1.5 text-xs font-semibold shadow"
                onClick={handleSave}
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </Button>
            </div>
          )}
        </section>

        {/* Profile Card Header */}
        <section>
          <Card className="p-6 flex flex-col sm:flex-row items-center gap-6 border border-gray-150">
            {/* Initials Circle */}
            <div className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center font-extrabold font-sora text-2xl shadow-md border-2 border-accent flex-shrink-0">
              {user.initials}
            </div>

            {/* Basic Info & Completeness */}
            <div className="flex-1 space-y-3 text-center sm:text-left w-full">
              <div>
                <h2 className="text-lg font-extrabold font-sora text-primary">{fields.name}</h2>
                <p className="text-xs text-gray-500 font-sans mt-0.5">
                  Class of {fields.batch} · {fields.branch}
                </p>
              </div>

              {/* Progress bar */}
              <div className="space-y-1 max-w-md mx-auto sm:mx-0">
                <div className="flex justify-between items-center text-[10px] font-semibold text-gray-500 uppercase tracking-wider font-sora">
                  <span>Profile Completeness</span>
                  <span className="text-accent">{user.profileComplete}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 border border-gray-200">
                  <div 
                    className="bg-accent h-1.8 rounded-full transition-all duration-500" 
                    style={{ width: `${user.profileComplete}%` }}
                  />
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Details Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main profile form (80%) */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 border border-gray-150">
              <h3 className="text-xs uppercase tracking-wider font-bold text-gray-400 font-sora mb-6 border-b border-gray-100 pb-2">
                Personal & Professional Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* 1. Name */}
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider font-sora block">Full Name</label>
                  {isEditing ? (
                    <Input value={fields.name} onChange={(e) => handleFieldChange('name', e.target.value)} />
                  ) : (
                    <p className="text-sm font-bold text-gray-800 font-sans bg-gray-50 px-3 py-2 rounded border border-gray-100">{fields.name || '—'}</p>
                  )}
                </div>

                {/* 2. Email */}
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider font-sora block">Email Address</label>
                  {isEditing ? (
                    <Input value={fields.email} onChange={(e) => handleFieldChange('email', e.target.value)} />
                  ) : (
                    <p className="text-sm font-bold text-gray-800 font-sans bg-gray-50 px-3 py-2 rounded border border-gray-100">{fields.email || '—'}</p>
                  )}
                </div>

                {/* 3. Mobile/Whatsapp */}
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider font-sora block">WhatsApp Number</label>
                  {isEditing ? (
                    <Input value={fields.whatsapp} onChange={(e) => handleFieldChange('whatsapp', e.target.value)} />
                  ) : (
                    <p className="text-sm font-bold text-gray-800 font-sans bg-gray-50 px-3 py-2 rounded border border-gray-100">{fields.whatsapp || '—'}</p>
                  )}
                </div>

                {/* 4. Batch Year */}
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider font-sora block">Batch Year</label>
                  {isEditing ? (
                    <select
                      value={fields.batch}
                      onChange={(e) => handleFieldChange('batch', e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    >
                      {Array.from({ length: 2023 - 1975 + 1 }, (_, i) => 2023 - i).map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  ) : (
                    <p className="text-sm font-bold text-gray-800 font-sans bg-gray-50 px-3 py-2 rounded border border-gray-100">{fields.batch || '—'}</p>
                  )}
                </div>

                {/* 5. Branch */}
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider font-sora block">Branch</label>
                  {isEditing ? (
                    <Input value={fields.branch} onChange={(e) => handleFieldChange('branch', e.target.value)} />
                  ) : (
                    <p className="text-sm font-bold text-gray-800 font-sans bg-gray-50 px-3 py-2 rounded border border-gray-100">{fields.branch || '—'}</p>
                  )}
                </div>

                {/* 6. Roll Number */}
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider font-sora block">Roll Number</label>
                  {isEditing ? (
                    <Input value={fields.rollNo} onChange={(e) => handleFieldChange('rollNo', e.target.value)} />
                  ) : (
                    <p className="text-sm font-bold text-gray-800 font-sans bg-gray-50 px-3 py-2 rounded border border-gray-100">{fields.rollNo || '—'}</p>
                  )}
                </div>

                {/* 7. City */}
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider font-sora block">Current City</label>
                  {isEditing ? (
                    <Input value={fields.city} onChange={(e) => handleFieldChange('city', e.target.value)} />
                  ) : (
                    <p className="text-sm font-bold text-gray-800 font-sans bg-gray-50 px-3 py-2 rounded border border-gray-100">{fields.city || '—'}</p>
                  )}
                </div>

                {/* 8. Employer */}
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider font-sora block">Current Employer</label>
                  {isEditing ? (
                    <Input value={fields.employer} onChange={(e) => handleFieldChange('employer', e.target.value)} />
                  ) : (
                    <p className="text-sm font-bold text-gray-800 font-sans bg-gray-50 px-3 py-2 rounded border border-gray-100">{fields.employer || '—'}</p>
                  )}
                </div>

                {/* 9. LinkedIn */}
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider font-sora block">LinkedIn URL</label>
                  {isEditing ? (
                    <Input value={fields.linkedin} onChange={(e) => handleFieldChange('linkedin', e.target.value)} />
                  ) : (
                    <p className="text-sm font-bold text-gray-800 font-sans bg-gray-50 px-3 py-2 rounded border border-gray-100 truncate">{fields.linkedin || '—'}</p>
                  )}
                </div>

                {/* 10. Facebook */}
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider font-sora block">Facebook URL</label>
                  {isEditing ? (
                    <Input value={fields.facebook} onChange={(e) => handleFieldChange('facebook', e.target.value)} />
                  ) : (
                    <p className="text-sm font-bold text-gray-800 font-sans bg-gray-50 px-3 py-2 rounded border border-gray-100 truncate">{fields.facebook || '—'}</p>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: Visibility Toggles (33%) */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-6 border border-gray-150">
              <h3 className="text-xs uppercase tracking-wider font-bold text-gray-400 font-sora mb-6 border-b border-gray-100 pb-2 flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-accent" />
                <span>Privacy Settings</span>
              </h3>

              <div className="space-y-5">
                <Toggle
                  label="Show Email"
                  description="Let other alumni see your address"
                  checked={visibility.showEmail}
                  onChange={(v) => handleToggleChange('showEmail', v)}
                />
                <Toggle
                  label="Show Employer"
                  description="Display your current workplace details"
                  checked={visibility.showEmployer}
                  onChange={(v) => handleToggleChange('showEmployer', v)}
                />
                <Toggle
                  label="Show City"
                  description="Publish your current residential city"
                  checked={visibility.showCity}
                  onChange={(v) => handleToggleChange('showCity', v)}
                />
                <Toggle
                  label="Allow Direct DMs"
                  description="Enable chat messages from classmates"
                  checked={visibility.allowDms}
                  onChange={(v) => handleToggleChange('allowDms', v)}
                />
              </div>
            </Card>
          </div>

        </section>
      </main>
    </div>
  );
};

export default MyProfile;
