<template>
  <section class="legal-page">
    <div class="container">
      <div class="legal-card">
        <h1>About Fish It! Community</h1>
        <p>
          FishItgame.com is a community-driven knowledge hub that documents everything happening inside the Roblox experience
          Fish It!. We are a small team of players, writers, and designers who catalogue game updates, test strategies, and
          package the results into practical guides, calculators, and wiki entries.
        </p>

        <h2>Our Mission</h2>
        <p>
          Help every angler in Fish It! make better decisions. Whether someone is farming their first rod or optimizing mythic
          hunts, we want them to find up-to-date information in seconds.
        </p>

        <h2>What You Can Expect</h2>
        <ul>
          <li><strong>Guides & Tutorials:</strong> Step-by-step breakdowns for gear, islands, and late-game grinds.</li>
          <li><strong>Live Wiki:</strong> Centralized stats for boats, bobbers, fish, and rods with category filters.</li>
          <li><strong>Tools:</strong> Calculators for RNG odds, luck stacking, value planning, and secret fish tracking.</li>
          <li><strong>Community Feedback:</strong> We iterate quickly based on Discord pings, DMs, and email reports.</li>
        </ul>

        <h2>Quality & Updates</h2>
        <p>
          Accuracy matters. Every article is reviewed, and we refresh the data after each major patch so visitors always see the
          current numbers. When we make a substantial edit we log it inside the guide or wiki page history.
        </p>

        <h2>Contact</h2>
        <p>
          Questions or collaboration ideas? Email <a href="mailto:wyong@fishitgame.com">wyong@fishitgame.com</a>. We usually
          respond within one business day.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.legal-page {
  padding: 80px 0;
}

.legal-card {
  max-width: 900px;
  margin: 0 auto;
  padding: 48px;
  border-radius: 24px;
  background: rgba(15, 25, 40, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.45);
}

h1 {
  font-size: 36px;
  margin-bottom: 24px;
  color: #fff;
}

h2 {
  font-size: 22px;
  margin: 32px 0 12px;
  color: #f1f5f9;
}

p {
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.7;
}

ul {
  margin: 12px 0;
  padding-left: 18px;
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.7;
}

li {
  margin-bottom: 8px;
}

strong {
  color: #fff;
}

a {
  color: #91c9ff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .legal-card {
    padding: 28px;
  }

  h1 {
    font-size: 28px;
  }

  h2 {
    font-size: 20px;
  }
}
</style>

