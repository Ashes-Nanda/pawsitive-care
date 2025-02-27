/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        lora: ["Lora", "serif"],
        nunito: ["Nunito", "sans-serif"],
      },
      colors: {
        border: "#E0E0E0", // Container border color
        input: "#D1D5DB", // Grayish input
        ring: "#6366F1", // Blue ring focus
        background: "#f0f0f0", // Light gray background
        foreground: "#333333", // Dark text

        primary: {
          DEFAULT: "#008080", // Teal
          foreground: "#FFFFFF", // White text
        },
        secondary: {
          DEFAULT: "#F5F5DC", // Beige
          foreground: "#333333", // Dark text on secondary
        },
        accent: {
          DEFAULT: "#FFD700", // Gold
          foreground: "#333333", // Dark text on accent
        },
        info: {
          DEFAULT: "#FF8C42", // Soft orange
          foreground: "#333333", // Dark text on info
        },
        dark: {
          DEFAULT: "#1E3A5F", // Deep navy blue
          foreground: "#FFFFFF", // White text on dark
        },
        destructive: {
          DEFAULT: "#DC2626", // Red for errors
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#6B7280", // Muted gray
          foreground: "#F3F4F6",
        },
        popover: {
          DEFAULT: "#F3F4F6", // Light gray popover
          foreground: "#1F2937",
        },
        card: {
          DEFAULT: "#F5F5DC", // Beige card
          foreground: "#333333", // Dark text on card
        },
        heading: {
          DEFAULT: "#000000", // Black heading
          foreground: "#000000",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        bounceIn: {
          "0%": { transform: "scale(0.95)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
        bounceIn: "bounceIn 0.4s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};