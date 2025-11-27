<template>
  <section class="legal-page">
    <div class="container">
      <div class="legal-card">
        <h1>Privacy Policy</h1>
        <p class="meta">Last updated: {{ lastUpdated }}</p>

        <section>
          <h2>General Information</h2>
          <p>
            FishItgame.com (“we”, “us”) collects only the minimum amount of information necessary to operate the site,
            troubleshoot issues, and understand aggregate usage. By browsing or submitting feedback you agree to this policy.
          </p>
        </section>

        <section>
          <h2>What We Collect</h2>
          <ul>
            <li><strong>Information you send us:</strong> name or email when you write to wyong@fishitgame.com.</li>
            <li><strong>Technical logs:</strong> IP address, browser, and device info for security and analytics.</li>
            <li><strong>Cookies:</strong> basic session data plus optional third-party analytics cookies.</li>
          </ul>
        </section>

        <section>
          <h2>Why We Use It</h2>
          <ul>
            <li>Maintain and improve guides, wiki data, and calculators.</li>
            <li>Respond to feedback or bug reports.</li>
            <li>Monitor traffic patterns to prioritize new content.</li>
          </ul>
        </section>

        <section>
          <h2>Your Choices</h2>
          <p>
            You can request deletion of any messages or personal information by emailing
            <a href="mailto:wyong@fishitgame.com">wyong@fishitgame.com</a>. You may also disable cookies in your browser; core
            site content will still work, though some analytics features may be limited.
          </p>
        </section>

        <section>
          <h2>Data Retention & Security</h2>
          <p>
            Emails and contact requests are stored only as long as needed to follow up. Server access logs rotate automatically.
            We do not sell or rent any user data and restrict access to internal maintainers only.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            Questions about this policy? Reach out at <a href="mailto:wyong@fishitgame.com">wyong@fishitgame.com</a>.
          </p>
        </section>
      </div>
    </div>
  </section>
</template>

<script setup>
const lastUpdated = 'November 2025'
</script>

<style scoped>
.legal-page {
  padding: 80px 0;
}

.legal-card {
  max-width: 860px;
  margin: 0 auto;
  padding: 48px;
  border-radius: 24px;
  background: rgba(15, 25, 40, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.45);
}

h1 {
  font-size: 34px;
  margin-bottom: 8px;
  color: #fff;
}

.meta {
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 24px;
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
    font-size: 26px;
  }

  h2 {
    font-size: 20px;
  }
}
</style>

