import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

export function ThemeToggle() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // Check for saved theme preference or default to light mode
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);
        setIsDark(shouldBeDark);

        if (shouldBeDark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = !isDark;
        setIsDark(newTheme);

        if (newTheme) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    };

    return (
        <button
            onClick={toggleTheme}
            className="glass"
            style={{
                padding: '0.75rem',
                borderRadius: '9999px',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.borderColor = 'var(--primary)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.borderColor = 'var(--glass-border)';
            }}
            aria-label="Toggle theme"
        >
            {isDark ? (
                <Sun style={{ width: '1.25rem', height: '1.25rem', color: 'var(--accent)' }} />
            ) : (
                <Moon style={{ width: '1.25rem', height: '1.25rem', color: 'var(--primary)' }} />
            )}
        </button>
    );
}
