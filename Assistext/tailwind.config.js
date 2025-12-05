/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: '#FAFAFA', // Light background
        foreground: '#1A1A1A', // Light foreground (dark text)
        card: '#FFFFFF',
        'card-foreground': '#1A1A1A',
        popover: '#FFFFFF',
        'popover-foreground': '#1A1A1A',
        primary: '#E89A4D',
        'primary-foreground': '#FFFFFF',
        secondary: '#F26C7D',
        'secondary-foreground': '#FFFFFF',
        accent: '#5DD9C1',
        'accent-foreground': '#1A1A1A',
        muted: '#F3F4F6',
        'muted-foreground': '#6B7280',
        destructive: '#EF4444',
        'destructive-foreground': '#FFFFFF',
        border: '#E5E7EB',
        input: '#E5E7EB',
        ring: '#E89A4D',
      },
      borderRadius: {
        lg: '1rem',
        md: 'calc(1rem - 2px)',
        sm: 'calc(1rem - 4px)',
      },
    },
  },
  plugins: [],
}

