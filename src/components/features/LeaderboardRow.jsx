import React from 'react';
import { Award, Trophy } from 'lucide-react';

export const LeaderboardRow = ({ entry, index }) => {
  const { rank, initials, name, batch, score, donated, mentored, referred, isCurrentUser } = entry;

  const getRankBadge = (r) => {
    if (r === 1) return <Trophy className="w-5 h-5 text-yellow-500 inline" />;
    if (r === 2) return <Trophy className="w-5 h-5 text-gray-400 inline" />;
    if (r === 3) return <Trophy className="w-5 h-5 text-amber-600 inline" />;
    return <span className="font-sora font-bold text-gray-500 text-xs">{r}</span>;
  };

  return (
    <tr 
      className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
        isCurrentUser ? 'bg-accent bg-opacity-10 border-l-4 border-l-accent' : ''
      }`}
    >
      {/* Rank */}
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <div className="flex items-center justify-center">
          {getRankBadge(rank)}
        </div>
      </td>

      {/* Alumni Details */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-sora font-semibold text-xs text-white ${
            isCurrentUser ? 'bg-accent' : 'bg-primary'
          }`}>
            {initials}
          </div>
          <div>
            <div className="text-sm font-bold font-sora text-gray-900 flex items-center gap-1.5">
              <span>{name}</span>
              {isCurrentUser && (
                <span className="bg-accent text-white font-sora font-semibold text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded">
                  You
                </span>
              )}
            </div>
            <div className="text-xs text-gray-500 font-sans">Batch of {batch}</div>
          </div>
        </div>
      </td>

      {/* Impact Score */}
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <div className="inline-flex items-center gap-1 bg-primary bg-opacity-5 px-2.5 py-1 rounded text-primary font-sora font-bold text-xs">
          <Award className="w-3.5 h-3.5 text-accent" />
          <span>{score} pts</span>
        </div>
      </td>

      {/* Donated */}
      <td className="px-6 py-4 whitespace-nowrap text-center text-xs font-semibold text-gray-700 font-sans">
        ₹{donated.toLocaleString('en-IN')}
      </td>

      {/* Mentored */}
      <td className="px-6 py-4 whitespace-nowrap text-center text-xs font-semibold text-gray-700 font-sans">
        {mentored} mentees
      </td>

      {/* Referred */}
      <td className="px-6 py-4 whitespace-nowrap text-center text-xs font-semibold text-gray-700 font-sans">
        {referred} signups
      </td>
    </tr>
  );
};

export default LeaderboardRow;
