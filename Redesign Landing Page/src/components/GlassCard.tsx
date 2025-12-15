import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "strong" | "solid";
  hover?: boolean;
}

export function GlassCard({ 
  children, 
  className = "", 
  variant = "solid",
  hover = true 
}: GlassCardProps) {
  const baseClasses = variant === "strong" 
    ? "glass-strong" 
    : variant === "default" 
    ? "glass" 
    : "bg-card border border-border shadow-sm";
  const hoverClasses = hover ? "hover:shadow-xl hover:scale-[1.02] transition-all duration-300" : "";
  
  return (
    <div className={`${baseClasses} rounded-2xl p-6 ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
}