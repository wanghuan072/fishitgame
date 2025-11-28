<template>
  <section class="list-page">
    <div class="container">
      <header class="page-hero">
        <div class="hero-copy">
          <p class="hero-eyebrow">Wiki · Bobbers</p>
          <h1>Bobbers</h1>
          <p>
            In Fish It! players can increase their Luck and other stats like Bonus XP, Mutation, and Shiny Chance by buying
            Bobbers/Bait. Bobbers can be bought at the Fisherman Island shop (Seth NPC) or the Traveling Merchant. Some rare floats
            arrive via Gamepass rewards or “follow + like” bonuses.
          </p>
          <p class="hero-note">Some fish are harder to catch without high-stat bobbers. Use the Catch RNG Calculator to plan drops.</p>
          <div class="hero-kpi">
            <p>Entries Logged</p>
            <strong>{{ bobbers.length }}</strong>
            <span>Bobbers</span>
          </div>
        </div>
      </header>

      <!-- Purchasable Bobbers Table -->
      <div v-if="purchasableBobbers.length > 0" class="table-section">
        <div class="section-header">
          <h2 class="section-title">Purchasable Bobbers</h2>
          <span class="section-count">{{ purchasableBobbers.length }} items</span>
        </div>
        <div class="bobber-table">
          <table>
            <thead>
              <tr>
                <th class="preview-col">Preview</th>
                <th class="name-col">Bobber Name</th>
                <th class="desc-col">Description</th>
                <th class="stats-col">Stats</th>
                <th class="price-col">Price</th>
                <th class="source-col">Obtainment</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in purchasableBobbers"
                :key="item.id"
                @click="onItemClick(item)"
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
                <td class="bobber-name-cell">
                  <router-link
                    v-if="item.showDetail"
                    :to="`/wiki/fish-it-bobbers${item.addressBar}`"
                    class="bobber-name-link"
                  >
                    {{ item.title }}
                  </router-link>
                  <span v-else>
                    {{ item.title }}
                  </span>
                </td>
                <td class="desc-cell">{{ item.description || '—' }}</td>
                <td class="stats-cell">
                  <div v-if="item.stats?.stats && item.stats.stats.length > 0" class="stats-list">
                    <span v-for="(stat, index) in item.stats.stats" :key="index" class="stat-item">{{ stat }}</span>
                  </div>
                  <span v-else>—</span>
                </td>
                <td class="price-cell">{{ item.stats?.price || '—' }}</td>
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
      </div>

      <!-- Gift Bobbers Table -->
      <div v-if="giftBobbers.length > 0" class="table-section">
        <div class="section-header">
          <h2 class="section-title">Gift Bobbers</h2>
          <span class="section-count">{{ giftBobbers.length }} items</span>
        </div>
        <div class="bobber-table">
          <table>
            <thead>
              <tr>
                <th class="preview-col">Preview</th>
                <th class="name-col">Bobber Name</th>
                <th class="desc-col">Description</th>
                <th class="stats-col">Stats</th>
                <th class="price-col">Price</th>
                <th class="source-col">Obtainment</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in giftBobbers"
                :key="item.id"
                @click="onItemClick(item)"
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
                <td class="bobber-name-cell">
                  <router-link
                    v-if="item.showDetail"
                    :to="`/wiki/fish-it-bobbers${item.addressBar}`"
                    class="bobber-name-link"
                  >
                    {{ item.title }}
                  </router-link>
                  <span v-else>
                    {{ item.title }}
                  </span>
                </td>
                <td class="desc-cell">{{ item.description || '—' }}</td>
                <td class="stats-cell">
                  <div v-if="item.stats?.stats && item.stats.stats.length > 0" class="stats-list">
                    <span v-for="(stat, index) in item.stats.stats" :key="index" class="stat-item">{{ stat }}</span>
                  </div>
                  <span v-else>—</span>
                </td>
                <td class="price-cell">{{ item.stats?.price || '—' }}</td>
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
      </div>

      <!-- Gamepass Bobbers Table -->
      <div v-if="gamepassBobbers.length > 0" class="table-section">
        <div class="section-header">
          <h2 class="section-title">Gamepass Bobbers</h2>
          <span class="section-count">{{ gamepassBobbers.length }} items</span>
        </div>
        <div class="bobber-table">
          <table>
            <thead>
              <tr>
                <th class="preview-col">Preview</th>
                <th class="name-col">Bobber Name</th>
                <th class="desc-col">Description</th>
                <th class="stats-col">Stats</th>
                <th class="price-col">Price</th>
                <th class="source-col">Obtainment</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in gamepassBobbers"
                :key="item.id"
                @click="onItemClick(item)"
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
                <td class="bobber-name-cell">
                  <router-link
                    v-if="item.showDetail"
                    :to="`/wiki/fish-it-bobbers${item.addressBar}`"
                    class="bobber-name-link"
                  >
                    {{ item.title }}
                  </router-link>
                  <span v-else>
                    {{ item.title }}
                  </span>
                </td>
                <td class="desc-cell">{{ item.description || '—' }}</td>
                <td class="stats-cell">
                  <div v-if="item.stats?.stats && item.stats.stats.length > 0" class="stats-list">
                    <span v-for="(stat, index) in item.stats.stats" :key="index" class="stat-item">{{ stat }}</span>
                  </div>
                  <span v-else>—</span>
                </td>
                <td class="price-cell">{{ item.stats?.price || '—' }}</td>
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
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import bobbersData from '@/data/wiki/bobbers.js'

const router = useRouter()
const bobbers = bobbersData

const normalizeCategory = (value) => String(value || '').trim().toLowerCase()

const filterByCategory = (targetCategory) =>
  computed(() =>
    (bobbers || []).filter((item) => normalizeCategory(item.category) === normalizeCategory(targetCategory))
  )

const purchasableBobbers = filterByCategory('purchasable')
const giftBobbers = filterByCategory('gift')
const gamepassBobbers = filterByCategory('gamepass')

const onItemClick = (item) => {
  if (item && item.showDetail === false) return
  const id = (item.addressBar || '').replace(/^\//, '').replace(/\/$/, '')
  if (!id) return
  router.push(`/wiki/fish-it-bobbers/${id}`)
}
</script>

<style scoped>
.list-page {
  padding: 90px 0;
}

.page-hero {
  border: 1px solid rgba(59, 130, 246, 0.25);
  border-radius: 24px;
  background: radial-gradient(circle at top, rgba(59, 130, 246, 0.25), rgba(10, 15, 25, 0.6));
  padding: 36px;
  margin-bottom: 40px;
  display: flex;
  flex-wrap: wrap;
  gap: 28px;
}

.hero-copy {
  flex: 1 1 360px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.hero-eyebrow {
  letter-spacing: 0.4em;
  font-size: 12px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
}

.hero-copy h1 {
  font-size: 48px;
  margin: 8px 0;
  background: linear-gradient(135deg, #e3f2ff, #93c5fd);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-copy p {
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.7;
  margin: 0;
}

.hero-list {
  list-style: disc;
  padding-left: 20px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin: 0;
}

.hero-kpi {
  background: rgba(15, 25, 40, 0.85);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 18px;
  padding: 16px 28px;
  text-align: center;
  max-width: 220px;
}

.hero-kpi strong {
  display: block;
  font-size: 42px;
  color: #fff;
  margin: 6px 0;
}

.hero-image {
  flex: 1 1 360px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.hero-image img {
  width: 100%;
  border-radius: 18px;
  border: 1px solid rgba(59, 130, 246, 0.2);
  object-fit: cover;
}

.hero-image figcaption {
  color: rgba(255, 255, 255, 0.75);
  font-size: 14px;
  line-height: 1.4;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin: 40px 0;
}

.info-entry {
  border-radius: 20px;
  border: 1px solid rgba(59, 130, 246, 0.25);
  background: rgba(5, 10, 18, 0.55);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-text h2 {
  margin: 0 0 10px;
  font-size: 24px;
  color: #fff;
}

.info-text p,
.info-text li,
.info-text ol {
  color: rgba(255, 255, 255, 0.82);
  line-height: 1.7;
}

.info-text ul,
.info-text ol {
  padding-left: 20px;
  margin: 8px 0 0;
}

.info-entry img {
  width: 100%;
  border-radius: 16px;
  border: 1px solid rgba(59, 130, 246, 0.2);
  object-fit: cover;
  min-height: 220px;
}

.info-caption {
  color: rgba(255, 255, 255, 0.75);
  font-size: 14px;
  margin: 0;
}

.table-section {
  margin-bottom: 20px;
  padding-bottom: 20px;
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

.bobber-table {
  overflow-x: auto;
  border-radius: 16px;
  background-color: rgba(20, 30, 50, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.bobber-table table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.bobber-table th {
  text-align: center;
  padding: 16px;
  font-size: 0.9rem;
  color: #ffdcdc;
  background: rgba(59, 130, 246, 0.15);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.bobber-table td {
  text-align: center;
  padding: 5px;
  color: rgba(255, 255, 255, 0.75);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
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

.desc-col {
  width: auto;
}

.stats-col {
  width: 200px;
  min-width: 200px;
}

.price-col {
  width: 150px;
  min-width: 150px;
}

.source-col {
  width: 200px;
  min-width: 200px;
}

.preview-cell {
  text-align: center;
}

.preview-cell span {
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-thumb {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
}

.bobber-name-cell {
  font-weight: 600;
  color: #fff;
  font-size: 1rem;
}

.bobber-name-link {
  color: var(--accent);
  text-decoration: none;
}

.bobber-name-link:hover {
  text-decoration: underline;
}

.desc-cell {
  font-size: 0.9rem;
  line-height: 1.6;
  text-align: left;
}

.stats-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
}

.stat-item {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.85);
  padding: 2px 8px;
  border-radius: 4px;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.price-cell {
  font-size: 0.9rem;
}

.obtainment-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
}

.source-item {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.85);
  padding: 2px 8px;
  border-radius: 4px;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.table-row {
  cursor: pointer;
  transition: background 0.2s ease;
}

.table-row:hover {
  background: rgba(59, 130, 246, 0.05);
}

.table-row.disabled {
  cursor: default;
}

.table-row.disabled:hover {
  background: transparent;
}

@media (max-width: 768px) {
  .page-hero {
    flex-direction: column;
    padding: 24px;
  }

  .page-hero h1 {
    font-size: 36px;
  }

  .table-section {
    margin-bottom: 20px;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .section-title {
    font-size: 20px;
    margin-bottom: 10px;
  }

  .section-count {
    font-size: 12px;
    padding: 3px 8px;
  }

  .bobber-table {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .bobber-table table {
    min-width: 100%;
    width: max-content;
  }

  .bobber-table th {
    padding: 5px 10px;
    font-size: 12px;
  }

  .bobber-table td {
    padding: 5px 10px;
    font-size: 12px;
  }

  .name-col {
    width: 220px;
    min-width: 220px;
  }

  .stats-col {
    min-width: 150px;
  }

  .preview-col {
    width: 240px;
    min-width: 240px;
  }

  .preview-thumb {
    width: 100px;
    height: 100px;
    border-radius: 6px;
  }

  .bobber-name-cell {
    font-size: 12px;
  }
}
</style>

