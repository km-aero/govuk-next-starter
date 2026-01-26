import nextConfig from "eslint-config-next";
import typescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextConfig,
  ...typescript,
  {
    ignores: [".next/**", "node_modules/**", "dist/**"],
  },
];

export default eslintConfig;
