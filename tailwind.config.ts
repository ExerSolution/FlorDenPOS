import { light } from "@mui/material/styles/createPalette";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [require('daisyui'),],
  daisyui: {
    themes: [
      {
        // light: {
        //   ...require("daisyui/src/theming/themes")["light"],
        //   primary: "#fc9444", // Saffron for CTA (buttons, etc.)
        //   secondary: "#f0ebe4", // Jet for text
        //   accent: "#B0B5BE", // French gray for other elements
        //   neutral: "#2F2F2E", // Jet for neutral element
        //   "text-primary-content": "#7b8089",
        // },
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#ff79c6",
                    
          secondary: "#bd93f9",
                    
          accent: "#ffb86c",
                    
          neutral: "#3d4451",
                    
          // base-100: "#fff6ff",
                    
          info: "#8be9fd",
                    
          success: "#50fa7b", 
                    
          warning: "#f1fa8c",
                    
          error: "#ff5555",
                    },

                    // darkMode: ['selector', '[data-theme="dracula"]']
      },
    ],
  },
} satisfies Config;
