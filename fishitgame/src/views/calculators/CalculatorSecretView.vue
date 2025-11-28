<template>
  <section class="calculator-page">
    <div class="container">
      <header class="page-hero">
        <div>
          <p class="hero-eyebrow">Tools · Calculator</p>
          <h1>Fish It Secret Fish Calculator</h1>
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
            <h2>Filter & Search</h2>

            <div class="form-group">
              <label for="search-input">Search Fish:</label>
              <input
                id="search-input"
                v-model="searchQuery"
                type="text"
                placeholder="Search by name or location..."
                class="search-input"
              />
            </div>

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
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import fishData from '@/data/wiki/fish.js'

const router = useRouter()
const searchQuery = ref('')
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

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter((fish) => {
      const name = fish.title?.toLowerCase() || ''
      const location = fish.stats?.Location?.toLowerCase() || ''
      return name.includes(query) || location.includes(query)
    })
  }

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
  searchQuery.value = ''
  selectedLocations.value = []
}

// Open RNG Calculator
const openRngCalculator = () => {
  router.push('/calculator/fish-it-rng-calculator')
}
</script>

<style scoped>
.calculator-page {
  padding: 90px 0;
}

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

.page-hero h1 {
  font-size: 54px;
  margin: 10px 0 20px;
  background: linear-gradient(135deg, #e3f2ff, #93c5fd);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
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
  border-radius: 22px;
  border: 1px solid rgba(59, 130, 246, 0.25);
  background: linear-gradient(160deg, rgba(20, 30, 50, 0.8), rgba(10, 15, 25, 0.7));
  padding: 32px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
  height: fit-content;
  position: sticky;
  top: 100px;
}

.filter-card h2,
.results-card h2 {
  font-size: 28px;
  margin: 0 0 24px;
  color: #fff;
  background: linear-gradient(135deg, #e3f2ff, #93c5fd);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.form-group {
  margin-bottom: 24px;
}

.form-group label {
  display: block;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 8px;
  font-weight: 500;
}

.search-input {
  width: 100%;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid rgba(59, 130, 246, 0.3);
  background: rgba(15, 25, 40, 0.8);
  color: #fff;
  font-size: 14px;
  transition: border-color 0.3s;
}

.search-input:focus {
  outline: none;
  border-color: rgba(59, 130, 246, 0.6);
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
  padding: 60px 20px;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
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
  .page-hero h1 {
    font-size: 36px;
  }

  .fish-grid {
    grid-template-columns: 1fr;
  }

  .location-filters {
    flex-direction: column;
  }

  .filter-chip {
    width: 100%;
    text-align: center;
  }
}
</style>
