import React, { useState, useEffect } from 'react';

const CountUpNumber = ({ value }) => {
  const [displayValue, setDisplayValue] = useState('');

  useEffect(() => {
    // Parse numeric parts and non-numeric parts
    const match = value.match(/^([^0-9\.]*)([0-9\.,]+)([^0-9\.]*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const prefix = match[1];
    const numStr = match[2].replace(/,/g, '');
    const suffix = match[3];

    const isFloat = numStr.includes('.');
    const target = parseFloat(numStr);
    
    let start = 0;
    const duration = 1500; // 1.5s
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing out quad
      const easeProgress = progress * (2 - progress);
      const currentVal = start + easeProgress * (target - start);

      let formattedNum = '';
      if (isFloat) {
        formattedNum = currentVal.toFixed(1);
      } else {
        formattedNum = Math.floor(currentVal).toLocaleString('en-IN');
      }

      setDisplayValue(`${prefix}${formattedNum}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value); // Ensure exact final value is shown
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return <span>{displayValue}</span>;
};

export const StatsBar = ({ stats = [] }) => {
  return (
    <div className="bg-accent text-white py-6 shadow-md border-y border-white border-opacity-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-y-8 gap-x-4 divide-y-0 md:divide-x divide-white divide-opacity-20 text-center">
          {stats.map((stat, index) => (
            <div key={index} className={`flex flex-col justify-center px-4 ${index > 0 ? 'border-t md:border-t-0 pt-4 md:pt-0 border-white border-opacity-20' : ''}`}>
              <span className="text-3xl md:text-4xl font-extrabold font-sora tracking-tight">
                <CountUpNumber value={stat.value} />
              </span>
              <span className="mt-2 text-xs md:text-sm font-medium uppercase tracking-wider text-white text-opacity-90 font-sans">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsBar;
