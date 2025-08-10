/** @type {import('next').NextConfig} */
const isPages = process.env.GITHUB_PAGES === 'true'

const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['gray-matter'],
    appDir: true,
  },

  // Only export static site when building for GitHub Pages
  ...(isPages ? { output: 'export' } : {}),

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['placeholder.svg'],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: isPages, // GH Pages cannot run the image optimizer
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
    }
    return config
  }
}

export default nextConfig
