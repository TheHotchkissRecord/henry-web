module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 12,
  },
  "rules": {
    // enable additional rules
    "indent": ["error", 2],
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "double"],
    "semi": ["error", "always"],
    "no-constant-condition": ["error", { "checkLoops": false }],
    
    // override default options for rules from base configurations
    "no-cond-assign": ["error", "always"],

    // disable rules from base configurations
    "no-console": "off",

    // disable no-undef and no-unused-vars
    "no-undef": "off",
    "no-unused-vars": "off"
  }
};
