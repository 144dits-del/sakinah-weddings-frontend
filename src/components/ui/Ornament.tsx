import React from "react";

export type OrnamentName = 
  | "corner-flourish" 
  | "divider-floral" 
  | "arabesque-frame" 
  | "botanical-line" 
  | "bismillah-header";

interface OrnamentProps {
  name: OrnamentName;
  className?: string;
  theme?: string;
}

export const Ornament: React.FC<OrnamentProps> = ({ name, className = "", theme = "t1" }) => {
  const isMonochrome = theme === "t6" || theme === "t9" || theme === "t12" || theme === "monochrome";
  const strokeColor = isMonochrome ? "#09090B" : "var(--color-secondary, #C9A876)";

  switch (name) {
    case "corner-flourish":
      return (
        <svg 
          viewBox="0 0 50 50" 
          className={`w-6 h-6 pointer-events-none ${className}`}
          fill="none" 
          stroke={strokeColor} 
          strokeWidth="1.5"
        >
          <path d="M 5 25 C 5 14, 14 5, 25 5 L 45 5 L 45 10 L 25 10 C 16.7 10, 10 16.7, 10 25 L 10 45 L 5 45 Z" />
          <circle cx="12" cy="12" r="2" fill={strokeColor} />
        </svg>
      );

    case "divider-floral":
      return (
        <svg 
          viewBox="0 0 200 24" 
          className={`w-36 h-6 mx-auto pointer-events-none my-2 ${className}`}
          fill="none" 
          stroke={strokeColor} 
          strokeWidth="1.2"
        >
          <path d="M 10 12 L 80 12" />
          <path d="M 120 12 L 190 12" />
          <circle cx="100" cy="12" r="4" fill={strokeColor} />
          <path d="M 92 12 Q 96 6, 100 12 Q 96 18, 92 12 Z" fill={strokeColor} />
          <path d="M 108 12 Q 104 6, 100 12 Q 104 18, 108 12 Z" fill={strokeColor} />
        </svg>
      );

    case "arabesque-frame":
      return (
        <svg 
          viewBox="0 0 100 100" 
          className={`w-12 h-12 pointer-events-none ${className}`}
          fill="none" 
          stroke={strokeColor} 
          strokeWidth="1.2"
        >
          <polygon points="50,5 95,50 50,95 5,50" />
          <polygon points="50,15 85,50 50,85 15,50" strokeDasharray="2 2" />
          <circle cx="50" cy="50" r="8" />
        </svg>
      );

    case "botanical-line":
      return (
        <svg 
          viewBox="0 0 60 40" 
          className={`w-10 h-8 pointer-events-none ${className}`}
          fill="none" 
          stroke={strokeColor} 
          strokeWidth="1.5"
        >
          <path d="M 30 35 C 30 20, 10 15, 5 5" />
          <path d="M 30 35 C 30 20, 50 15, 55 5" />
          <path d="M 30 35 L 30 5" strokeDasharray="1 3" />
        </svg>
      );

    case "bismillah-header":
      return (
        <div className={`font-serif text-2xl text-center my-3 tracking-wide ${className}`} style={{ color: strokeColor }}>
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </div>
      );

    default:
      return null;
  }
};

export default Ornament;
