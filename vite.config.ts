// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: "jsdom", // Browser-like environment
    globals: true, // describe/it/expect ကို import မလိုဘဲ သုံးလို့ရတယ်
    setupFiles: "./src/test/setup.ts",
  },
});
