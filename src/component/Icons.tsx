import React from 'react';

export const ChevronDown = ({ className }: { className?: string }) => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m6 9 6 6 6-6"/>
  </svg>
);

export const SearchIcon = ({ className }: { className?: string }) => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.3-4.3"/>
  </svg>
);

export const CryptoIcon = ({ color, label, subLabel }: { color: string, label: string, subLabel?: string }) => (
  <div className="flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-bold text-white shrink-0" style={{ backgroundColor: color }}>
    {label[0]}
  </div>
);

export const FlagIcon = ({ color }: { color: string }) => (
  <div className="flex w-6 h-6 rounded-full overflow-hidden shrink-0 border border-gray-100">
    <div className="w-1/3 h-full bg-green-600"></div>
    <div className="w-1/3 h-full bg-white"></div>
    <div className="w-1/3 h-full bg-green-600"></div>
  </div>
);
