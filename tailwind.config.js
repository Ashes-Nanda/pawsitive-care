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
        playfair: ["Playfair Display", "serif"],
        lora: ["Lora", "serif"],
        cinzel: ["Cinzel", "serif"],
        poppins: ["Poppins", "sans-serif"],
        garamond: ["Garamond", "serif"],
        montserrat: ["Montserrat", "sans-serif"],
        merriweather: ["Merriweather", "serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        border: "#C9A66B", // Glowing Soft Gold
        input: "#D1D5DB", // Grayish input
        ring: "#6366F1", // Blue ring focus
        background: "#1E1E2E", // Deep Navy Blue
        foreground: "#F5F5F5", // Warm White

        primary: {
          DEFAULT: "#00796B", // Deep Teal
          foreground: "#E3B778", // Gold text
        },
        secondary: {
          DEFAULT: "#2A2A3A", // Slate Gray
          foreground: "#F5F5F5", // Warm White text on secondary
        },
        accent: {
          DEFAULT: "#E3B778", // Soft Gold
          foreground: "#1E1E2E", // Dark text on accent
        },
        info: {
          DEFAULT: "#FF8C42", // Soft orange
          foreground: "#333333", // Dark text on info
        },
        dark: {
          DEFAULT: "#1E1E2E", // Deep Navy Blue
          foreground: "#F5F5F5", // Warm White text on dark
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
          DEFAULT: "#2A2A3A", // Slate Gray card
          foreground: "#F5F5F5", // Warm White text on card
        },
        heading: {
          DEFAULT: "#E3B778", // Soft Gold heading
          foreground: "#E3B778",
        },
        text: {
          light: "#F5F5F5", // Light text for contrast
          gray: "#D1D5DB", // Medium gray text
          dark: "#1E1E2E", // Dark text
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
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
        bounceIn: "bounceIn 0.4s ease-out",
        slideUp: "slideUp 0.5s ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

