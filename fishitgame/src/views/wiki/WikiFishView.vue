<template>
  <section class="list-page">
    <div class="container">
      <header class="page-hero">
        <div class="hero-copy">
          <p class="hero-eyebrow">Wiki · Fish</p>
          <h1>Fish</h1>
          <p>
            There are over 200 Fish in Fish It. Each located on unique locations and islands. There are 7 different rarities of Fish in
            the game, ranging from Common to Secret.
          </p>
          <p class="hero-note">
            If you want to try out your chances in catching Fish of different rarities, try out our Catch RNG Calculator and see how
            much time it'd take for you to get a specific Fish!
          </p>
          <p class="hero-note">Note: this is a work in progress page, new fish will be added soon!</p>
          <div class="hero-kpi">
            <p>Entries Logged</p>
            <strong>{{ fish.length }}</strong>
            <span>Fish</span>
          </div>
        </div>
        <div class="hero-image">
          <img src="/images/wiki/fish/fish-img01.webp" alt="Fish It Fish collection" />
          <p>Explore the diverse fish species across different locations and rarities in Fish It!</p>
        </div>
      </header>

      <section
        v-for="section in fishSections"
        :key="section.key"
        class="table-section"
      >
        <div class="section-header">
          <h2 class="section-title">{{ section.label }}</h2>
          <span class="section-count">{{ section.items.length }} items</span>
        </div>
        <!-- <p class="section-note">{{ section.description }}</p> -->
        <div class="fish-table">
          <table>
            <thead>
              <tr>
                <th>Preview</th>
                <th>Fish Name</th>
                <th>Rarity</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in section.items" :key="item.id">
                <td class="fish-image-cell">
                  <img v-if="item.imageUrl" :src="item.imageUrl" :alt="item.imageAlt || item.title" />
                  <span v-else>—</span>
                </td>
                <td class="fish-name-cell">
                  <router-link
                    v-if="item.showDetail"
                    :to="`/fish-it-wiki/fish${item.addressBar}`"
                    class="fish-name-link"
                  >
                    {{ item.title }}
                  </router-link>
                  <span v-else>
                    {{ item.title }}
                  </span>
                </td>
                <td>{{ item.stats?.Rarity || '—' }}</td>
                <td>{{ item.stats?.Location || '—' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import fishData from '@/data/wiki/fish.js'

const fish = fishData

const categoryMeta = [
  { key: 'common', label: 'Common Fish', description: 'Abundant species you will encounter across starter islands.' },
  { key: 'uncommon', label: 'Uncommon Fish', description: 'Require better gear or timing to catch consistently.' },
  { key: 'rare', label: 'Rare Fish', description: 'Unique species with lower catch odds—plan your setups carefully.' },
  { key: 'epic', label: 'Epic Fish', description: 'High-value catches with distinct spawn conditions.' },
  { key: 'legendary', label: 'Legendary Fish', description: 'Extremely elusive fish that often demand optimized luck setups.' },
  { key: 'mythic', label: 'Mythic Fish', description: 'Top-tier fish that appear during special events or conditions.' },
  { key: 'secret', label: 'Secret Fish', description: 'Hidden encounters tied to puzzles, events, or RNG streaks.' },
]

const normalizeCategory = (value) => String(value || '').trim().toLowerCase()

const fishSections = computed(() => {
  const grouped = fish.reduce((acc, item) => {
    const key = normalizeCategory(item.category) || 'uncategorized'
    if (!acc[key]) acc[key] = []
    acc[key].push(item)
    return acc
  }, {})

  const orderedSections = categoryMeta
    .map((meta) => ({
      ...meta,
      items: grouped[meta.key] || [],
    }))
    .filter((section) => section.items.length > 0)

  const remainingKeys = Object.keys(grouped).filter(
    (key) => !categoryMeta.some((meta) => meta.key === key)
  )

  const dynamicSections = remainingKeys.map((key) => ({
    key,
    label: key.charAt(0).toUpperCase() + key.slice(1),
    description: 'Additional fish category.',
    items: grouped[key],
  }))

  return [...orderedSections, ...dynamicSections]
})
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
  gap: 28px;
  flex-wrap: wrap;
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

.hero-note {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
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
  width: 300px;
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

.table-section {
  margin-bottom: 50px;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  flex-wrap: wrap;
  gap: 8px;
}

.section-title {
  margin: 0;
  font-size: 28px;
  color: #fff;
}

.section-count {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.75);
  padding: 4px 12px;
  border-radius: 999px;
  border: 1px solid rgba(59, 130, 246, 0.25);
  background: rgba(59, 130, 246, 0.12);
}

.section-note {
  margin: 0 0 18px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
}

.fish-table {
  overflow-x: auto;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(10, 15, 25, 0.8);
}

.fish-table table {
  width: 100%;
  border-collapse: collapse;
}

.fish-table th,
.fish-table td {
  padding: 14px;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.85);
}

.fish-table th {
  background: rgba(59, 130, 246, 0.12);
  color: #ffdcdc;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 12px;
}

.fish-image-cell img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.fish-name-cell {
  font-weight: 600;
  color: #fff;
  font-size: 18px;
}

.fish-name-link {
  color: var(--accent);
  text-decoration: none;
}

.fish-name-link:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .page-hero {
    padding: 24px;
  }

  .hero-copy h1 {
    font-size: 36px;
  }
}
</style>

