import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// SEO配置
const seoConfig = {
  fullDomain: 'https://fishitgame.com'
}

// 基础路由配置
const baseRoutes = [
  { path: '/', name: 'home', priority: 1.0, changefreq: 'weekly' },
  { path: '/fish-it-guides', name: 'guides', priority: 0.9, changefreq: 'weekly' },
  { path: '/fish-it-wiki', name: 'wiki', priority: 0.8, changefreq: 'weekly' },
  { path: '/fish-it-wiki/boats', name: 'wiki-boats', priority: 0.7, changefreq: 'weekly' },
  { path: '/fish-it-wiki/bobbers', name: 'wiki-bobbers', priority: 0.7, changefreq: 'weekly' },
  { path: '/fish-it-wiki/fish', name: 'wiki-fish', priority: 0.7, changefreq: 'weekly' },
  { path: '/fish-it-wiki/rods', name: 'wiki-rods', priority: 0.7, changefreq: 'weekly' },
  { path: '/fish-it-calculator', name: 'calculator', priority: 0.8, changefreq: 'monthly' },
  { path: '/fish-it-calculator/fish-it-rng-calculator', name: 'calculator-rng', priority: 0.7, changefreq: 'monthly' },
  { path: '/fish-it-calculator/fish-it-luck-calculator', name: 'calculator-luck', priority: 0.7, changefreq: 'monthly' },
  { path: '/fish-it-calculator/fish-it-value-calculator', name: 'calculator-value', priority: 0.7, changefreq: 'monthly' },
  { path: '/fish-it-calculator/fish-it-secret-calculator', name: 'calculator-secret', priority: 0.7, changefreq: 'monthly' },
  { path: '/fish-it-codes', name: 'codes', priority: 0.8, changefreq: 'weekly' },
  { path: '/about', name: 'about', priority: 0.4, changefreq: 'yearly' },
  { path: '/contact', name: 'contact', priority: 0.4, changefreq: 'yearly' },
  { path: '/copyright', name: 'copyright', priority: 0.3, changefreq: 'yearly' },
  { path: '/privacy-policy', name: 'privacy', priority: 0.5, changefreq: 'yearly' },
  { path: '/terms-of-service', name: 'terms', priority: 0.5, changefreq: 'yearly' }
]

// 动态加载数据
async function loadData() {
  const data = {
    guides: [],
    wiki: {
      boats: [],
      bobbers: [],
      fish: [],
      rods: []
    }
  }

  // 加载 guides 数据
  try {
    const guideModule = await import('../src/data/guides/guides.js')
    data.guides = guideModule.default || guideModule.guides || []
  } catch (error) {
    console.warn('Failed to load guides:', error.message)
    data.guides = []
  }

  // 加载 wiki 数据
  const wikiCategories = ['boats', 'bobbers', 'fish', 'rods']
  
  for (const category of wikiCategories) {
    try {
      const module = await import(`../src/data/wiki/${category}.js`)
      data.wiki[category] = module.default || []
    } catch (error) {
      console.warn(`Failed to load wiki/${category}:`, error.message)
      data.wiki[category] = []
    }
  }

  return data
}

// 生成URL XML
function generateUrlXml(path, lastmod, priority, changefreq) {
  const roundedPriority = priority.toFixed(1)
  return `  <url>
    <loc>${seoConfig.fullDomain}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${roundedPriority}</priority>
  </url>`
}

// 生成站点地图
async function generateSitemap(data) {
  const lastmod = new Date().toISOString().split('T')[0]

  let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`

  // 生成基础路由
  baseRoutes.forEach(route => {
    sitemapXml += `\n${generateUrlXml(route.path, lastmod, route.priority, route.changefreq)}`
  })

  // 为 guides 生成URL
  const guides = data.guides || []
  guides.forEach(guide => {
    if (!guide || !guide.addressBar) return
    const guidePath = `/fish-it-guides${guide.addressBar}`
    sitemapXml += `\n${generateUrlXml(guidePath, guide.publishDate || lastmod, 0.8, 'monthly')}`
  })

  // 为 wiki 生成URL
  const wikiCategories = ['boats', 'bobbers', 'fish', 'rods']
  
  for (const category of wikiCategories) {
    const items = data.wiki[category] || []
    items
      .filter(item => item && item.showDetail !== false && item.addressBar)
      .forEach(item => {
        const cleanAddressBar = item.addressBar.replace(/^\//, '').replace(/\/$/, '')
        const itemPath = `/fish-it-wiki/${category}/${cleanAddressBar}`
        sitemapXml += `\n${generateUrlXml(itemPath, item.publishDate || lastmod, 0.6, 'monthly')}`
      })
  }

  sitemapXml += `\n</urlset>`
  return sitemapXml
}

// 生成并保存站点地图
async function main() {
  try {
    console.log('📦 Loading data...')
    const data = await loadData()
    
    console.log('🗺️  Generating sitemap...')
    const sitemapContent = await generateSitemap(data)
    
    const publicPath = path.join(__dirname, '../public/sitemap.xml')
    const distPath = path.join(__dirname, '../dist/sitemap.xml')

    // 确保public目录存在
    const publicDir = path.dirname(publicPath)
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true })
    }

    fs.writeFileSync(publicPath, sitemapContent, 'utf8')
    console.log('✅ Generated sitemap.xml in public folder')

    // 如果dist目录存在，也复制一份
    if (fs.existsSync(path.join(__dirname, '../dist'))) {
      fs.writeFileSync(distPath, sitemapContent, 'utf8')
      console.log('✅ Generated sitemap.xml in dist folder')
    }

    const urlCount = (sitemapContent.match(/<url>/g) || []).length
    console.log(`✅ Total URLs in sitemap: ${urlCount}`)
    
    // 统计各类别的URL数量
    const stats = {
      base: baseRoutes.length,
      guides: (data.guides || []).length,
      wiki: Object.values(data.wiki).reduce((sum, items) => sum + (items || []).length, 0)
    }
    
    console.log('\n📊 URLs by category:')
    console.log(`   Base routes: ${stats.base}`)
    console.log(`   Guides: ${stats.guides}`)
    console.log(`   Wiki: ${stats.wiki}`)
    
    // 验证生成的站点地图
    const validation = sitemapContent.includes('<?xml') && 
                      sitemapContent.includes('<urlset') && 
                      sitemapContent.includes('</urlset>')
    
    if (validation) {
      console.log('\n✅ Sitemap validation passed')
    } else {
      console.warn('\n⚠️  Sitemap validation failed')
    }
  } catch (error) {
    console.error('❌ Error generating sitemap:', error)
    process.exit(1)
  }
}

main()

