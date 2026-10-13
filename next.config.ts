import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Let phones on the home network (and Tailscale) use the dev server; Next.js only allows localhost by default.
  allowedDevOrigins: ["192.168.86.*", "100.125.89.123"],
}

export default nextConfig
