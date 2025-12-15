import { GlassCard } from "./GlassCard";

interface StatCardProps {
  value: string;
  label: string;
  color: "primary" | "secondary" | "accent";
}

export function StatCard({ value, label, color }: StatCardProps) {
  const colorClasses = {
    primary: "text-primary",
    secondary: "text-secondary",
    accent: "text-accent"
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-8 text-center shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300">
      <div className={`text-5xl md:text-6xl ${colorClasses[color]} mb-3`}>
        {value}
      </div>
      <div className="text-muted-foreground text-lg">{label}</div>
    </div>
  );
}