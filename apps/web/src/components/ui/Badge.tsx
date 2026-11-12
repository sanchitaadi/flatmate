import React from 'react';
import { cn } from '@/lib/utils/cn';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'brand' | 'trust' | 'accent' | 'neutral' | 'danger' | 'warning';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'neutral',
  size = 'md',
  children,
  ...props
}) => {
  const variants = {
    brand: 'bg-brand-50 text-brand-700 border-brand-200/60',
    trust: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
    accent: 'bg-accent-50 text-accent-700 border-accent-200/60',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200/60',
    danger: 'bg-rose-50 text-rose-700 border-rose-200/60',
    warning: 'bg-amber-50 text-amber-800 border-amber-200/60',
  };

  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1 font-medium',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
