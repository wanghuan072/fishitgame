<template>
  <section class="legal-page">
    <div class="container">
      <div class="legal-card">
        <h1>Contact FishItgame.com</h1>
        <p>
          Need help with a guide, want to report inaccurate data, or have a partnership idea? Send an email to
          <a href="mailto:wyong@fishitgame.com">wyong@fishitgame.com</a>. We usually reply within 24 hours on weekdays and
          within 48 hours on weekends or holidays.
        </p>

        <h2>What We Can Help With</h2>
        <ul>
          <li>Account, access, or data correction requests.</li>
          <li>Suggestions for new wiki entries, guides, or calculators.</li>
          <li>Bug reports (please include screenshots when possible).</li>
          <li>Press or collaboration inquiries.</li>
        </ul>

        <h2>Before You Reach Out</h2>
        <p>
          To speed up the response, include the page URL, the issue you are experiencing, the browser/device you are using, and
          any troubleshooting steps already attempted.
        </p>

        <h2>Business Hours</h2>
        <p>Monday–Friday: 9:00–18:00 UTC. Messages sent outside those hours are answered the next business day.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.legal-page {
  padding: 80px 0;
}

.legal-card {
  max-width: 840px;
  margin: 0 auto;
  padding: 48px;
  border-radius: 24px;
  background: rgba(15, 25, 40, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.45);
}

h1 {
  font-size: 34px;
  margin-bottom: 20px;
  color: #fff;
}

h2 {
  font-size: 22px;
  margin: 28px 0 12px;
  color: #f1f5f9;
}

p,
ul {
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.7;
}

ul {
  padding-left: 18px;
}

li {
  margin-bottom: 6px;
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
    font-size: 26px;
  }

  h2 {
    font-size: 20px;
  }
}
</style>

