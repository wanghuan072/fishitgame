<template>
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="footer-logo">
            <img src="/images/logo.webp" alt="Fish It Logo" class="logo-image">
            <span class="logo-text">Fish It</span>
          </div>
          <p class="footer-text">
            Comprehensive Fish It game resources including guides, wiki, items database to help you become a fishing master.
          </p>
          <a
            class="footer-play-button"
            href="https://www.roblox.com/games/121864768012064/UPD-Fish-It"
            target="_blank"
            rel="nofollow"
          >
            Play on Roblox
          </a>
        </div>
        <div class="link-column">
          <h2>Navigate</h2>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/fish-it-wiki" >Wiki</a></li>
            <li><a href="/fish-it-guides">Guides</a></li>
            <li><a href="/fish-it-codes">Codes</a></li>
            <li><a href="/fish-it-calculator">Calculator</a></li>
          </ul>
        </div>
        <div class="link-column">
          <h2>Legal</h2>
          <ul>
            <li><a href="/privacy-policy" rel="nofollow">Privacy Policy</a></li>
            <li><a href="/terms-of-service" rel="nofollow">Terms of Service</a></li>
            <li><a href="/copyright" rel="nofollow">Copyright</a></li>
            <li><a href="/about" rel="nofollow">About Us</a></li>
            <li><a href="/contact" rel="nofollow">Contact Us</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2025 fishitgame.com. All rights reserved.</p>
        <p>fishitgame.com is not affiliated with, endorsed by, or connected to the original game or its publishers. This is an independent fan site created for informational purposes only. All trademarks and copyrights belong to their respective owners.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  padding: 30px 0 20px 0;
  background: rgba(2, 4, 6, 0.9);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.footer-grid {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 10px;
  text-decoration: none;
}

.logo-image {
  width: 50px;
  height: 50px;
}

.logo-text {
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: var(--accent);
  text-transform: uppercase;
  text-shadow: 0 0 20px rgba(59, 130, 246, 0.7);
}

.footer-text {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 16px;
}

.footer-brand {
  width: 30%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.link-column h2 {
  color: #ffdede;
  font-size: 1.3rem;
  margin-bottom: 16px;
  font-weight: 600;
}

.link-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.link-column a,
.link-column :deep(a) {
  color: rgba(255, 255, 255, 0.75);
  text-decoration: none;
  transition: color 0.2s ease;
}

.link-column a:hover,
.link-column :deep(a:hover) {
  color: #ffffff;
}

.footer-bottom {
  margin-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 20px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.85rem;
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: center;
}

.footer-play-button {
  display: inline-flex;
  align-self: flex-start;
  margin-top: 4px;
  padding: 10px 26px;
  border-radius: 999px;
  border: 1px solid rgba(59, 130, 246, 0.4);
  background: rgba(59, 130, 246, 0.15);
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  letter-spacing: 0.08em;
  transition: background 0.3s ease, border-color 0.3s ease, transform 0.2s ease;
}

.footer-play-button:hover {
  background: rgba(59, 130, 246, 0.25);
  border-color: rgba(59, 130, 246, 0.6);
  transform: translateY(-1px);
}

/* iPad端 - 1024px */
@media (max-width: 1024px) {
  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
  }

  .link-column h2 {
    font-size: 1.2rem;
  }
}

/* 移动端 - 768px */
@media (max-width: 768px) {
  .site-footer {
    padding: 20px 0;
  }

  .footer-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .footer-logo {
    font-size: 20px;
    margin-bottom: 10px;
  }

  .footer-text {
    font-size: 12px;
    margin-bottom: 10px;
  }

  .link-column h2 {
    font-size: 16px;
    margin-bottom: 12px;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .link-column ul {
    gap: 10px;
  }

  .link-column a {
    font-size: 12px;
  }

  .footer-bottom {
    margin-top: 20px;
    padding-top: 20px;
    gap: 10px;
    font-size: 12px;
  }

  .footer-bottom p {
    font-size: 12px;
    margin-bottom: 10px;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .footer-text,
  .link-column a {
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
}
</style>


