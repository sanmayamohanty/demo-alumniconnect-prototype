import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import logoPng from '../../assets/logo.png';
import logoSvg from '../../assets/logo.svg';
import { 
  Chrome, 
  Facebook, 
  ArrowRight, 
  ArrowLeft, 
  GraduationCap, 
  Briefcase, 
  Check, 
  Clock, 
  AlertCircle,
  FileCheck2
} from 'lucide-react';

export const SignUpPage = () => {
  const { institution } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [toast, setToast] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    batch: '',
    branch: '',
    rollNo: '',
    city: '',
    employer: '',
    linkedin: '',
    whatsapp: '',
    facebook: '',
    bio: '',
    confirmCheck: false
  });

  const [errors, setErrors] = useState({});

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateStep2 = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email';
    }
    if (!formData.batch) tempErrors.batch = 'Batch year is required';
    if (!formData.branch) tempErrors.branch = 'Branch is required';
    if (!formData.rollNo.trim()) tempErrors.rollNo = 'Roll number is required';
    if (!formData.city.trim()) tempErrors.city = 'Current city is required';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const validateStep3 = () => {
    const tempErrors = {};
    if (!formData.whatsapp.trim()) {
      tempErrors.whatsapp = 'WhatsApp number is required';
    } else if (!/^\+?[0-9\s-]{10,15}$/.test(formData.whatsapp.replace(/\s/g, ''))) {
      tempErrors.whatsapp = 'Please enter a valid phone number';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 2 && !validateStep2()) {
      showToast('Please correct the highlighted errors.', 'error');
      return;
    }
    if (step === 3 && !validateStep3()) {
      showToast('Please enter a valid WhatsApp number.', 'error');
      return;
    }
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleSocialRegister = (platform) => {
    showToast(`${platform} registration is not active in prototype. Please use Email manual registration.`, 'warning');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.confirmCheck) {
      showToast('Please confirm your status by checking the checkbox.', 'error');
      return;
    }
    // Proceed to success submission step
    setStep(5);
  };

  const getLogo = () => {
    const logoFile = logoSvg || logoPng;
    if (logoFile) {
      return <img src={logoFile} alt="Logo" className="h-10 w-auto object-contain mx-auto" />;
    }
    return (
      <div className="bg-accent text-white font-sora font-extrabold text-base px-3 py-1.5 rounded-md inline-block">
        {institution.shortName}
      </div>
    );
  };

  // Render step circles
  const renderStepIndicator = () => {
    if (step > 4) return null;
    return (
      <div className="flex items-center justify-center gap-2 mb-8 select-none">
        {[1, 2, 3, 4].map((num) => {
          const isActive = step === num;
          const isCompleted = step > num;
          return (
            <React.Fragment key={num}>
              {num > 1 && (
                <div className={`h-0.5 w-8 transition-colors duration-300 ${
                  isCompleted ? 'bg-accent' : 'bg-gray-200'
                }`} />
              )}
              <div 
                className={`w-7 h-7 rounded-full flex items-center justify-center font-sora font-bold text-[11px] transition-all border ${
                  isActive ? 'bg-primary text-white border-primary shadow-md scale-105' :
                  isCompleted ? 'bg-accent text-white border-accent' :
                  'bg-gray-100 text-gray-400 border-gray-200'
                }`}
              >
                {isCompleted ? <Check className="w-3.5 h-3.5" /> : num}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-light bg-opacity-40 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative font-sans">
      
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-[99999] flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-xs font-semibold font-sora border animate-slide-in backdrop-blur-sm ${
          toast.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
          toast.type === 'warning' ? 'bg-amber-50 border-amber-200 text-amber-800' :
          toast.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
          'bg-blue-50 border-blue-200 text-blue-800'
        }`}>
          {toast.type === 'success' ? <Check className="w-4 h-4 text-green-600" /> : <AlertCircle className="w-4 h-4 text-amber-600" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Main card */}
      <Card className="max-w-xl w-full p-8 bg-white border border-gray-100 shadow-xl relative">
        <div className="text-center space-y-2 mb-6">
          {getLogo()}
          {step <= 4 && (
            <>
              <h2 className="text-xl font-extrabold font-sora text-primary">
                Create Alumni Profile
              </h2>
              <p className="text-xs text-gray-500 font-sans">
                Join the {institution.name} alumni network
              </p>
            </>
          )}
        </div>

        {renderStepIndicator()}

        {/* Step 1: Authentication */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center space-y-1">
              <h3 className="text-sm font-bold text-gray-700 font-sora">Step 1: Choose Authentication Method</h3>
              <p className="text-xs text-gray-400">Select how you want to sign in to your dashboard</p>
            </div>
            
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => handleSocialRegister('Google')}
                className="w-full flex items-center justify-center gap-2.5 px-4 py-2.5 border border-gray-300 rounded-md bg-white hover:bg-gray-50 text-xs font-semibold text-gray-700 transition-colors"
              >
                <Chrome className="w-4 h-4 text-red-500" />
                <span>Continue with Google</span>
              </button>
              <button
                type="button"
                onClick={() => handleSocialRegister('Facebook')}
                className="w-full flex items-center justify-center gap-2.5 px-4 py-2.5 border border-gray-300 rounded-md bg-white hover:bg-gray-50 text-xs font-semibold text-gray-700 transition-colors"
              >
                <Facebook className="w-4 h-4 text-blue-600" />
                <span>Continue with Facebook</span>
              </button>
            </div>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink mx-4 text-[10px] text-gray-400 font-semibold uppercase tracking-wider">or register manually</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <Button
              variant="secondary"
              className="w-full flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold uppercase tracking-wider"
              onClick={handleNext}
            >
              <span>Register with Email</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Step 2: Academic Details */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center space-y-1">
              <h3 className="text-sm font-bold text-gray-700 font-sora">Step 2: Academic Credentials</h3>
              <p className="text-xs text-gray-400">Fill in details matching your graduation records</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name*"
                placeholder="e.g. Arjun Kumar"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                error={errors.name}
              />
              <Input
                label="Email Address*"
                type="email"
                placeholder="e.g. arjun@google.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                error={errors.email}
              />
              
              <div className="w-full">
                <label className="block text-xs font-semibold text-gray-700 mb-1.5 font-sora">
                  Batch Year*
                </label>
                <select
                  value={formData.batch}
                  onChange={(e) => handleInputChange('batch', e.target.value)}
                  className={`w-full px-3 py-2 text-sm rounded-md border bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                    errors.batch ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Batch</option>
                  {Array.from({ length: 2023 - 1975 + 1 }, (_, i) => 2023 - i).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                {errors.batch && <p className="mt-1 text-xs text-red-600 font-sans">{errors.batch}</p>}
              </div>

              <div className="w-full">
                <label className="block text-xs font-semibold text-gray-700 mb-1.5 font-sora">
                  Branch/Degree*
                </label>
                <select
                  value={formData.branch}
                  onChange={(e) => handleInputChange('branch', e.target.value)}
                  className={`w-full px-3 py-2 text-sm rounded-md border bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                    errors.branch ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Branch</option>
                  <option value="Computer Science">Computer Science (CS)</option>
                  <option value="Electronics & Communication">Electronics & Communication (ECE)</option>
                  <option value="Mechanical Engineering">Mechanical Engineering (ME)</option>
                  <option value="Electrical Engineering">Electrical Engineering (EEE)</option>
                  <option value="Civil Engineering">Civil Engineering</option>
                  <option value="Chemical Engineering">Chemical Engineering</option>
                  <option value="Information Technology">Information Technology (IT)</option>
                  <option value="MBA">MBA</option>
                </select>
                {errors.branch && <p className="mt-1 text-xs text-red-600 font-sans">{errors.branch}</p>}
              </div>

              <Input
                label="Roll Number / Registration ID*"
                placeholder="e.g. CS15B042"
                value={formData.rollNo}
                onChange={(e) => handleInputChange('rollNo', e.target.value)}
                error={errors.rollNo}
              />
              <Input
                label="Current Residential City*"
                placeholder="e.g. Hyderabad"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                error={errors.city}
              />
            </div>

            <div className="flex justify-between gap-4 pt-4 border-t border-gray-100">
              <Button variant="outline" className="flex items-center gap-1 text-xs font-bold" onClick={handleBack}>
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>
              <Button variant="secondary" className="flex items-center gap-1 text-xs font-bold" onClick={handleNext}>
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Professional & Contact Details */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center space-y-1">
              <h3 className="text-sm font-bold text-gray-700 font-sora">Step 3: Professional & Contact Info</h3>
              <p className="text-xs text-gray-400">Help batchmates connect with you professionally</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Current Employer / Company"
                placeholder="e.g. Google India"
                value={formData.employer}
                onChange={(e) => handleInputChange('employer', e.target.value)}
              />
              <Input
                label="WhatsApp Phone Number* (for verification)"
                placeholder="e.g. +91 98765 43210"
                value={formData.whatsapp}
                onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                error={errors.whatsapp}
              />
              <Input
                label="LinkedIn Profile URL"
                placeholder="linkedin.com/in/username"
                value={formData.linkedin}
                onChange={(e) => handleInputChange('linkedin', e.target.value)}
              />
              <Input
                label="Facebook Profile URL"
                placeholder="facebook.com/username"
                value={formData.facebook}
                onChange={(e) => handleInputChange('facebook', e.target.value)}
              />
            </div>

            <div className="w-full">
              <label className="block text-xs font-semibold text-gray-700 mb-1.5 font-sora">
                Short Bio (Optional)
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                rows={3}
                placeholder="Briefly describe your career achievements or details..."
                className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>

            <div className="flex justify-between gap-4 pt-4 border-t border-gray-100">
              <Button variant="outline" className="flex items-center gap-1 text-xs font-bold" onClick={handleBack}>
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>
              <Button variant="secondary" className="flex items-center gap-1 text-xs font-bold" onClick={handleNext}>
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Review and Submit */}
        {step === 4 && (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="text-center space-y-1">
              <h3 className="text-sm font-bold text-gray-700 font-sora">Step 4: Review Your Profile</h3>
              <p className="text-xs text-gray-400">Confirm all details before submitting for approval</p>
            </div>

            <div className="bg-light bg-opacity-30 border border-gray-100 p-5 rounded-lg space-y-4 text-xs font-sans text-gray-700">
              <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                <div>
                  <span className="text-[10px] text-gray-400 font-semibold uppercase block">Name</span>
                  <span className="font-bold text-primary">{formData.name || '—'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-semibold uppercase block">Email</span>
                  <span className="font-bold text-primary">{formData.email || '—'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-semibold uppercase block">Academic credentials</span>
                  <span className="font-bold text-primary">Class of {formData.batch} · {formData.branch}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-semibold uppercase block">Roll number</span>
                  <span className="font-bold text-primary">{formData.rollNo || '—'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-semibold uppercase block">City</span>
                  <span className="font-bold text-primary">{formData.city || '—'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-semibold uppercase block">Employer</span>
                  <span className="font-bold text-primary">{formData.employer || '—'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-semibold uppercase block">WhatsApp</span>
                  <span className="font-bold text-primary">{formData.whatsapp || '—'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-semibold uppercase block">LinkedIn</span>
                  <span className="font-bold text-primary truncate block max-w-[180px]">{formData.linkedin || '—'}</span>
                </div>
              </div>
            </div>

            {/* Checkbox confirmation */}
            <div className="flex items-start gap-2.5">
              <input
                id="confirmCheck"
                type="checkbox"
                checked={formData.confirmCheck}
                onChange={(e) => handleInputChange('confirmCheck', e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent"
                required
              />
              <label htmlFor="confirmCheck" className="text-xs text-gray-600 leading-snug">
                I confirm that I am an alumnus/alumna of <span className="font-semibold text-primary">{institution.name}</span> and the information provided is accurate and authentic.
              </label>
            </div>

            <div className="flex justify-between gap-4 pt-4 border-t border-gray-100">
              <Button variant="outline" className="flex items-center gap-1 text-xs font-bold" onClick={handleBack}>
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>
              <Button type="submit" variant="primary" className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-6 py-2.5 shadow-md">
                <FileCheck2 className="w-4 h-4" />
                <span>Submit for approval</span>
              </Button>
            </div>
          </form>
        )}

        {/* Step 5: Submission Success Landing */}
        {step === 5 && (
          <div className="space-y-6 py-4 text-center">
            <div className="w-16 h-16 bg-green-50 border border-green-150 rounded-full flex items-center justify-center mx-auto text-green-600 shadow-sm animate-bounce">
              <Clock className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-extrabold font-sora text-primary">🎉 Profile Submitted Successfully!</h3>
              <p className="text-xs text-gray-500 font-sans max-w-sm mx-auto leading-relaxed">
                An administrator will review and verify your graduation credentials against the official registrar directory.
              </p>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded text-left max-w-sm mx-auto">
              <p className="text-[10px] uppercase font-bold text-amber-800 tracking-wider font-sora">Next Steps</p>
              <p className="text-xs text-amber-900 mt-1 leading-relaxed font-sans">
                Verification takes <strong>24–48 hours</strong>. You will receive an immediate confirmation notification on your WhatsApp (<strong>{formData.whatsapp}</strong>) and email address (<strong>{formData.email}</strong>) once approved.
              </p>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <Link to="/signin" className="inline-flex items-center justify-center font-bold text-xs uppercase tracking-wider bg-primary text-white px-6 py-2.5 rounded-md hover:bg-opacity-90 transition-all shadow">
                Go to Sign In
              </Link>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default SignUpPage;
