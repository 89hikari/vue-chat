/* eslint-env node */
/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "320px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    fontFamily: {
      sans: ['"Proxima Nova"', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        cosmic: {
          50: "#f0e6ff",
          100: "#e6dcff",
          200: "#d1b8ff",
          300: "#b894ff",
          400: "#9a6aff",
          500: "#7f48e6",
          600: "#6a37b8",
          700: "#4f2a8a",
          800: "#351d5e",
          900: "#1b102f",
        },
        neon: {
          cyan: "#19a7c7",
          purple: "#8a2be2",
          pink: "#c040c0",
          green: "#2fbf89",
          blue: "#2b6fb8",
        },
        dark: {
          bg: "#0a0e27",
          card: "#171a2b",
          border: "#25293a",
        },
      },
      backgroundColor: {
        "gradient-cosmic":
          "linear-gradient(135deg, #0a0e27 0%, #1a0033 50%, #0a0e27 100%)",
        "gradient-neon":
          "linear-gradient(135deg, #6020ff 0%, #b800ff 50%, #ff00ff 100%)",
      },
      borderRadius: {
        xs: "2px",
        sm: "4px",
        base: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
      boxShadow: {
        "neon-cyan":
          "0 0 8px rgba(25, 167, 199, 0.28), 0 0 16px rgba(25, 167, 199, 0.16)",
        "neon-purple":
          "0 0 8px rgba(138, 43, 226, 0.28), 0 0 16px rgba(138, 43, 226, 0.14)",
        "neon-pink":
          "0 0 8px rgba(192, 64, 192, 0.28), 0 0 16px rgba(192, 64, 192, 0.14)",
        "neon-glow":
          "0 0 18px rgba(79, 42, 166, 0.38), 0 0 36px rgba(138, 43, 226, 0.14)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-in",
        "slide-in-up": "slideInUp 0.6s ease-out",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideInUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        glowPulse: {
          "0%, 100%": {
            boxShadow: "0 0 10px rgba(0, 217, 255, 0.3)",
          },
          "50%": {
            boxShadow: "0 0 20px rgba(0, 217, 255, 0.8)",
          },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },
    },
  },
  plugins: [],
};
