/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        "coolgray-10": "var(--coolgray-10)",
        "coolgray-20": "var(--coolgray-20)",
        "coolgray-30": "var(--coolgray-30)",
        "coolgray-60": "var(--coolgray-60)",
        "coolgray-70": "var(--coolgray-70)",
        "coolgray-90": "var(--coolgray-90)",
        defaultalert: "var(--defaultalert)",
        defaultwhite: "var(--defaultwhite)",
        "primary-60": "var(--primary-60)",
        "primary-90": "var(--primary-90)",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))"
      },
      fontFamily: {
        "body-l": "var(--body-l-font-family)",
        sans: ["Roboto", "sans-serif"]
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
}