import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactCompiler: true,
  // `bun run bake` sets BAKE to export the site statically (out/), which scripts/bake.ts folds into one file.
  output: process.env.BAKE ? "export" : undefined,
  // Let phones on the home network (and Tailscale) use the dev server; Next.js only allows localhost by default.
  allowedDevOrigins: ["192.168.86.*", "100.125.89.123"],
  experimental: {
    // Have `next dev` and `next build` remind us to upgrade only when a security advisory affects the installed version.
    agentUpgrade: "security",
  },
}

export default nextConfig
