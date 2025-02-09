/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://ait-lab.vercel.app", // Replace with your site's URL
  generateRobotsTxt: true, // (optional) Generate robots.txt file
  sitemapSize: 5000, // Maximum entries per sitemap
  changefreq: "daily", // Default change frequency
  priority: 0.7, // Default priority for URLs
  // Optional: Add custom paths to exclude
  // exclude: ['/exclude-path', '/another-path'],
  // Optional: Additional configurations
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
  },
};
  