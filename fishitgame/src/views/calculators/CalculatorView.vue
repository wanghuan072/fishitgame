<template>
  <section class="calculators-page">
    <div class="container">
      <div class="page-header">
        <p class="page-badge">Calculators</p>
        <h1>Fish It Calculators</h1>
        <p class="subtitle">
          Powerful tools to help you optimize your fishing strategy, calculate catch odds, and plan your progression in Fish It!
        </p>
      </div>

      <div class="section-heading-wrapper">
        <h2 class="section-heading">All Calculators</h2>
      </div>

      <div class="calculators-list">
        <article
          v-for="calculator in calculatorsList"
          :key="calculator.id"
          class="calculator-card"
          @click="handleCalculatorClick(calculator)"
        >
          <div class="calculator-content">
            <h2 class="calculator-title">{{ calculator.title }}</h2>
            <p class="calculator-description">{{ calculator.description }}</p>
          </div>
          <div class="calculator-arrow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const calculatorsList = ref([
  {
    id: 1,
    title: 'Fish It Rng Calculator',
    description: 'Calculate the expected number of attempts and time needed to catch your target fish based on your equipment setup.',
    slug: 'fish-it-rng-calculator',
  },
  {
    id: 2,
    title: 'Fish It Luck Calculator',
    description: 'Calculate your total luck percentage and optimize your gear setup for maximum catch rates.',
    slug: 'fish-it-luck-calculator',
  },
  {
    id: 3,
    title: 'Fish It Value Calculator',
    description: 'Calculate the value and profit potential of different fish species and fishing strategies.',
    slug: 'fish-it-value-calculator',
  },
  {
    id: 4,
    title: 'Fish It  Secret Fish Calculator',
    description: 'Specialized calculator for Secret fish catch rates and optimal strategies for rare catches.',
    slug: 'fish-it-secret-calculator',
  },
])

const handleCalculatorClick = (calculator) => {
  router.push(`/calculator/${calculator.slug}`)
}
</script>

<style scoped>
.calculators-page {
  padding: 80px 0;
}

.page-header {
  text-align: center;
  margin-bottom: 50px;
}

.page-badge {
  display: inline-flex;
  padding: 6px 16px;
  border-radius: 999px;
  border: 1px solid rgba(59, 130, 246, 0.3);
  color: rgba(255, 255, 255, 0.8);
  letter-spacing: 0.3em;
  font-size: 12px;
  margin-bottom: 18px;
}

.page-header h1 {
  font-size: 48px;
  margin-bottom: 18px;
  background: linear-gradient(135deg, #e3f2ff, #93c5fd);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  color: rgba(255, 255, 255, 0.8);
  max-width: 760px;
  margin: 0 auto;
  line-height: 1.7;
}

.section-heading-wrapper {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
}

.section-heading {
  margin: 0;
  font-size: 24px;
  color: rgba(255, 255, 255, 0.92);
}

.calculators-list {
  max-width: 900px;
  margin: 40px auto 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.calculator-card {
  border-radius: 16px;
  border: 1px solid rgba(59, 130, 246, 0.15);
  background: linear-gradient(135deg, rgba(20, 30, 50, 0.6), rgba(15, 25, 40, 0.4));
  padding: 28px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.calculator-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(180deg, var(--accent), rgba(59, 130, 246, 0.5));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.calculator-card:hover {
  border-color: rgba(59, 130, 246, 0.4);
  background: linear-gradient(135deg, rgba(20, 30, 50, 0.8), rgba(15, 25, 40, 0.6));
  box-shadow: 0 8px 32px rgba(59, 130, 246, 0.15);
  transform: translateX(4px);
}

.calculator-card:hover::before {
  opacity: 1;
}

.calculator-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.calculator-title {
  font-size: 22px;
  color: #fff;
  margin: 0;
  font-weight: 600;
  letter-spacing: -0.02em;
  transition: color 0.3s ease;
}

.calculator-card:hover .calculator-title {
  color: rgba(147, 197, 253, 1);
}

.calculator-description {
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.6;
  margin: 0;
  font-size: 15px;
}

.calculator-arrow {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(59, 130, 246, 0.6);
  transition: all 0.3s ease;
  border-radius: 8px;
  background: rgba(59, 130, 246, 0.05);
}

.calculator-card:hover .calculator-arrow {
  color: var(--accent);
  background: rgba(59, 130, 246, 0.15);
  transform: translateX(4px);
}

@media (max-width: 768px) {
  .page-header h1 {
    font-size: 32px;
  }

  .calculators-list {
    margin-top: 32px;
    gap: 12px;
  }

  .calculator-card {
    padding: 24px;
    gap: 16px;
  }

  .calculator-title {
    font-size: 20px;
  }

  .calculator-description {
    font-size: 14px;
  }

  .calculator-arrow {
    width: 36px;
    height: 36px;
  }
}
</style>

