import React from 'react';

export const Logo: React.FC = () => {
  return (
    <div className="relative w-24 h-24">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-20 h-20 relative">
          <div className="absolute inset-0 transform rotate-45">
            <div className="w-10 h-10 bg-primary rounded-tl-full rounded-br-full absolute top-0 left-0 opacity-80"></div>
            <div className="w-10 h-10 bg-[#10b981] rounded-tl-full rounded-br-full absolute bottom-0 right-0 opacity-80"></div>
          </div>
        </div>
      </div>
    </div>
  );
};