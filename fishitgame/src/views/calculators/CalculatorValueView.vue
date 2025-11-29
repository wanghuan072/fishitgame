<template>
  <section class="page-container-large">
    <div class="container">
      <header class="page-hero">
        <div>
          <p class="hero-eyebrow">Tools · Calculator</p>
          <h1 class="page-title-large">Fish It Value Calculator</h1>
          <p>
            Calculate the total value of your fish based on base value and mutation multipliers. Add multiple fish species with base values and mutations to determine your total earnings potential.
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
                    <label>fish basic value:</label>
                    <div class="value-input-group">
                      <input
                        v-model.number="item.baseValue"
                        type="number"
                        min="0"
                        step="1"
                        placeholder="0"
                        class="number-input-small"
                      />
                      <span class="currency-symbol">Coins</span>
                    </div>
                  </div>
                  <div class="form-group-inline">
                    <label>Mutation:</label>
                    <div class="custom-select-wrapper">
                      <div class="custom-select" :class="{ open: item.isMutationOpen }" @click="toggleMutationSelect(index)">
                        <span class="select-display">
                          {{ item.mutation ? `${item.mutation.name} (×${item.mutation.multiplier})` : '-- Select mutation --' }}
                        </span>
                        <span class="select-arrow">▼</span>
                      </div>
                      <div v-if="item.isMutationOpen" class="select-dropdown">
                        <div
                          v-for="mutation in mutations"
                          :key="mutation.name"
                          class="select-option"
                          :class="{ selected: item.mutation?.name === mutation.name }"
                          @click="selectMutation(index, mutation)"
                        >
                          {{ mutation.name }}
                          <!-- <span class="option-meta">×{{ mutation.multiplier }}</span> -->
                        </div>
                      </div>
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
                  {{ totalFishTypes }} fish species
                </div>
              </div>

              <div class="value-breakdown">
                <h3>Value Breakdown</h3>
                <div
                  v-for="(item, index) in fishItems"
                  :key="item.id"
                  class="breakdown-item"
                  v-show="item.baseValue > 0 && item.mutation"
                >
                  <div class="breakdown-fish">
                    <span class="breakdown-name">{{ item.fish?.title || `Fish ${index + 1}` }}</span>
                    <span class="breakdown-quantity">{{ item.mutation?.name || 'No mutation' }} (×{{ item.mutation?.multiplier || 1 }})</span>
                  </div>
                  <div class="breakdown-value-group">
                    <span class="breakdown-unit">{{ formatCoins(item.baseValue || 0) }} base</span>
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
                  How to use: Select fish species from your inventory, enter the base value, and select the mutation type. The calculator will compute the total value by multiplying base value with the mutation multiplier.
                </p>
                <p>
                  Tip: Different mutations have different multipliers. Higher multipliers like Galaxy (×6.5) and Gemstone (×5.2) significantly increase fish value.
                </p>
              </div>
            </div>

            <div v-else class="empty-state">
              <div class="empty-icon">💰</div>
              <p>Add fish to your inventory with base value and mutation, then click "Calculate Total Value" to see your total earnings.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Why Use This Calculator Section -->
      <div class="intro-section">
        <div class="intro-content">
          <h2 class="section-title">Why Use the Value Calculator?</h2>
          <p class="intro-description">
            The Fish It Value Calculator keeps every coin accounted for. Log your prized catches, apply mutation modifiers,
            and understand exactly how much gold you can bank before you visit the shop.
          </p>
          <div class="intro-grid">
            <div class="intro-card">
              <div class="intro-icon">💰</div>
              <h3>Calculate Total Earnings</h3>
              <p>Know exactly how much your fish inventory is worth. The Fish It Value Calculator multiplies base values by mutation multipliers to give you accurate total values, helping you plan your selling strategy.</p>
            </div>
            <div class="intro-card">
              <div class="intro-icon">📊</div>
              <h3>Compare Mutation Values</h3>
              <p>See how different mutations affect fish value. Galaxy (×6.5) and Gemstone (×5.2) mutations dramatically increase worth, while Big (×1.1) provides a smaller boost. Plan which mutations to prioritize.</p>
            </div>
            <div class="intro-card">
              <div class="intro-icon">⚡</div>
              <h3>Track Multiple Fish</h3>
              <p>Add as many fish species as you need to calculate your complete inventory value. The calculator handles multiple fish with different base values and mutations, giving you a comprehensive total.</p>
            </div>
            <div class="intro-card">
              <div class="intro-icon">🎯</div>
              <h3>Optimize Your Strategy</h3>
              <p>Use the Fish It Value Calculator to decide when to sell. Compare different mutation combinations to maximize profits and understand which fish are worth keeping versus selling immediately. Planning to catch more valuable fish? The <router-link to="/calculator/fish-it-rng-calculator" class="inline-link">RNG Calculator</router-link> can help you estimate how long it'll take to catch rare catches with high mutation values.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- FAQ Section -->
      <div class="faq-section">
        <h2 class="section-title">Common Questions</h2>
        <div class="faq-grid">
          <div class="faq-item">
            <h3>How does the value calculator work?</h3>
            <p>The Fish It Value Calculator multiplies each fish's base value by its mutation multiplier. For example, a fish with 1000 Coins base value and a Galaxy mutation (×6.5) is worth 6,500 Coins. Add multiple fish to get your total inventory value.</p>
          </div>
          <div class="faq-item">
            <h3>What's the difference between base value and total value?</h3>
            <p>Base value is the fish's worth without any mutations. Total value is base value multiplied by the mutation multiplier. The calculator shows both so you can see how much each mutation increases your fish's worth.</p>
          </div>
          <div class="faq-item">
            <h3>Which mutations are most valuable?</h3>
            <p>Galaxy (×6.5) and Gemstone (×5.2) are the highest multipliers, followed by Midnight and Corrupt (both ×4.5). Radioactive (×4.3) and shiny*Frozen (×4.5) are also very valuable. The Fish It Value Calculator shows all multipliers so you can compare easily.</p>
          </div>
          <div class="faq-item">
            <h3>Can I calculate multiple fish at once?</h3>
            <p>Yes! Click "Add Fish" to add more fish to your inventory. Each fish can have its own species, base value, and mutation. The calculator totals everything together to show your complete inventory value.</p>
          </div>
          <div class="faq-item">
            <h3>Do I need to know the exact base value?</h3>
            <p>Yes, you'll need to enter the base value for each fish. This is the fish's value without mutations. You can find base values in-game or from the wiki. The calculator then applies the mutation multiplier automatically.</p>
          </div>
          <div class="faq-item">
            <h3>What if my fish has no mutation?</h3>
            <p>If a fish has no mutation, its value equals its base value (multiplier of 1x). You can still add it to the calculator - just leave the mutation unselected or the calculator will use a 1x multiplier by default.</p>
          </div>
          <div class="faq-item">
            <h3>Can I use this to plan my selling strategy?</h3>
            <p>Absolutely! The Fish It Value Calculator helps you see which fish are worth the most. Compare different combinations to decide whether to sell now or wait for better mutations. It's perfect for maximizing your coin earnings. For more Fish It! tips and strategies, check out our <router-link to="/guides" class="inline-link">guides section</router-link>.</p>
          </div>
          <div class="faq-item">
            <h3>How accurate are the mutation multipliers?</h3>
            <p>The multipliers in the calculator are based on actual game mechanics. They match the in-game values, so your calculated totals should be accurate. Always double-check in-game if you're unsure about a specific fish's base value.</p>
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

// Mutation options
const mutations = [
  { name: 'Big', multiplier: 1.1 },
  { name: 'shiny', multiplier: 2.5 },
  { name: 'Midnight', multiplier: 4.5 },
  { name: 'Albino', multiplier: 2.4 },
  { name: 'sandy', multiplier: 2.2 },
  { name: 'Frozen', multiplier: 3 },
  { name: 'shiny*Frozen', multiplier: 4.5 },
  { name: 'Corrupt', multiplier: 4.5 },
  { name: 'Radioactive', multiplier: 4.3 },
  { name: 'Stone', multiplier: 2.2 },
  { name: 'ghost', multiplier: 3.5 },
  { name: 'Gemstone', multiplier: 5.2 },
  { name: 'Holographic', multiplier: 3.8 },
  { name: 'Galaxy', multiplier: 6.5 },
  { name: 'Gold', multiplier: 3.8 }
]

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
      item.isMutationOpen = false
    }
  })
  fishItems.value[index].isSelectOpen = !fishItems.value[index].isSelectOpen
}

// Toggle mutation select
const toggleMutationSelect = (index) => {
  // Close all other selects
  fishItems.value.forEach((item, i) => {
    if (i !== index) {
      item.isSelectOpen = false
      item.isMutationOpen = false
    }
  })
  fishItems.value[index].isMutationOpen = !fishItems.value[index].isMutationOpen
}

// Select fish
const selectFish = (index, fish) => {
  fishItems.value[index].fish = fish
  fishItems.value[index].isSelectOpen = false
}

// Select mutation
const selectMutation = (index, mutation) => {
  fishItems.value[index].mutation = mutation
  fishItems.value[index].isMutationOpen = false
}

// Add fish item
const addFishItem = () => {
  fishItems.value.push({
    id: fishItemIdCounter++,
    fish: null,
    baseValue: 0,
    mutation: null,
    isSelectOpen: false,
    isMutationOpen: false,
  })
}

// Remove fish item
const removeFishItem = (index) => {
  fishItems.value.splice(index, 1)
}

// Calculate subtotal for each item
const calculateSubtotal = (item) => {
  const baseValue = item.baseValue || 0
  const multiplier = item.mutation?.multiplier || 1
  return baseValue * multiplier
}

// Total value
const totalValue = computed(() => {
  return fishItems.value.reduce((sum, item) => {
    return sum + calculateSubtotal(item)
  }, 0)
})

// Total fish types
const totalFishTypes = computed(() => {
  return fishItems.value.filter(item => item.fish && item.baseValue > 0).length
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
        item.isMutationOpen = false
      })
    }
  })
  
  // Add initial fish item
  addFishItem()
})
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
  margin-bottom: 20px;
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
  padding: 20px;
  background: rgba(251, 191, 36, 0.1);
  border: 2px solid rgba(251, 191, 36, 0.3);
  border-radius: 16px;
  margin-bottom: 20px;
}

.value-label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 8px;
}

.value-amount {
  font-size: 42px;
  font-weight: 700;
  color: #fbbf24;
  margin-bottom: 8px;
}

.value-summary {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
}

.value-breakdown {
  margin-bottom: 20px;
  padding: 15px;
  background: rgba(15, 25, 40, 0.5);
  border-radius: 12px;
}

.value-breakdown h3 {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 12px;
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
  padding: 15px;
  background: rgba(59, 130, 246, 0.05);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 12px;
}

.value-info p {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin: 0 0 10px;
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

  .faq-grid {
    grid-template-columns: 1fr;
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

  .input-card,
  .results-card {
    padding: 16px;
  }

  .input-card h2,
  .results-card h2 {
    font-size: 20px;
    margin-bottom: 12px;
  }

  .fish-item {
    padding: 15px;
    gap: 10px;
  }

  .form-group-inline label {
    font-size: 11px;
  }

  .custom-select,
  .number-input-small {
    padding: 10px 12px;
    font-size: 12px;
  }

  .add-button,
  .calculate-button {
    padding: 12px;
    font-size: 14px;
  }

  .value-amount {
    font-size: 32px;
  }

  .value-breakdown {
    padding: 10px;
  }

  .breakdown-item {
    padding: 8px 0;
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }

  .breakdown-value-group {
    align-items: flex-start;
  }

  .intro-section {
    margin-top: 20px;
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

  .total-value-display {
    padding: 15px;
  }

  .empty-state {
    padding: 40px 15px;
  }

  .empty-icon {
    font-size: 48px;
    margin-bottom: 20px;
  }
}
</style>
