<template>
  <section class="page-container-large">
    <div class="container">
      <header class="page-hero">
        <div>
          <p class="hero-eyebrow">Tools · Calculator</p>
          <h1 class="page-title-large">Fish It Secret Fish Calculator</h1>
          <p>
            Explore all Secret Fish in Fish It! Find detailed information about locations, catch rates, and strategies
            for catching these ultra-rare fish.
          </p>
        </div>
      </header>

      <div class="calculator-grid">
        <!-- Filter Section -->
        <div class="filter-section">
          <div class="filter-card">
            <h2>Filter</h2>

            <div class="form-group">
              <label>Filter by Location:</label>
              <div class="location-filters">
                <button
                  v-for="location in uniqueLocations"
                  :key="location"
                  class="filter-chip"
                  :class="{ active: selectedLocations.includes(location) }"
                  @click="toggleLocation(location)"
                >
                  {{ location }}
                </button>
              </div>
            </div>

            <div class="stats-summary">
              <div class="stat-item">
                <span class="stat-label">Total Secret Fish:</span>
                <span class="stat-value">{{ filteredSecretFish.length }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Locations:</span>
                <span class="stat-value">{{ uniqueLocations.length }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Results Section -->
        <div class="results-section">
          <div class="results-card">
            <h2>Secret Fish Database</h2>

            <div v-if="filteredSecretFish.length > 0" class="fish-database">
              <div
                v-for="(fishes, location) in groupedFilteredFish"
                :key="location"
                class="location-group"
              >
                <div class="location-header">
                  <h3>{{ location }}</h3>
                  <span class="location-count">{{ fishes.length }} fish</span>
                </div>
                <div class="fish-grid">
                  <div
                    v-for="fish in fishes"
                    :key="fish.id"
                    class="fish-card"
                  >
                    <div class="fish-header">
                      <h4 class="fish-name">{{ fish.title }}</h4>
                      <span class="secret-badge">SECRET</span>
                    </div>
                    <div class="fish-details">
                      <div class="detail-row">
                        <span class="detail-label">Rarity:</span>
                        <span class="detail-value">{{ fish.stats?.Rarity || 'Unknown' }}</span>
                      </div>
                      <div class="detail-row">
                        <span class="detail-label">Location:</span>
                        <span class="detail-value">{{ fish.stats?.Location || 'Unknown' }}</span>
                      </div>
                    </div>
                    <div class="fish-actions">
                      <button
                        class="action-button"
                        @click="openRngCalculator"
                      >
                        Calculate Catch Odds →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-else class="empty-state">
              <div class="empty-icon">🔮</div>
              <p>No Secret Fish found matching your filters.</p>
              <button class="clear-filters-button" @click="clearFilters">Clear Filters</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Why Use This Calculator Section -->
      <div class="intro-section">
        <div class="intro-content">
          <h2 class="section-title">Why Use the Secret Fish Calculator?</h2>
          <p class="intro-description">
            Every Secret fish hunt starts with solid intel. Use this calculator to review each rare catch, filter by
            location, and jump into probability tools before you waste time casting in the wrong waters.
          </p>
          <div class="intro-grid">
            <div class="intro-card">
              <div class="intro-icon">🔮</div>
              <h3>Complete Secret Fish Database</h3>
              <p>The Fish It Secret Fish Calculator provides a comprehensive database of all Secret fish in the game. Browse by location, search by name, and find detailed information about each ultra-rare catch.</p>
            </div>
            <div class="intro-card">
              <div class="intro-icon">📍</div>
              <h3>Filter by Location</h3>
              <p>Quickly find Secret fish by their fishing location. Filter by Ocean, Ancient Jungle, Lost Isle, and more to see which rare catches are available in each area.</p>
            </div>
            <div class="intro-card">
              <div class="intro-icon">🎯</div>
              <h3>Plan Your Grind</h3>
              <p>Use the calculator to identify which Secret fish you want to catch, then jump directly to the <router-link to="/calculator/fish-it-rng-calculator" class="inline-link">RNG Calculator</router-link> to see how long it will take with your current setup. Each fish card has a button that takes you straight there!</p>
            </div>
            <div class="intro-card">
              <div class="intro-icon">📊</div>
              <h3>Track Your Progress</h3>
              <p>Search and filter through all Secret fish to track which ones you've caught and which ones you still need. The Fish It Secret Fish Calculator helps you stay organized.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- FAQ Section -->
      <div class="faq-section">
        <h2 class="section-title">Common Questions</h2>
        <div class="faq-grid">
          <div class="faq-item">
            <h3>What are Secret fish?</h3>
            <p>Secret fish are the rarest fish in Fish It! with extremely low catch rates, often 1 in hundreds of thousands or millions. They're the ultimate challenge for dedicated players. The Fish It Secret Fish Calculator lists all of them with their locations and rarity information.</p>
          </div>
          <div class="faq-item">
            <h3>How do I use the search and filter features?</h3>
            <p>Type in the search box to find fish by name or location. Click location chips to filter by specific areas. You can combine search and location filters to narrow down results. The calculator shows how many Secret fish match your criteria.</p>
          </div>
          <div class="faq-item">
            <h3>Can I calculate catch odds from here?</h3>
            <p>Yes! Each Secret fish card has a "Calculate Catch Odds" button that takes you directly to the <router-link to="/calculator/fish-it-rng-calculator" class="inline-link">RNG Calculator</router-link>. This lets you see exactly how many attempts and hours you'll need to catch that specific fish with your current gear. Make sure to check your total luck first using our <router-link to="/calculator/fish-it-luck-calculator" class="inline-link">Luck Calculator</router-link> for the most accurate results.</p>
          </div>
          <div class="faq-item">
            <h3>Which locations have the most Secret fish?</h3>
            <p>Different locations have different numbers of Secret fish. The Fish It Secret Fish Calculator groups them by location so you can easily see which areas are best for hunting rare catches. Some locations like Lost Isle have multiple Secret fish.</p>
          </div>
          <div class="faq-item">
            <h3>Are all Secret fish available all the time?</h3>
            <p>Most Secret fish are always available, but some like Megalodon only appear during special Admin Abuse events. The calculator shows all Secret fish regardless of availability - check in-game for current event status.</p>
          </div>
          <div class="faq-item">
            <h3>What's the rarest Secret fish?</h3>
            <p>Secret fish have varying rarity rates, with some having odds like 1/3M or 1/4M. The calculator shows each fish's rarity information so you can see which ones are the hardest to catch. Use the RNG Calculator to see realistic time estimates for each.</p>
          </div>
          <div class="faq-item">
            <h3>How do I know if I should grind for a Secret fish?</h3>
            <p>Use the Fish It Secret Fish Calculator to find fish you're interested in, then click "Calculate Catch Odds" to see time estimates. If the grind seems too long, you might want to upgrade your gear first or focus on easier Secret fish.</p>
          </div>
          <div class="faq-item">
            <h3>Can I bookmark specific Secret fish?</h3>
            <p>While the calculator doesn't have a built-in bookmark feature, you can use the search and filter to quickly find fish you're tracking. The location grouping also makes it easy to revisit fish in specific areas you're farming.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import fishData from '@/data/wiki/fish.js'

const router = useRouter()
const selectedLocations = ref([])

// Get all secret fish
const secretFish = computed(() => {
  return fishData.filter((fish) => fish.category === 'secret')
})

// Extract rarity rate from Rarity string
const extractRate = (rarityString) => {
  if (!rarityString) return null
  const match = rarityString.match(/\(1 in ([\d.]+[KMBkmb]?)\)/i)
  return match ? match[1] : null
}

// Get unique locations
const uniqueLocations = computed(() => {
  const locations = new Set()
  secretFish.value.forEach((fish) => {
    const location = fish.stats?.Location
    if (location) {
      // Split by / to handle multiple locations
      location.split('/').forEach((loc) => {
        locations.add(loc.trim())
      })
    }
  })
  return Array.from(locations).sort()
})

// Filter secret fish
const filteredSecretFish = computed(() => {
  let filtered = secretFish.value

  // Filter by selected locations
  if (selectedLocations.value.length > 0) {
    filtered = filtered.filter((fish) => {
      const location = fish.stats?.Location || ''
      return selectedLocations.value.some((selectedLoc) => {
        return location.includes(selectedLoc)
      })
    })
  }

  return filtered
})

// Group filtered fish by location
const groupedFilteredFish = computed(() => {
  const grouped = {}
  filteredSecretFish.value.forEach((fish) => {
    const location = fish.stats?.Location || 'Unknown Location'
    if (!grouped[location]) {
      grouped[location] = []
    }
    grouped[location].push(fish)
  })
  return grouped
})

// Toggle location filter
const toggleLocation = (location) => {
  const index = selectedLocations.value.indexOf(location)
  if (index > -1) {
    selectedLocations.value.splice(index, 1)
  } else {
    selectedLocations.value.push(location)
  }
}

// Clear all filters
const clearFilters = () => {
  selectedLocations.value = []
}

// Open RNG Calculator
const openRngCalculator = () => {
  router.push('/calculator/fish-it-rng-calculator')
}
</script>

<style scoped>
.page-hero {
  padding: 32px;
  border: 1px solid rgba(59, 130, 246, 0.25);
  border-radius: 24px;
  background: radial-gradient(circle at top, rgba(59, 130, 246, 0.25), rgba(10, 15, 25, 0.6));
  margin-bottom: 40px;
  text-align: center;
}

.hero-eyebrow {
  letter-spacing: 0.4em;
  font-size: 12px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 10px;
}


.page-hero p {
  max-width: 800px;
  margin: 0 auto;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.7;
}

.calculator-grid {
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 24px;
  margin-bottom: 60px;
}

.filter-card,
.results-card {
  border-radius: 20px;
  border: 1px solid rgba(59, 130, 246, 0.25);
  background: linear-gradient(160deg, rgba(20, 30, 50, 0.8), rgba(10, 15, 25, 0.7));
  padding: 20px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
  height: fit-content;
  position: sticky;
  top: 100px;
}

.filter-card h2,
.results-card h2 {
  font-size: 24px;
  margin-bottom: 15px;
  color: #fff;
  background: linear-gradient(135deg, #e3f2ff, #93c5fd);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 8px;
  font-weight: 500;
}

.location-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.filter-chip {
  padding: 8px 14px;
  border-radius: 20px;
  border: 1px solid rgba(59, 130, 246, 0.3);
  background: rgba(15, 25, 40, 0.6);
  color: rgba(255, 255, 255, 0.7);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.filter-chip:hover {
  border-color: rgba(59, 130, 246, 0.5);
  background: rgba(15, 25, 40, 0.8);
  color: rgba(255, 255, 255, 0.9);
}

.filter-chip.active {
  border-color: rgba(59, 130, 246, 0.8);
  background: rgba(59, 130, 246, 0.2);
  color: #60a5fa;
  font-weight: 600;
}

.stats-summary {
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-label {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
}

.stat-value {
  font-size: 16px;
  font-weight: 600;
  color: #60a5fa;
}

.fish-database {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.location-group {
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.location-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid rgba(59, 130, 246, 0.3);
}

.location-header h3 {
  font-size: 22px;
  color: #fff;
  margin: 0;
}

.location-count {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  background: rgba(59, 130, 246, 0.2);
  padding: 4px 12px;
  border-radius: 12px;
}

.fish-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.fish-card {
  padding: 20px;
  background: rgba(15, 25, 40, 0.5);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 16px;
  transition: all 0.3s;
}

.fish-card:hover {
  border-color: rgba(59, 130, 246, 0.4);
  background: rgba(15, 25, 40, 0.7);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.2);
}

.fish-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 12px;
}

.fish-name {
  font-size: 18px;
  color: #fff;
  margin: 0;
  font-weight: 600;
  flex: 1;
}

.secret-badge {
  padding: 4px 10px;
  border-radius: 8px;
  background: linear-gradient(135deg, rgba(251, 146, 60, 0.2), rgba(251, 146, 60, 0.1));
  border: 1px solid rgba(251, 146, 60, 0.4);
  color: #fb923c;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  white-space: nowrap;
}

.fish-details {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.detail-label {
  color: rgba(255, 255, 255, 0.6);
}

.detail-value {
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  text-align: right;
  max-width: 60%;
  word-break: break-word;
}

.fish-actions {
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.action-button {
  width: 100%;
  padding: 10px 16px;
  border: 1px solid rgba(59, 130, 246, 0.4);
  border-radius: 10px;
  background: rgba(59, 130, 246, 0.1);
  color: #60a5fa;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.action-button:hover {
  background: rgba(59, 130, 246, 0.2);
  border-color: rgba(59, 130, 246, 0.6);
  color: #93c5fd;
}

.empty-state {
  text-align: center;
  padding: 80px 20px;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 80px;
}

.empty-state p {
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.6;
  margin-bottom: 20px;
}

.clear-filters-button {
  padding: 10px 20px;
  border: 1px solid rgba(59, 130, 246, 0.4);
  border-radius: 10px;
  background: rgba(59, 130, 246, 0.1);
  color: #60a5fa;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.clear-filters-button:hover {
  background: rgba(59, 130, 246, 0.2);
  border-color: rgba(59, 130, 246, 0.6);
}

@media (max-width: 1200px) {
  .calculator-grid {
    grid-template-columns: 1fr;
  }

  .filter-card {
    position: static;
  }
}

@media (max-width: 768px) {
  .page-hero {
    padding: 20px;
    margin-bottom: 20px;
  }

  .calculator-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .filter-card,
  .results-card {
    padding: 16px;
  }

  .filter-card h2,
  .results-card h2 {
    font-size: 20px;
    margin-bottom: 12px;
  }

  .fish-grid {
    grid-template-columns: 1fr;
  }

  .fish-card {
    padding: 15px;
  }

  .location-filters {
    flex-direction: column;
  }

  .filter-chip {
    width: 100%;
    text-align: center;
  }

  .location-header h3 {
    font-size: 18px;
  }

  .section-title {
    font-size: 20px;
    margin-bottom: 10px;
  }

  .intro-description {
    font-size: 12px;
    margin-bottom: 10px;
  }

  .intro-grid,
  .faq-grid {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .intro-card,
  .faq-item {
    padding: 10px;
  }

  .intro-icon {
    font-size: 36px;
  }

  .intro-card h3,
  .faq-item h3 {
    font-size: 16px;
  }

  .intro-card p,
  .faq-item p {
    font-size: 12px;
  }

  .empty-state {
    padding: 40px 15px;
  }

  .empty-icon {
    font-size: 48px;
    margin-bottom: 20px;
  }
}

.intro-section {
  margin-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.intro-content {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 36px;
  margin-bottom: 20px;
  color: #fff;
  text-align: center;
  background: linear-gradient(135deg, #e3f2ff, #93c5fd);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.intro-description {
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.8;
  text-align: center;
  max-width: 800px;
  margin: 0 auto 40px;
  font-size: 16px;
}

.intro-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
}

.intro-card {
  padding: 24px;
  border-radius: 18px;
  border: 1px solid rgba(59, 130, 246, 0.25);
  background: linear-gradient(160deg, rgba(20, 30, 50, 0.8), rgba(10, 15, 25, 0.7));
  transition: all 0.3s ease;
  text-align: center;
}

.intro-card:hover {
  border-color: rgba(59, 130, 246, 0.5);
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(59, 130, 246, 0.2);
}

.intro-icon {
  font-size: 48px;
  margin-bottom: 16px;
  line-height: 1;
}

.intro-card h3 {
  font-size: 20px;
  color: #fff;
  margin: 0 0 12px;
  font-weight: 600;
}

.intro-card p {
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.7;
  margin: 0;
  font-size: 14px;
}

.intro-card strong {
  color: #60a5fa;
  font-weight: 600;
}

.faq-section {
  margin-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.faq-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.faq-item {
  padding: 28px;
  border-radius: 18px;
  border: 1px solid rgba(59, 130, 246, 0.25);
  background: linear-gradient(160deg, rgba(20, 30, 50, 0.8), rgba(10, 15, 25, 0.7));
  transition: all 0.3s ease;
}

.faq-item:hover {
  border-color: rgba(59, 130, 246, 0.5);
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(59, 130, 246, 0.2);
}

.faq-item h3 {
  font-size: 20px;
  color: #fff;
  margin: 0 0 16px;
  font-weight: 600;
  line-height: 1.4;
}

.faq-item p {
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.8;
  margin: 0;
  font-size: 15px;
}

.faq-item strong {
  color: #60a5fa;
  font-weight: 600;
}

.inline-link {
  color: #60a5fa;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
  border-bottom: 1px solid transparent;
}

.inline-link:hover {
  color: #93c5fd;
  border-bottom-color: #93c5fd;
}

@media (max-width: 1024px) {
  .intro-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .faq-grid {
    grid-template-columns: 1fr;
  }
}

</style>
