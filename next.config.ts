import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS || false;
const repo = process.env.GITHUB_REPOSITORY || '';

const assetPrefix = isGithubActions ? `/${repo.split('/')[1]}` : '';
const basePath = isGithubActions ? `/${repo.split('/')[1]}` : '';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: basePath,
  assetPrefix: assetPrefix,
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
