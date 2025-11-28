<template>
  <section class="page-container-large">
    <div class="container">
      <header class="page-hero">
        <div>
          <p class="hero-eyebrow">Tools · Calculator</p>
          <h1 class="page-title-large">Fish It Catch RNG Calculator</h1>
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
        <div class="results-section">
          <div class="results-card">
            <h2>Catch Probability Analysis</h2>
            <div v-if="showResults && baseDropRate > 0 && castingRate > 0" class="value-results">
              <div class="success-banner">
                <p>Analysis complete! Check out the results below.</p>
              </div>

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

            <div v-else class="empty-state">
              <div class="empty-icon">📊</div>
              <p v-if="!showResults">Enter your fish selection and settings, then click "Calculate Catch Odds" to see the analysis.</p>
              <p v-else>Please enter valid fish selection and casting rate to calculate catch probability.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Why Use This Calculator Section -->
      <div class="intro-section">
        <div class="intro-content">
          <h2 class="section-title">Why Use the RNG Calculator?</h2>
          <p class="intro-description">
            The Fish It Catch RNG Calculator gives you a clear picture of the grind ahead. Review probability ranges,
            compare setups, and understand how much time each Secret fish will realistically take before you commit to
            your next fishing session.
          </p>
          <div class="intro-grid">
            <div class="intro-card">
              <div class="intro-icon">🎯</div>
              <h3>Plan Your Fishing Strategy</h3>
              <p>Know exactly how many attempts and hours you'll need to catch rare Secret fish. Plan your fishing sessions efficiently and set realistic goals.</p>
            </div>
            <div class="intro-card">
              <div class="intro-icon">⚡</div>
              <h3>Optimize Your Setup</h3>
              <p>Compare different Rod, Bobber, and Utility combinations to find the most efficient setup for your target fish. Maximize your luck multiplier. Not sure what your total luck is? Use our <router-link to="/calculator/fish-it-luck-calculator" class="inline-link">Luck Calculator</router-link> to find out first.</p>
            </div>
            <div class="intro-card">
              <div class="intro-icon">📊</div>
              <h3>Statistical Accuracy</h3>
              <p>Get precise probability estimates with confidence intervals (50%, 90%, 99%). Understand your actual chances based on statistical models.</p>
            </div>
            <div class="intro-card">
              <div class="intro-icon">⏱️</div>
              <h3>Time Management</h3>
              <p>Calculate the real-world time investment needed. See how many days and hours you'll spend fishing for ultra-rare catches like Megalodon or Worm Fish.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- FAQ Section -->
      <div class="faq-section">
        <h2 class="section-title">Common Questions</h2>
        <div class="faq-grid">
          <div class="faq-item">
            <h3>How does this RNG calculator work?</h3>
            <p>This Fish It Catch RNG Calculator takes your equipment stats and target fish odds, then calculates how many attempts you'll likely need. It factors in your total luck (from rod, bobber, utility, and island buffs) to give you realistic time estimates. Perfect for planning those long grinds for Secret fish!</p>
          </div>
          <div class="faq-item">
            <h3>Are the results accurate?</h3>
            <p>The calculator uses statistical models based on how Fish It! actually works. You'll see three confidence levels - 50%, 90%, and 99% - which tell you the odds at different probability points. Keep in mind RNG is still random, but these numbers give you a solid estimate based on math, not guesswork.</p>
          </div>
          <div class="faq-item">
            <h3>What's the luck multiplier?</h3>
            <p>Your luck multiplier is the total percentage bonus from all your gear combined. Add up your Rod Luck, Bobber Luck, Utility Luck, and any Island Buff you have. Enter that total percentage here. For example, if you have 1000% total luck, that's a 10x multiplier - pretty powerful for catching those rare Secret fish!</p>
          </div>
          <div class="faq-item">
            <h3>Which fish can I calculate?</h3>
            <p>The Fish It Catch RNG Calculator covers 28 Secret fish from different locations like Ocean, Ancient Jungle, and Lost Isle. You can pick from the dropdown or manually enter odds for fish not in the list. It's designed for those ultra-rare catches with odds like 1/3M or 1/4M. Want to explore all Secret fish first? Check out our <router-link to="/calculator/fish-it-secret-calculator" class="inline-link">Secret Fish Calculator</router-link> to browse the complete database.</p>
          </div>
          <div class="faq-item">
            <h3>What do the confidence intervals mean?</h3>
            <p>Think of them as your "chance of success" levels. 50% confidence means you have a coin-flip chance of catching it by that time. 90% means you're very likely to have caught it. 99% is almost guaranteed. Most players aim for the 90% mark to feel confident they'll get their target fish.</p>
          </div>
          <div class="faq-item">
            <h3>Should I upgrade my gear first?</h3>
            <p>That's exactly what this calculator helps you decide! Try different luck values to see how much time you'd save with better gear. Sometimes upgrading your rod or bobber can cut hours or even days off your grind. The Fish It Catch RNG Calculator makes it easy to compare setups before spending coins.</p>
          </div>
          <div class="faq-item">
            <h3>Can I use this for event fish?</h3>
            <p>Yes! Some Secret fish like Megalodon only appear during Admin Abuse events. Use the manual input mode to enter their odds, then calculate if you can realistically catch them during the event window. This helps you decide if it's worth grinding or if you should wait for better gear first.</p>
          </div>
          <div class="faq-item">
            <h3>Why are my results different from others?</h3>
            <p>Everyone's setup is different! Your luck multiplier, casting speed, and target fish all affect the results. The Fish It Catch RNG Calculator personalizes estimates based on your specific stats. Two players going for the same fish might get very different time estimates depending on their gear.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

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
  showResults.value = false
}

const calculateResults = () => {
  if (baseDropRate.value > 0 && castingRate.value > 0) {
    showResults.value = true
    // Scroll to results if needed
    const resultsCard = document.querySelector('.results-card')
    if (resultsCard) {
      resultsCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }
}

// Reset results when inputs change
watch([selectedFish, manualCatchRate, luckMultiplier, castingRate, inputMode], () => {
  if (showResults.value) {
    showResults.value = false
  }
})

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
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 60px;
}

.input-card,
.results-card {
  border-radius: 20px;
  border: 1px solid rgba(59, 130, 246, 0.25);
  background: linear-gradient(160deg, rgba(20, 30, 50, 0.8), rgba(10, 15, 25, 0.7));
  padding: 20px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
}

.input-card h2,
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
  padding: 15px;
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
  padding: 10px;
  margin-bottom: 15px;
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
  margin-bottom: 15px;
}

.enhanced-odds {
  margin-bottom: 20px;
  padding: 10px;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 16px;
}

.enhanced-odds h3 {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 5px;
}

.odds-display {
  display: flex;
  align-items: baseline;
  gap: 16px;
}

.odds-value {
  font-size: 26px;
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
  margin-bottom: 20px;
}

.confidence-item {
  padding: 10px;
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
  font-size: 14px;
  font-weight: 600;
  color: #fff;
}

.disclaimer {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.value-results {
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
  .calculator-grid {
    grid-template-columns: 1fr;
  }

  .confidence-section {
    grid-template-columns: 1fr;
  }

  .intro-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .faq-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .page-hero {
    padding: 20px;
    margin-bottom: 20px;
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
    gap: 10px;
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

  .calculator-grid {
    gap: 16px;
  }

  .input-card,
  .results-card {
    padding: 16px;
  }

  .input-card h2,
  .results-card h2 {
    font-size: 20px;
    margin-bottom: 12px;
  }

  .form-group {
    margin-bottom: 16px;
  }

  .form-group label {
    font-size: 12px;
    margin-bottom: 6px;
  }

  .number-input,
  .custom-select {
    padding: 10px 12px;
    font-size: 12px;
  }

  .calculate-button {
    padding: 12px;
    font-size: 14px;
  }

  .mode-tabs {
    flex-direction: column;
  }

  .confidence-section {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .confidence-item {
    padding: 10px;
  }

  .confidence-value div {
    font-size: 12px;
  }

  .empty-state {
    padding: 40px 15px;
  }

  .empty-icon {
    font-size: 48px;
    margin-bottom: 20px;
  }

  .analysis-description {
    font-size: 12px;
  }

  .odds-value {
    font-size: 20px;
  }

  .luck-efficiency {
    font-size: 12px;
  }

  .disclaimer {
    font-size: 11px;
  }

  .mode-tabs {
    flex-direction: column;
  }
}
</style>

