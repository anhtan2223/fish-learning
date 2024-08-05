import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        'primary': '#39ace7',
        'primary-dark': '#1e88e5',
        'secondary': '#405CD6',
        'secondary-dark': '#0033a0',
        'gray': "#f0f0f0" ,
        'gray-dark' : "#333333"
      },
      color: {
        'primary': '#39ace7',
        'secondary': '#405CD6',
        'gray': "#f0f0f0"
      },
      textColor: {
        'primary': '#39ace7',
        'secondary': '#405CD6',
      },
      borderColor: {
        'border-color': 'rgba(217, 217, 217, 1)',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
export default config;
