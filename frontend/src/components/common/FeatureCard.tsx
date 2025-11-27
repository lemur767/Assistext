import { LucideIcon } from "lucide-react";
import { CSSProperties } from "react";

interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    color: "primary" | "secondary" | "accent";
}

export function FeatureCard({ icon: Icon, title, description, color }: FeatureCardProps) {
    const colorMap = {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)'
    };

    const bgColorMap = {
        primary: 'rgba(232, 100, 124, 0.1)',
        secondary: 'rgba(71, 228, 187, 0.1)',
        accent: 'rgba(236, 155, 59, 0.1)'
    };

    const cardStyle: CSSProperties = {
        backgroundColor: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: '1rem',
        padding: '2rem',
        transition: 'all 0.3s ease',
        cursor: 'pointer'
    };

    const iconContainerStyle: CSSProperties = {
        backgroundColor: bgColorMap[color],
        width: '4rem',
        height: '4rem',
        borderRadius: '0.75rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1.25rem',
        transition: 'transform 0.3s ease'
    };

    return (
        <div
            style={cardStyle}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.borderColor = `color-mix(in oklab, ${colorMap[color]} 30%, transparent)`;
                const iconContainer = e.currentTarget.querySelector('.icon-container') as HTMLElement;
                if (iconContainer) iconContainer.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'var(--border)';
                const iconContainer = e.currentTarget.querySelector('.icon-container') as HTMLElement;
                if (iconContainer) iconContainer.style.transform = 'scale(1)';
            }}
        >
            <div className="icon-container" style={iconContainerStyle}>
                <Icon style={{ width: '2rem', height: '2rem', color: colorMap[color] }} />
            </div>
            <h3 style={{ marginBottom: '0.75rem', fontSize: '1.125rem', fontWeight: 600 }}>{title}</h3>
            <p style={{ color: 'var(--muted-foreground)', lineHeight: '1.625' }}>{description}</p>
        </div>
    );
}
