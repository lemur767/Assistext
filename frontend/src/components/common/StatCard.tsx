import { CSSProperties } from "react";

interface StatCardProps {
    value: string;
    label: string;
    color: "primary" | "secondary" | "accent";
}

export function StatCard({ value, label, color }: StatCardProps) {
    const colorMap = {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)'
    };

    const gradientMap = {
        primary: 'linear-gradient(135deg, var(--primary), var(--accent))',
        secondary: 'linear-gradient(135deg, var(--secondary), var(--primary))',
        accent: 'linear-gradient(135deg, var(--accent), var(--secondary))'
    };

    const cardStyle: CSSProperties = {
        backgroundColor: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: '1rem',
        padding: '1.5rem',
        textAlign: 'center',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden'
    };

    const valueStyle: CSSProperties = {
        fontSize: '2.25rem',
        fontWeight: 700,
        background: gradientMap[color],
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        marginBottom: '0.5rem'
    };

    const labelStyle: CSSProperties = {
        fontSize: '0.875rem',
        color: 'var(--muted-foreground)',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
    };

    return (
        <div
            style={cardStyle}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.borderColor = colorMap[color];
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'var(--border)';
            }}
        >
            <div style={valueStyle}>{value}</div>
            <div style={labelStyle}>{label}</div>
        </div>
    );
}
