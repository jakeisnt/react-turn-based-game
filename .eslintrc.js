module.exports = {
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
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

    // personal preference
    "react/jsx-props-no-spreading": "off",
    "no-bitwise": "off",
    "no-console": "off",

    // react 17 doesn't need to import it : )
    "react/react-in-jsx-scope": "off",

    // this just doesn't work
    "workspaces/no-absolute-imports": "off",
  },
};
