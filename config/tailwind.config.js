const defaultTheme = require("tailwindcss/defaultTheme")
const daisyuiThemes = require("daisyui/src/theming/themes")
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
    themes: [
      {
        corporate: {
          ...daisyuiThemes["corporate"],
          primary: "#2563eb",
          "primary-content": "#f8fafc",
          secondary: "#f97316",
          accent: "#22d3ee",
          neutral: "#0f172a"
        }
      },
      {
        business: {
          ...daisyuiThemes["business"],
          primary: "#93c5fd",
          "primary-content": "#0f172a",
          secondary: "#f87171",
          accent: "#c084fc",
          neutral: "#111827"
        }
      }
    ]
  }
}
