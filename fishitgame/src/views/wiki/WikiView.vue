<template>
  <section class="page-container">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">Fish It! Wiki</h1>
        <p class="subtitle">
          All equipment knowledge now lives in one unified hub. Boats, baits, fish, and rods each get their own format so future
          data drops slide in instantly.
        </p>
      </div>

      <div class="category-header">
        <h2 class="section-heading">Wiki Categories</h2>
      </div>

      <div class="category-grid">
        <router-link
          v-for="category in categories"
          :key="category.key"
          class="category-card"
          :class="`category-${category.key}`"
          :to="category.to"
        >
          <div class="card-sheen"></div>
          <div class="card-content">
            <div class="card-top">
              <div>
                <p class="category-label">{{ category.label }}</p>
                <h3>{{ category.title }}</h3>
              </div>
              <span class="count">{{ category.count }} entries</span>
            </div>
            <p class="card-body">{{ category.description }}</p>
            <div class="card-pills">
              <span class="pill" v-for="pill in category.pills" :key="pill">{{ pill }}</span>
            </div>
            <div class="card-cta">
              <span>Open list</span>
              <span aria-hidden="true">→</span>
            </div>
          </div>
        </router-link>
      </div>

      <!-- About Wiki Section -->
      <div class="about-section">
        <div class="about-content">
          <h2>About the Fish It! Wiki</h2>
          <p>
            The Fish It! Wiki is your complete resource for all game equipment and items. Whether you're looking for boat stats to optimize your fishing speed, bobber information to boost your luck, fish locations to complete your collection, or rod details to maximize your catch rates, everything is organized and easy to find.
          </p>
          <p>
            Each category contains detailed information including stats, prices, acquisition methods, rarity tiers, and special effects. Our wiki is constantly updated with the latest game data, ensuring you have access to the most current information about boats, bobbers, fish, and rods. This comprehensive database helps you make informed decisions about which equipment to invest in and which fish to target.
          </p>
          <p>
            Use this wiki alongside our <router-link to="/calculator" class="inline-link">calculators</router-link> to plan your fishing strategy. For example, check rod and bobber stats here, then use the <router-link to="/calculator/fish-it-luck-calculator" class="inline-link">Luck Calculator</router-link> to see your total luck multiplier. Or browse fish locations and rarity rates, then calculate catch odds with the <router-link to="/calculator/fish-it-rng-calculator" class="inline-link">RNG Calculator</router-link>. For more strategic tips and progression guides, check out our <router-link to="/guides" class="inline-link">guides section</router-link>.
          </p>
          <p>
            The wiki is organized into four main categories: Boats for speed and utility information, Bobbers for luck and mutation bonuses, Fish for locations and rarity data, and Rods for durability and special effects. Each entry provides all the details you need to optimize your gameplay and make the most of your fishing time.
          </p>
        </div>
      </div>

      <!-- FAQ Section -->
      <div class="faq-section">
        <div class="faq-content">
          <h2>Frequently Asked Questions</h2>
          <div class="faq-grid">
            <div class="faq-item">
              <h3>How often is the wiki updated?</h3>
              <p>The Fish It! Wiki is updated regularly to reflect the latest game changes, new items, and balance adjustments. We strive to keep all information current, including stats, prices, and acquisition methods for boats, bobbers, fish, and rods.</p>
            </div>
            <div class="faq-item">
              <h3>What information can I find in each category?</h3>
              <p>Each category provides comprehensive details: Boats show speed tiers, module slots, and unlock requirements. Bobbers display luck bonuses, mutation boosts, and event availability. Fish entries include spawn locations, rarity rates, and catch requirements. Rods feature durability stats, special effects, and upgrade paths.</p>
            </div>
            <div class="faq-item">
              <h3>How do I use the wiki with calculators?</h3>
              <p>The wiki provides the base data you need for calculations. Find your rod and bobber stats here, then use the <router-link to="/calculator/fish-it-luck-calculator" class="inline-link">Luck Calculator</router-link> to see your total luck. Check fish rarity rates, then use the <router-link to="/calculator/fish-it-rng-calculator" class="inline-link">RNG Calculator</router-link> to estimate catch times. The wiki and calculators work together to help you plan your strategy.</p>
            </div>
            <div class="faq-item">
              <h3>Are all items in the game listed in the wiki?</h3>
              <p>Yes, our wiki aims to include all boats, bobbers, fish, and rods available in Fish It!. Each category is organized by rarity and includes both common and secret items. If you notice any missing items, the data is updated regularly to ensure completeness.</p>
            </div>
            <div class="faq-item">
              <h3>Can I find information about mutations in the wiki?</h3>
              <p>While the wiki focuses on base equipment and fish data, mutation information is available in the fish entries where relevant. For detailed mutation multipliers and value calculations, use the <router-link to="/calculator/fish-it-value-calculator" class="inline-link">Value Calculator</router-link> which includes all mutation types and their effects.</p>
            </div>
            <div class="faq-item">
              <h3>How do I know which equipment to prioritize?</h3>
              <p>Use the wiki to compare stats across different items. Check boat speeds for efficiency, bobber luck bonuses for catch rates, and rod durability for long-term value. Combine this information with our <router-link to="/guides" class="inline-link">guides</router-link> for progression strategies and recommendations based on your current level and goals.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { wikiCategories } from '@/data/wiki/index.js'

const categories = [
  {
    ...wikiCategories.find((c) => c.key === 'boats'),
    label: 'Boats',
    pills: ['Speed tiers', 'Module slots', 'Unlock guide'],
  },
  {
    ...wikiCategories.find((c) => c.key === 'bobbers'),
    label: 'Floats',
    pills: ['Luck builds', 'Mutation boosts', 'Event drops'],
  },
  {
    ...wikiCategories.find((c) => c.key === 'fish'),
    label: 'Species',
    pills: ['Spawn window', 'Gear pairing', 'Rarity'],
  },
  {
    ...wikiCategories.find((c) => c.key === 'rods'),
    label: 'Rods',
    pills: ['Special effects', 'Upgrade path', 'Durability'],
  },
]
</script>

<style scoped>


.section-heading {
  margin: 0;
  font-size: 24px;
  color: rgba(255, 255, 255, 0.92);
}

.category-header {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 16px;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.category-card {
  border-radius: 26px;
  border: 1px solid rgba(59, 130, 246, 0.25);
  background: rgba(10, 15, 25, 0.85);
  text-decoration: none;
  color: inherit;
  position: relative;
  overflow: hidden;
}

.category-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(140deg, rgba(59, 130, 246, 0.25), transparent);
  opacity: 0.7;
}

.category-card::after {
  content: '';
  position: absolute;
  inset: 1px;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.card-sheen {
  position: absolute;
  top: -40%;
  left: -10%;
  width: 80%;
  height: 60%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%);
}

.card-content {
  position: relative;
  z-index: 1;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.category-label {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 6px;
}

.count {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: rgba(255, 255, 255, 0.8);
}

.card-body {
  color: rgba(255, 255, 255, 0.78);
  margin: 0;
  line-height: 1.7;
}

.card-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.pill {
  font-size: 12px;
  padding: 6px 12px;
  border-radius: 12px;
  background: rgba(59, 130, 246, 0.12);
  border: 1px solid rgba(59, 130, 246, 0.3);
  color: rgba(255, 255, 255, 0.8);
}

.card-cta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  letter-spacing: 0.2em;
  color: var(--accent);
}



.about-section {
  margin-top: 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.about-content {
  max-width: 1000px;
  margin: 0 auto;
}

.about-content h2 {
  font-size: 28px;
  color: #fff;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #e3f2ff, #93c5fd);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.about-content p {
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.5;
  margin-bottom: 20px;
  font-size: 14px;
}

.about-content p:last-child {
  margin-bottom: 0;
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

.faq-section {
  margin-top: 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.faq-content {
  max-width: 1000px;
  margin: 0 auto;
}

.faq-content h2 {
  font-size: 32px;
  color: #fff;
  margin-bottom: 40px;
  background: linear-gradient(135deg, #e3f2ff, #93c5fd);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.faq-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
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

@media (max-width: 768px) {
  .card-content {
    padding: 15px;
    gap: 10px;
  }

  .category-grid{
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .about-section{
    margin-top: 20px;
  }

  .about-content h2,
  .faq-content h2 {
    font-size: 22px;
    margin-bottom: 10px;
  }

  .about-content p {
    font-size: 12px;
    margin-bottom: 10px;
  }

  .faq-section{
    margin-top: 20px;
  }

  .faq-item {
    padding: 15px;
  }

  .faq-item h3 {
    font-size: 16px;
    margin-bottom: 10px;
  }

  .faq-item p {
    font-size: 12px;
  }
}

</style>

