<template>
  <section class="calculator-page">
    <div class="container">
      <header class="page-hero">
        <div>
          <p class="hero-eyebrow">Tools · Calculator</p>
          <h1>Fish It Value Calculator</h1>
          <p>
            Calculate the total value of your fish catches. Add multiple fish species with quantities and prices to
            determine your total earnings potential.
          </p>
        </div>
      </header>

      <div class="calculator-grid">
        <!-- Input Section -->
        <div class="input-section">
          <div class="input-card">
            <h2>Fish Inventory</h2>

            <div class="fish-list">
              <div
                v-for="(item, index) in fishItems"
                :key="item.id"
                class="fish-item"
              >
                <div class="fish-item-header">
                  <label class="item-label">Fish {{ index + 1 }}:</label>
                  <button class="remove-button" @click="removeFishItem(index)" type="button">×</button>
                </div>
                <div class="fish-item-content">
                  <div class="form-group-inline">
                    <label>Species:</label>
                    <div class="custom-select-wrapper">
                      <div class="custom-select" :class="{ open: item.isSelectOpen }" @click="toggleFishSelect(index)">
                        <span class="select-display">
                          {{ item.fish ? item.fish.title : '-- Select fish --' }}
                        </span>
                        <span class="select-arrow">▼</span>
                      </div>
                      <div v-if="item.isSelectOpen" class="select-dropdown">
                        <div
                          v-for="(fishes, category) in groupedFish"
                          :key="category"
                          class="select-group"
                        >
                          <div class="group-header" :class="`category-${category}`">
                            {{ formatCategory(category) }}
                          </div>
                          <div
                            v-for="fish in fishes"
                            :key="fish.id"
                            class="select-option"
                            :class="{ selected: item.fish?.id === fish.id }"
                            @click="selectFish(index, fish)"
                          >
                            {{ fish.title }}
                            <span class="option-meta">{{ fish.stats?.Rarity || '' }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-group-inline">
                    <label>Quantity:</label>
                    <input
                      v-model.number="item.quantity"
                      type="number"
                      min="1"
                      step="1"
                      placeholder="1"
                      class="number-input-small"
                    />
                  </div>
                  <div class="form-group-inline">
                    <label>Value per Fish:</label>
                    <div class="value-input-group">
                      <input
                        v-model.number="item.value"
                        type="number"
                        min="0"
                        step="1"
                        placeholder="0"
                        class="number-input-small"
                      />
                      <span class="currency-symbol">Coins</span>
                    </div>
                  </div>
                  <div class="item-total">
                    <span class="item-total-label">Subtotal:</span>
                    <span class="item-total-value">{{ formatCoins(calculateSubtotal(item)) }}</span>
                  </div>
                </div>
              </div>
            </div>

            <button class="add-button" @click="addFishItem" type="button">+ Add Fish</button>

            <button class="calculate-button" @click="calculateValue">Calculate Total Value</button>
          </div>
        </div>

        <!-- Results Section -->
        <div class="results-section">
          <div class="results-card">
            <h2>Total Value</h2>

            <div v-if="showResults" class="value-results">
              <div class="total-value-display">
                <div class="value-label">Total Value</div>
                <div class="value-amount">{{ formatCoins(totalValue) }}</div>
                <div class="value-summary">
                  {{ totalQuantity }} fish · {{ fishItems.length }} species
                </div>
              </div>

              <div class="value-breakdown">
                <h3>Value Breakdown</h3>
                <div
                  v-for="(item, index) in fishItems"
                  :key="item.id"
                  class="breakdown-item"
                  v-show="item.quantity > 0 && item.value > 0"
                >
                  <div class="breakdown-fish">
                    <span class="breakdown-name">{{ item.fish?.title || `Fish ${index + 1}` }}</span>
                    <span class="breakdown-quantity">× {{ item.quantity }}</span>
                  </div>
                  <div class="breakdown-value-group">
                    <span class="breakdown-unit">{{ formatCoins(item.value) }} each</span>
                    <span class="breakdown-total">{{ formatCoins(calculateSubtotal(item)) }}</span>
                  </div>
                </div>
                <div class="breakdown-total-line">
                  <span class="breakdown-label">Grand Total:</span>
                  <span class="breakdown-value">{{ formatCoins(totalValue) }}</span>
                </div>
              </div>

              <div class="value-info">
                <p>
                  <strong>How to use:</strong> Select fish species from your inventory, enter the quantity you have,
                  and input the market value per fish. The calculator will automatically compute the total value.
                </p>
                <p>
                  <strong>Tip:</strong> Fish values can vary based on rarity, demand, and market conditions. Update
                  values regularly for accurate calculations.
                </p>
              </div>
            </div>

            <div v-else class="empty-state">
              <div class="empty-icon">💰</div>
              <p>Add fish to your inventory and click "Calculate Total Value" to see your total earnings.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import fishData from '@/data/wiki/fish.js'

const fishItems = ref([])
const showResults = ref(false)
let fishItemIdCounter = 0

// Group fish by category
const groupedFish = computed(() => {
  const grouped = {}
  fishData.forEach((fish) => {
    const category = fish.category || 'other'
    if (!grouped[category]) {
      grouped[category] = []
    }
    grouped[category].push(fish)
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
  }
  return categoryMap[category] || category.charAt(0).toUpperCase() + category.slice(1)
}

// Toggle fish select
const toggleFishSelect = (index) => {
  // Close all other selects
  fishItems.value.forEach((item, i) => {
    if (i !== index) {
      item.isSelectOpen = false
    }
  })
  fishItems.value[index].isSelectOpen = !fishItems.value[index].isSelectOpen
}

// Select fish
const selectFish = (index, fish) => {
  fishItems.value[index].fish = fish
  fishItems.value[index].isSelectOpen = false
}

// Add fish item
const addFishItem = () => {
  fishItems.value.push({
    id: fishItemIdCounter++,
    fish: null,
    quantity: 1,
    value: 0,
    isSelectOpen: false,
  })
}

// Remove fish item
const removeFishItem = (index) => {
  fishItems.value.splice(index, 1)
}

// Calculate subtotal for each item
const calculateSubtotal = (item) => {
  const quantity = item.quantity || 0
  const value = item.value || 0
  return quantity * value
}

// Total value
const totalValue = computed(() => {
  return fishItems.value.reduce((sum, item) => {
    return sum + calculateSubtotal(item)
  }, 0)
})

// Total quantity
const totalQuantity = computed(() => {
  return fishItems.value.reduce((sum, item) => {
    return sum + (item.quantity || 0)
  }, 0)
})

// Format coins
const formatCoins = (amount) => {
  if (amount === 0) return '0 Coins'
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(2)}M Coins`
  }
  if (amount >= 1000) {
    return `${(amount / 1000).toFixed(2)}K Coins`
  }
  return `${amount.toLocaleString()} Coins`
}

// Calculate button handler
const calculateValue = () => {
  showResults.value = true
  // Scroll to results if needed
  const resultsCard = document.querySelector('.results-card')
  if (resultsCard) {
    resultsCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }
}

// Close dropdowns when clicking outside
onMounted(() => {
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.custom-select-wrapper')) {
      fishItems.value.forEach((item) => {
        item.isSelectOpen = false
      })
    }
  })
  
  // Add initial fish item
  addFishItem()
})
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

.fish-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 16px;
}

.fish-item {
  padding: 20px;
  background: rgba(15, 25, 40, 0.5);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 16px;
  transition: all 0.3s;
}

.fish-item:hover {
  border-color: rgba(59, 130, 246, 0.4);
  background: rgba(15, 25, 40, 0.7);
}

.fish-item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.item-label {
  font-size: 14px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
}

.remove-button {
  width: 28px;
  height: 28px;
  padding: 0;
  border: none;
  border-radius: 8px;
  background: rgba(239, 68, 68, 0.2);
  color: #f87171;
  font-size: 18px;
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

.fish-item-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.form-group-inline {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group-inline label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
}

.custom-select-wrapper {
  position: relative;
  width: 100%;
}

.custom-select {
  width: 100%;
  padding: 10px 14px;
  border-radius: 10px;
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

.select-option {
  padding: 12px 16px;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.option-meta {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  font-weight: normal;
}

.number-input-small {
  width: 100%;
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid rgba(59, 130, 246, 0.3);
  background: rgba(15, 25, 40, 0.8);
  color: #fff;
  font-size: 14px;
  transition: border-color 0.3s;
}

.number-input-small:focus {
  outline: none;
  border-color: rgba(59, 130, 246, 0.6);
}

.value-input-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.value-input-group .number-input-small {
  flex: 1;
}

.currency-symbol {
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  font-weight: 500;
  min-width: 50px;
}

.item-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  margin-top: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.item-total-label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
}

.item-total-value {
  font-size: 16px;
  color: #fbbf24;
  font-weight: 600;
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
  margin-bottom: 24px;
}

.add-button:hover {
  border-color: rgba(59, 130, 246, 0.6);
  background: rgba(59, 130, 246, 0.1);
  color: #60a5fa;
}

.calculate-button {
  width: 100%;
  padding: 16px;
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

.total-value-display {
  text-align: center;
  padding: 32px;
  background: rgba(251, 191, 36, 0.1);
  border: 2px solid rgba(251, 191, 36, 0.3);
  border-radius: 16px;
  margin-bottom: 24px;
}

.value-label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 8px;
}

.value-amount {
  font-size: 48px;
  font-weight: 700;
  color: #fbbf24;
  margin-bottom: 8px;
}

.value-summary {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
}

.value-breakdown {
  margin-bottom: 24px;
  padding: 20px;
  background: rgba(15, 25, 40, 0.5);
  border-radius: 12px;
}

.value-breakdown h3 {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 16px;
}

.breakdown-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.breakdown-item:last-of-type {
  border-bottom: none;
}

.breakdown-fish {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.breakdown-name {
  color: rgba(255, 255, 255, 0.9);
  font-size: 15px;
  font-weight: 500;
}

.breakdown-quantity {
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
}

.breakdown-value-group {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

.breakdown-unit {
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
}

.breakdown-total {
  color: #fbbf24;
  font-weight: 600;
  font-size: 15px;
}

.breakdown-total-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0 0;
  margin-top: 12px;
  border-top: 2px solid rgba(251, 191, 36, 0.3);
  font-weight: 600;
}

.breakdown-total-line .breakdown-label {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
}

.breakdown-total-line .breakdown-value {
  font-size: 20px;
  color: #fbbf24;
}

.value-info {
  padding: 20px;
  background: rgba(59, 130, 246, 0.05);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 12px;
}

.value-info p {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.7;
  margin: 0 0 12px;
  font-size: 14px;
}

.value-info p:last-child {
  margin-bottom: 0;
}

.value-info strong {
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

  .value-amount {
    font-size: 36px;
  }
}
</style>
