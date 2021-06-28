const path = require("path");

module.exports = {
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true,
    },
    babelOptions: {
      configFile: path.join(__dirname, "babel.config.json"),
    },
  },
  extends: [
    "airbnb",
    "airbnb/hooks",
    "eslint-config-prettier",
    "plugin:workspaces/recommended",
  ],
  plugins: ["prettier", "workspaces"],
  root: true,
  rules: {
    "prettier/prettier": [
      "error",
      {
        singleQuote: false,
        printWidth: 80,
        endOfLine: "auto",
      },
    ],
    // incompatible with prettier
    "react/jsx-curly-newline": "off",
    "react/jsx-indent": "off",
    "react/jsx-wrap-multilines": "off",
    "react/jsx-closing-tag-location": "off",
    "react/no-array-index-key": "warn",
    "@typescript-eslint/indent": "off",

    // should be warnings for faster development
    "no-unused-vars": "warn",
    "react/button-has-type": "warn",
    "operator-assignment": "warn",
    "import/order": "warn",
    "arrow-body-style": "off",
    "react/prop-types": "warn",
    "jsx-a11y/click-events-have-key-events": "warn",
    "jsx-a11y/interactive-supports-focus": "warn",
    "jsx-a11y/label-has-associated-control": "warn",
    "jsx-a11y/control-has-associated-label": "warn",

    // personal preference
    "react/jsx-props-no-spreading": "off",
    "no-bitwise": "off",
    "no-console": "off",

    // react 17 doesn't need to import it : )
    "react/react-in-jsx-scope": "off",

    // this just doesn't work
    "workspaces/no-absolute-imports": "off",

    // nested template strings are not supported by js
    "prefer-template": "warn",

    // interferes with regex
    "no-useless-escape": "off",

    "max-classes-per-file": ["error", 3],
  },
};
