import React from 'react';
import { Card } from '../ui/Card';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ProgramCard = ({ title, description, badge, path, icon: Icon }) => {
  const navigate = useNavigate();

  return (
    <Card 
      hoverable 
      onClick={() => navigate(path)}
      className="flex flex-col h-full justify-between p-6 border border-gray-100 group relative overflow-hidden"
    >
      {badge && (
        <span className="absolute top-4 right-4 bg-accent bg-opacity-10 text-accent font-sora font-semibold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded">
          {badge}
        </span>
      )}
      
      <div>
        <div className="w-12 h-12 rounded-lg bg-light text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
          {Icon && <Icon className="w-6 h-6" />}
        </div>
        
        <h3 className="text-lg font-bold font-sora text-primary mb-2 group-hover:text-accent transition-colors">
          {title}
        </h3>
        
        <p className="text-xs text-gray-500 leading-relaxed font-sans mb-6">
          {description}
        </p>
      </div>

      <div className="flex items-center text-xs font-semibold text-primary font-sora group-hover:text-accent transition-colors">
        <span>Learn more</span>
        <ArrowRight className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1.5 transition-transform" />
      </div>
    </Card>
  );
};

export default ProgramCard;
