<template>
  <section class="guides-page">
    <div class="container">
      <div class="page-header">
        <p class="page-badge">Guides</p>
        <h1>Fish It! Guides</h1>
        <p class="subtitle">
          Curated workflows, Luck builds, and boat investment tips straight from the community—packaged in local data so everything
          stays available offline.
        </p>
      </div>

      <div class="section-heading-wrapper">
        <h2 class="section-heading">All Guides</h2>
      </div>

      <div class="guides-grid">
        <article
          v-for="guide in guidesList"
          :key="guide.id"
          class="guide-card"
          @click="handleGuideClick(guide)"
        >
          <div class="image-wrapper" v-if="guide.imageUrl">
            <img :src="guide.imageUrl" :alt="guide.imageAlt || guide.title" loading="lazy" />
          </div>
          <div class="card-body">
            <p class="publish-date">{{ formatDate(guide.publishDate) }}</p>
            <h2 class="guide-title">{{ guide.title }}</h2>
            <p class="guide-description">{{ guide.description }}</p>
            <div class="tag-list" v-if="guide.tags?.length">
              <span v-for="tag in guide.tags" :key="tag" class="tag">#{{ tag }}</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { guides } from '@/data/guides/guides.js'

const router = useRouter()
const guidesList = computed(() => guides)

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })

const handleGuideClick = (guide) => {
  if (guide.addressBar) {
    router.push(`/guides${guide.addressBar}`)
  }
}
</script>

<style scoped>
.guides-page {
  padding: 80px 0;
}

.page-header {
  text-align: center;
  margin-bottom: 50px;
}

.page-badge {
  display: inline-flex;
  padding: 6px 16px;
  border-radius: 999px;
  border: 1px solid rgba(59, 130, 246, 0.3);
  color: rgba(255, 255, 255, 0.8);
  letter-spacing: 0.3em;
  font-size: 12px;
  margin-bottom: 18px;
}

.page-header h1 {
  font-size: 48px;
  margin-bottom: 18px;
  background: linear-gradient(135deg, #e3f2ff, #93c5fd);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  color: rgba(255, 255, 255, 0.8);
  max-width: 760px;
  margin: 0 auto;
  line-height: 1.7;
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


@media (max-width: 768px) {
  .page-header h1 {
    font-size: 32px;
  }
}
</style>

