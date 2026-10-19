/* Builds css/tailwind.css (run: npm run build:css) from the same settings the site uses — js/tailwind.config.js —
   by scanning every class written in the pages and scripts. Run it again after adding new Tailwind classes. */
global.tailwind = {};
require('./js/tailwind.config.js');

module.exports = {
  ...global.tailwind.config,
  content: {
    files: ['./*.html', './js/**/*.js'],
    // inside JS strings a backslash in a class name is written twice (\\_) — on the page it is one (\_)
    transform: { js: src => src.replace(/\\\\/g, '\\') },
  },
};
