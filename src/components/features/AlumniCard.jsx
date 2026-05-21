import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Briefcase, MapPin, UserPlus, GraduationCap, Clock } from 'lucide-react';

export const AlumniCard = ({ alumni, onConnect }) => {
  const { name, initials, batch, branch, city, employer, approved } = alumni;

  return (
    <Card className={`p-6 flex flex-col justify-between h-full border ${approved ? 'border-gray-100' : 'border-dashed border-amber-200 bg-amber-50 bg-opacity-30'}`}>
      <div>
        {/* Header with avatar & batch info */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold font-sora text-sm shadow-sm flex-shrink-0">
            {initials}
          </div>
          <div className="flex flex-col items-end text-right">
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded font-sora">
              <GraduationCap className="w-3 h-3 text-primary" />
              Class of {batch}
            </span>
            <span className="text-[10px] text-gray-400 mt-1 font-medium">{branch}</span>
          </div>
        </div>

        {/* Name */}
        <h3 className="text-base font-bold font-sora text-primary mb-3">
          {name}
        </h3>

        {/* Metadata */}
        <div className="space-y-2 mb-6 text-xs text-gray-600 font-sans">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-gray-400" />
            <span>{city}</span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase className="w-3.5 h-3.5 text-gray-400" />
            <span className="truncate">{approved ? (employer || '—') : '••••••••••'}</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div>
        {approved ? (
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full flex items-center justify-center gap-1.5 border border-primary text-primary hover:bg-primary hover:text-white"
            onClick={onConnect}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Connect</span>
          </Button>
        ) : (
          <div className="w-full">
            <div className="flex items-center justify-center gap-1 text-[10px] text-amber-700 font-semibold mb-2 bg-amber-100 bg-opacity-70 py-1 rounded">
              <Clock className="w-3 h-3 animate-spin" />
              <span>Pending Approval</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full opacity-40 cursor-not-allowed"
              disabled
            >
              <span>Connect Disabled</span>
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default AlumniCard;
