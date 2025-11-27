import { LucideIcon } from "lucide-react";
import { GlassCard } from "./GlassCard";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: "primary" | "secondary" | "accent";
}

export function FeatureCard({ icon: Icon, title, description, color }: FeatureCardProps) {
  const colorClasses = {
    primary: "text-primary",
    secondary: "text-secondary",
    accent: "text-accent"
  };

  const bgClasses = {
    primary: "bg-primary/10",
    secondary: "bg-secondary/10",
    accent: "bg-accent/10"
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-8 group hover:shadow-xl hover:scale-[1.02] hover:border-primary/30 transition-all duration-300">
      <div className={`${bgClasses[color]} w-16 h-16 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className={`w-8 h-8 ${colorClasses[color]}`} />
      </div>
      <h3 className="mb-3 text-lg">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}