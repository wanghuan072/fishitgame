<template>
  <section class="wiki-home">
    <div class="container">
      <div class="page-header">
        <h1>Fish It! Equipment Library</h1>
        <p class="subtitle">
          All equipment knowledge now lives in one unified hub. Boats, bobbers, fish, and rods each get their own format so future
          data drops slide in instantly.
        </p>
      </div>

      <div class="category-header">
        <h2 class="section-heading">Wiki Categories</h2>
      </div>

      <div class="category-grid">
        <router-link
          v-for="category in categories"
          :key="category.key"
          class="category-card"
          :class="`category-${category.key}`"
          :to="category.to"
        >
          <div class="card-sheen"></div>
          <div class="card-content">
            <div class="card-top">
              <div>
                <p class="category-label">{{ category.label }}</p>
                <h2>{{ category.title }}</h2>
              </div>
              <span class="count">{{ category.count }} entries</span>
            </div>
            <p class="card-body">{{ category.description }}</p>
            <div class="card-pills">
              <span class="pill" v-for="pill in category.pills" :key="pill">{{ pill }}</span>
            </div>
            <div class="card-cta">
              <span>Open list</span>
              <span aria-hidden="true">→</span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { wikiCategories } from '@/data/wiki/index.js'

const categories = [
  {
    ...wikiCategories.find((c) => c.key === 'boats'),
    label: 'Boats',
    pills: ['Speed tiers', 'Module slots', 'Unlock guide'],
  },
  {
    ...wikiCategories.find((c) => c.key === 'bobbers'),
    label: 'Floats',
    pills: ['Luck builds', 'Mutation boosts', 'Event drops'],
  },
  {
    ...wikiCategories.find((c) => c.key === 'fish'),
    label: 'Species',
    pills: ['Spawn window', 'Gear pairing', 'Rarity'],
  },
  {
    ...wikiCategories.find((c) => c.key === 'rods'),
    label: 'Rods',
    pills: ['Special effects', 'Upgrade path', 'Durability'],
  },
]
</script>

<style scoped>
.wiki-home {
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

.section-heading {
  margin: 0;
  font-size: 24px;
  color: rgba(255, 255, 255, 0.92);
}

.category-header {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 16px;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.category-card {
  border-radius: 26px;
  border: 1px solid rgba(59, 130, 246, 0.25);
  background: rgba(10, 15, 25, 0.85);
  text-decoration: none;
  color: inherit;
  position: relative;
  overflow: hidden;
}

.category-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(140deg, rgba(59, 130, 246, 0.25), transparent);
  opacity: 0.7;
}

.category-card::after {
  content: '';
  position: absolute;
  inset: 1px;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.card-sheen {
  position: absolute;
  top: -40%;
  left: -10%;
  width: 80%;
  height: 60%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%);
}

.card-content {
  position: relative;
  z-index: 1;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.category-label {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 6px;
}

.count {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: rgba(255, 255, 255, 0.8);
}

.card-body {
  color: rgba(255, 255, 255, 0.78);
  margin: 0;
  line-height: 1.7;
}

.card-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.pill {
  font-size: 12px;
  padding: 6px 12px;
  border-radius: 12px;
  background: rgba(59, 130, 246, 0.12);
  border: 1px solid rgba(59, 130, 246, 0.3);
  color: rgba(255, 255, 255, 0.8);
}

.card-cta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  letter-spacing: 0.2em;
  color: var(--accent);
}

@media (max-width: 768px) {
  .page-header h1 {
    font-size: 32px;
  }

  .card-content {
    padding: 24px;
  }
}
</style>

