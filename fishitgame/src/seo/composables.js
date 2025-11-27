import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { seoConfig } from './config.js'

// 数据加载映射表 - 用于 SEO 中的数据加载
const dataLoaders = {
  guides: () => import('../data/guides/guides.js'),
  wiki: {
    boats: () => import('../data/wiki/boats.js'),
    bobbers: () => import('../data/wiki/bobbers.js'),
    fish: () => import('../data/wiki/fish.js'),
    rods: () => import('../data/wiki/rods.js')
  }
}

/**
 * 加载数据模块（用于 SEO）
 */
const loadDataForSEO = async (dataType, category = null) => {
  try {
    if (dataType === 'wiki' && category) {
      const loader = dataLoaders.wiki[category]
      if (!loader) {
        throw new Error(`Unknown wiki category: ${category}`)
      }
      return await loader()
    } else {
      const loader = dataLoaders[dataType]
      if (!loader) {
        throw new Error(`Unknown data type: ${dataType}`)
      }
      return await loader()
    }
  } catch (error) {
    console.warn(`Failed to load data for SEO: ${dataType}${category ? `/${category}` : ''}`, error)
    return null
  }
}

// SEO composable
export function useSEO() {
  const route = useRoute()

  // 当前页面的SEO数据
  const currentSEO = ref({})

  // 获取当前页面路径
  const currentPath = computed(() => {
    return route.path
  })

  // 获取Canonical URL
  const canonicalUrl = computed(() => {
    return `${seoConfig.fullDomain}${currentPath.value}`
  })

  // 设置页面SEO数据
  const setSEO = (seoData) => {
    currentSEO.value = {
      ...seoConfig.defaults,
      ...seoData
    }
    updateMetaTags()
  }

  // 更新HTML meta标签
  const updateMetaTags = () => {
    if (typeof document === 'undefined') return

    const seo = currentSEO.value

    // 更新title
    document.title = seo.title || seoConfig.defaults.title

    // 更新或创建meta标签
    updateMetaTag('description', seo.description)
    updateMetaTag('keywords', seo.keywords)
    updateMetaTag('author', seo.author)

    // Open Graph标签
    updateMetaTag('og:title', seo.title, 'property')
    updateMetaTag('og:description', seo.description, 'property')
    updateMetaTag('og:image', seo.image, 'property')
    updateMetaTag('og:url', canonicalUrl.value, 'property')
    updateMetaTag('og:type', seo.type, 'property')
    updateMetaTag('og:site_name', 'Fish It! Community', 'property')

    // Twitter Card标签
    updateMetaTag('twitter:card', 'summary_large_image', 'name')
    updateMetaTag('twitter:title', seo.title, 'name')
    updateMetaTag('twitter:description', seo.description, 'name')
    updateMetaTag('twitter:image', seo.image, 'name')
    updateMetaTag('twitter:site', seoConfig.social.twitter, 'name')

    // Canonical URL
    updateCanonicalLink()
  }

  // 更新单个meta标签
  const updateMetaTag = (name, content, attribute = 'name') => {
    if (!content) return

    // 查找现有标签
    let tag = document.querySelector(`meta[${attribute}="${name}"]`)
    
    if (tag) {
      // 如果标签存在，直接更新content
      tag.setAttribute('content', content)
    } else {
      // 如果标签不存在，创建新标签
      tag = document.createElement('meta')
      tag.setAttribute(attribute, name)
      tag.setAttribute('content', content)
      document.head.appendChild(tag)
    }
  }

  // 更新Canonical链接
  const updateCanonicalLink = () => {
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', canonicalUrl.value)
  }

  // 生成结构化数据
  const generateStructuredData = (pageType = 'WebPage', additionalData = {}) => {
    const baseData = {
      '@context': 'https://schema.org',
      '@type': pageType,
      name: currentSEO.value.title,
      description: currentSEO.value.description,
      url: canonicalUrl.value,
      publisher: {
        '@type': 'Organization',
        name: 'Fish It! Community',
        url: seoConfig.fullDomain,
        logo: {
          '@type': 'ImageObject',
          url: `${seoConfig.fullDomain}/images/logo.webp`
        },
        sameAs: [
          `https://twitter.com/${seoConfig.social.twitter.replace('@', '')}`,
          `https://facebook.com/${seoConfig.social.facebook}`,
          `https://instagram.com/${seoConfig.social.instagram}`,
          `https://discord.gg/${seoConfig.social.discord}`
        ]
      },
      ...additionalData
    }

    // 根据页面类型添加特定数据
    if (pageType === 'VideoGame') {
      baseData.genre = 'Fishing Simulator'
      baseData.gamePlatform = ['Roblox']
      baseData.applicationCategory = 'Game'
    }

    if (pageType === 'Article') {
      baseData.author = {
        '@type': 'Organization',
        name: 'Fish It! Community'
      }
      baseData.datePublished = additionalData.datePublished || new Date().toISOString()
      baseData.dateModified = additionalData.dateModified || new Date().toISOString()
    }

    return baseData
  }

  // 添加结构化数据到页面
  const addStructuredData = (data) => {
    if (typeof document === 'undefined') return

    // 移除现有的结构化数据
    const existingScript = document.querySelector('script[type="application/ld+json"]')
    if (existingScript) {
      existingScript.remove()
    }

    // 添加新的结构化数据
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(data)
    document.head.appendChild(script)
  }

  return {
    currentSEO,
    currentPath,
    canonicalUrl,
    setSEO,
    updateMetaTags,
    generateStructuredData,
    addStructuredData
  }
}

// 路由名称到SEO key的映射
const routeToSeoKey = {
  'home': 'home',
  'guides': 'guides',
  'guide-detail': 'guideDetail',
  'wiki': 'wiki',
  'wiki-boats': 'wikiBoats',
  'wiki-bobbers': 'wikiBobbers',
  'wiki-fish': 'wikiFish',
  'wiki-rods': 'wikiRods',
  'wiki-detail': 'wikiDetail',
  'calculator': 'calculator'
}

// 动态路由名称集合（需要从数据加载 SEO 的路由）
const dynamicRouteNames = new Set([
  'guide-detail',
  'wiki-detail'
])

// 自动SEO composable - 监听路由变化自动设置SEO
export function useAutoSEO() {
  const { setSEO, generateStructuredData, addStructuredData } = useSEO()
  const route = useRoute()
  
  // 处理SEO的函数
  const handleSEO = async () => {
    const routeName = route.name
    const seoKey = routeToSeoKey[routeName]

    let finalSEOData = {
      ...seoConfig.defaults
    }
    let hasSeoData = false

    if (dynamicRouteNames.has(routeName)) {
      try {
        let item = null
        
        if (routeName === 'guide-detail') {
          // 加载 guide 数据
          const module = await loadDataForSEO('guides')
          if (module?.default || module?.guides) {
            const guides = module.default || module.guides || []
            const slug = route.params.slug || ''
            const searchSlug = `/${slug}`
            
            item = guides.find(g => {
              if (!g.addressBar) return false
              return g.addressBar === searchSlug
            })
          }
        } else if (routeName === 'wiki-detail') {
          // 加载 wiki 数据
          const category = route.params.category || ''
          const slug = route.params.slug || ''
          
          const module = await loadDataForSEO('wiki', category)
          if (module?.default) {
            const items = module.default || []
            
            item = items.find(i => {
              if (!i.addressBar) return false
              const cleanAddressBar = i.addressBar.replace(/^\//, '').replace(/\/$/, '')
              return cleanAddressBar === slug
            })
          }
        }
        
        if (item) {
          if (item.seo) {
            finalSEOData = {
              ...finalSEOData,
              title: item.seo.title || item.title || finalSEOData.title,
              description: item.seo.description || item.description || finalSEOData.description,
              keywords: item.seo.keywords || finalSEOData.keywords,
              image: item.imageUrl || finalSEOData.image,
              type: 'article'
            }
            hasSeoData = true
          } else {
            finalSEOData = {
              ...finalSEOData,
              title: item.title ? `${item.title} - Fish It!` : finalSEOData.title,
              description: item.description || finalSEOData.description,
              image: item.imageUrl || finalSEOData.image,
              type: 'article'
            }
            hasSeoData = !!item.description || !!item.title
          }
        }
      } catch (error) {
        console.warn('Failed to load dynamic SEO data:', error)
      }
    } else {
      // 静态页面从路由 meta 中读取 SEO
      const routeMeta = route.meta
      if (routeMeta && routeMeta.seo) {
        finalSEOData = {
          ...finalSEOData,
          title: routeMeta.seo.title || finalSEOData.title,
          description: routeMeta.seo.description || finalSEOData.description,
          keywords: routeMeta.seo.keywords || finalSEOData.keywords
        }
        hasSeoData = true
      }
    }

    if (!hasSeoData) {
      return
    }
    
    setSEO(finalSEOData)
    
    // 添加结构化数据
    const pageType = finalSEOData.type === 'article' ? 'Article' : 'WebPage'
    const structuredData = generateStructuredData(pageType, {
      datePublished: route.meta?.publishDate,
      dateModified: route.meta?.publishDate
    })
    addStructuredData(structuredData)
  }
  
  // 监听路由变化
  watch(
    [() => route.fullPath, () => route.name],
    async () => {
      await handleSEO()
    },
    { immediate: true }
  )
}

