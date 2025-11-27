// SEO配置文件
export const seoConfig = {
  // 域名配置
  domain: 'fishitgame.com',
  fullDomain: 'https://fishitgame.com',
  protocol: 'https://',

  // 社交媒体配置
  social: {
    twitter: '@fishitgame',
    facebook: 'fishitgame',
    instagram: 'fishitgame',
    discord: 'fishitgame'
  },

  // 默认SEO设置
  defaults: {
    title: 'Fish It! - Roblox Fishing Simulator Community Guide',
    description: 'The ultimate community resource for Fish It! Roblox fishing simulator. Find guides, wiki, fish database, boats, bobbers, rods, and strategies to catch rare fish.',
    keywords: 'Fish It, Roblox fishing, fishing simulator, fish guide, fishing wiki, catch calculator, rare fish, fishing rods, bobbers, boats',
    author: 'Fish It! Community',
    image: 'https://fishitgame.com/images/logo.webp',
    type: 'website'
  },

  // 页面优先级设置
  priorities: {
    home: 1.0,
    guides: 0.9,
    guideDetail: 0.8,
    wiki: 0.8,
    wikiBoats: 0.7,
    wikiBobbers: 0.7,
    wikiFish: 0.7,
    wikiRods: 0.7,
    wikiDetail: 0.6,
    calculator: 0.8,
    codes: 0.8
  },

  // 更新频率设置
  changefreq: {
    home: 'weekly',
    guides: 'weekly',
    guideDetail: 'monthly',
    wiki: 'weekly',
    wikiBoats: 'weekly',
    wikiBobbers: 'weekly',
    wikiFish: 'weekly',
    wikiRods: 'weekly',
    wikiDetail: 'monthly',
    calculator: 'monthly',
    codes: 'weekly'
  }
}

