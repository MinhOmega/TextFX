import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "text-shine": {
          "0%": { backgroundPosition: "0%" },
          to: { backgroundPosition: "100%" },
        },
        marquee: {
          "0%": { transform: "translate(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          "0%": { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
        meteor: {
          "0%": { opacity: "1", transform: "rotate(215deg) translate(0)" },
          "70%": { opacity: "1" },
          to: { opacity: "0", transform: "rotate(215deg) translate(-720px)" },
        },
        "side-bottom": {
          "0%,14%,24%,28%": { transform: "translate(101%)" },
          "37%,70%": { transform: "translate(0)" },
          "79%,to": { transform: "translate(-101%)" },
        },
        "side-left": {
          "0%,14%,24%,34%,35%": { transform: "translateY(101%)" },
          "44%,79%": { transform: "translateY(0)" },
          "86%,to": { transform: "translateY(-101%)" },
        },
        "side-right": {
          "0%,14%,23%": { transform: "translateY(-101%)" },
          "30%,62%": { transform: "translateY(0)" },
          "72%,to": { transform: "translateY(101%)" },
        },
        "side-top": {
          "0%,14%": { transform: "translate(-101%)" },
          "24%,55%": { transform: "translate(0)" },
          "65%,to": { transform: "translate(101%)" },
        },
        slash: {
          "0%": { transform: "translate(-50%,-50%) rotate(-24deg) scaleY(0)" },
          "6%,13%": { transform: "translate(-50%,-50%) rotate(-24deg) scaleY(1)" },
          "16.6%,to": { transform: "translate(-50%,-50%) rotate(-24deg) scaleY(0)" },
        },
        "text-left": {
          "0%": { transform: "translate(100%)" },
          "10%,58%": { transform: "translate(0)" },
          "70%,to": { transform: "translate(-200%)" },
        },
        "text-right": {
          "0%": { transform: "translate(-100%)" },
          "10%,58%": { transform: "translate(-50%)" },
          "70%,to": { transform: "translate(-300%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        gradient: "text-shine 2.5s ease-in-out infinite alternate",
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
        meteor: "meteor 5s linear infinite",
        "side-bottom": "side-bottom 6s infinite",
        "side-left": "side-left 6s infinite",
        "side-right": "side-right 6s infinite",
        "side-top": "side-top 6s infinite",
        slash: "slash 6s ease-in infinite",
        "text-left": "text-left 6s ease-in-out infinite",
        "text-right": "text-right 6s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config

