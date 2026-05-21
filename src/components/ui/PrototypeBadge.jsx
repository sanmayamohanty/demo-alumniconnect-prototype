import React from 'react';

export const PrototypeBadge = () => {
  return (
    <div className="fixed bottom-4 right-4 z-[9999] pointer-events-auto">
      <div className="bg-primary bg-opacity-90 hover:bg-opacity-100 text-white font-sora font-semibold text-xs px-3 py-1.5 rounded-full shadow-lg border border-white border-opacity-10 flex items-center gap-1.5 transition-all select-none backdrop-blur-sm">
        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        <span>🔧 Prototype Mode</span>
      </div>
    </div>
  );
};

export default PrototypeBadge;
