module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  env: {
    node: true,
    es2020: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended", // Habilita prettier como regla de ESLint
  ],
  rules: {
    // Puedes añadir reglas personalizadas aquí
    "prettier/prettier": "error",
  },
};
