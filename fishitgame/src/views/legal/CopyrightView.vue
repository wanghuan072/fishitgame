<template>
  <section class="legal-page">
    <div class="container">
      <div class="legal-card">
        <h1>Copyright Notice</h1>
        <p>
          All original articles, database entries, tools, graphics, and layouts published on FishItgame.com are protected by
          copyright. You may reference our work for personal use, but redistribution or commercial use requires prior written
          permission.
        </p>

        <h2>What You Can Do</h2>
        <ul>
          <li>Quote small sections with a link back to the original page.</li>
          <li>Use our guides for personal study or for non-commercial community discussions.</li>
          <li>Share our public URLs with friends or on social platforms.</li>
        </ul>

        <h2>What Requires Permission</h2>
        <ul>
          <li>Reposting full guides, wiki tables, or calculator logic.</li>
          <li>Using our brand assets or screenshots in commercial material.</li>
          <li>Creating mirror sites or redistributing our datasets.</li>
        </ul>

        <h2>DMCA & Takedowns</h2>
        <p>
          If you believe your copyrighted content appears on FishItgame.com without authorization, contact
          <a href="mailto:wyong@fishitgame.com">wyong@fishitgame.com</a> with the URL, a description of the original work, and
          proof of ownership. Valid requests are handled as quickly as possible.
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

