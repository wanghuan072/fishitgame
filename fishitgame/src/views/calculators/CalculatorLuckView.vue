<template>
  <section class="calculator-page">
    <div class="container">
      <header class="page-hero">
        <div>
          <p class="hero-eyebrow">Tools · Calculator</p>
          <h1>Fish It Luck Calculator</h1>
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
                  <strong>How it works:</strong> Your total luck percentage directly increases your catch rates. For
                  example, 1000% luck means a 10x multiplier on base catch rates.
                </p>
                <p>
                  <strong>Tip:</strong> Higher luck significantly improves your chances of catching rare and secret fish.
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
  padding: 32px;
  background: rgba(59, 130, 246, 0.1);
  border: 2px solid rgba(59, 130, 246, 0.3);
  border-radius: 16px;
  margin-bottom: 24px;
}

.luck-value {
  font-size: 48px;
  font-weight: 700;
  color: #60a5fa;
  margin-bottom: 8px;
}

.luck-multiplier {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.7);
}

.luck-breakdown {
  margin-bottom: 24px;
  padding: 20px;
  background: rgba(15, 25, 40, 0.5);
  border-radius: 12px;
}

.luck-breakdown h3 {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 16px;
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
  padding: 20px;
  background: rgba(59, 130, 246, 0.05);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 12px;
}

.luck-info p {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.7;
  margin: 0 0 12px;
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
  padding: 60px 20px;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
}

.empty-state p {
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.6;
}

@media (max-width: 968px) {
  .calculator-grid {
    grid-template-columns: 1fr;
  }

  .page-hero h1 {
    font-size: 36px;
  }

  .luck-value {
    font-size: 36px;
  }
}
</style>
