module.exports = {
  extends: [
    "react-app",
    "plugin:jsx-a11y/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.eslint.json",
  },
  plugins: ["jsx-a11y", "prettier", "@typescript-eslint"],
  rules: {
    "@typescript-eslint/naming-convention": "off",
    camelcase: "off",
    "no-console": "off",
    "no-continue": "off",
    "no-underscore-dangle": "off",
    "no-param-reassign": "off",
    "no-plusplus": "off",
    "react/jsx-filename-extension": "off",
    "react/jsx-props-no-spreading": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "prettier/prettier": ["error"],
  },
  settings: {
    // https://github.com/benmosher/eslint-plugin-import/issues/1285#issuecomment-463683667
    "import/parsers": {
      "@typescript-eslint/parser": ["js", "ts", "jsx", "tsx"],
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
      },
    },
  },
};
