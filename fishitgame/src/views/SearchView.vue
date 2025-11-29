<template>
  <section class="page-container">
    <div class="container">
      <div class="page-header">
        <p class="page-badge">Search</p>
        <h1 class="page-title">Search Results</h1>
        <p class="subtitle" v-if="query">
          Found {{ totalResults }} result{{ totalResults !== 1 ? 's' : '' }} for "{{ query }}"
        </p>
        <p class="subtitle" v-else>
          Enter a search term to find guides, wiki items, calculators, and more.
        </p>
      </div>

      <!-- Search Form -->
      <div class="search-form-wrapper">
        <form @submit.prevent="performSearch" class="search-form-large">
          <input
            v-model="searchInput"
            type="text"
            placeholder="Search guides, wiki items, calculators..."
            class="search-input-large"
            ref="searchInputRef"
          />
          <button type="submit" class="search-button-large">
            <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M19 19L14.65 14.65" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Search
          </button>
        </form>
      </div>

      <!-- Results -->
      <div v-if="query && results.length > 0" class="results-container">
        <!-- Guides Section - Grid Layout -->
        <div v-if="guidesResults.length > 0" class="results-section">
          <div class="section-heading-wrapper">
            <h2 class="section-heading">Guides ({{ guidesResults.length }})</h2>
          </div>
          <div class="guides-grid">
            <article
              v-for="item in guidesResults"
              :key="`guide-${item.id}`"
              class="guide-card"
              @click="navigateToGuide(item)"
            >
              <div class="image-wrapper" v-if="item.imageUrl">
                <img :src="item.imageUrl" :alt="item.imageAlt || item.title" loading="lazy" />
              </div>
              <div class="card-body">
                <p class="publish-date">{{ formatDate(item.publishDate) }}</p>
                <h3 class="guide-title">{{ item.title }}</h3>
                <p class="guide-description">{{ item.description }}</p>
                <div class="tag-list" v-if="item.tags?.length">
                  <span v-for="tag in item.tags" :key="tag" class="tag">#{{ tag }}</span>
                </div>
              </div>
            </article>
          </div>
        </div>

        <!-- Calculators Section - List Layout -->
        <div v-if="calculatorsResults.length > 0" class="results-section">
          <div class="section-heading-wrapper">
            <h2 class="section-heading">Calculators ({{ calculatorsResults.length }})</h2>
          </div>
          <div class="calculators-list">
            <article
              v-for="item in calculatorsResults"
              :key="`calculator-${item.id}`"
              class="calculator-card"
              @click="navigateToCalculator(item)"
            >
              <div class="calculator-content">
                <h3 class="calculator-title">{{ item.title }}</h3>
                <p class="calculator-description">{{ item.description }}</p>
              </div>
              <div class="calculator-arrow">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </article>
          </div>
        </div>

        <!-- Wiki Items Section - Table Layout -->
        <div v-if="wikiResults.length > 0" class="results-section">
          <div class="section-heading-wrapper">
            <h2 class="section-heading">Wiki Items ({{ wikiResults.length }})</h2>
          </div>
          
          <!-- Group Wiki items by category -->
          <div v-for="(items, category) in groupedWikiResults" :key="category" class="table-section">
            <div class="section-header">
              <h2 class="section-title">{{ getCategoryTitle(category) }} ({{ category }})</h2>
              <span class="section-count">{{ items.length }} items</span>
            </div>
            
            <!-- Boats Table -->
            <div v-if="category === 'boats'" class="wiki-table">
              <table>
                <thead>
                  <tr>
                    <th class="preview-col">Preview</th>
                    <th class="name-col">Boat Name</th>
                    <th class="coins-col">Coins</th>
                    <th class="accel-col">Acceleration</th>
                    <th class="passengers-col">Passengers</th>
                    <th class="speed-col">Top Speed</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in items"
                    :key="`wiki-${category}-${item.id}`"
                    @click="navigateToWiki(item)"
                    :class="['table-row', { disabled: item.showDetail === false }]"
                  >
                    <td class="preview-cell">
                      <img
                        v-if="item.imageUrl"
                        :src="item.imageUrl"
                        :alt="item.imageAlt || item.title"
                        class="preview-thumb"
                        loading="lazy"
                      />
                      <span v-else>—</span>
                    </td>
                    <td class="name-cell">
                      <router-link
                        v-if="item.showDetail !== false"
                        :to="getWikiItemPath(item)"
                        class="name-link"
                      >
                        {{ item.title }}
                      </router-link>
                      <span v-else>{{ item.title }}</span>
                    </td>
                    <td>{{ item.stats?.coins || '—' }}</td>
                    <td>{{ item.stats?.acceleration || '—' }}</td>
                    <td>{{ item.stats?.passengers || '—' }}</td>
                    <td>{{ item.stats?.topSpeed || '—' }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <!-- Bobbers Table -->
            <div v-else-if="category === 'bobbers'" class="wiki-table">
              <table>
                <thead>
                  <tr>
                    <th class="preview-col">Preview</th>
                    <th class="name-col">Bait Name</th>
                    <th class="desc-col">Description</th>
                    <th class="stats-col">Stats</th>
                    <th class="price-col">Price</th>
                    <th class="source-col">Obtainment</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in items"
                    :key="`wiki-${category}-${item.id}`"
                    @click="navigateToWiki(item)"
                    :class="['table-row', { disabled: item.showDetail === false }]"
                  >
                    <td class="preview-cell">
                      <img
                        v-if="item.imageUrl"
                        :src="item.imageUrl"
                        :alt="item.imageAlt || item.title"
                        class="preview-thumb"
                        loading="lazy"
                      />
                      <span v-else>—</span>
                    </td>
                    <td class="name-cell">
                      <router-link
                        v-if="item.showDetail !== false"
                        :to="getWikiItemPath(item)"
                        class="name-link"
                      >
                        {{ item.title }}
                      </router-link>
                      <span v-else>{{ item.title }}</span>
                    </td>
                    <td class="desc-cell">{{ item.description || '—' }}</td>
                    <td class="stats-cell">
                      <div v-if="item.stats?.stats && item.stats.stats.length > 0" class="stats-list">
                        <span v-for="(stat, index) in item.stats.stats" :key="index" class="stat-item">{{ stat }}</span>
                      </div>
                      <span v-else>—</span>
                    </td>
                    <td>{{ item.stats?.price || '—' }}</td>
                    <td class="source-cell">
                      <div v-if="item.stats?.obtainment && item.stats.obtainment.length > 0" class="obtainment-list">
                        <span v-for="(source, index) in item.stats.obtainment" :key="index" class="source-item">{{ source }}</span>
                      </div>
                      <span v-else>—</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <!-- Fish Table -->
            <div v-else-if="category === 'fish'" class="wiki-table">
              <table>
                <thead>
                  <tr>
                    <th class="preview-col">Preview</th>
                    <th class="name-col">Fish Name</th>
                    <th class="rarity-col">Rarity</th>
                    <th class="location-col">Location</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in items"
                    :key="`wiki-${category}-${item.id}`"
                    @click="navigateToWiki(item)"
                    :class="['table-row', { disabled: item.showDetail === false }]"
                  >
                    <td class="preview-cell">
                      <img
                        v-if="item.imageUrl"
                        :src="item.imageUrl"
                        :alt="item.imageAlt || item.title"
                        class="preview-thumb"
                        loading="lazy"
                      />
                      <span v-else>—</span>
                    </td>
                    <td class="name-cell">
                      <router-link
                        v-if="item.showDetail !== false"
                        :to="getWikiItemPath(item)"
                        class="name-link"
                      >
                        {{ item.title }}
                      </router-link>
                      <span v-else>{{ item.title }}</span>
                    </td>
                    <td>{{ item.stats?.Rarity || item.stats?.rarity || '—' }}</td>
                    <td>{{ item.stats?.Location || item.stats?.location || '—' }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <!-- Rods Table -->
            <div v-else-if="category === 'rods'" class="wiki-table">
              <table>
                <thead>
                  <tr>
                    <th class="name-col">Rod Name</th>
                    <th class="price-col">Price</th>
                    <th class="luck-col">Luck</th>
                    <th class="speed-col">Speed</th>
                    <th class="weight-col">Weight</th>
                    <th class="acquisition-col">Acquisition</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in items"
                    :key="`wiki-${category}-${item.id}`"
                    @click="navigateToWiki(item)"
                    :class="['table-row', { disabled: item.showDetail === false }]"
                  >
                    <td class="name-cell">
                      <router-link
                        v-if="item.showDetail !== false"
                        :to="getWikiItemPath(item)"
                        class="name-link"
                      >
                        {{ item.title }}
                      </router-link>
                      <span v-else>{{ item.title }}</span>
                    </td>
                    <td v-html="formatStat(item.stats?.Price || item.stats?.price)"></td>
                    <td v-html="formatStat(item.stats?.Luck || item.stats?.luck)"></td>
                    <td v-html="formatStat(item.stats?.Speed || item.stats?.speed)"></td>
                    <td v-html="formatStat(item.stats?.Weight || item.stats?.weight)"></td>
                    <td v-html="formatStat(item.stats?.Acquisition || item.stats?.acquisition)"></td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <!-- Debug: Show if category doesn't match any condition -->
            <div v-else class="debug-info" style="padding: 20px; background: rgba(255,0,0,0.1); border: 1px solid red;">
              <p>Debug: Category = "{{ category }}"</p>
              <p>Items count: {{ items.length }}</p>
              <p>First item: {{ JSON.stringify(items[0]) }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- No Results -->
      <div v-if="query && results.length === 0" class="no-results">
        <svg width="64" height="64" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M19 19L14.65 14.65" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <h3>No results found</h3>
        <p>Try different keywords or check your spelling.</p>
      </div>

      <!-- Empty State -->
      <div v-if="!query" class="empty-state">
        <svg width="64" height="64" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M19 19L14.65 14.65" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <h3>Start searching</h3>
        <p>Enter keywords to find guides, wiki items, calculators, and more.</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { guides } from '@/data/guides/guides.js'
import { wikiDataMap, wikiCategories } from '@/data/wiki/index.js'

const route = useRoute()
const router = useRouter()

const searchInput = ref('')
const searchInputRef = ref(null)

// Calculator data
const calculatorsData = [
  {
    id: 1,
    title: "Fish It RNG Calculator",
    description: "Calculate the expected number of attempts and time needed to catch your target fish based on your equipment setup.",
    slug: "fish-it-rng-calculator",
  },
  {
    id: 2,
    title: "Fish It Luck Calculator",
    description: "Calculate your total luck percentage and optimize your gear setup for maximum catch rates.",
    slug: "fish-it-luck-calculator",
  },
  {
    id: 3,
    title: "Fish It Value Calculator",
    description: "Calculate the value and profit potential of different fish species and fishing strategies.",
    slug: "fish-it-value-calculator",
  },
  {
    id: 4,
    title: "Fish It Secret Calculator",
    description: "Specialized calculator for Secret fish catch rates and optimal strategies for rare catches.",
    slug: "fish-it-secret-calculator",
  },
]

const query = computed(() => route.query.q || '')

// 搜索函数
const searchItems = (searchTerm) => {
  if (!searchTerm || searchTerm.trim() === '') {
    return []
  }

  const term = searchTerm.toLowerCase().trim()
  const results = []

  // 搜索 Guides
  guides.forEach(guide => {
    const titleMatch = guide.title?.toLowerCase().includes(term)
    const descMatch = guide.description?.toLowerCase().includes(term)
    const tagsMatch = guide.tags?.some(tag => tag.toLowerCase().includes(term))
    
    if (titleMatch || descMatch || tagsMatch) {
      results.push({
        type: 'guide',
        ...guide
      })
    }
  })

  // 搜索 Calculators
  calculatorsData.forEach(calculator => {
    const titleMatch = calculator.title?.toLowerCase().includes(term)
    const descMatch = calculator.description?.toLowerCase().includes(term)
    
    if (titleMatch || descMatch) {
      results.push({
        type: 'calculator',
        ...calculator
      })
    }
  })

  // 搜索 Wiki Items
  Object.keys(wikiDataMap).forEach(categoryKey => {
    const category = wikiCategories.find(c => c.key === categoryKey)
    const items = wikiDataMap[categoryKey] || []
    
    items.forEach(item => {
      const titleMatch = item.title?.toLowerCase().includes(term)
      const descMatch = item.description?.toLowerCase().includes(term)
      
      // 搜索 stats 字段中的所有值
      let statsMatch = false
      if (item.stats) {
        const statsString = JSON.stringify(item.stats).toLowerCase()
        statsMatch = statsString.includes(term)
      }
      
      // 搜索 category
      const categoryMatch = item.category?.toLowerCase().includes(term)
      
      if (titleMatch || descMatch || statsMatch || categoryMatch) {
        // 先展开 item，然后用我们的 category 覆盖
        const { category: itemCategory, ...itemRest } = item
        results.push({
          ...itemRest,
          type: 'wiki',
          category: categoryKey, // 使用数据类别（bobbers, boats, fish, rods）
          itemCategory: itemCategory, // 保存原始类别（purchasable, gift, gamepass等）
          categoryName: category?.title || categoryKey,
          categoryPath: category?.to || `/wiki/fish-it-${categoryKey}`
        })
      }
    })
  })

  return results
}

const results = computed(() => {
  if (!query.value) return []
  return searchItems(query.value)
})

const guidesResults = computed(() => {
  return results.value.filter(item => item.type === 'guide')
})

const calculatorsResults = computed(() => {
  return results.value.filter(item => item.type === 'calculator')
})

const wikiResults = computed(() => {
  return results.value.filter(item => item.type === 'wiki')
})

const groupedWikiResults = computed(() => {
  const grouped = {}
  wikiResults.value.forEach(item => {
    // item.category 应该是搜索时设置的 categoryKey（'bobbers', 'boats', 'fish', 'rods'）
    const categoryKey = item.category || 'unknown'
    if (!grouped[categoryKey]) {
      grouped[categoryKey] = []
    }
    grouped[categoryKey].push(item)
  })
  return grouped
})

const totalResults = computed(() => results.value.length)

const getCategoryTitle = (category) => {
  const categoryMap = {
    'boats': 'Boats & Utility',
    'bobbers': 'Baits / Floats',
    'fish': 'Fish Index',
    'rods': 'Fishing Rods'
  }
  return categoryMap[category] || category
}

const getCategoryNameColumn = (category) => {
  const columnMap = {
    'boats': 'Boat Name',
    'bobbers': 'Bait Name',
    'fish': 'Fish Name',
    'rods': 'Rod Name'
  }
  return columnMap[category] || 'Name'
}

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

const formatStat = (value) => {
  if (!value) return '—'
  if (Array.isArray(value)) {
    return value.map((entry) => formatStat(entry)).join('<br/>')
  }
  return String(value)
}

const performSearch = () => {
  if (searchInput.value.trim()) {
    router.push({
      path: '/search',
      query: { q: searchInput.value.trim() }
    })
  }
}

const navigateToGuide = (guide) => {
  if (guide.addressBar) {
    router.push(`/guides${guide.addressBar}`)
  }
}

const navigateToCalculator = (calculator) => {
  if (calculator.slug) {
    router.push(`/calculator/${calculator.slug}`)
  }
}

const navigateToWiki = (item) => {
  if (item.showDetail === false) return
  const path = getWikiItemPath(item)
  router.push(path)
}

const getWikiItemPath = (item) => {
  if (item.addressBar && item.categoryPath) {
    // 处理 baits 路径映射
    let basePath = item.categoryPath
    if (item.category === 'bobbers') {
      basePath = '/wiki/fish-it-baits'
    }
    return `${basePath}${item.addressBar}`
  } else if (item.categoryPath) {
    let basePath = item.categoryPath
    if (item.category === 'bobbers') {
      basePath = '/wiki/fish-it-baits'
    }
    return basePath
  }
  return '/wiki'
}

// 初始化搜索输入
onMounted(() => {
  if (query.value) {
    searchInput.value = query.value
  }
  // 聚焦搜索框
  if (searchInputRef.value && !query.value) {
    searchInputRef.value.focus()
  }
})

// 监听路由变化
watch(() => route.query.q, (newQuery) => {
  if (newQuery) {
    searchInput.value = newQuery
  }
})
</script>

<style scoped>
.search-form-wrapper {
  max-width: 600px;
  margin: 0 auto 40px;
}

.search-form-large {
  display: flex;
  gap: 12px;
  align-items: stretch;
}

.search-input-large {
  flex: 1;
  padding: 14px 20px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  color: var(--text);
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.2s ease;
  outline: none;
}

.search-input-large::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.search-input-large:focus {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(59, 130, 246, 0.5);
  box-shadow: 0 0 12px rgba(59, 130, 246, 0.2);
}

.search-button-large {
  padding: 14px 24px;
  background: var(--accent);
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
  font-family: inherit;
}

.search-button-large:hover {
  background: var(--accent-soft);
  box-shadow: 0 0 16px rgba(59, 130, 246, 0.4);
}

.results-container {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.results-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.section-heading-wrapper {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
}

.section-heading {
  margin: 0;
  font-size: 24px;
  color: rgba(255, 255, 255, 0.92);
}

/* Guides Grid Styles - Same as GuidesView */
.guides-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.guide-card {
  border-radius: 20px;
  border: 1px solid rgba(59, 130, 246, 0.2);
  background: linear-gradient(135deg, rgba(20, 30, 50, 0.8), rgba(15, 25, 40, 0.6));
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
  cursor: pointer;
  transition: all 0.3s ease;
}

.guide-card:hover {
  border-color: rgba(59, 130, 246, 0.4);
  box-shadow: 0 16px 40px rgba(59, 130, 246, 0.2);
  transform: translateY(-4px);
}

.image-wrapper {
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s;
}

.guide-card:hover img {
  transform: scale(1.05);
}

.card-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
}

.publish-date {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.guide-title {
  font-size: 20px;
  color: #fff;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
}

.guide-description {
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  padding: 4px 10px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Calculators List Styles - Same as CalculatorView */
.calculators-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.calculator-card {
  border-radius: 16px;
  border: 1px solid rgba(59, 130, 246, 0.15);
  background: linear-gradient(
    135deg,
    rgba(20, 30, 50, 0.6),
    rgba(15, 25, 40, 0.4)
  );
  padding: 28px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.calculator-card::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(180deg, var(--accent), rgba(59, 130, 246, 0.5));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.calculator-card:hover {
  border-color: rgba(59, 130, 246, 0.4);
  background: linear-gradient(
    135deg,
    rgba(20, 30, 50, 0.8),
    rgba(15, 25, 40, 0.6)
  );
  box-shadow: 0 8px 32px rgba(59, 130, 246, 0.15);
  transform: translateX(4px);
}

.calculator-card:hover::before {
  opacity: 1;
}

.calculator-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.calculator-title {
  font-size: 22px;
  color: #fff;
  margin: 0;
  font-weight: 600;
  letter-spacing: -0.02em;
  transition: color 0.3s ease;
}

.calculator-card:hover .calculator-title {
  color: rgba(147, 197, 253, 1);
}

.calculator-description {
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.5;
  margin: 0;
  font-size: 14px;
}

.calculator-arrow {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(59, 130, 246, 0.6);
  transition: all 0.3s ease;
  border-radius: 8px;
  background: rgba(59, 130, 246, 0.05);
}

.calculator-card:hover .calculator-arrow {
  color: var(--accent);
  background: rgba(59, 130, 246, 0.15);
  transform: translateX(4px);
}

/* Wiki Table Styles - Same as WikiBoatsView */
.table-section {
  margin-bottom: 40px;
  border-bottom: 2px solid rgba(59, 130, 246, 0.2);
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.section-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text);
  margin: 0;
}

.section-count {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  padding: 4px 12px;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 999px;
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.wiki-table {
  overflow-x: auto;
  border-radius: 16px;
  background-color: rgba(20, 30, 50, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.wiki-table table {
  width: 100%;
  border-collapse: collapse;
  table-layout: auto;
}

.wiki-table th {
  text-align: center;
  padding: 16px;
  font-size: 0.9rem;
  color: #ffdcdc;
  background: rgba(59, 130, 246, 0.15);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.wiki-table td {
  text-align: center;
  padding: 5px;
  color: rgba(255, 255, 255, 0.75);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.table-row {
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.table-row:hover {
  background-color: rgba(59, 130, 246, 0.1);
}

.table-row.disabled {
  cursor: default;
  opacity: 0.6;
}

.table-row.disabled:hover {
  background-color: transparent;
}

.preview-col {
  width: 240px;
  min-width: 240px;
  text-align: center;
}

.name-col {
  width: 200px;
  min-width: 200px;
}

.preview-cell {
  padding: 8px;
}

.preview-thumb {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.name-cell {
  text-align: left;
  padding: 12px;
}

.name-link {
  color: rgba(147, 197, 253, 1);
  text-decoration: none;
  transition: color 0.2s ease;
}

.name-link:hover {
  color: var(--accent);
  text-decoration: underline;
}

.desc-cell {
  text-align: left;
  padding: 12px;
  max-width: 300px;
}

.stats-cell {
  text-align: left;
  padding: 12px;
}

.stats-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-item {
  font-size: 0.85rem;
}

.source-cell {
  text-align: left;
  padding: 12px;
}

.obtainment-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.source-item {
  font-size: 0.85rem;
}

.coins-col,
.accel-col,
.passengers-col,
.speed-col,
.price-col,
.source-col,
.rarity-col,
.location-col,
.luck-col,
.weight-col,
.desc-col,
.stats-col {
  width: auto;
  min-width: 120px;
}

.no-results,
.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: rgba(255, 255, 255, 0.6);
}

.no-results svg,
.empty-state svg {
  margin: 0 auto 24px;
  color: rgba(255, 255, 255, 0.3);
}

.no-results h3,
.empty-state h3 {
  font-size: 24px;
  color: var(--text);
  margin-bottom: 12px;
}

.no-results p,
.empty-state p {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.6);
}

@media (max-width: 768px) {
  .search-form-large {
    flex-direction: column;
  }

  .search-button-large {
    justify-content: center;
  }

  .guides-grid {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .card-body {
    padding: 10px;
  }

  .section-heading {
    font-size: 20px;
  }

  .calculators-list {
    gap: 10px;
  }

  .calculator-card {
    padding: 15px;
    gap: 10px;
  }

  .calculator-title {
    font-size: 16px;
  }

  .calculator-description {
    font-size: 13px;
  }

  .wiki-table {
    font-size: 0.85rem;
  }

  .wiki-table th,
  .wiki-table td {
    padding: 8px 4px;
  }

  .preview-thumb {
    width: 50px;
    height: 50px;
  }
}
</style>
