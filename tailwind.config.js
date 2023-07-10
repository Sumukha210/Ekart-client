/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/pages/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
        accent: "var(--accent-color)",
        dark: "var(--dark-color)",
        grey: "var(--grey-color)",
        light: "var(--light-color)",
        secondary: "var(--secondary-color)"
      },
      screens: {
        xsm: "380px",
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
        xxl: "1400px",
      },

      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
};
