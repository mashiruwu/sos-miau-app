import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { configDefaults } from "vitest/config"; 

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  test: {
    globals: true,
    environment: "jsdom", 
    include: ["src/**/*.test.{ts,tsx}"], 
    exclude: [...configDefaults.exclude], 
  }
});
