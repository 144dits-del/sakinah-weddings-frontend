import React from "react";
import { Ornament, OrnamentName } from "@/components/ui/Ornament";

interface SectionWrapperProps {
  id?: string;
  subTitle?: string;
  title?: string;
  ornament?: OrnamentName;
  className?: string;
  children: React.ReactNode;
  isEmpty?: boolean;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  id,
  subTitle,
  title,
  ornament,
  className = "",
  children,
  isEmpty = false,
}) => {
  if (isEmpty) return null;

  return (
    <section 
      id={id} 
      className={`w-full py-[var(--section-padding-y,48px)] px-[var(--section-padding-x,20px)] border-b border-[var(--color-secondary)]/20 theme-container relative ${className}`}
    >
      {(subTitle || title || ornament) && (
        <div className="text-center space-y-1 mb-6">
          {subTitle && (
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[var(--color-primary)] block">
              {subTitle}
            </span>
          )}
          {title && (
            <h2 className="theme-font-display text-2xl font-bold text-[var(--color-primary)]">
              {title}
            </h2>
          )}
          {ornament && <Ornament name={ornament} />}
        </div>
      )}
      {children}
    </section>
  );
};

export default SectionWrapper;
