<template>
  <section class="calculator-page">
    <div class="container">
      <header class="page-hero">
        <div>
          <p class="hero-eyebrow">Tools · Calculator</p>
          <h1>Fish It Catch RNG Calculator</h1>
          <p>
            Calculate the expected number of attempts and time needed to catch your target fish based on your equipment
            setup. Enter your Rod, Bobber, Utility, and target fish to get accurate estimates.
          </p>
        </div>
      </header>

      <div class="calculator-grid">
        <!-- Input Section -->
        <div class="input-section">
          <div class="input-card">
            <div class="mode-tabs">
              <button
                class="tab-button"
                :class="{ active: inputMode === 'fish' }"
                @click="inputMode = 'fish'"
              >
                Select Secret Fish
              </button>
              <button
                class="tab-button"
                :class="{ active: inputMode === 'manual' }"
                @click="inputMode = 'manual'"
              >
                Manual Odds Input
              </button>
            </div>

            <div v-if="inputMode === 'fish'" class="form-group">
              <label for="fish-select">Target Fish Species:</label>
              <div class="custom-select-wrapper">
                <div class="custom-select" :class="{ open: isSelectOpen }" @click="toggleSelect">
                  <span class="select-display">
                    {{ selectedFish ? `${selectedFish.name} (${selectedFish.rate})` : '-- Select your target fish --' }}
                  </span>
                  <span class="select-arrow">▼</span>
                </div>
                <div v-if="isSelectOpen" class="select-dropdown">
                  <div
                    v-for="(fishes, location) in groupedSecretFish"
                    :key="location"
                    class="select-group"
                  >
                    <div class="group-header" :class="`location-${getLocationClass(location)}`">
                      {{ location }}
                    </div>
                    <div
                      v-for="fish in fishes"
                      :key="fish.id"
                      class="select-option"
                      :class="{ selected: selectedFish?.id === fish.id }"
                      @click="selectFish(fish)"
                    >
                      {{ fish.name }} ({{ fish.rate }})
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="inputMode === 'manual'" class="form-group">
              <label for="manual-rate">Target Fish Species:</label>
              <input
                id="manual-rate"
                v-model="manualCatchRate"
                type="text"
                placeholder="Enter odds in format: 1/300000"
                class="number-input"
              />
            </div>

            <div class="form-group">
              <label for="luck-multiplier">Luck Multiplier (%):</label>
              <input
                id="luck-multiplier"
                v-model.number="luckMultiplier"
                type="number"
                min="0"
                step="1"
                placeholder="0"
                class="number-input"
              />
              <span class="input-hint">Your total luck percentage bonus (1000 (%) = 10x multiplier)</span>
            </div>

            <div class="form-group">
              <label for="casting-rate">Casting Rate (per hour):</label>
              <input
                id="casting-rate"
                v-model.number="castingRate"
                type="number"
                min="1"
                step="1"
                placeholder="600"
                class="number-input"
              />
              <span class="input-hint">How many casts you typically complete in one hour</span>
            </div>

            <button class="calculate-button" @click="calculateResults">Calculate Catch Odds</button>
          </div>
        </div>

        <!-- Results Section -->
        <div class="results-section" v-if="showResults && baseDropRate > 0">
          <div class="results-card">
            <div class="success-banner">
              <p>Analysis complete! Check out the results below.</p>
            </div>

            <h2>Catch Probability Analysis</h2>
            <p class="analysis-description">
              The calculator uses statistical models to estimate catch probability. Results show enhanced odds after
              applying your luck multiplier and confidence intervals for different probability levels.
            </p>

            <div class="enhanced-odds">
              <h3>Enhanced Odds</h3>
              <div class="odds-display">
                <span class="odds-value">{{ formatEnhancedRate(enhancedDropRate) }}</span>
                <span class="luck-efficiency">Luck Efficiency: {{ luckEfficiency.toFixed(2) }}x</span>
              </div>
            </div>

            <div class="confidence-section">
              <div class="confidence-item">
                <h4>50% Confidence</h4>
                <div class="confidence-value">
                  <div>{{ formatDaysHours(confidence50.days, confidence50.remainingHours) }}</div>
                  <div>{{ formatCasts(confidence50.casts) }} casts</div>
                </div>
              </div>

              <div class="confidence-item">
                <h4>90% Confidence</h4>
                <div class="confidence-value">
                  <div>{{ formatDaysHours(confidence90.days, confidence90.remainingHours) }}</div>
                  <div>{{ formatCasts(confidence90.casts) }} casts</div>
                </div>
              </div>

              <div class="confidence-item">
                <h4>99% Confidence</h4>
                <div class="confidence-value">
                  <div>{{ formatDaysHours(confidence99.days, confidence99.remainingHours) }}</div>
                  <div>{{ formatCasts(confidence99.casts) }} casts</div>
                </div>
              </div>
            </div>

            <p class="disclaimer">
              These projections are based on statistical models and community research. Actual results may vary due to
              RNG factors.
            </p>
          </div>
        </div>
      </div>

      <div class="info-section">
        <h2>How It Works</h2>
        <div class="info-grid">
          <div class="info-card">
            <h3>Luck Calculation</h3>
            <p>Total Luck = Rod Luck + Bobber Luck + Utility Luck + Island Buff</p>
            <p>For regular fish: Every 10 Luck increases drop rate by ~0.15%.</p>
            <p>For Secret fish: Each Luck point has a more significant impact (multiplier effect).</p>
          </div>
          <div class="info-card">
            <h3>Drop Rate Formula</h3>
            <p><strong>Regular Fish:</strong> Final Rate = Base Rate × (1 + (Luck / 10) × 0.0015)</p>
            <p><strong>Secret Fish:</strong> Final Rate = Base Rate × (1 + Luck × 0.001)</p>
            <p>Expected Attempts = 1 / Final Drop Rate</p>
          </div>
          <div class="info-card">
            <h3>Manual Input Mode</h3>
            <p>Use manual input for Secret fish with very low catch rates (e.g., Worm Fish: 1/3M).</p>
            <p>Enter rates as fractions (1/3000000) or decimals (0.00000033). Supports K/M/B suffixes (1/3M = 1/3000000).</p>
          </div>
          <div class="info-card">
            <h3>Notes</h3>
            <p>• Some Secret fish (like Megalodon) can only be caught during Admin Abuse events.</p>
            <p>• Currently unobtainable Secret fish are not listed in the fish selector.</p>
            <p>• Recommended: 120+ Luck for efficient Legendary fishing.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Secret fish list with catch rates
const secretFishList = [
  // Fisherman Island
  { id: 1, name: 'Crystal Crab', rate: '1/750K', location: 'Fisherman Island' },
  { id: 2, name: 'Orca', rate: '1/1.50M', location: 'Fisherman Island' },
  // Ocean
  { id: 3, name: 'Blob Shark', rate: '1/250K', location: 'Ocean' },
  { id: 4, name: 'Ghost Shark', rate: '1/500K', location: 'Ocean' },
  { id: 5, name: 'Ghost Narwhal', rate: '1/600K', location: 'Ocean' },
  { id: 6, name: 'Worm Fish', rate: '1/3M', location: 'Ocean' },
  // Kohana
  { id: 7, name: 'Lochness Monster', rate: '1/3M', location: 'Kohana' },
  // Coral Reefs
  { id: 8, name: 'Eerie Shark', rate: '1/250K', location: 'Coral Reefs' },
  { id: 9, name: 'Monster Shark', rate: '1/2.50M', location: 'Coral Reefs' },
  // Esoteric Depths
  { id: 10, name: 'Thin Armor Shark', rate: '1/300K', location: 'Esoteric Depths' },
  { id: 11, name: 'Scare', rate: '1/3M', location: 'Esoteric Depths' },
  // Tropical Grove
  { id: 12, name: 'Great Whale', rate: '1/950K', location: 'Tropical Grove' },
  // Crater Island
  { id: 13, name: 'Frostborn Shark', rate: '1/500K', location: 'Crater Island' },
  // Treasure Room - Lost Isle
  { id: 14, name: 'Queen Crab', rate: '1/800K', location: 'Treasure Room - Lost Isle' },
  { id: 15, name: 'King Crab', rate: '1/1.20M', location: 'Treasure Room - Lost Isle' },
  // Sisyphus Statue - Lost Isle
  { id: 16, name: 'Cryoshade Glider', rate: '1/450K', location: 'Sisyphus Statue - Lost Isle' },
  { id: 17, name: 'Panther Eel', rate: '1/750K', location: 'Sisyphus Statue - Lost Isle' },
  { id: 18, name: 'Giant Squid', rate: '1/800K', location: 'Sisyphus Statue - Lost Isle' },
  { id: 19, name: 'Robot Kraken', rate: '1/3.50M', location: 'Sisyphus Statue - Lost Isle' },
  // Admin Event Ocean
  { id: 20, name: 'Ghost Worm Fish', rate: '1/1M', location: 'Admin Event Ocean' },
  { id: 21, name: 'Megalodon', rate: '1/4M', location: 'Admin Event Ocean' },
  // Admin Event Mount Hallow
  { id: 22, name: 'Bloodmoon Whale', rate: '1/5M', location: 'Admin Event Mount Hallow' },
  // Ancient Jungle
  { id: 23, name: 'King Jelly', rate: '1/1.5M', location: 'Ancient Jungle' },
  { id: 24, name: 'Mosasaur Shark', rate: '1/800K', location: 'Ancient Jungle' },
  // Ancient Jungle - Sacred Temple
  { id: 25, name: 'Elshark Gran Maja', rate: '1/4M', location: 'Ancient Jungle - Sacred Temple' },
  { id: 26, name: 'Bone Whale', rate: '1/2M', location: 'Ancient Jungle - Sacred Temple' },
  // Ancient Jungle - Underground Cellar
  { id: 27, name: 'Ancient Whale', rate: '1/2.75M', location: 'Ancient Jungle - Underground Cellar' },
  // Ancient Jungle - Ancient Ruin
  { id: 28, name: 'Gladiator Shark', rate: '1/1M', location: 'Ancient Jungle - Ancient Ruin' },
]

const selectedFish = ref(null)
const inputMode = ref('fish')
const manualCatchRate = ref('')
const luckMultiplier = ref(0)
const castingRate = ref(600)
const showResults = ref(false)
const isSelectOpen = ref(false)

// Group secret fish by location
const groupedSecretFish = computed(() => {
  const grouped = {}
  secretFishList.forEach((fish) => {
    if (!grouped[fish.location]) {
      grouped[fish.location] = []
    }
    grouped[fish.location].push(fish)
  })
  return grouped
})

// Get location color class
const getLocationClass = (location) => {
  const locationColors = {
    'Fisherman Island': 'orange',
    Ocean: 'blue',
    Kohana: 'green',
    'Coral Reefs': 'pink',
    'Esoteric Depths': 'purple',
    'Tropical Grove': 'yellow',
    'Crater Island': 'red',
    'Treasure Room - Lost Isle': 'orange',
    'Sisyphus Statue - Lost Isle': 'green',
    'Admin Event Ocean': 'blue',
    'Admin Event Mount Hallow': 'red',
    'Ancient Jungle': 'green',
    'Ancient Jungle - Sacred Temple': 'orange',
    'Ancient Jungle - Underground Cellar': 'purple',
    'Ancient Jungle - Ancient Ruin': 'blue',
  }
  return locationColors[location] || 'default'
}

// Parse manual catch rate input (supports fractions like "1/3000000" or decimals)
const parseManualRate = (input) => {
  if (!input) return 0
  const trimmed = input.trim()
  
  // Check if it's a fraction (e.g., "1/3000000" or "1/3M")
  const fractionMatch = trimmed.match(/^(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?|[\d.]+[KMBkmb]?)$/i)
  if (fractionMatch) {
    const numerator = parseFloat(fractionMatch[1])
    let denominator = fractionMatch[2]
    
    // Handle K, M, B suffixes
    if (denominator.match(/[KMBkmb]$/)) {
      const suffix = denominator.slice(-1).toUpperCase()
      const num = parseFloat(denominator.slice(0, -1))
      denominator = suffix === 'K' ? num * 1000 : suffix === 'M' ? num * 1000000 : num * 1000000000
    } else {
      denominator = parseFloat(denominator)
    }
    
    return numerator / denominator
  }
  
  // Otherwise try to parse as decimal
  return parseFloat(trimmed) || 0
}

// Get base catch rate
const baseDropRate = computed(() => {
  if (inputMode.value === 'manual') {
    return parseManualRate(manualCatchRate.value)
  }
  
  if (!selectedFish.value?.rate) return 0
  return parseManualRate(selectedFish.value.rate)
})

// Calculate luck efficiency (1000% = 10x multiplier)
const luckEfficiency = computed(() => {
  if (!luckMultiplier.value) return 1
  // 1000% = 10x, so divide by 100 to get multiplier
  return 1 + luckMultiplier.value / 100
})

// Enhanced odds after applying luck
const enhancedDropRate = computed(() => {
  const base = baseDropRate.value
  if (base <= 0) return 0
  return base * luckEfficiency.value
})

// Calculate confidence intervals
const calculateConfidence = (probability) => {
  if (enhancedDropRate.value <= 0) return { attempts: 0, days: 0, hours: 0, casts: 0 }
  
  const attempts = Math.ceil(-Math.log(1 - probability) / enhancedDropRate.value)
  const casts = attempts
  const hours = attempts / (castingRate.value || 600)
  const days = Math.floor(hours / 24)
  const remainingHours = hours % 24
  
  return { attempts, days, hours, casts, remainingHours }
}

const confidence50 = computed(() => calculateConfidence(0.5))
const confidence90 = computed(() => calculateConfidence(0.9))
const confidence99 = computed(() => calculateConfidence(0.99))

const toggleSelect = () => {
  isSelectOpen.value = !isSelectOpen.value
}

const selectFish = (fish) => {
  selectedFish.value = fish
  isSelectOpen.value = false
}

const calculateResults = () => {
  if (baseDropRate.value > 0 && castingRate.value > 0) {
    showResults.value = true
  }
}

// Close select when clicking outside
let clickOutsideHandler = null

onMounted(() => {
  clickOutsideHandler = (e) => {
    if (!e.target.closest('.custom-select-wrapper')) {
      isSelectOpen.value = false
    }
  }
  document.addEventListener('click', clickOutsideHandler)
})

onUnmounted(() => {
  if (clickOutsideHandler) {
    document.removeEventListener('click', clickOutsideHandler)
  }
})

// Format enhanced rate for display
const formatEnhancedRate = (rate) => {
  if (rate <= 0) return '0'
  const denominator = Math.round(1 / rate)
  if (denominator >= 1000000) {
    return `1/${(denominator / 1000000).toFixed(2)}M`
  }
  if (denominator >= 1000) {
    return `1/${(denominator / 1000).toFixed(2)}K`
  }
  return `1/${denominator.toLocaleString()}`
}

// Format days and hours
const formatDaysHours = (days, hours) => {
  const h = Math.round(hours)
  if (days === 0) return `${h} hours`
  return `${days} days, ${h.toFixed(1)} hours`
}

// Format casts
const formatCasts = (casts) => {
  if (casts >= 1000000) {
    return `${(casts / 1000000).toFixed(2)}M`
  }
  if (casts >= 1000) {
    return `${(casts / 1000).toFixed(2)}K`
  }
  return casts.toLocaleString()
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
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 60px;
}

.input-card,
.results-card {
  border-radius: 22px;
  border: 1px solid rgba(59, 130, 246, 0.25);
  background: linear-gradient(160deg, rgba(20, 30, 50, 0.8), rgba(10, 15, 25, 0.7));
  padding: 32px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
}

.input-card h2,
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

.mode-tabs {
  display: flex;
  gap: 0;
  margin-bottom: 24px;
  border-radius: 8px;
  overflow: hidden;
  background: rgba(15, 25, 40, 0.5);
}

.tab-button {
  flex: 1;
  padding: 12px 20px;
  border: none;
  background: rgba(15, 25, 40, 0.8);
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.tab-button.active {
  background: rgba(59, 130, 246, 0.8);
  color: #fff;
  font-weight: 600;
}

.tab-button:hover:not(.active) {
  background: rgba(15, 25, 40, 0.9);
  color: rgba(255, 255, 255, 0.8);
}

.calculate-button {
  width: 100%;
  padding: 16px;
  margin-top: 24px;
  background: rgba(59, 130, 246, 0.9);
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.calculate-button:hover {
  background: rgba(59, 130, 246, 1);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
}

.success-banner {
  background: rgba(34, 197, 94, 0.2);
  border: 1px solid rgba(34, 197, 94, 0.4);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 24px;
  text-align: center;
}

.success-banner p {
  color: #4ade80;
  font-weight: 600;
  margin: 0;
}

.analysis-description {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin-bottom: 24px;
}

.enhanced-odds {
  margin-bottom: 32px;
  padding: 20px;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 16px;
}

.enhanced-odds h3 {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 12px;
}

.odds-display {
  display: flex;
  align-items: baseline;
  gap: 16px;
}

.odds-value {
  font-size: 32px;
  font-weight: 700;
  color: #60a5fa;
}

.luck-efficiency {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
}

.confidence-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.confidence-item {
  padding: 20px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
}

.confidence-item h4 {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 12px;
}

.confidence-value {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.confidence-value div {
  font-size: 18px;
  font-weight: 600;
  color: #fff;
}

.disclaimer {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.number-input {
  width: 100%;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid rgba(59, 130, 246, 0.3);
  background: rgba(15, 25, 40, 0.8);
  color: #fff;
  font-size: 14px;
  transition: border-color 0.3s;
}

.number-input:focus {
  outline: none;
  border-color: rgba(59, 130, 246, 0.6);
}

.custom-select-wrapper {
  position: relative;
  width: 100%;
}

.custom-select {
  width: 100%;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid rgba(59, 130, 246, 0.3);
  background: rgba(15, 25, 40, 0.8);
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: border-color 0.3s;
}

.custom-select:hover {
  border-color: rgba(59, 130, 246, 0.5);
}

.custom-select.open {
  border-color: rgba(59, 130, 246, 0.6);
}

.select-display {
  flex: 1;
  color: rgba(255, 255, 255, 0.9);
}

.select-arrow {
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
  transition: transform 0.3s;
}

.custom-select.open .select-arrow {
  transform: rotate(180deg);
}

.select-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  max-height: 400px;
  overflow-y: auto;
  background: rgba(15, 25, 40, 0.98);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 12px;
  z-index: 100;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
}

.select-group {
  margin-bottom: 8px;
}

.group-header {
  padding: 12px 16px;
  font-weight: 600;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: sticky;
  top: 0;
  background: rgba(15, 25, 40, 0.98);
  z-index: 10;
}

.group-header.location-orange {
  color: #fb923c;
}

.group-header.location-blue {
  color: #60a5fa;
}

.group-header.location-green {
  color: #4ade80;
}

.group-header.location-pink {
  color: #f472b6;
}

.group-header.location-purple {
  color: #a78bfa;
}

.group-header.location-yellow {
  color: #fbbf24;
}

.group-header.location-red {
  color: #f87171;
}

.select-option {
  padding: 10px 16px 10px 32px;
  color: rgba(255, 255, 255, 0.9);
  cursor: pointer;
  transition: background 0.2s;
  font-size: 14px;
}

.select-option:hover {
  background: rgba(59, 130, 246, 0.15);
}

.select-option.selected {
  background: rgba(59, 130, 246, 0.25);
  color: #60a5fa;
  font-weight: 500;
}

.select-dropdown::-webkit-scrollbar {
  width: 8px;
}

.select-dropdown::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}

.select-dropdown::-webkit-scrollbar-thumb {
  background: rgba(59, 130, 246, 0.5);
  border-radius: 4px;
}

.select-dropdown::-webkit-scrollbar-thumb:hover {
  background: rgba(59, 130, 246, 0.7);
}

.input-hint {
  display: block;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 4px;
}

.info-section {
  margin-top: 60px;
}

.info-section h2 {
  font-size: 36px;
  margin-bottom: 32px;
  color: #fff;
  text-align: center;
  background: linear-gradient(135deg, #e3f2ff, #93c5fd);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.info-card {
  padding: 24px;
  border-radius: 18px;
  border: 1px solid rgba(59, 130, 246, 0.25);
  background: linear-gradient(160deg, rgba(20, 30, 50, 0.6), rgba(10, 15, 25, 0.5));
}

.info-card h3 {
  font-size: 20px;
  color: #fff;
  margin-bottom: 12px;
}

.info-card p {
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.7;
  margin-bottom: 8px;
  font-size: 14px;
}

@media (max-width: 1024px) {
  .calculator-grid {
    grid-template-columns: 1fr;
  }

  .confidence-section {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .page-hero h1 {
    font-size: 36px;
  }

  .mode-tabs {
    flex-direction: column;
  }

  .tab-button {
    border-radius: 0;
  }

  .confidence-section {
    grid-template-columns: 1fr;
  }
}
</style>

