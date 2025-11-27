<template>
  <section class="list-page">
    <div class="container">
      <header class="page-hero">
        <div class="hero-copy">
          <p class="hero-eyebrow">Wiki · Boats</p>
          <h1>Boats & Utility</h1>
          <p>
            Boats are the primary means of transportation in Fish It!, letting players cross the ocean and reach distant islands.
            All standard hulls can be bought with coins, while exclusive boats require Robux or Gamepasses.
          </p>
          <ul class="hero-list">
            <li>Coins purchase Wooden Skiff all the way through Stormrunner Cutter.</li>
            <li>Exclusive hulls (Abyss Glider, Hoverboats) come from Gamepasses or limited events.</li>
            <li>Acceleration, passenger slots, and top speed define how quickly you move between islands.</li>
          </ul>
          <div class="hero-kpi">
            <p>Entries Logged</p>
            <strong>{{ boats.length }}</strong>
            <span>Boats</span>
          </div>
        </div>
        <figure class="hero-image">
          <img src="/images/wiki/boats/boats-img01.webp" alt="Fish It Boats menu" />
          <figcaption>The Boats menu shows acceleration, passenger slots, and speed before you invest resources.</figcaption>
        </figure>
      </header>

      <section class="info-grid">
        <article class="info-entry">
          <div class="info-text">
            <h2>How To Purchase Boats</h2>
            <p>
              Boats can be purchased with in-game currency or Robux. Both options are available inside the “Boats” menu at any dock.
            </p>
            <ul>
              <li>Standard boats: pay coins at Fisherman or Coralcrest dock NPCs for early hulls.</li>
              <li>Gamepass boats: switch to the Exclusive tab and purchase with Robux.</li>
              <li>Event boats: follow official announcements for seasonal quests or token exchanges.</li>
            </ul>
          </div>
          <img src="/images/wiki/boats/boats-img02.webp" alt="Pier NPC interface" />
          <p class="info-caption">Dock vendors list coin prices, stats, and unlock requirements for every standard boat.</p>
        </article>
        <article class="info-entry">
          <div class="info-text">
            <h2>“Boats” Section</h2>
            <p>Access the Boats menu in two quick ways:</p>
            <ol>
              <li><strong>Pier NPCs:</strong> talk to a dock keeper to open the menu instantly and finalize purchases.</li>
              <li><strong>Boat spawn pads:</strong> stand on the glowing pad beside the pier to summon or swap owned hulls.</li>
            </ol>
            <p>Both methods reveal the same stats—Acceleration, Passengers, Top Speed—so comparisons stay easy.</p>
          </div>
          <img src="/images/wiki/boats/boats-img03.webp" alt="Boat spawn pad" />
          <p class="info-caption">Spawn pads let you deploy or change boats without leaving the dock.</p>
        </article>
        <article class="info-entry">
          <div class="info-text">
            <h2>Exclusive & Utility Boats</h2>
            <p>
              Exclusive boats arrive via Gamepasses or events and often feature higher speeds or unique modules for endgame fishing.
            </p>
            <ul>
              <li>Gamepass hulls unlock immediately from the Exclusive tab.</li>
              <li>Event hulls require seasonal quests or limited-token exchanges.</li>
              <li>Utility modules—Fish Radar, Portable Storage, and more—install on late-game hulls.</li>
            </ul>
          </div>
          <img src="/images/wiki/boats/boats-img04.webp" alt="Exclusive boat sprint" />
          <p class="info-caption">Exclusive boats typically boast top-tier speed and extra module slots.</p>
        </article>
      </section>

      <!-- Common Boats Table -->
      <div v-if="commonBoats.length > 0" class="table-section">
        <div class="section-header">
          <h2 class="section-title">Common Boats</h2>
          <span class="section-count">{{ commonBoats.length }} items</span>
        </div>
        <div class="boat-table">
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
                v-for="item in commonBoats"
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
                <td class="boat-name-cell">
                  <router-link
                    v-if="item.showDetail"
                    :to="`/fish-it-wiki/boats${item.addressBar}`"
                    class="boat-name-link"
                  >
                    {{ item.title }}
                  </router-link>
                  <span v-else>
                    {{ item.title }}
                  </span>
                </td>
                <td>{{ item.stats?.coins || '—' }}</td>
                <td>{{ item.stats?.acceleration || '—' }}</td>
                <td>{{ item.stats?.passengers || '—' }}</td>
                <td>{{ item.stats?.topSpeed || '—' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Rare Boats Table -->
      <div v-if="rareBoats.length > 0" class="table-section">
        <div class="section-header">
          <h2 class="section-title">Rare Boats</h2>
          <span class="section-count">{{ rareBoats.length }} items</span>
        </div>
        <div class="boat-table">
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
                v-for="item in rareBoats"
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
                <td class="boat-name-cell">
                  <router-link
                    v-if="item.showDetail"
                    :to="`/fish-it-wiki/boats${item.addressBar}`"
                    class="boat-name-link"
                  >
                    {{ item.title }}
                  </router-link>
                  <span v-else>
                    {{ item.title }}
                  </span>
                </td>
                <td>{{ item.stats?.coins || '—' }}</td>
                <td>{{ item.stats?.acceleration || '—' }}</td>
                <td>{{ item.stats?.passengers || '—' }}</td>
                <td>{{ item.stats?.topSpeed || '—' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Epic Boats Table -->
      <div v-if="epicBoats.length > 0" class="table-section">
        <div class="section-header">
          <h2 class="section-title">Epic Boats</h2>
          <span class="section-count">{{ epicBoats.length }} items</span>
        </div>
        <div class="boat-table">
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
                v-for="item in epicBoats"
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
                <td class="boat-name-cell">
                  <router-link
                    v-if="item.showDetail"
                    :to="`/fish-it-wiki/boats${item.addressBar}`"
                    class="boat-name-link"
                  >
                    {{ item.title }}
                  </router-link>
                  <span v-else>
                    {{ item.title }}
                  </span>
                </td>
                <td>{{ item.stats?.coins || '—' }}</td>
                <td>{{ item.stats?.acceleration || '—' }}</td>
                <td>{{ item.stats?.passengers || '—' }}</td>
                <td>{{ item.stats?.topSpeed || '—' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Mythic Boats Table -->
      <div v-if="mythicBoats.length > 0" class="table-section">
        <div class="section-header">
          <h2 class="section-title">Mythic Boats</h2>
          <span class="section-count">{{ mythicBoats.length }} items</span>
        </div>
        <div class="boat-table">
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
                v-for="item in mythicBoats"
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
                <td class="boat-name-cell">
                  <router-link
                    v-if="item.showDetail"
                    :to="`/fish-it-wiki/boats${item.addressBar}`"
                    class="boat-name-link"
                  >
                    {{ item.title }}
                  </router-link>
                  <span v-else>
                    {{ item.title }}
                  </span>
                </td>
                <td>{{ item.stats?.coins || '—' }}</td>
                <td>{{ item.stats?.acceleration || '—' }}</td>
                <td>{{ item.stats?.passengers || '—' }}</td>
                <td>{{ item.stats?.topSpeed || '—' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Exclusive Boats Table -->
      <div v-if="exclusiveBoats.length > 0" class="table-section">
        <div class="section-header">
          <h2 class="section-title">Exclusive Boats</h2>
          <span class="section-count">{{ exclusiveBoats.length }} items</span>
        </div>
        <div class="boat-table">
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
                v-for="item in exclusiveBoats"
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
                <td class="boat-name-cell">
                  <router-link
                    v-if="item.showDetail"
                    :to="`/fish-it-wiki/boats${item.addressBar}`"
                    class="boat-name-link"
                  >
                    {{ item.title }}
                  </router-link>
                  <span v-else>
                    {{ item.title }}
                  </span>
                </td>
                <td>{{ item.stats?.coins || '—' }}</td>
                <td>{{ item.stats?.acceleration || '—' }}</td>
                <td>{{ item.stats?.passengers || '—' }}</td>
                <td>{{ item.stats?.topSpeed || '—' }}</td>
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
import boatsData from '@/data/wiki/boats.js'

const router = useRouter()
const boats = boatsData

const normalizeCategory = (value) => String(value || '').trim().toLowerCase()

const filterByCategory = (targetCategory) =>
  computed(() =>
    (boats || []).filter((item) => normalizeCategory(item.category) === normalizeCategory(targetCategory))
  )

const commonBoats = filterByCategory('common')
const rareBoats = filterByCategory('rare')
const epicBoats = filterByCategory('epic')
const mythicBoats = filterByCategory('mythic')
const exclusiveBoats = filterByCategory('exclusive')

const onItemClick = (item) => {
  if (item && item.showDetail === false) return
  const id = (item.addressBar || '').replace(/^\//, '').replace(/\/$/, '')
  if (!id) return
  router.push(`/fish-it-wiki/boats/${id}`)
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
  gap: 18px;
}

.hero-eyebrow {
  letter-spacing: 0.4em;
  font-size: 12px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
}

.hero-copy h1 {
  font-size: 48px;
  margin: 6px 0;
  background: linear-gradient(135deg, #e3f2ff, #93c5fd);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
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

.hero-note {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
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

.boat-table {
  overflow-x: auto;
  border-radius: 16px;
  background-color: rgba(20, 30, 50, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.boat-table table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.boat-table th {
  text-align: center;
  padding: 16px;
  font-size: 0.9rem;
  color: #ffdcdc;
  background: rgba(59, 130, 246, 0.15);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.boat-table td {
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

.coins-col {
  width: 180px;
  min-width: 180px;
}

.accel-col {
  width: 140px;
  min-width: 140px;
}

.passengers-col {
  width: 120px;
  min-width: 120px;
}

.speed-col {
  width: 140px;
  min-width: 140px;
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
  width: 220px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
}

.boat-name-cell {
  font-weight: 600;
  color: #fff;
  font-size: 1rem;
}

.boat-name-link {
  color: var(--accent);
  text-decoration: none;
}

.boat-name-link:hover {
  text-decoration: underline;
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

.status {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: rgba(255, 255, 255, 0.6);
}

.status.owned {
  color: #4ade80;
}

.status.quest {
  color: #fbbf24;
}

.status.exclusive {
  color: #f87171;
}

.table-link {
  text-decoration: none;
  color: var(--accent);
  font-weight: 600;
  letter-spacing: 0.15em;
}

.table-link.disabled {
  color: rgba(255, 255, 255, 0.5);
}

@media (max-width: 768px) {
  .page-hero {
    padding: 24px;
  }

  .hero-copy h1 {
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

  .boat-table {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .boat-table table {
    min-width: 100%;
    width: max-content;
  }

  .boat-table th {
    padding: 5px 10px;
    font-size: 12px;
  }

  .boat-table td {
    padding: 5px 10px;
    font-size: 12px;
  }

  .name-col {
    width: 220px;
    min-width: 220px;
  }

  .coins-col {
    min-width: 150px;
  }

  .preview-col {
    width: 240px;
    min-width: 240px;
  }

  .preview-thumb {
    width: 220px;
    height: 80px;
    border-radius: 6px;
  }

  .boat-name-cell {
    font-size: 12px;
  }
}
</style>

