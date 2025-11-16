const defaultTheme = require("tailwindcss/defaultTheme")
const daisyuiPlugin = require("daisyui")

const daisyuiCompat = {
  handler(api) {
    const originalAddUtilities = api.addUtilities?.bind(api)

    if (originalAddUtilities) {
      api.addUtilities = (utilities, options) => {
        const filtered = Object.entries(utilities).reduce((acc, [selector, value]) => {
          if (!selector.startsWith("@")) acc[selector] = value
          return acc
        }, {})

        if (Object.keys(filtered).length > 0) {
          originalAddUtilities(filtered, options)
        }
      }
    }

    daisyuiPlugin.handler(api)

    if (originalAddUtilities) {
      api.addUtilities = originalAddUtilities
    }
  },
  config: daisyuiPlugin.config
}

module.exports = {
  darkMode: "class",
  content: [
    "./app/views/**/*.{erb,html}",
    "./app/helpers/**/*.rb",
    "./app/assets/stylesheets/**/*.css",
    "./app/assets/tailwind/**/*.css",
    "./app/javascript/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554"
        }
      },
      fontFamily: {
        sans: ["Inter", "Poppins", ...defaultTheme.fontFamily.sans],
        display: ["Poppins", ...defaultTheme.fontFamily.sans]
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem"
      },
      boxShadow: {
        card: "0 10px 25px -5px rgba(37, 99, 235, 0.2)"
      }
    }
  },
  plugins: [daisyuiCompat],
  daisyui: {
    darkTheme: false,
    themes: [
      {
        mytheme: {
          "color-scheme": "light",
          "base-100": "oklch(98% 0.02 240)",
          "base-200": "oklch(95% 0.03 240)",
          "base-300": "oklch(92% 0.04 240)",
          "base-content": "oklch(20% 0.05 240)",
          "primary": "oklch(55% 0.3 240)",
          "primary-content": "oklch(98% 0.01 240)",
          "secondary": "oklch(70% 0.25 200)",
          "secondary-content": "oklch(98% 0.01 200)",
          "accent": "oklch(65% 0.25 160)",
          "accent-content": "oklch(98% 0.01 160)",
          "neutral": "oklch(50% 0.05 240)",
          "neutral-content": "oklch(98% 0.01 240)",
          "info": "oklch(70% 0.2 220)",
          "info-content": "oklch(98% 0.01 220)",
          "success": "oklch(65% 0.25 140)",
          "success-content": "oklch(98% 0.01 140)",
          "warning": "oklch(80% 0.25 80)",
          "warning-content": "oklch(20% 0.05 80)",
          "error": "oklch(65% 0.3 30)",
          "error-content": "oklch(98% 0.01 30)",
          "--rounded-box": "0.5rem",
          "--rounded-btn": "1rem",
          "--rounded-badge": "0.25rem",
          "--tab-radius": "0.5rem",
          "--border-btn": "1px"
        }
      }
    ]
  }
}
