import { ReactNode, CSSProperties } from "react";

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    variant?: "default" | "strong" | "solid";
    hover?: boolean;
    style?: CSSProperties;
}

export function GlassCard({
    children,
    className = "",
    variant = "solid",
    hover = true,
    style = {}
}: GlassCardProps) {
    const baseClasses = variant === "strong"
        ? "glass-strong"
        : variant === "default"
            ? "glass"
            : "";

    const baseStyle: CSSProperties = variant === "solid"
        ? {
            backgroundColor: 'var(--card)',
            border: '1px solid var(--border)',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)'
        }
        : {};

    const hoverStyle: CSSProperties = hover ? {
        transition: 'all 0.3s ease',
    } : {};

    return (
        <div
            className={`${baseClasses} ${className}`}
            style={{
                borderRadius: '1rem',
                padding: '1.5rem',
                ...baseStyle,
                ...hoverStyle,
                ...style
            }}
            onMouseEnter={(e) => {
                if (hover) {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)';
                }
            }}
            onMouseLeave={(e) => {
                if (hover) {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = variant === "solid"
                        ? '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)'
                        : 'var(--glass-shadow)';
                }
            }}
        >
            {children}
        </div>
    );
}
