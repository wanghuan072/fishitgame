<template>
  <section class="codes-page">
    <div class="container">
      <div class="page-header">
        <p class="page-badge">Codes</p>
        <h1>Fish It! Codes (December 2025)</h1>
        <p class="subtitle">
          In Fish It, players are able to redeem one-time use codes in order to obtain valuable items and various potions.
        </p>
      </div>

      <div class="codes-content">
        <div class="intro-section">
          <p>
            There are 2 main types of potions that you can get via codes. <strong>Luck potions</strong>, and
            <strong>Mutation potions</strong>. The former boost your luck for a set amount of time, while the mutation potion
            boosts the chances of your fish being mutated. These codes are updated regularly, so check back often for new rewards. Want to see how luck potions affect your catch rates? Use our <router-link to="/calculator/fish-it-luck-calculator" class="inline-link">Luck Calculator</router-link> to see the impact, or check the <router-link to="/calculator/fish-it-rng-calculator" class="inline-link">RNG Calculator</router-link> to plan your fishing strategy with boosted luck.
          </p>
        </div>

        <div class="codes-section">
          <h2>List of Codes</h2>
          <p class="section-note">Below you'll find a list of all active Fish It codes.</p>
          <p class="warning-note">
            <strong>Note:</strong> The codes are case sensitive and remember to delete the space at the end!
          </p>

          <div class="codes-table-wrapper">
            <table class="codes-table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Reward</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="code in activeCodes" :key="code.code">
                  <td class="code-cell">
                    <span class="code-text">{{ code.code }}</span>
                    <span v-if="code.isNew" class="new-badge">New</span>
                  </td>
                  <td class="reward-cell">{{ code.reward }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="redeem-section">
          <h2>How to Redeem Codes</h2>
          <p>You can redeem the codes from anywhere on the map, simply follow these easy steps below. Make sure to redeem codes as soon as possible since they can expire. For more Fish It! tips and strategies, visit our <router-link to="/guides" class="inline-link">guides section</router-link> or explore the <router-link to="/wiki" class="inline-link">wiki</router-link> for detailed game information.</p>
          <ol class="redeem-steps">
            <li>Press the <strong>SHOP</strong> button at the top of the screen.</li>
            <li>Enter the code in the <strong>ENTER CODE!</strong> text box.</li>
            <li>Hit <strong>Redeem</strong> and receive your free items!</li>
          </ol>
          <div class="redeem-images">
            <div class="redeem-image">
              <img src="/images/code-01.webp" alt="Press the SHOP button" />
              <p>Press the SHOP button at the top of the screen</p>
            </div>
            <div class="redeem-image">
              <img src="/images/code-02.webp" alt="Enter code and redeem" />
              <p>Enter the code in the ENTER CODE! text box and hit Redeem</p>
            </div>
          </div>
        </div>

        <div class="expired-section">
          <h2>Expired Fish It! Codes</h2>
          <p>These codes can no longer be redeemed, but they're listed here so you can still try if you like! Codes expire regularly, so make sure to redeem active codes quickly. For the latest updates and new codes, check our <router-link to="/" class="inline-link">homepage</router-link> regularly.</p>
          <div class="expired-codes-list">
            <span v-for="code in expiredCodes" :key="code" class="expired-code">{{ code }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const activeCodes = ref([
  { code: 'COUNTTRANSCENDEDSTONES', reward: 'Freebies, must be level 10 and own the Transcended Stones', isNew: true },
  { code: '1BILLION', reward: 'Freebies, must be level 10 ', isNew: false },
  { code: 'EXPANSION', reward: 'Freebies, must be level 10', isNew: false },
  { code: 'PURPLEMOON', reward: 'Freebies', isNew: false },
  { code: 'TRAVEL', reward: '1x Luck || Potion', isNew: false },
  { code: 'MEGA', reward: '2x Luck || Potions', isNew: false },
  { code: 'ARMOR', reward: '1x Luck || Potion', isNew: false },
  { code: 'SHARKSSS', reward: '2x Luck || Potions', isNew: false },
  { code: 'MUTATE', reward: '1x Mutation Potion', isNew: false },
  { code: '100M', reward: '1x Luck || Potion', isNew: false },
  { code: 'SHARKSSS', reward: '1x Luck || Potion', isNew: false },
])

const expiredCodes = ref([
  'LUCKYTOTEM',
  'CRYSTALS',
  'TOTEMREFUND',
  'BLAMETALON',
  'MUTATE',
  'TRAVEL',
  'SHARKSSS',
  '100M',
  'ARMOR',
  'SORRYSPINS',
  'FREEBIES',
])
</script>

<style scoped>
.codes-page {
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

.codes-content {
  max-width: 1000px;
  margin: 0 auto;
}

.intro-section {
  margin-bottom: 40px;
  padding: 24px;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(20, 30, 50, 0.8), rgba(15, 25, 40, 0.6));
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.intro-section p {
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.8;
  font-size: 16px;
  margin: 0;
}

.intro-section strong {
  color: #93c5fd;
  font-weight: 600;
}

.codes-section,
.redeem-section,
.expired-section {
  margin-bottom: 50px;
}

.codes-section h2,
.redeem-section h2,
.expired-section h2 {
  font-size: 32px;
  color: #e3f2ff;
  margin-bottom: 16px;
}

.section-note {
  color: rgba(255, 255, 255, 0.75);
  margin-bottom: 12px;
  font-size: 16px;
}

.warning-note {
  color: rgba(255, 200, 100, 0.9);
  margin-bottom: 24px;
  padding: 12px 16px;
  border-radius: 8px;
  background: rgba(255, 200, 100, 0.1);
  border: 1px solid rgba(255, 200, 100, 0.3);
  font-size: 14px;
}

.warning-note strong {
  font-weight: 600;
}

.codes-table-wrapper {
  overflow-x: auto;
  border-radius: 12px;
  border: 1px solid rgba(59, 130, 246, 0.2);
  background: linear-gradient(135deg, rgba(20, 30, 50, 0.8), rgba(15, 25, 40, 0.6));
}

.codes-table {
  width: 100%;
  border-collapse: collapse;
}

.codes-table thead {
  background: rgba(59, 130, 246, 0.15);
}

.codes-table th {
  padding: 16px 20px;
  text-align: left;
  color: #e3f2ff;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border-bottom: 2px solid rgba(59, 130, 246, 0.3);
}

.codes-table td {
  padding: 16px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.85);
}

.codes-table tbody tr:last-child td {
  border-bottom: none;
}

.codes-table tbody tr:hover {
  background: rgba(59, 130, 246, 0.08);
}

.code-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.code-text {
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 16px;
  font-weight: 600;
  color: #93c5fd;
  letter-spacing: 0.05em;
}

.new-badge {
  padding: 4px 10px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(59, 130, 246, 0.2));
  border: 1px solid rgba(59, 130, 246, 0.4);
  color: #93c5fd;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.reward-cell {
  color: rgba(255, 255, 255, 0.9);
  font-size: 15px;
}

.redeem-section p {
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.7;
  margin-bottom: 20px;
  font-size: 16px;
}

.redeem-steps {
  margin: 24px 0;
  padding-left: 24px;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.8;
}

.redeem-steps li {
  margin-bottom: 12px;
  font-size: 16px;
}

.redeem-steps strong {
  color: #93c5fd;
  font-weight: 600;
}

.redeem-images {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-top: 32px;
}

.redeem-image {
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(59, 130, 246, 0.2);
  background: rgba(20, 30, 50, 0.5);
}

.redeem-image img {
  width: 100%;
  height: auto;
  display: block;
}

.redeem-image figcaption {
  padding: 12px 16px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  text-align: center;
  background: rgba(20, 30, 50, 0.8);
}

.expired-section p {
  color: rgba(255, 255, 255, 0.75);
  margin-bottom: 20px;
  font-size: 16px;
}

.expired-codes-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

  .expired-code {
    padding: 10px 16px;
    border-radius: 8px;
    background: rgba(100, 100, 100, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.5);
    font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
    font-size: 14px;
    font-weight: 600;
    text-decoration: line-through;
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

@media (max-width: 768px) {
  .page-header h1 {
    font-size: 32px;
  }

  .codes-section h2,
  .redeem-section h2,
  .expired-section h2 {
    font-size: 24px;
  }

  .codes-table {
    font-size: 14px;
  }

  .codes-table th,
  .codes-table td {
    padding: 12px 16px;
  }

  .redeem-images {
    grid-template-columns: 1fr;
  }
}
</style>

