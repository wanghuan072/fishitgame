<template>
  <section class="page-container-large">
    <div class="container">
      <header class="page-hero">
        <div>
          <p class="hero-eyebrow">Tools · Calculator</p>
          <h1 class="page-title-large">Fish It Luck Calculator</h1>
          <p>
            Calculate your total luck percentage and optimize your gear setup for maximum catch rates. Select your Rod,
            Bobber, and add any additional luck bonuses from potions or utility items.
          </p>
        </div>
      </header>

      <div class="calculator-grid">
        <!-- Input Section -->
        <div class="input-section">
          <div class="input-card">
            <h2>Equipment Setup</h2>

            <div class="form-group">
              <label for="rod-select">Fishing Rod:</label>
              <div class="custom-select-wrapper">
                <div class="custom-select" :class="{ open: isRodSelectOpen }" @click="toggleRodSelect">
                  <span class="select-display">
                    {{ selectedRod ? `${selectedRod.title} (${selectedRod.stats.Luck})` : '-- Select a rod --' }}
                  </span>
                  <span class="select-arrow">▼</span>
                </div>
                <div v-if="isRodSelectOpen" class="select-dropdown">
                  <div
                    v-for="(rods, category) in groupedRods"
                    :key="category"
                    class="select-group"
                  >
                    <div class="group-header" :class="`category-${category}`">
                      {{ formatCategory(category) }}
                    </div>
                    <div
                      v-for="rod in rods"
                      :key="rod.id"
                      class="select-option"
                      :class="{ selected: selectedRod?.id === rod.id }"
                      @click="selectRod(rod)"
                    >
                      {{ rod.title }} ({{ rod.stats.Luck }})
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label for="bobber-select">Bobber / Bait:</label>
              <div class="custom-select-wrapper">
                <div class="custom-select" :class="{ open: isBobberSelectOpen }" @click="toggleBobberSelect">
                  <span class="select-display">
                    {{ selectedBobber ? `${selectedBobber.title} (${getBobberLuck(selectedBobber)})` : '-- Select a bobber --' }}
                  </span>
                  <span class="select-arrow">▼</span>
                </div>
                <div v-if="isBobberSelectOpen" class="select-dropdown">
                  <div
                    v-for="(bobbers, category) in groupedBobbers"
                    :key="category"
                    class="select-group"
                  >
                    <div class="group-header" :class="`category-${category}`">
                      {{ formatCategory(category) }}
                    </div>
                    <div
                      v-for="bobber in bobbers"
                      :key="bobber.id"
                      class="select-option"
                      :class="{ selected: selectedBobber?.id === bobber.id }"
                      @click="selectBobber(bobber)"
                    >
                      {{ bobber.title }} ({{ getBobberLuck(bobber) }})
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label>Additional Luck Sources:</label>
              <div class="additional-luck-list">
                <div
                  v-for="(item, index) in additionalLuckSources"
                  :key="item.id"
                  class="additional-luck-item"
                >
                  <div class="custom-select-wrapper-small">
                    <div class="custom-select-small" :class="{ open: item.isSelectOpen }" @click="toggleSourceSelect(index)">
                      <span class="select-display-small">
                        {{ item.source || '-- Select source --' }}
                      </span>
                      <span class="select-arrow-small">▼</span>
                    </div>
                    <div v-if="item.isSelectOpen" class="select-dropdown-small">
                      <div
                        v-for="source in luckSourceOptions"
                        :key="source"
                        class="select-option-small"
                        :class="{ selected: item.source === source }"
                        @click="selectSource(index, source)"
                      >
                        {{ source }}
                      </div>
                    </div>
                  </div>
                  <input
                    v-model.number="item.value"
                    type="number"
                    min="0"
                    step="1"
                    placeholder="0"
                    class="value-input"
                  />
                  <span class="percent-symbol">%</span>
                  <button class="remove-button" @click="removeAdditionalLuck(index)" type="button">
                    ×
                  </button>
                </div>
              </div>
              <button class="add-button" @click="addAdditionalLuck" type="button">
                + Add Source
              </button>
              <span class="input-hint">Select luck source type and enter the luck percentage value</span>
            </div>

            <button class="calculate-button" @click="calculateLuck">Calculate Total Luck</button>
          </div>
        </div>

        <!-- Results Section -->
        <div class="results-section">
          <div class="results-card">
            <h2>Total Luck</h2>

            <div v-if="showResults" class="luck-results">
              <div class="total-luck-display">
                <div class="luck-value">{{ formatLuck(totalLuck) }}</div>
                <div class="luck-multiplier">= {{ formatMultiplier(luckMultiplier) }}x Multiplier</div>
              </div>

              <div class="luck-breakdown">
                <h3>Luck Breakdown</h3>
                <div class="breakdown-item">
                  <span class="breakdown-label">Rod:</span>
                  <span class="breakdown-value">{{ formatLuck(rodLuck) }}</span>
                </div>
                <div class="breakdown-item">
                  <span class="breakdown-label">Bobber:</span>
                  <span class="breakdown-value">{{ formatLuck(bobberLuck) }}</span>
                </div>
                <div
                  v-for="(item, index) in additionalLuckSources"
                  :key="item.id"
                  class="breakdown-item"
                >
                  <span class="breakdown-label">{{ item.source || `Source ${index + 1}` }}:</span>
                  <span class="breakdown-value">{{ formatLuck(item.value || 0) }}</span>
                </div>
                <div v-if="totalAdditionalLuck > 0" class="breakdown-item breakdown-subtotal">
                  <span class="breakdown-label">Additional Total:</span>
                  <span class="breakdown-value">{{ formatLuck(totalAdditionalLuck) }}</span>
                </div>
                <div class="breakdown-total">
                  <span class="breakdown-label">Total:</span>
                  <span class="breakdown-value">{{ formatLuck(totalLuck) }}</span>
                </div>
              </div>

              <div class="luck-info">
                <p>
                  How it works: Your total luck percentage directly increases your catch rates. For
                  example, 1000% luck means a 10x multiplier on base catch rates.
                </p>
                <p>
                  Tip: Higher luck significantly improves your chances of catching rare and secret fish.
                  Combine the best rod and bobber with luck potions for maximum effectiveness.
                </p>
              </div>
            </div>

            <div v-else class="empty-state">
              <div class="empty-icon">🍀</div>
              <p>Select your equipment and click "Calculate Total Luck" to see your luck stats.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Why Use This Calculator Section -->
      <div class="intro-section">
        <div class="intro-content">
          <h2 class="section-title">Why Use the Luck Calculator?</h2>
          <div class="intro-grid">
            <div class="intro-card">
              <div class="intro-icon">🎯</div>
              <h3>Maximize Your Catch Rates</h3>
              <p>Understanding your total luck percentage is crucial for catching rare fish. The Fish It Luck Calculator shows you exactly how much luck you have from all sources, helping you optimize your gear setup for better results.</p>
            </div>
            <div class="intro-card">
              <div class="intro-icon">⚡</div>
              <h3>Compare Equipment Options</h3>
              <p>Test different rod and bobber combinations to see which gives you the highest luck multiplier. The calculator breaks down each source so you can make informed decisions before spending coins on upgrades. Once you know your total luck, use the <router-link to="/calculator/fish-it-rng-calculator" class="inline-link">RNG Calculator</router-link> to see how it affects your catch odds for Secret fish.</p>
            </div>
            <div class="intro-card">
              <div class="intro-icon">📊</div>
              <h3>Track All Luck Sources</h3>
              <p>Your luck comes from multiple sources: rods, bobbers, potions, weather, and events. The Fish It Luck Calculator helps you account for everything, including temporary bonuses like Friend Luck and Weather Luck.</p>
            </div>
            <div class="intro-card">
              <div class="intro-icon">⏱️</div>
              <h3>Plan Your Strategy</h3>
              <p>See how much your luck multiplier affects your catch rates. Higher luck means better odds for Secret fish, so knowing your total helps you decide if it's worth grinding now or waiting for better gear.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- FAQ Section -->
      <div class="faq-section">
        <h2 class="section-title">Common Questions</h2>
        <div class="faq-grid">
          <div class="faq-item">
            <h3>How does the luck calculator work?</h3>
            <p>The Fish It Luck Calculator adds up all your luck sources - your rod's luck stat, bobber luck, and any additional bonuses from potions, weather, or events. It then shows your total luck percentage and converts it to a multiplier. For example, 1000% luck equals a 10x multiplier on base catch rates. Need help finding the best fishing spots? Visit our <router-link to="/" class="inline-link">homepage</router-link> for guides and wiki resources.</p>
          </div>
          <div class="faq-item">
            <h3>What counts as additional luck?</h3>
            <p>Additional luck includes Friend Luck (from playing with friends), Weather Luck (from weather effects), Potion Luck (from luck potions), and Event Luck (from special events). These are temporary bonuses that stack with your permanent gear luck. The calculator lets you add multiple sources to get your complete luck total.</p>
          </div>
          <div class="faq-item">
            <h3>How do I find my rod and bobber luck?</h3>
            <p>Your rod's luck stat is shown in the rod's stats. For bobbers, look for the "Luck:" stat in the bobber's description. The Fish It Luck Calculator includes all rods and bobbers in the game, so you can select them from the dropdown menus to automatically get their luck values.</p>
          </div>
          <div class="faq-item">
            <h3>Does higher luck really make a difference?</h3>
            <p>Absolutely! Luck is one of the most important stats for catching rare and Secret fish. A 10x multiplier (1000% luck) means you're 10 times more likely to catch rare fish compared to base rates. The difference between 500% and 1000% luck can mean hours or even days saved when grinding for ultra-rare catches.</p>
          </div>
          <div class="faq-item">
            <h3>Should I prioritize luck over other stats?</h3>
            <p>It depends on your goals. For catching Secret fish with very low base rates, luck is crucial. However, speed and weight stats also matter for efficiency. The Fish It Luck Calculator helps you see your luck total so you can balance it with other important stats when choosing gear.</p>
          </div>
          <div class="faq-item">
            <h3>Can I use this to compare different setups?</h3>
            <p>Yes! That's one of the best uses for this calculator. Try selecting different rod and bobber combinations to see which gives you the highest total luck. You can also add temporary luck sources to see how much potions or weather effects boost your overall multiplier.</p>
          </div>
          <div class="faq-item">
            <h3>What's the maximum luck I can get?</h3>
            <p>There's no hard cap, but the best gear combinations typically give you 1000-2000% luck or more. With additional sources like potions and weather, you can push even higher. The Fish It Luck Calculator shows you exactly where you stand and how much room you have to improve.</p>
          </div>
          <div class="faq-item">
            <h3>How often should I recalculate my luck?</h3>
            <p>Recalculate whenever you change your gear or when temporary bonuses change. If you're using luck potions, add them each time you use one. Weather and event luck change frequently, so update those values as needed. The calculator makes it quick to see your current total.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import rodsData from '@/data/wiki/rods.js'
import bobbersData from '@/data/wiki/bobbers.js'

const selectedRod = ref(null)
const selectedBobber = ref(null)
const additionalLuckSources = ref([])
const isRodSelectOpen = ref(false)
const isBobberSelectOpen = ref(false)
const showResults = ref(false)
let additionalLuckIdCounter = 0

// Fixed luck source options
const luckSourceOptions = ['Friend Luck', 'Weather Luck', 'Potion Luck', 'Event Luck']

// Parse luck percentage from string (e.g., "50%" -> 50)
const parseLuck = (luckString) => {
  if (!luckString) return 0
  const match = luckString.toString().match(/(\d+(?:\.\d+)?)/)
  return match ? parseFloat(match[1]) : 0
}

// Get bobber luck from stats array
const getBobberLuck = (bobber) => {
  if (!bobber?.stats?.stats) return '0%'
  const luckStat = bobber.stats.stats.find((stat) => stat.startsWith('Luck:'))
  if (!luckStat) return '0%'
  return luckStat.replace('Luck:', '').trim()
}

// Group rods by category
const groupedRods = computed(() => {
  const grouped = {}
  rodsData.forEach((rod) => {
    const category = rod.category || 'other'
    if (!grouped[category]) {
      grouped[category] = []
    }
    grouped[category].push(rod)
  })
  return grouped
})

// Group bobbers by category
const groupedBobbers = computed(() => {
  const grouped = {}
  bobbersData.forEach((bobber) => {
    const category = bobber.category || 'other'
    if (!grouped[category]) {
      grouped[category] = []
    }
    grouped[category].push(bobber)
  })
  return grouped
})

// Format category name
const formatCategory = (category) => {
  const categoryMap = {
    common: 'Common',
    uncommon: 'Uncommon',
    rare: 'Rare',
    epic: 'Epic',
    legendary: 'Legendary',
    mythic: 'Mythic',
    secret: 'Secret',
    gamepass: 'Gamepass',
    purchasable: 'Purchasable',
    gift: 'Gift',
  }
  return categoryMap[category] || category.charAt(0).toUpperCase() + category.slice(1)
}

// Toggle select dropdowns
const toggleRodSelect = () => {
  isRodSelectOpen.value = !isRodSelectOpen.value
  if (isRodSelectOpen.value) {
    isBobberSelectOpen.value = false
  }
}

const toggleBobberSelect = () => {
  isBobberSelectOpen.value = !isBobberSelectOpen.value
  if (isBobberSelectOpen.value) {
    isRodSelectOpen.value = false
  }
}

// Select rod/bobber
const selectRod = (rod) => {
  selectedRod.value = rod
  isRodSelectOpen.value = false
}

const selectBobber = (bobber) => {
  selectedBobber.value = bobber
  isBobberSelectOpen.value = false
}

// Close dropdowns when clicking outside
onMounted(() => {
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.custom-select-wrapper')) {
      isRodSelectOpen.value = false
      isBobberSelectOpen.value = false
    }
    if (!e.target.closest('.custom-select-wrapper-small')) {
      additionalLuckSources.value.forEach((item) => {
        item.isSelectOpen = false
      })
    }
  })
})

// Calculate luck values
const rodLuck = computed(() => {
  if (!selectedRod.value) return 0
  return parseLuck(selectedRod.value.stats.Luck)
})

const bobberLuck = computed(() => {
  if (!selectedBobber.value) return 0
  return parseLuck(getBobberLuck(selectedBobber.value))
})

const totalAdditionalLuck = computed(() => {
  return additionalLuckSources.value.reduce((sum, item) => {
    return sum + (item.value || 0)
  }, 0)
})

const totalLuck = computed(() => {
  return rodLuck.value + bobberLuck.value + totalAdditionalLuck.value
})

const luckMultiplier = computed(() => {
  if (totalLuck.value <= 0) return 1
  // 1000% = 10x multiplier, so divide by 100 and add 1
  return 1 + totalLuck.value / 100
})

// Format luck percentage
const formatLuck = (luck) => {
  if (luck === 0) return '0%'
  return `${luck.toLocaleString()}%`
}

// Format multiplier
const formatMultiplier = (multiplier) => {
  return multiplier.toFixed(2)
}

// Toggle source select
const toggleSourceSelect = (index) => {
  // Close all other selects
  additionalLuckSources.value.forEach((item, i) => {
    if (i !== index) {
      item.isSelectOpen = false
    }
  })
  additionalLuckSources.value[index].isSelectOpen = !additionalLuckSources.value[index].isSelectOpen
}

// Select source
const selectSource = (index, source) => {
  additionalLuckSources.value[index].source = source
  additionalLuckSources.value[index].isSelectOpen = false
}

// Add additional luck source
const addAdditionalLuck = () => {
  additionalLuckSources.value.push({
    id: additionalLuckIdCounter++,
    source: '',
    value: 0,
    isSelectOpen: false,
  })
}

// Remove additional luck source
const removeAdditionalLuck = (index) => {
  additionalLuckSources.value.splice(index, 1)
}

// Calculate button handler
const calculateLuck = () => {
  showResults.value = true
  // Scroll to results if needed
  const resultsCard = document.querySelector('.results-card')
  if (resultsCard) {
    resultsCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }
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
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 8px;
  font-weight: 500;
}

.custom-select-wrapper {
  position: relative;
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
  background: rgba(15, 25, 40, 0.8);
}

.custom-select.open {
  border-color: rgba(59, 130, 246, 0.6);
}

.select-display {
  color: rgba(255, 255, 255, 0.9);
  font-size: 15px;
  flex: 1;
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

.group-header.category-common {
  color: #94a3b8;
}

.group-header.category-uncommon {
  color: #4ade80;
}

.group-header.category-rare {
  color: #60a5fa;
}

.group-header.category-epic {
  color: #a78bfa;
}

.group-header.category-legendary {
  color: #fbbf24;
}

.group-header.category-mythic {
  color: #f472b6;
}

.group-header.category-secret {
  color: #fb923c;
}

.group-header.category-gamepass {
  color: #fbbf24;
}

.group-header.category-purchasable {
  color: #60a5fa;
}

.group-header.category-gift {
  color: #4ade80;
}

.select-option {
  padding: 12px 16px;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
}

.select-option:hover {
  background: rgba(59, 130, 246, 0.2);
  color: #fff;
}

.select-option.selected {
  background: rgba(59, 130, 246, 0.3);
  color: #93c5fd;
  font-weight: 600;
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

.input-hint {
  display: block;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 6px;
}

.additional-luck-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 12px;
}

.additional-luck-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: rgba(15, 25, 40, 0.5);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 12px;
  transition: all 0.3s;
}

.additional-luck-item:hover {
  border-color: rgba(59, 130, 246, 0.4);
  background: rgba(15, 25, 40, 0.7);
}

.custom-select-wrapper-small {
  position: relative;
  flex: 1;
}

.custom-select-small {
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
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

.custom-select-small:hover {
  border-color: rgba(59, 130, 246, 0.5);
}

.custom-select-small.open {
  border-color: rgba(59, 130, 246, 0.6);
}

.select-display-small {
  flex: 1;
  color: rgba(255, 255, 255, 0.9);
}

.select-arrow-small {
  color: rgba(255, 255, 255, 0.6);
  font-size: 10px;
  transition: transform 0.3s;
}

.custom-select-small.open .select-arrow-small {
  transform: rotate(180deg);
}

.select-dropdown-small {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  max-height: 200px;
  overflow-y: auto;
  background: rgba(15, 25, 40, 0.98);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 8px;
  z-index: 100;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
}

.select-option-small {
  padding: 10px 12px;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
}

.select-option-small:hover {
  background: rgba(59, 130, 246, 0.2);
  color: #fff;
}

.select-option-small.selected {
  background: rgba(59, 130, 246, 0.3);
  color: #93c5fd;
  font-weight: 600;
}

.value-input {
  width: 100px;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid rgba(59, 130, 246, 0.2);
  background: rgba(15, 25, 40, 0.6);
  color: #fff;
  font-size: 14px;
  text-align: right;
  transition: border-color 0.3s;
}

.value-input:focus {
  outline: none;
  border-color: rgba(59, 130, 246, 0.5);
}

.percent-symbol {
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  font-weight: 500;
  min-width: 20px;
}

.remove-button {
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  border-radius: 8px;
  background: rgba(239, 68, 68, 0.2);
  color: #f87171;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  flex-shrink: 0;
}

.remove-button:hover {
  background: rgba(239, 68, 68, 0.3);
  color: #fca5a5;
  transform: scale(1.1);
}

.add-button {
  width: 100%;
  padding: 12px;
  border: 1px dashed rgba(59, 130, 246, 0.4);
  border-radius: 12px;
  background: rgba(59, 130, 246, 0.05);
  color: rgba(59, 130, 246, 0.9);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.add-button:hover {
  border-color: rgba(59, 130, 246, 0.6);
  background: rgba(59, 130, 246, 0.1);
  color: #60a5fa;
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

.luck-results {
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

.total-luck-display {
  text-align: center;
  padding: 20px;
  background: rgba(59, 130, 246, 0.1);
  border: 2px solid rgba(59, 130, 246, 0.3);
  border-radius: 16px;
  margin-bottom: 20px;
}

.luck-value {
  font-size: 42px;
  font-weight: 700;
  color: #60a5fa;
  margin-bottom: 8px;
}

.luck-multiplier {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.7);
}

.luck-breakdown {
  margin-bottom: 20px;
  padding: 15px;
  background: rgba(15, 25, 40, 0.5);
  border-radius: 12px;
}

.luck-breakdown h3 {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 12px;
}

.breakdown-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.breakdown-item:last-child {
  border-bottom: none;
}

.breakdown-total {
  display: flex;
  justify-content: space-between;
  padding: 16px 0 0;
  margin-top: 12px;
  border-top: 2px solid rgba(59, 130, 246, 0.3);
  font-weight: 600;
}

.breakdown-label {
  color: rgba(255, 255, 255, 0.7);
  font-size: 15px;
}

.breakdown-value {
  color: #60a5fa;
  font-weight: 600;
  font-size: 15px;
}

.breakdown-total .breakdown-label,
.breakdown-total .breakdown-value {
  font-size: 16px;
  color: #93c5fd;
}

.breakdown-subtotal {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 8px;
  padding-top: 12px;
}

.breakdown-subtotal .breakdown-label,
.breakdown-subtotal .breakdown-value {
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
}

.luck-info {
  padding: 15px;
  background: rgba(59, 130, 246, 0.05);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 12px;
}

.luck-info p {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin: 0 0 10px;
  font-size: 14px;
}

.luck-info p:last-child {
  margin-bottom: 0;
}

.luck-info strong {
  color: rgba(255, 255, 255, 0.9);
}

.empty-state {
  text-align: center;
  padding: 70px 20px;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 75px;
}

.empty-state p {
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.6;
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
  .calculator-grid {
    grid-template-columns: 1fr;
  }

  .intro-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .page-hero{
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

  .intro-grid {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .intro-card {
    padding: 10px;
    gap: 10px;
  }

  .intro-card h3 {
    font-size: 16px;
  }

  .intro-card p {
    font-size: 12px;
  }

  .faq-grid {
    gap: 10px;
  }

  .faq-item {
    padding: 10px;
    gap: 10px;
  }

  .faq-item h3 {
    font-size: 16px;
  }

  .faq-item p {
    font-size: 12px;
  }

  .luck-value {
    font-size: 36px;
  }

  .input-card,
  .results-card {
    padding: 15px;
  }

  .input-card h2,
  .results-card h2 {
    font-size: 20px;
    margin-bottom: 10px;
  }

  .form-group {
    margin-bottom: 15px;
  }

  .form-group label {
    font-size: 12px;
    margin-bottom: 6px;
  }

  .custom-select,
  .number-input {
    padding: 10px 12px;
    font-size: 12px;
  }

  .calculate-button {
    padding: 12px;
    font-size: 14px;
  }

  .total-luck-display {
    padding: 15px;
    margin-bottom: 15px;
  }

  .luck-breakdown {
    padding: 10px;
    margin-bottom: 15px;
  }

  .luck-breakdown h3 {
    font-size: 16px;
    margin-bottom: 10px;
  }

  .breakdown-item {
    padding: 8px 0;
  }

  .breakdown-label,
  .breakdown-value {
    font-size: 12px;
  }

  .luck-info {
    padding: 10px;
  }

  .luck-info p {
    font-size: 12px;
    margin-bottom: 8px;
  }

  .empty-state {
    padding: 40px 15px;
  }

  .empty-icon {
    font-size: 48px;
    margin-bottom: 20px;
  }

  .empty-state p {
    font-size: 12px;
  }
}
</style>
