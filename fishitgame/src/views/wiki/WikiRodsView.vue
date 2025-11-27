<template>
  <section class="list-page">
    <div class="container">
      <header class="page-hero">
        <div class="hero-copy">
          <p class="hero-eyebrow">Wiki · Rods</p>
          <h1>Fishing Rods</h1>
          <p>
            Fishing Rods are the main equipment you use in order to catch Fish. Each has various stats such as Luck, Speed, and Weight
            that determine the type of Fish you will be able to catch.
          </p>
          <p class="hero-note">
            You can also check out our Catch RNG Calculator to see how long it would take for you to catch a particular Fish with a
            specific rod.
          </p>
          <div class="hero-info">
            <h2>How to Get Fishing Rods</h2>
            <p>
              You can buy most fishing rods from the stores on each Island (eg. Joe's Rods). However some high tier rods can only be acquired from completing quests. Those rods are:
            </p>
            <ul>
              <li>Ghostfinn Rod</li>
              <li>Bamboo Rod</li>
              <li>Elemental Rod</li>
              <li>Ares Rod</li>
            </ul>
            <p>There are also 6 different types of rods: Common, Uncommon, Rare, Epic, Legendary, and Mythic.</p>
          </div>
          <div class="hero-kpi">
            <p>Entries Logged</p>
            <strong>{{ rods.length }}</strong>
            <span>Rods</span>
          </div>
        </div>
        <div class="hero-image">
          <img src="/images/wiki/rods/rods-img01.webp" alt="Fish It Fishing Rods" />
          <p>Explore different fishing rods and their unique stats to optimize your catch rates.</p>
        </div>
      </header>

      <section
        v-for="section in rodSections"
        :key="section.key"
        class="table-section"
      >
        <div class="section-header">
          <h2 class="section-title">{{ section.label }}</h2>
          <span class="section-count">{{ section.items.length }} items</span>
        </div>
        <p class="section-note">{{ section.description }}</p>
        <div class="rod-table">
          <table>
            <thead>
              <tr>
                <th>Rod Name</th>
                <th>Price</th>
                <th>Luck</th>
                <th>Speed</th>
                <th>Weight</th>
                <th>Acquisition</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in section.items" :key="item.id">
                <td class="rod-name-cell">
                  <router-link
                    v-if="item.showDetail"
                    :to="`/fish-it-wiki/rods${item.addressBar}`"
                    class="rod-name-link"
                  >
                    {{ item.title }}
                  </router-link>
                  <span v-else>
                    {{ item.title }}
                  </span>
                </td>
                <td v-html="formatStat(item.stats?.Price)"></td>
                <td v-html="formatStat(item.stats?.Luck)"></td>
                <td v-html="formatStat(item.stats?.Speed)"></td>
                <td v-html="formatStat(item.stats?.Weight)"></td>
                <td v-html="formatStat(item.stats?.Acquisition)"></td>
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
import rodsData from '@/data/wiki/rods.js'

const rods = rodsData

const categoryMeta = [
  { key: 'common', label: 'Common Rods', description: 'Entry level rods available from most island shops.' },
  { key: 'uncommon', label: 'Uncommon Rods', description: 'Improved stats for anglers progressing through early quests.' },
  { key: 'rare', label: 'Rare Rods', description: 'Specialized rods with noticeable boosts to luck and speed.' },
  { key: 'epic', label: 'Epic Rods', description: 'High performance rods rewarded through advanced progression.' },
  { key: 'legendary', label: 'Legendary Rods', description: 'Top-tier gear with unique perks and superior stats.' },
  { key: 'mythic', label: 'Mythic Rods', description: 'Ultra rare rods that define late-game fishing builds.' },
  { key: 'secret', label: 'Secret Rods', description: 'Hidden or puzzle-locked rods for dedicated collectors.' },
  { key: 'gamepass', label: 'Gamepass Rods', description: 'Exclusive rods obtained via premium passes or bundles.' },
]

const normalizeCategory = (value) => String(value || '').trim().toLowerCase()

const rodSections = computed(() => {
  const grouped = rods.reduce((acc, item) => {
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
    description: 'Additional rod category.',
    items: grouped[key],
  }))

  return [...orderedSections, ...dynamicSections]
})

const formatStat = (value) => {
  if (!value) return '—'
  if (Array.isArray(value)) {
    return value.map((entry) => formatStat(entry)).join('<br/>')
  }
  return String(value)
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

.hero-info {
  margin-top: 8px;
  padding: 18px 20px;
  border-radius: 16px;
  border: 1px solid rgba(59, 130, 246, 0.3);
  background: rgba(5, 10, 18, 0.45);
}

.hero-info h2 {
  margin: 0 0 10px;
  font-size: 22px;
  color: #fff;
}

.hero-info p,
.hero-info li {
  color: rgba(255, 255, 255, 0.82);
  line-height: 1.7;
}

.hero-info ul {
  padding-left: 20px;
  margin: 8px 0 12px;
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
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.section-title {
  font-size: 28px;
  color: #fff;
  margin: 0;
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

.rod-table {
  overflow-x: auto;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(10, 15, 25, 0.8);
}

.rod-table table {
  width: 100%;
  border-collapse: collapse;
}

.rod-table th,
.rod-table td {
  padding: 14px;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.85);
}

.rod-table th {
  background: rgba(59, 130, 246, 0.12);
  color: #ffdcdc;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 12px;
}

.rod-name-cell {
  font-weight: 600;
  color: #fff;
  font-size: 18px;
}

.rod-name-link {
  color: var(--accent);
  text-decoration: none;
}

.rod-name-link:hover {
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

