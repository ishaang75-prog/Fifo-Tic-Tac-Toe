import React from 'react';
import { Tutorial } from '../components/Tutorial';

export const HowToPlay = () => {
  return (
    <div className="py-8 px-4 space-y-8">
      <div className="text-center max-w-xl mx-auto">
        <h2 className="text-3xl font-black tracking-wider text-white">RULE PROTOCOL</h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">Master First-In, First-Out spatial memory</p>
      </div>
      <Tutorial />
    </div>
  );
};