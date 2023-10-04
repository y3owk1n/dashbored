import type { Config } from "tailwindcss";

import baseConfig from "@dashbored/tailwind-config";

export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/utils/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/src/**/*.{js,ts,tsx,jsx}",
  ],
  presets: [baseConfig],
} satisfies Config;
