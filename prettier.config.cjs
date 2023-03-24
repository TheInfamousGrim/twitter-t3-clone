/** @type {import("prettier").Config} */
const config = {
  singleQuote: true,
  semi: true,
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
};

module.exports = config;
