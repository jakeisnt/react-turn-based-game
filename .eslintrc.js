module.exports = {
  extends: ["airbnb", "airbnb/hooks", "eslint-config-prettier"],
  plugins: ["prettier"],
  root: true,
  rules: {
    "prettier/prettier": [
      "error",
      {
        singleQuote: false,
        printWidth: 80,
        arrowParens: "avoid",
        trailingComma: "none",
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

    // personal preference
    "react/jsx-props-no-spreading": "off",

    // react 17 doesn't need to import it : )
    "react/react-in-jsx-scope": "off",
  },
};
