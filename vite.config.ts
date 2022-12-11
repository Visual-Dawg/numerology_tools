import { defineConfig } from "vitest/config"
import { svelte } from "@sveltejs/vite-plugin-svelte"

import { join } from "node:path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      "#": `${join(__dirname, "src")}/`,
      "#types": `${join(__dirname, "types")}/`,
    },
  },

  // Vitest
  test: { includeSource: ["./src/**/*.ts"] },
  define: {
    "import.meta.vitest": "undefined",
  },
})
