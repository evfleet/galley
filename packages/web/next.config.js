/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@galley/common"],
  webpack: (config, _context) => {
    config.resolve.alias["@galley/common"] = path.resolve(
      __dirname,
      "node_modules/@galley/common"
    );
    return config;
  },
};

module.exports = nextConfig;
