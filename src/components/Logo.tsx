import React from 'react';

interface LogoProps {
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ showText = true, size = 'md' }) => {
  const sizes = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`relative ${sizes[size]}`}>
        {/* Butterfly design container */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`${size === 'sm' ? 'w-14 h-14' : size === 'lg' ? 'w-28 h-28' : 'w-20 h-20'} relative`}>
            {/* First butterfly */}
            <div className="absolute inset-0 transform rotate-45">
              <div className="w-1/2 h-1/2 bg-primary rounded-tl-full rounded-br-full absolute top-0 left-0 opacity-80 transition-all duration-300 hover:opacity-100"></div>
              <div className="w-1/2 h-1/2 bg-primary rounded-tr-full rounded-bl-full absolute top-0 right-0 opacity-80 transition-all duration-300 hover:opacity-100"></div>
            </div>
            {/* Second butterfly */}
            <div className="absolute inset-0 transform -rotate-45">
              <div className="w-1/2 h-1/2 bg-secondary rounded-tl-full rounded-br-full absolute bottom-0 left-0 opacity-80 transition-all duration-300 hover:opacity-100"></div>
              <div className="w-1/2 h-1/2 bg-secondary rounded-tr-full rounded-bl-full absolute bottom-0 right-0 opacity-80 transition-all duration-300 hover:opacity-100"></div>
            </div>
          </div>
        </div>
      </div>
      
      {showText && (
        <div className="text-center">
          <h1 className="text-2xl font-bold font-poppins text-primary">
            EduEumaeus
          </h1>
          <p className="text-sm font-roboto text-secondary">
            Guiding Every Educational Journey
          </p>
        </div>
      )}
    </div>
  );
};