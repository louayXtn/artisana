// generate-sitemap.js
const fs = require('fs');
const path = require('path');

const baseUrl = 'https://artisana.onrender.com'; // غيّر حسب نطاقك الحقيقي

// المسارات الثابتة فقط
const staticRoutes = [
  '/',
  '/login',
  '/signup',
  '/products',
  '/bestProducts',
  '/cart',
  '/add-Product',
  '/delete-product',
  '/orders',
  '/admin/messages'
];

const today = new Date().toISOString().split('T')[0];

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticRoutes
  .map(route => {
    return `  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(__dirname, 'public', 'sitemap.xml'), sitemapContent, 'utf8');
console.log('✅ sitemap.xml تم إنشاؤه في مجلد public');