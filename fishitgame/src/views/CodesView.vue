<template>
  <section class="page-container">
    <div class="container">
      <div class="page-header">
        <p class="page-badge">Codes</p>
        <h1 class="page-title">Fish It! Codes (December 2025)</h1>
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
                  <th class="copy-header"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="code in activeCodes" :key="code.code">
                  <td class="code-cell">
                    <span class="code-text">{{ code.code }}</span>
                    <span v-if="code.isNew" class="new-badge">New</span>
                  </td>
                  <td class="reward-cell">{{ code.reward }}</td>
                  <td class="copy-cell">
                    <button
                      class="copy-button"
                      :class="{ copied: copiedCode === code.code }"
                      @click="copyCode(code.code)"
                    >
                      {{ copiedCode === code.code ? 'Copied' : 'Copy' }}
                    </button>
                  </td>
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

        <!-- FAQ Section -->
        <div class="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div class="faq-grid">
            <div class="faq-item">
              <h3>How often are new codes released?</h3>
              <p>New codes are released periodically by the developers, often during special events, updates, or milestones. We update this page regularly to include all active codes. Make sure to check back frequently and redeem codes as soon as possible since they can expire.</p>
            </div>
            <div class="faq-item">
              <h3>Why isn't my code working?</h3>
              <p>Codes are case sensitive, so make sure you're entering them exactly as shown. Also, remember to delete any space at the end of the code. If a code still doesn't work, it may have expired. Check the expired codes list to see if it's there, or try again later as codes sometimes have temporary issues.</p>
            </div>
            <div class="faq-item">
              <h3>What do Luck potions do?</h3>
              <p>Luck potions boost your luck percentage for a set amount of time, which increases your catch rates for rare and Secret fish. The higher your luck, the better your chances of catching rare fish. Use our <router-link to="/calculator/fish-it-luck-calculator" class="inline-link">Luck Calculator</router-link> to see how potions affect your total luck multiplier.</p>
            </div>
            <div class="faq-item">
              <h3>What do Mutation potions do?</h3>
              <p>Mutation potions increase the chances of your caught fish being mutated. Mutations like Galaxy, Gemstone, or Midnight significantly increase fish value. Check the <router-link to="/calculator/fish-it-value-calculator" class="inline-link">Value Calculator</router-link> to see how different mutations affect fish worth.</p>
            </div>
            <div class="faq-item">
              <h3>Can I use the same code multiple times?</h3>
              <p>No, codes are one-time use only. Once you've redeemed a code, you cannot use it again on the same account. Make sure to use codes as soon as you get them to avoid missing out on rewards.</p>
            </div>
            <div class="faq-item">
              <h3>Where do I redeem codes in the game?</h3>
              <p>You can redeem codes from anywhere on the map. Simply press the SHOP button at the top of the screen, enter the code in the "ENTER CODE!" text box, and hit Redeem. The process is quick and easy, and you'll receive your items immediately.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const copiedCode = ref(null)

const copyCode = async (code) => {
  try {
    await navigator.clipboard.writeText(code)
    copiedCode.value = code
    setTimeout(() => {
      copiedCode.value = null
    }, 2000)
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = code
    textArea.style.position = 'fixed'
    textArea.style.opacity = '0'
    document.body.appendChild(textArea)
    textArea.select()
    try {
      document.execCommand('copy')
      copiedCode.value = code
      setTimeout(() => {
        copiedCode.value = null
      }, 2000)
    } catch (fallbackErr) {
      console.error('Failed to copy code:', fallbackErr)
    }
    document.body.removeChild(textArea)
  }
}

const activeCodes = ref([
  { code: 'COUNTTRANSCENDEDSTONES', reward: 'Freebies, must be level 10 and own the Transcended Stones', isNew: true },
  { code: '1BILLION', reward: 'Freebies, must be level 10 ', isNew: false },
  { code: 'EXPANSION', reward: 'Freebies, must be level 10', isNew: false },
  { code: 'PURPLEMOON', reward: 'Freebies', isNew: false },
])

const expiredCodes = ref([
  'MEGA',
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
  line-height: 1.5;
  font-size: 16px;
  margin: 0;
}

.intro-section strong {
  color: #93c5fd;
  font-weight: 600;
}

.codes-section,
.redeem-section,
.expired-section,
.faq-section {
  margin-bottom: 50px;
}

.codes-section h2,
.redeem-section h2,
.expired-section h2,
.faq-section h2 {
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

.copy-header {
  width: 100px;
  text-align: right;
}

.copy-cell {
  text-align: right;
  padding: 16px 20px;
}

.copy-button {
  padding: 6px 16px;
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 8px;
  background: rgba(59, 130, 246, 0.1);
  color: #60a5fa;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.copy-button:hover {
  background: rgba(59, 130, 246, 0.2);
  border-color: rgba(59, 130, 246, 0.5);
  color: #93c5fd;
  transform: scale(1.05);
}

.copy-button:active {
  transform: scale(0.95);
}

.copy-button.copied {
  background: rgba(34, 197, 94, 0.2);
  border-color: rgba(34, 197, 94, 0.4);
  color: #4ade80;
}

.copy-button.copied:hover {
  background: rgba(34, 197, 94, 0.3);
  border-color: rgba(34, 197, 94, 0.5);
}

.redeem-section p {
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.7;
  font-size: 16px;
  padding: 10px;
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

.faq-section {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.faq-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
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
  .codes-section h2,
  .redeem-section h2,
  .expired-section h2,
  .faq-section h2 {
    font-size: 20px;
    margin-bottom: 10px;
  }

  .intro-section{
    padding: 15px;
    margin-bottom: 20px;
  }

  .intro-section p{
    font-size: 12px;
  }

  .section-note{
    font-size: 12px;
  }

  .code-text{
    font-size: 12px;
  }

  .codes-section,
.redeem-section,
.expired-section,
.faq-section {
  margin-bottom: 20px;
}

  .warning-note{
    padding: 10px 15px;
    margin-bottom: 10px;
  }

  .redeem-section p{
    padding: 5px;
    font-size: 12px;
  }

  .expired-section p{
    font-size: 12px;
    margin-bottom: 10px;
  }

  .expired-codes-list{
    gap: 10px;
  }

  .faq-item {
    padding: 10px;
  }

  .faq-item h3 {
    font-size: 18px;
  }

  .faq-item p {
    font-size: 14px;
  }

  .codes-table {
    font-size: 14px;
  }

  .codes-table th,
  .codes-table td {
    padding: 10px;
    font-size: 12px;
  }

  .redeem-images {
    grid-template-columns: 1fr;
  }
}
</style>

