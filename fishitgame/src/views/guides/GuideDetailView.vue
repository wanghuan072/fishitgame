<template>
  <section class="guide-detail">
    <div class="container">
      <div v-if="guide">
        <router-link class="back-link" to="/fish-it-guides">← Back to guides</router-link>
        <p class="meta">{{ formatDate(guide.publishDate) }}</p>
        <h1>{{ guide.title }}</h1>
        <p class="description">{{ guide.description }}</p>
        <div class="tag-list" v-if="guide.tags?.length">
          <span v-for="tag in guide.tags" :key="tag" class="tag">#{{ tag }}</span>
        </div>
        <div class="detail-content" v-html="guide.detailsHtml"></div>
      </div>
      <div v-else class="empty-state">
        <p>The requested guide was not found.</p>
        <router-link to="/fish-it-guides" class="back-link">Back to list</router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { guides } from '@/data/guides/guides.js'

const route = useRoute()

const guide = computed(() => {
  const slug = `/${route.params.slug ?? ''}`
  return guides.find((g) => g.addressBar === slug)
})

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
</script>

<style scoped>
.guide-detail {
  padding: 80px 0;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  margin-bottom: 24px;
}

.meta {
  font-size: 12px;
  letter-spacing: 0.3em;
  color: rgba(255, 255, 255, 0.6);
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
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.7;
  margin-bottom: 20px;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;
}

.tag {
  padding: 4px 12px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
}

.detail-content :deep(h2) {
  font-size: 28px;
  margin: 30px 0 15px;
  color: #fff;
}

.detail-content :deep(p),
.detail-content :deep(li) {
  color: rgba(255, 255, 255, 0.8);
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

