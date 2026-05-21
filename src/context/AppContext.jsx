import React, { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

const defaultDemoUser = {
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
  rank: 14,
  donated: 5000,
  mentees: 3,
  impactScore: 42,
  profileComplete: 65,
};

const defaultInstitution = {
  name: 'Gram Vidyapeeth Inter College',
  shortName: 'GITC',
  primaryColor: '#1A3A5C',
  accentColor: '#C49A22',
  establishedYear: 1975,
};

export const AppProvider = ({ children }) => {
  const [demoUser, setDemoUser] = useState(null);
  const [institution, setInstitution] = useState(defaultInstitution);
  const [donationAmount, setDonationAmount] = useState(null);
  const [selectedCardStyle, setSelectedCardStyle] = useState('wrapped');

  // Load from localStorage if available (to keep session on refresh)
  useEffect(() => {
    const savedUser = localStorage.getItem('demoUser');
    if (savedUser) {
      try {
        setDemoUser(JSON.parse(savedUser));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const loginAsDemo = () => {
    setDemoUser(defaultDemoUser);
    localStorage.setItem('demoUser', JSON.stringify(defaultDemoUser));
  };

  const logout = () => {
    setDemoUser(null);
    localStorage.removeItem('demoUser');
  };

  const updateDemoUser = (fields) => {
    setDemoUser(prev => {
      if (!prev) return null;
      const updated = { ...prev, ...fields };
      localStorage.setItem('demoUser', JSON.stringify(updated));
      return updated;
    });
  };

  // We will inject a dynamic style block to let custom primary and accent colors apply globally
  useEffect(() => {
    const styleId = 'dynamic-theme-colors';
    let styleEl = document.getElementById(styleId);
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }
    styleEl.innerHTML = `
      :root {
        --color-primary: ${institution.primaryColor};
        --color-accent: ${institution.accentColor};
      }
    `;
  }, [institution]);

  return (
    <AppContext.Provider value={{
      demoUser,
      setDemoUser,
      loginAsDemo,
      logout,
      updateDemoUser,
      institution,
      setInstitution,
      donationAmount,
      setDonationAmount,
      selectedCardStyle,
      setSelectedCardStyle
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
