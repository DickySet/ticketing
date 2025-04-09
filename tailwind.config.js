// tailwind.config.js
const konstaConfig = require('konsta/config');

// wrap your config with konstaConfig
module.exports = konstaConfig({
  // rest of your usual Tailwind CSS config here
  content: [
    // "./src/**/*.{html,js}"
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],

});

