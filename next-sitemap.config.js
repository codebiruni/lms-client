/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.quranic-verse.com',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  
  // Output directory (default: public)
  outDir: './public',
  
  // Robots.txt configuration
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/dashboard/*',
          '/profile/*',
          '/api/*',
          '/admin/*',
          '/payment/*',
          '/checkout/*',
          '/_next/*'
        ]
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/dashboard/*', '/profile/*', '/api/*']
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/dashboard/*', '/profile/*', '/api/*']
      }
    ],
    additionalSitemaps: [
      'http://localhost:3000/sitemap.xml',
      'https://www.quranic-verse.com/sitemap.xml',
      'https://www.quranic-verse.com/server-sitemap.xml',
    ],
  },
  
  // Exclude specific paths
  exclude: [
    '/dashboard/*',
    '/profile/*',
    '/api/*',
    '/admin/*',
    '/auth/*',
    '/payment/*',
    '/checkout/*',
    '/_next/*',
    '/404',
    '/500'
  ],
  
  // Transform function for customizing each URL
  transform: async (config, path) => {
    // Custom priorities and change frequencies based on path
    const priorityMap = {
      '/': 1.0,
      '/courses': 0.9,
      '/features': 0.8,
      '/scholars': 0.8,
      '/about': 0.7,
      '/contact': 0.6,
      '/blog': 0.7,
      '/faq': 0.6
    }
    
    const changefreqMap = {
      '/': 'daily',
      '/courses': 'weekly',
      '/features': 'weekly',
      '/scholars': 'weekly',
      '/about': 'monthly',
      '/contact': 'monthly',
      '/blog': 'daily',
      '/faq': 'monthly'
    }
    
    // Find matching priority
    let priority = 0.5
    for (const [key, value] of Object.entries(priorityMap)) {
      if (path === key || path.startsWith(`${key}/`)) {
        priority = value
        break
      }
    }
    
    // Find matching changefreq
    let changefreq = 'weekly'
    for (const [key, value] of Object.entries(changefreqMap)) {
      if (path === key || path.startsWith(`${key}/`)) {
        changefreq = value
        break
      }
    }
    
    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    }
  },
  
  // Additional paths to include
  additionalPaths: async (config) => {
    const result = []
    
    // Add important static pages
    const staticPages = [
      '/privacy',
      '/terms',
      '/cookies',
      '/sitemap',
      '/accessibility',
      '/careers'
    ]
    
    for (const page of staticPages) {
      result.push({
        loc: page,
        changefreq: 'monthly',
        priority: 0.5,
        lastmod: new Date().toISOString(),
      })
    }
    
    return result
  },
  
  // Custom transformation for alternate refs (multilingual support)
  // Uncomment if you have multiple languages
  /*
  alternateRefs: [
    {
      href: 'https://www.quranic-verse.com/en',
      hreflang: 'en',
    },
    {
      href: 'https://www.quranic-verse.com/ar',
      hreflang: 'ar',
    },
  ],
  */
  
  // Auto generate sitemap for dynamic routes (if using SSG)
  // For SSR/ISR, you'll need to implement server-side sitemap generation
  
  // Limit the number of URLs per sitemap file (default: 50000)
  sitemapSize: 5000,
  
  // Add trailing slash to URLs (default: false)
  trailingSlash: false,
  
  // Remove alternate refs (default: false)
  removeAlternateRefs: false,
  
  // Skip generating index sitemap for small sites (default: false)
  skipIndexSitemap: false,
}