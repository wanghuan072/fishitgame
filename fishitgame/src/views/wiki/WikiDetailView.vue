<template>
  <section class="wiki-detail">
    <div class="container">
      <div v-if="entry" class="detail-shell">
        <div class="detail-header">
          <router-link class="back-link" :to="backLink">← Back to {{ categoryName }}</router-link>
          <p class="meta">{{ formatDate(entry.publishDate) }}</p>
          <h1>{{ entry.title }}</h1>
          <p class="description">{{ entry.description }}</p>
        </div>

        <div class="detail-showcase" v-if="statEntries.length">
          <div class="stat-pill" v-for="stat in statEntries" :key="stat.label">
            <span>{{ stat.label }}</span>
            <strong>{{ stat.value }}</strong>
          </div>
        </div>

        <div class="detail-content" v-html="entry.detailsHtml"></div>
      </div>
      <div v-else class="empty-state">
        <p>This wiki entry doesn’t exist yet.</p>
        <router-link to="/wiki" class="back-link">Back to Wiki</router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { wikiDataMap, wikiCategories } from '@/data/wiki/index.js'

const route = useRoute()

const categoryKey = computed(() => {
  const category = route.params.category
  // 从 fish-it-boats 等格式中提取 boats 等原始 key
  if (category && category.startsWith('fish-it-')) {
    return category.replace('fish-it-', '')
  }
  return category
})

const slug = computed(() => `/${route.params.slug ?? ''}`)

const entries = computed(() => wikiDataMap[categoryKey.value] ?? [])
const entry = computed(() => entries.value.find((item) => item.addressBar === slug.value))

const categoryName = computed(() => {
  const category = wikiCategories.find((cat) => cat.key === categoryKey.value)
  return category?.title ?? 'Wiki'
})

const backLink = computed(() => {
  const category = route.params.category
  // 如果 category 是 fish-it-* 格式，直接使用；否则构建完整路径
  if (category && category.startsWith('fish-it-')) {
    return `/wiki/${category}`
  }
  return category ? `/wiki/fish-it-${category}` : '/wiki'
})

const statEntries = computed(() => {
  if (!entry.value?.stats) return []
  return Object.entries(entry.value.stats).map(([label, value]) => ({ label, value }))
})

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
</script>

<style scoped>
.wiki-detail {
  padding: 90px 0;
}

.detail-shell {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.detail-header {
  border: 1px solid rgba(59, 130, 246, 0.25);
  border-radius: 24px;
  padding: 32px;
  background: radial-gradient(circle at top, rgba(59, 130, 246, 0.25), rgba(10, 15, 25, 0.6));
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  margin-bottom: 20px;
}

.meta {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

h1 {
  font-size: 48px;
  margin: 16px 0;
  background: linear-gradient(135deg, #e3f2ff, #93c5fd);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.description {
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.8;
  max-width: 900px;
}

.detail-showcase {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.stat-pill {
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 18px;
  padding: 18px;
  background: linear-gradient(160deg, rgba(20, 30, 50, 0.75), rgba(8, 12, 20, 0.6));
  min-width: 160px;
}

.stat-pill span {
  font-size: 12px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
}

.stat-pill strong {
  display: block;
  margin-top: 6px;
  font-size: 20px;
  color: #fff;
}

.detail-content {
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(10, 15, 25, 0.7);
  padding: 32px;
}

.detail-content :deep(h2) {
  font-size: 28px;
  margin: 30px 0 15px;
  color: #fff;
}

.detail-content :deep(p),
.detail-content :deep(li) {
  color: rgba(255, 255, 255, 0.82);
  line-height: 1.8;
}

.empty-state {
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
}

@media (max-width: 768px) {
  h1 {
    font-size: 32px;
  }
}
</style>
