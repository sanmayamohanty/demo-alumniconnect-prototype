import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { ShieldCheck } from 'lucide-react';

export const DonationCard = ({ tier, onSelect }) => {
  const { amount, name, description, impact, popular, icon: Icon } = tier;

  return (
    <Card 
      className={`relative flex flex-col justify-between p-6 border transition-all duration-300 h-full ${
        popular 
          ? 'border-accent shadow-md md:-translate-y-2 bg-gradient-to-b from-white to-light to-opacity-30' 
          : 'border-gray-100 hover:border-gray-200'
      }`}
    >
      {popular && (
        <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white text-[9px] uppercase tracking-widest font-sora font-semibold px-3 py-1 rounded-full shadow-sm border border-accent">
          Most Popular
        </span>
      )}

      <div>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${
          popular ? 'bg-accent text-white' : 'bg-light text-primary'
        }`}>
          {Icon && <Icon className="w-5 h-5" />}
        </div>

        <h3 className="text-xs uppercase tracking-wider font-semibold text-gray-400 font-sora mb-1">
          {name}
        </h3>

        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-2xl font-extrabold font-sora text-primary">
            ₹{amount.toLocaleString('en-IN')}
          </span>
          {amount >= 25000 && <span className="text-xs text-gray-500 font-medium font-sans">+</span>}
        </div>

        <p className="text-xs text-gray-600 leading-relaxed font-sans mb-4 border-b border-gray-100 pb-4">
          {description}
        </p>

        <div className="flex items-start gap-2 mb-6">
          <ShieldCheck className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
          <span className="text-[11px] text-gray-500 italic leading-snug font-sans">
            "{impact}"
          </span>
        </div>
      </div>

      <Button 
        variant={popular ? 'primary' : 'outline'}
        onClick={onSelect}
        className="w-full flex items-center justify-center gap-1 border-primary text-primary hover:bg-primary hover:text-white"
      >
        <span>Contribute</span>
      </Button>
    </Card>
  );
};

export default DonationCard;
