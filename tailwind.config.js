/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["{components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
