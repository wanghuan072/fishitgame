<template>
  <div class="home-view">
    <main>
      <!-- Hero Section -->
      <section class="hero">
        <div class="container">
          <div class="hero-content">
            <div class="hero-text">
              <p class="badge">Fish It! · Roblox Fishing Simulator</p>
              <h1 class="hero-title">Fish It! Community Guide Hub</h1>
              <p class="hero-subtitle">
                Fish It!, built by the Fish Atelier team, is one of Roblox’s most-loved fishing simulators. Hunt rare fish, sail across
                island chains, upgrade rods and bobbers, and help curate the official wiki. Stack Luck, Mutation, and Shiny chances
                to become the legendary angler every island talks about.
              </p>
              <div class="hero-actions">
                <router-link to="/calculator/fish-it-rng-calculator" class="btn-hero btn-xbox">
                  <span>Fish It RNG Calculator</span>
                </router-link>
                <router-link to="/wiki" class="btn-hero btn-secondary">Browse the Wiki</router-link>
              </div>
              <div class="hero-stats">
                <div class="stat">
                  <p class="label">Developer</p>
                  <p class="value">Fish Atelier</p>
                </div>
                <div class="stat">
                  <p class="label">Platform</p>
                  <p class="value">Roblox</p>
                </div>
                <div class="stat">
                  <p class="label">Core Loop</p>
                  <p class="value">Fishing · Exploration · Community</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Core Systems & Stats Section -->
      <section class="core-systems-stats">
        <div class="container">
          <div class="core-systems-stats-content">
            <div class="section-header">
              <h2 class="section-title">Fish It Game Core Systems & Overview</h2>
              <p class="section-subtitle">
                Essential mechanics and key statistics to help you understand the game's depth and plan your fishing journey.
              </p>
            </div>

            <div class="systems-stats-layout">
              <!-- Core Systems -->
              <div class="systems-section">
                <h3 class="subsection-title">Core Systems</h3>
                <div class="systems-grid">
                  <div class="system-card">
                    <div class="system-icon">🎣</div>
                    <h4>Gear Synergy</h4>
                    <p>
                      Fishing rods, bobbers, boats, and utility items all contribute Luck, Mutation, or Shiny bonuses. Stack the
                      right stats and run the Catch RNG Calculator to plan how many casts you really need.
                    </p>
                  </div>
                  <div class="system-card">
                    <div class="system-icon">🏝️</div>
                    <h4>Island Exploration</h4>
                    <p>
                      Fisherman Island, Coralcrest, Abyssal Trench, and more each host unique fish, quests, and culture. Master
                      their rotations to keep your Fish Index growing.
                    </p>
                  </div>
                  <div class="system-card">
                    <div class="system-icon">🤝</div>
                    <h4>Community Collaboration</h4>
                    <p>
                      The official wiki highlights "ADD NEW PAGE" and "EDIT" for a reason. Players constantly submit data,
                      screenshots, and tips—we surface the best of it for quick reference here.
                    </p>
                  </div>
                </div>
              </div>

              <!-- Key Stats -->
              <div class="stats-section">
                <h3 class="subsection-title">Key Statistics</h3>
                <div class="stats-grid-compact">
                  <div class="stat-card-compact">
                    <div class="stat-icon">🐟</div>
                    <div class="stat-info">
                      <p class="stat-number">120+</p>
                      <p class="stat-label">Fish Species</p>
                      <p class="stat-desc">Including Mutation & Shiny variants</p>
                    </div>
                  </div>
                  <div class="stat-card-compact">
                    <div class="stat-icon">🗺️</div>
                    <div class="stat-info">
                      <p class="stat-number">10+</p>
                      <p class="stat-label">Islands & Locations</p>
                      <p class="stat-desc">Mirrors Fish Index tabs</p>
                    </div>
                  </div>
                  <div class="stat-card-compact">
                    <div class="stat-icon">⚙️</div>
                    <div class="stat-info">
                      <p class="stat-number">60+</p>
                      <p class="stat-label">Gear Types</p>
                      <p class="stat-desc">Rods · Bobbers · Boats · Utility</p>
                    </div>
                  </div>
                  <div class="stat-card-compact">
                    <div class="stat-icon">📚</div>
                    <div class="stat-info">
                      <p class="stat-number">200+</p>
                      <p class="stat-label">Community Pages</p>
                      <p class="stat-desc">Maintained by Fish It! players</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Guides -->
      <section class="guides">
        <div class="container">
          <div class="guides-content">
            <div class="section-header">
              <h2 class="section-title">Fish It Game Guide</h2>
              <p class="section-subtitle">
                Curated walkthroughs from the Roblox community: progression routes, Luck builds, and boat investments. Got more tips?
                Drop them on the wiki.
              </p>
            </div>
            <div class="guides-grid">
              <article
                v-for="guide in featuredGuides"
                :key="guide.id"
                class="guide-card"
                @click="handleGuideClick(guide)"
              >
                <div class="guide-image-container">
                  <img v-if="guide.imageUrl" :src="guide.imageUrl" :alt="guide.imageAlt || guide.title" />
                  <div v-else class="guide-image-placeholder">{{ guide.title }}</div>
                </div>
                <div class="guide-card-content">
                  <h3 class="guide-title">{{ guide.title }}</h3>
                  <p class="guide-description">{{ guide.description }}</p>
                  <div class="guide-footer" v-if="guide.tags && guide.tags.length > 0">
                    <span class="guide-category">{{ guide.tags[0] }}</span>
                  </div>
                </div>
              </article>
            </div>
            <div class="section-actions">
              <router-link to="/guides" class="btn-hero btn-secondary">See all guides</router-link>
            </div>
          </div>
        </div>
      </section>

      <!-- Fish & Drop Rates -->
      <section class="fish-drop-rates">
        <div class="container">
          <div class="fish-drop-rates-content">
            <div class="section-header">
              <h2 class="section-title">Fish It Game Rare Fish & RNG Drops</h2>
              <p class="section-subtitle">
                Community-sourced data suggests pairing the Catch RNG Calculator with Fish Radar, Diving Suit, and other utility gear to
                squeeze the most value out of every session.
              </p>
            </div>
            <div class="fish-panel-list">
              <article
                v-for="fish in rareFish"
                :key="fish.id"
                class="fish-panel"
              >
                <div class="fish-visual">
                  <img v-if="fish.imageUrl" :src="fish.imageUrl" :alt="fish.imageAlt || fish.title" />
                  <div v-else class="fish-image-placeholder">{{ fish.title }}</div>
                </div>
                <div class="fish-details">
                  <div class="fish-header">
                    <h3>{{ fish.title }}</h3>
                  </div>
                  <p class="fish-description">{{ fish.description }}</p>
                  <div class="fish-meta-grid">
                    <div class="fish-meta-item">
                      <span class="meta-label">Rarity</span>
                      <span class="meta-value">{{ fish.stats?.Rarity || '—' }}</span>
                    </div>
                    <div class="fish-meta-item">
                      <span class="meta-label">Location</span>
                      <span class="meta-value">{{ fish.stats?.Location || '—' }}</span>
                    </div>
                  </div>
                  <router-link
                    v-if="fish.showDetail"
                    :to="`/wiki/fish-it-fish${fish.addressBar}`"
                    class="fish-link"
                  >
                    View details →
                  </router-link>
                </div>
              </article>
            </div>
            <div class="section-actions">
              <router-link to="/wiki/fish-it-fish" class="btn-hero btn-secondary">Open the Fish Index</router-link>
            </div>
          </div>
        </div>
      </section>

       <!-- Bait / Bobber Guide -->
       <section class="bait-guide">
        <div class="container">
          <div class="bait-guide-content">
            <div class="section-header">
              <h2 class="section-title">Fish It Game Bobber / Bait Guide</h2>
              <p class="section-subtitle">
                Bobbers (baits) are the backbone of Luck and Mutation stacking. Different sources also tweak Shiny odds and casting
                speeds, so mix and match carefully.
              </p>
            </div>
            <div class="bait-panel-list">
              <article
                v-for="bait in featuredBait"
                :key="bait.id"
                class="bait-panel"
              >
                <header class="bait-panel-header">
                  <div class="bait-photo">
                    <img v-if="bait.imageUrl" :src="bait.imageUrl" :alt="bait.imageAlt || bait.title" />
                    <div v-else>{{ bait.title }}</div>
                  </div>
                  <div>
                    <h3>{{ bait.title }}</h3>
                    <p>{{ bait.description }}</p>
                  </div>
                </header>
                <div class="bait-stats-grid" v-if="bait.stats?.stats && bait.stats.stats.length > 0">
                  <div class="stat-block" v-for="(stat, index) in bait.stats.stats" :key="index">
                    <span class="stat-value">{{ stat }}</span>
                  </div>
                </div>
                <div class="bait-panel-footer">
                  <div class="bait-meta-info">
                    <p class="bait-price" v-if="bait.stats?.price">
                      Price: <span>{{ bait.stats.price }}</span>
                    </p>
                    <p class="bait-source" v-if="bait.stats?.obtainment && bait.stats.obtainment.length > 0">
                      Source: <span>{{ bait.stats.obtainment.join(', ') }}</span>
                    </p>
                  </div>
                  <router-link
                    v-if="bait.showDetail"
                    :to="`/wiki/fish-it-bobbers${bait.addressBar}`"
                    class="bait-link"
                  >
                    View details →
                  </router-link>
                </div>
              </article>
            </div>
            <div class="section-actions">
              <router-link to="/wiki/fish-it-bobbers" class="btn-hero btn-secondary">Explore Bobber data</router-link>
            </div>
          </div>
        </div>
      </section>

      <!-- Boats & Utility -->
      <section class="boats">
        <div class="container">
          <div class="boats-content">
            <div class="section-header">
              <h2 class="section-title">Fish It Game Boats & Utility</h2>
              <p class="section-subtitle">
                Boats determine speed and exploration range, and many island quests require a specific hull tier. Utility items such as
                Fish Radar or Diving Suit supercharge rare-fish runs even further.
              </p>
            </div>
            <div class="boats-grid">
              <article
                v-for="boat in featuredBoats"
                :key="boat.id"
                class="boat-card"
              >
                <div class="boat-visual">
                  <img v-if="boat.imageUrl" :src="boat.imageUrl" :alt="boat.imageAlt || boat.title" />
                  <div v-else class="boat-image-placeholder">{{ boat.title }}</div>
                </div>
                <div class="boat-card-content">
                  <h3 class="boat-title">{{ boat.title }}</h3>
                  <p class="boat-description">{{ boat.description }}</p>
                  <div class="boat-stats-grid">
                    <div class="boat-stat">
                      <span class="stat-label">Coins</span>
                      <span class="stat-value">{{ boat.stats?.coins || '—' }}</span>
                    </div>
                    <div class="boat-stat">
                      <span class="stat-label">Acceleration</span>
                      <span class="stat-value">{{ boat.stats?.acceleration || '—' }}</span>
                    </div>
                    <div class="boat-stat">
                      <span class="stat-label">Top Speed</span>
                      <span class="stat-value">{{ boat.stats?.topSpeed || '—' }}</span>
                    </div>
                    <div class="boat-stat">
                      <span class="stat-label">Passengers</span>
                      <span class="stat-value">{{ boat.stats?.passengers || '—' }}</span>
                    </div>
                  </div>
                  <router-link
                    v-if="boat.showDetail"
                    :to="`/wiki/fish-it-boats${boat.addressBar}`"
                    class="boat-link"
                  >
                    View details →
                  </router-link>
                </div>
              </article>
            </div>
            <div class="section-actions">
              <router-link to="/wiki/fish-it-boats" class="btn-hero btn-secondary">Browse Boats & Utility</router-link>
            </div>
          </div>
        </div>
      </section>

      <!-- Featured Rods -->
      <section class="featured-rods">
        <div class="container">
          <div class="featured-rods-content">
            <div class="section-header">
              <h2 class="section-title">Fish It Game Featured Fishing Rods</h2>
              <p class="section-subtitle">
                Based on official notes and community progress, these rods are grouped into early, mid, and late game to make upgrade
                routes easy to read.
              </p>
            </div>
            <div class="rod-spec-list">
              <article
                v-for="rod in featuredRods"
                :key="rod.id"
                class="rod-spec-card"
              >
                <div class="rod-spec-header">
                  <div>
                    <p class="rod-eyebrow">{{ formatCategoryLabel(rod.category) }}</p>
                    <h3>{{ rod.title }}</h3>
                  </div>
                  <div class="rod-chip">Price: {{ rod.stats?.Price || '—' }}</div>
                </div>
                <div class="rod-spec-grid">
                  <div class="spec-item">
                    <span class="spec-label">Luck</span>
                    <span class="spec-value">{{ rod.stats?.Luck || '—' }}</span>
                  </div>
                  <div class="spec-item">
                    <span class="spec-label">Speed</span>
                    <span class="spec-value">{{ rod.stats?.Speed || '—' }}</span>
                  </div>
                  <div class="spec-item">
                    <span class="spec-label">Weight</span>
                    <span class="spec-value">{{ rod.stats?.Weight || '—' }}</span>
                  </div>
                </div>
                <div class="rod-spec-footer">
                  <p class="rod-meta-text">{{ rod.stats?.Acquisition || 'Check rod detail page for acquisition steps.' }}</p>
                  <router-link
                    v-if="rod.showDetail"
                    :to="`/wiki/fish-it-rods${rod.addressBar}`"
                    class="rod-link"
                  >
                    View details →
                  </router-link>
                </div>
              </article>
            </div>
            <div class="section-actions">
              <router-link to="/wiki/fish-it-rods" class="btn-hero btn-secondary">View the full Rod index</router-link>
            </div>
          </div>
        </div>
      </section>

      <!-- Player Reviews -->
      <section class="player-reviews">
        <div class="container">
          <div class="player-reviews-content">
            <div class="section-header">
              <h2 class="section-title">Fish It Game Player Reviews</h2>
              <p class="section-subtitle">Snapshots of what the Roblox community loves about Fish It!.</p>
            </div>
            <div class="reviews-grid">
              <article
                v-for="review in playerReviews"
                :key="review.id"
                class="review-card"
              >
                <div class="reviewer">
                  <span class="avatar">{{ review.avatar }}</span>
                  <div>
                    <h4>{{ review.name }}</h4>
                    <p>{{ review.rating }}</p>
                  </div>
                </div>
                <p class="review-text">{{ review.text }}</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <!-- FAQ -->
      <section class="faq">
        <div class="container">
          <div class="faq-content">
            <div class="section-header">
              <h2 class="section-title">Fish It Game FAQ</h2>
              <p class="section-subtitle">Quick answers for the most common questions from new anglers.</p>
            </div>
            <div class="faq-grid">
              <article
                v-for="faq in faqList"
                :key="faq.id"
                class="faq-item"
              >
                <h3>{{ faq.question }}</h3>
                <p>{{ faq.answer }}</p>
              </article>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import boatsData from '@/data/wiki/boats.js'
import bobbersData from '@/data/wiki/bobbers.js'
import fishData from '@/data/wiki/fish.js'
import rodsData from '@/data/wiki/rods.js'
import { guides as guidesData } from '@/data/guides/guides.js'

const router = useRouter()

// Filter items with isHome: true
const featuredRods = computed(() => rodsData.filter(rod => rod.isHome === true))
const rareFish = computed(() => fishData.filter(fish => fish.isHome === true))
const featuredBait = computed(() => bobbersData.filter(bobber => bobber.isHome === true))
const featuredBoats = computed(() => boatsData.filter(boat => boat.isHome === true))
const featuredGuides = computed(() => guidesData.filter(guide => guide.isHome === true))

const formatCategoryLabel = (value) => {
  if (!value) return 'Rod'
  const normalized = String(value).replace(/[-_]/g, ' ').trim()
  return normalized.charAt(0).toUpperCase() + normalized.slice(1)
}

const handleGuideClick = (guide) => {
  if (guide.addressBar) {
    router.push(`/guides${guide.addressBar}`)
  }
}

const playerReviews = ref([
  {
    id: 1,
    name: 'CoralLover',
    rating: '★★★★★',
    avatar: 'C',
    text: '"Island exploration keeps surprising me. The first time I pulled a Mutation fish I was screaming—Fish It rules!"'
  },
  {
    id: 2,
    name: 'BoatCollector',
    rating: '★★★★☆',
    avatar: 'B',
    text: '"I love theorycrafting rod + bobber combos. Buy a boat early though—some event hulls are pricey."'
  },
  {
    id: 3,
    name: 'ShinyHunter',
    rating: '★★★★★',
    avatar: 'S',
    text: '"The community is super active, the wiki is stacked, and grinding Shiny/Mutation with friends is pure hype!"'
  },
  {
    id: 4,
    name: 'FishMaster',
    rating: '★★★★★',
    avatar: 'F',
    text: '"The RNG calculator is a game changer! Finally caught my first Secret fish after following the guide. This wiki is amazing!"'
  },
  {
    id: 5,
    name: 'RodEnthusiast',
    rating: '★★★★☆',
    avatar: 'R',
    text: '"Spent hours comparing different rod stats. The detailed wiki entries helped me optimize my build perfectly. Great resource!"'
  },
  {
    id: 6,
    name: 'IslandExplorer',
    rating: '★★★★★',
    avatar: 'I',
    text: '"Every island has unique fish and challenges. The boat system makes exploration so much fun. Best fishing game on Roblox!"'
  }
])

const faqList = ref([
  {
    id: 1,
    question: 'How do I start Fish It?',
    answer:
      'Load into Fisherman Island, finish the tutorial, and you’ll receive the starter rod and bobber. Clear the island quests to unlock the full loop.'
  },
  {
    id: 2,
    question: 'What should I prep before farming rare fish?',
    answer:
      'Upgrade your rod/bobber quality, grab Fish Radar, stack Luck/Mutation stats, and run the Catch RNG Calculator to gauge efficiency.'
  },
  {
    id: 3,
    question: 'Do I really need a boat?',
    answer:
      'Yes. Without a boat you’re stuck on the starter island. Buy a Wooden Skiff to reach Coralcrest and beyond for rarer fish and gear.'
  },
  {
    id: 4,
    question: 'How can I contribute to the wiki?',
    answer:
      'Use the “ADD NEW PAGE” or “EDIT” buttons on the official wiki to submit findings—we’ll surface notable updates here as well.'
  }
])
</script>

<style scoped>
section {
  padding: 40px 0;
  position: relative;
  z-index: 1;
}

.hero {
  padding: 60px 0 40px;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(30, 50, 80, 0.2) 50%, rgba(59, 130, 246, 0.05) 100%);
  z-index: -1;
}

.hero::after {
  content: '';
  position: absolute;
  top: -50%;
  right: -10%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%);
  border-radius: 50%;
  z-index: -1;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
}

.badge {
  display: inline-flex;
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid rgba(59, 130, 246, 0.3);
  background: rgba(59, 130, 246, 0.1);
  backdrop-filter: blur(10px);
  font-size: 0.85rem;
  letter-spacing: 0.2em;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 20px 0;
  font-weight: 600;
}

.hero-title {
  font-size: 56px;
  background: linear-gradient(135deg, #e8f4ff 0%, #93c5fd 50%, #60a5fa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
  margin-bottom: 24px;
  letter-spacing: 1px;
  font-weight: 800;
  text-shadow: 0 0 30px rgba(59, 130, 246, 0.3);
}

.hero-subtitle {
  color: rgba(255, 255, 255, 0.85);
  font-size: 16px;
  line-height: 1.8;
  margin-bottom: 32px;
  max-width: 700px;
}

.hero-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}

.btn-hero {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 28px;
  border-radius: 999px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  letter-spacing: 0.08em;
}

.btn-xbox {
  background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
  color: #fff;
  box-shadow: 0 8px 24px rgba(21, 128, 61, 0.4), 0 0 20px rgba(21, 128, 61, 0.2);
  position: relative;
  overflow: hidden;
}

.btn-xbox::before {
  display: none;
}

.btn-secondary {
  border: 1px solid rgba(59, 130, 246, 0.4);
  color: #fff;
  background: rgba(59, 130, 246, 0.1);
  backdrop-filter: blur(10px);
}

.btn-hero:hover {
  box-shadow: 0 12px 32px rgba(59, 130, 246, 0.3);
}

.btn-secondary:hover {
  background: rgba(59, 130, 246, 0.2);
  border-color: rgba(59, 130, 246, 0.6);
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.stat {
  padding: 20px;
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(30, 50, 80, 0.15) 100%);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.stat::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 100%;
  background: linear-gradient(180deg, var(--accent), var(--accent-soft));
  opacity: 0;
}

.stat:hover {
  border-color: rgba(59, 130, 246, 0.4);
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.2);
}

.stat:hover::before {
  opacity: 1;
}

.stat .label {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat .value {
  font-size: 15px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.5px;
}

.section-title {
  font-size: 42px;
  line-height: 1.2;
  text-align: center;
  margin-bottom: 15px;
  background: linear-gradient(135deg, #e3f2ff 0%, #93c5fd 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 800;
  letter-spacing: 1px;
  position: relative;
  padding-bottom: 20px;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
  border-radius: 2px;
}

.section-header {
  margin-bottom: 30px;
}

.section-subtitle {
  text-align: center;
  color: rgba(255, 255, 255, 0.75);
  margin: 0 auto;
  max-width: 800px;
  font-size: 16px;
  line-height: 1.7;
}

.section-actions {
  margin-top: 32px;
  text-align: center;
}

.core-systems-stats-content {
  position: relative;
  z-index: 1;
}

.section-header {
  margin-bottom: 30px;
}

.subsection-title {
  font-size: 28px;
  color: #fff;
  margin-bottom: 32px;
  font-weight: 700;
  background: linear-gradient(135deg, #e3f2ff 0%, #93c5fd 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  padding-bottom: 12px;
}

.subsection-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, var(--accent), transparent);
  border-radius: 2px;
}

.systems-stats-layout {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 40px;
  align-items: start;
}

.systems-section {
  position: relative;
}

.systems-grid {
  display: grid;
  gap: 24px;
}

.system-card {
  padding: 28px;
  border-radius: 18px;
  border: 1px solid rgba(59, 130, 246, 0.25);
  background: linear-gradient(160deg, rgba(20, 30, 50, 0.8), rgba(10, 15, 25, 0.7));
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.system-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
  opacity: 0;
}

.system-card:hover {
  border-color: rgba(59, 130, 246, 0.5);
  box-shadow: 0 15px 35px rgba(59, 130, 246, 0.2);
}

.system-card:hover::before {
  opacity: 1;
}

.system-icon {
  font-size: 32px;
  margin-bottom: 16px;
  display: block;
}

.system-card h4 {
  font-size: 20px;
  color: #d2e9ff;
  margin-bottom: 12px;
  font-weight: 700;
}

.system-card p {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.7;
  font-size: 14px;
  margin: 0;
}

.stats-section {
  position: relative;
}

.stats-grid-compact {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.stat-card-compact {
  padding: 24px;
  border-radius: 18px;
  border: 1px solid rgba(59, 130, 246, 0.25);
  background: linear-gradient(160deg, rgba(20, 30, 50, 0.8), rgba(10, 15, 25, 0.7));
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 20px;
}

.stat-card-compact::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
  opacity: 0;
}

.stat-card-compact:hover {
  border-color: rgba(59, 130, 246, 0.5);
  box-shadow: 0 10px 30px rgba(59, 130, 246, 0.2);
}

.stat-card-compact:hover::before {
  opacity: 1;
}

.stat-icon {
  font-size: 36px;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
}

.stat-info {
  flex: 1;
  position: relative;
  z-index: 1;
}

.stat-card-compact .stat-number {
  font-size: 36px;
  font-weight: 800;
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-soft) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 4px;
  line-height: 1;
}

.stat-card-compact .stat-label {
  font-size: 16px;
  color: #fff;
  font-weight: 600;
  margin-bottom: 4px;
}

.stat-card-compact .stat-desc {
  color: rgba(255, 255, 255, 0.7);
  font-size: 12px;
  margin: 0;
}

.guides-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.guide-card {
  background: linear-gradient(135deg, rgba(30, 40, 60, 0.8) 0%, rgba(20, 30, 50, 0.6) 100%);
  border-radius: 20px;
  border: 1px solid rgba(59, 130, 246, 0.25);
  padding: 0;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), 0 0 0 0 rgba(59, 130, 246, 0);
  display: flex;
  flex-direction: column;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
}

.guide-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
  opacity: 0;
  z-index: 1;
}

.guide-image-container {
  width: 100%;
  aspect-ratio: 16/9;
  overflow: hidden;
  border-radius: 12px 12px 0 0;
  background-color: rgba(20, 30, 50, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
}

.guide-image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.guide-image-placeholder {
  width: 100%;
  aspect-ratio: 16/9;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.25) 0%, rgba(30, 50, 80, 0.4) 50%, rgba(59, 130, 246, 0.15) 100%);
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  font-weight: 600;
  position: relative;
  overflow: hidden;
}


.guide-card-content {
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, transparent 0%, rgba(20, 30, 50, 0.3) 100%);
  position: relative;
  z-index: 1;
}

.guide-title {
  font-size: 18px;
  font-weight: 700;
  color: #ffd8d8;
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.4;
}

.guide-description {
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.4;
  margin-bottom: 15px;
  font-size: 14px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.guide-footer {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  padding-top: 15px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.rod-spec-list,
.bait-panel-list,
.fish-panel-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
}

.boats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 32px;
}

.rod-spec-card,
.bait-panel,
.fish-panel {
  border-radius: 16px;
  border: 1px solid rgba(59, 130, 246, 0.25);
  background: linear-gradient(135deg, rgba(18, 26, 45, 0.85) 0%, rgba(10, 16, 28, 0.7) 100%);
  padding: 16px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(5, 8, 12, 0.45);
}

.boat-card {
  border-radius: 16px;
  border: 1px solid rgba(59, 130, 246, 0.25);
  background: linear-gradient(135deg, rgba(18, 26, 45, 0.85) 0%, rgba(10, 16, 28, 0.7) 100%);
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(5, 8, 12, 0.45);
  display: flex;
  flex-direction: column;
  position: relative;
}

.boat-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: 0;
}

.rod-spec-header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  align-items: flex-start;
  margin-bottom: 10px;
}

.rod-spec-header h3 {
  margin: 2px 0 0;
  font-size: 20px;
  color: #fef3f3;
}

.rod-eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.3em;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.55);
}

.rod-chip {
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid rgba(59, 130, 246, 0.4);
  background: rgba(59, 130, 246, 0.15);
  font-size: 12px;
  color: rgba(255, 255, 255, 0.85);
}

.rod-description {
  margin: 8px 0 12px;
  color: rgba(255, 255, 255, 0.75);
  font-size: 14px;
  line-height: 1.5;
}

.rod-spec-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
  margin: 12px 0;
}

.spec-item {
  border-radius: 12px;
  border: 1px solid rgba(59, 130, 246, 0.2);
  padding: 10px;
  background: rgba(12, 18, 32, 0.7);
}

.spec-label {
  display: block;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: rgba(255, 255, 255, 0.55);
  margin-bottom: 6px;
}

.spec-value {
  font-size: 16px;
  font-weight: 700;
  color: #e2eeff;
}

.rod-spec-footer {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 12px;
  margin-top: 8px;
}

.rod-meta-text {
  color: rgba(255, 255, 255, 0.68);
  font-size: 12px;
}

.fish-panel {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: stretch;
}

.fish-visual {
  width: 100px;
  height: 100px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(20, 30, 50, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.fish-visual img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.fish-image-placeholder {
  width: 100%;
  padding: 16px;
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 600;
  font-size: 12px;
}

.fish-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.fish-header {
  margin-bottom: 4px;
}

.fish-header h3 {
  font-size: 18px;
  color: #fef3f3;
  margin: 0;
}

.fish-description {
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.5;
  margin: 0;
  font-size: 13px;
}

.fish-meta-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 10px;
}

.fish-meta-item {
  border-radius: 10px;
  border: 1px solid rgba(59, 130, 246, 0.2);
  padding: 8px;
  background: rgba(12, 18, 32, 0.7);
}

.meta-label {
  display: block;
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 4px;
}

.meta-value {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.85);
}

.bait-panel-header {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 10px;
}

.bait-panel-header h3 {
  margin: 0 0 4px;
  font-size: 18px;
  color: #fef3f3;
}

.bait-panel-header p {
  margin: 0;
  color: rgba(255, 255, 255, 0.75);
  font-size: 13px;
  line-height: 1.4;
}

.bait-photo {
  width: 70px;
  height: 70px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(20, 30, 50, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
}

.bait-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.bait-stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 8px;
  margin: 10px 0;
}

.stat-block {
  border-radius: 10px;
  border: 1px solid rgba(59, 130, 246, 0.25);
  padding: 8px;
  background: rgba(12, 18, 32, 0.7);
}

.stat-label {
  display: block;
  font-size: 9px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.55);
  margin-bottom: 4px;
}

.stat-value {
  font-size: 15px;
  font-weight: 700;
  color: #dce8ff;
}

.bait-panel-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 10px;
  margin-top: 8px;
}

.bait-meta-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.bait-price,
.bait-source {
  margin: 0;
  color: rgba(255, 255, 255, 0.75);
  font-size: 12px;
}

.boat-visual {
  width: 100%;
  height: 130px;
  border-radius: 12px 12px 0 0;
  overflow: hidden;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(20, 30, 50, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
}

.boat-visual img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.boat-image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 600;
  font-size: 14px;
}

.boat-card-content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
  position: relative;
  z-index: 1;
}

.boat-title {
  margin: 0 0 4px;
  font-size: 16px;
  color: #fef3f3;
  font-weight: 600;
}

.boat-description {
  margin: 0;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.5;
  font-size: 12px;
}

.boat-stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.boat-stat {
  border-radius: 8px;
  border: 1px solid rgba(59, 130, 246, 0.25);
  padding: 8px;
  background: rgba(12, 18, 32, 0.7);
  text-align: center;
}

.boat-stat .stat-label {
  display: block;
  font-size: 9px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.55);
  margin-bottom: 4px;
}

.boat-stat .stat-value {
  font-size: 13px;
  font-weight: 700;
  color: #dce8ff;
}

.attr-item,
.info-item,
.guide-category {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.85);
  padding: 6px 12px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.08) 100%);
  border: 1px solid rgba(59, 130, 246, 0.3);
  font-weight: 600;
}

.attr-item:hover,
.info-item:hover {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.25) 0%, rgba(59, 130, 246, 0.15) 100%);
  border-color: rgba(59, 130, 246, 0.5);
}

.rod-link,
.bait-link,
.boat-link,
.fish-link {
  margin-top: 12px;
  color: var(--accent);
  text-decoration: none;
  font-size: 12px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.rod-link:hover,
.bait-link:hover,
.boat-link:hover,
.fish-link:hover {
  text-decoration: underline;
}

.view-link {
  color: var(--accent);
  font-size: 12px;
  font-weight: 600;
}

.guide-card:hover,
.boat-card:hover {
  border-color: rgba(59, 130, 246, 0.5);
  box-shadow: 0 20px 50px rgba(59, 130, 246, 0.3), 0 0 0 1px rgba(59, 130, 246, 0.1);
}

.guide-card:hover::before,
.boat-card:hover::before {
  opacity: 1;
}

.drop-rate-table {
  background: linear-gradient(135deg, rgba(30, 40, 60, 0.7) 0%, rgba(20, 30, 50, 0.5) 100%);
  border-radius: 20px;
  border: 1px solid rgba(59, 130, 246, 0.25);
  padding: 28px;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.drop-rate-table h3 {
  font-size: 20px;
  color: #d2e9ff;
  margin-bottom: 20px;
}

.drop-rate-table table {
  width: 100%;
  border-collapse: collapse;
}

.drop-rate-table th,
.drop-rate-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.78);
}

.drop-rate-table th {
  background: rgba(59, 130, 246, 0.12);
  color: #ffdcdc;
  font-weight: 600;
}

.drop-note {
  margin-top: 10px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}

.reviews-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-top: 40px;
}

.review-card {
  padding: 28px;
  border-radius: 20px;
  border: 1px solid rgba(59, 130, 246, 0.2);
  background: linear-gradient(135deg, rgba(40, 50, 70, 0.6) 0%, rgba(30, 40, 60, 0.4) 100%);
  backdrop-filter: blur(10px);
}

.review-card:hover {
  border-color: rgba(59, 130, 246, 0.4);
  box-shadow: 0 15px 35px rgba(59, 130, 246, 0.15);
}

.reviewer {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 12px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(59, 130, 246, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: var(--accent);
}

.reviewer h4 {
  color: #ffd8d8;
  margin-bottom: 5px;
}

.reviewer p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
}

.review-text {
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.6;
  font-size: 14px;
}

.faq-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 18px;
  margin-top: 40px;
}

.faq-item {
  padding: 28px;
  border-radius: 20px;
  border: 1px solid rgba(59, 130, 246, 0.2);
  background: linear-gradient(135deg, rgba(30, 40, 60, 0.6) 0%, rgba(20, 30, 50, 0.4) 100%);
  backdrop-filter: blur(10px);
  position: relative;
}

.faq-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, var(--accent), var(--accent-soft));
  opacity: 0;
}

.faq-item:hover {
  border-color: rgba(59, 130, 246, 0.4);
  box-shadow: 0 10px 25px rgba(59, 130, 246, 0.15);
}

.faq-item:hover::before {
  opacity: 1;
}

.faq-item h3 {
  font-size: 18px;
  line-height: 1.2;
  margin-bottom: 10px;
  color: #ffd6d6;
}

.faq-item p {
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.6;
  font-size: 14px;
}

.guides-content,
.featured-rods-content,
.fish-drop-rates-content,
.bait-guide-content,
.boats-content,
.player-reviews-content,
.faq-content {
  position: relative;
}

@media (max-width: 768px) {
  section {
    padding: 30px 0;
  }

  .hero-title {
    font-size: 28px;
  }

  .section-title {
    font-size: 28px;
  }

  .hero-stats,
  .systems-stats-layout {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .systems-grid {
    grid-template-columns: 1fr;
  }

  .stats-grid-compact {
    grid-template-columns: 1fr;
  }

  .subsection-title {
    font-size: 22px;
  }

  .system-card,
  .stat-card-compact {
    padding: 20px;
  }

  .stat-card-compact {
    flex-direction: column;
    text-align: center;
  }

  .stat-icon {
    font-size: 28px;
  }

  .guides-grid {
    grid-template-columns: 1fr;
  }

  .fish-panel {
    flex-direction: column;
  }

  .fish-visual {
    flex: 1 1 100%;
  }

  .boats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .bait-panel-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .rod-spec-grid,
  .bait-stats-grid,
  .boat-stats-grid,
  .fish-meta-grid {
    grid-template-columns: 1fr;
  }

  .reviews-grid {
    grid-template-columns: 1fr;
  }
}
</style>

