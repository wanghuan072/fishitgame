<template>
  <section class="page-container">
    <div class="container">
      <div class="page-header">
        <p class="page-badge">Calculators</p>
        <h1 class="page-title">Fish It Calculators</h1>
        <p class="subtitle">
          Powerful tools to help you optimize your fishing strategy, calculate
          catch odds, and plan your progression in Fish It!
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
            <h3 class="calculator-title">{{ calculator.title }}</h3>
            <p class="calculator-description">{{ calculator.description }}</p>
          </div>
          <div class="calculator-arrow">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </article>
      </div>

      <!-- Introduction Section -->
      <div class="intro-section">
        <div class="intro-content">
          <h2 class="section-title">Essential Tools for Fish It! Players</h2>
          <p class="intro-description">
            Our collection of Fish It! calculators helps you make data-driven
            decisions about your fishing strategy. Whether you're planning a
            long grind for Secret fish, optimizing your luck setup, calculating
            inventory values, or exploring rare catches, these tools provide
            accurate estimates based on game mechanics.
          </p>
          <div class="intro-grid">
            <div class="intro-card">
              <div class="intro-icon">🎯</div>
              <h3>RNG Calculator</h3>
              <p>
                Calculate catch odds and time estimates for Secret fish. Input
                your gear stats and target fish to see realistic probability
                estimates with confidence intervals.
              </p>
            </div>
            <div class="intro-card">
              <div class="intro-icon">🍀</div>
              <h3>Luck Calculator</h3>
              <p>
                Determine your total luck percentage from all sources. Combine
                rod, bobber, and additional luck bonuses to see your complete
                multiplier.
              </p>
            </div>
            <div class="intro-card">
              <div class="intro-icon">💰</div>
              <h3>Value Calculator</h3>
              <p>
                Calculate the total value of your fish inventory. Factor in base
                values and mutation multipliers to see your complete earnings
                potential.
              </p>
            </div>
            <div class="intro-card">
              <div class="intro-icon">🔮</div>
              <h3>Secret Fish Calculator</h3>
              <p>
                Browse all Secret fish in the game. Search by name, filter by
                location, and jump directly to catch odds calculations for any
                rare fish.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- FAQ Section -->
      <div class="faq-section">
        <h2 class="section-title">Common Questions</h2>
        <div class="faq-grid">
          <div class="faq-item">
            <h3>What are these calculators for?</h3>
            <p>
              These Fish It! calculators help you optimize your gameplay by
              providing accurate estimates based on game mechanics. Use them to
              plan fishing sessions, compare gear setups, calculate values, and
              understand catch probabilities for rare fish.
            </p>
          </div>
          <div class="faq-item">
            <h3>Are the calculations accurate?</h3>
            <p>
              Yes! All calculators use formulas based on actual Fish It! game
              mechanics and community research. Results are estimates based on
              statistical models, so actual outcomes may vary due to RNG, but
              the calculations provide reliable guidance.
            </p>
          </div>
          <div class="faq-item">
            <h3>Which calculator should I use first?</h3>
            <p>
              Start with the Luck Calculator to understand your current setup,
              then use the RNG Calculator to see catch odds for specific fish.
              The Value Calculator helps with profit planning, and the Secret
              Fish Calculator helps you explore rare catches.
            </p>
          </div>
          <div class="faq-item">
            <h3>Do I need to register or pay to use these?</h3>
            <p>
              No! All Fish It! calculators are completely free to use. There's
              no registration required, and you can use them as many times as
              you need. Just open any calculator and start calculating.
            </p>
          </div>
          <div class="faq-item">
            <h3>Can I use multiple calculators together?</h3>
            <p>
              Absolutely! Many players use the calculators in combination. For
              example, use the Luck Calculator to find your total luck, then
              input that into the RNG Calculator to see catch odds. The Secret
              Fish Calculator can help you find fish to calculate.
            </p>
          </div>
          <div class="faq-item">
            <h3>How often are the calculators updated?</h3>
            <p>
              The calculators are updated regularly to reflect the latest game
              mechanics and data. If you notice any discrepancies, feel free to
              report them so we can keep the tools accurate and up-to-date.
            </p>
          </div>
          <div class="faq-item">
            <h3>Can I calculate for any fish in the game?</h3>
            <p>
              The RNG Calculator includes 28 Secret fish with very low catch
              rates. For other fish, you can use the manual input mode. The
              Value Calculator works with any fish as long as you know the base
              value and mutation.
            </p>
          </div>
          <div class="faq-item">
            <h3>What if my results seem different from others?</h3>
            <p>
              Results depend on your specific gear setup, luck multiplier, and
              casting rate. Everyone's stats are different, so your results will
              be personalized to your equipment. Try different combinations to
              see how upgrades affect your odds.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const calculatorsList = ref([
  {
    id: 1,
    title: "Fish It Rng Calculator",
    description:
      "Calculate the expected number of attempts and time needed to catch your target fish based on your equipment setup.",
    slug: "fish-it-rng-calculator",
  },
  {
    id: 2,
    title: "Fish It Luck Calculator",
    description:
      "Calculate your total luck percentage and optimize your gear setup for maximum catch rates.",
    slug: "fish-it-luck-calculator",
  },
  {
    id: 3,
    title: "Fish It Value Calculator",
    description:
      "Calculate the value and profit potential of different fish species and fishing strategies.",
    slug: "fish-it-value-calculator",
  },
  {
    id: 4,
    title: "Fish It  Secret Fish Calculator",
    description:
      "Specialized calculator for Secret fish catch rates and optimal strategies for rare catches.",
    slug: "fish-it-secret-calculator",
  },
]);

const handleCalculatorClick = (calculator) => {
  router.push(`/calculator/${calculator.slug}`);
};
</script>

<style scoped>
.section-heading-wrapper {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
}

.section-heading {
  margin: 0;
  font-size: 24px;
  color: rgba(255, 255, 255, 0.92);
}

.calculators-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.calculator-card {
  border-radius: 16px;
  border: 1px solid rgba(59, 130, 246, 0.15);
  background: linear-gradient(
    135deg,
    rgba(20, 30, 50, 0.6),
    rgba(15, 25, 40, 0.4)
  );
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
  content: "";
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
  background: linear-gradient(
    135deg,
    rgba(20, 30, 50, 0.8),
    rgba(15, 25, 40, 0.6)
  );
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
  line-height: 1.5;
  margin: 0;
  font-size: 14px;
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
  .section-heading {
    font-size: 20px;
  }

  .calculators-list {
    gap: 10px;
  }

  .calculator-card {
    padding: 15px;
    gap: 10px;
  }

  .calculator-title {
    font-size: 16px;
  }

  .calculator-description {
    font-size: 12px;
  }

  .calculator-arrow {
    width: 36px;
    height: 36px;
  }
}

.intro-section {
  margin-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
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
  background: linear-gradient(
    160deg,
    rgba(20, 30, 50, 0.8),
    rgba(10, 15, 25, 0.7)
  );
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
  background: linear-gradient(
    160deg,
    rgba(20, 30, 50, 0.8),
    rgba(10, 15, 25, 0.7)
  );
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

@media (max-width: 1024px) {
  .intro-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
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
  .faq-grid{
    gap: 10px;
  }
  .faq-item{
    padding: 10px;
    gap: 10px;
  }
  .faq-item h3 {
    font-size: 16px;
  }
  .faq-item p {
    font-size: 12px;
  }

}
</style>

