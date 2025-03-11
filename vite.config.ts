import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig, loadEnv, ResolvedConfig } from "vite";

// https://vite.dev/config/
export default ({ mode }: ResolvedConfig) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    plugins: [react(), TanStackRouterVite()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
      extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    server: {
      proxy: {
        "/api": {
          target: process.env.VITE_BASE_API_URL ?? "https://test.com",
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/api/, ""),
        },
        "/broadcasting/auth": {
          target: process.env.VITE_BASE_API_URL ?? "https://test.com",
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/api/, ""),
        },
        "/app": {
          target: "ws://localhost:8080",
          ws: true,
          rewriteWsOrigin: true,
        },
      },
      allowedHosts: ["ru.payhub.finance"],
    },
  });
};
