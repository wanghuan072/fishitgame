<template>
  <section class="not-found-page">
    <div class="container">
      <div class="not-found-content">
        <div class="error-code">301</div>
        <h1>Page Not Found</h1>
        <p class="error-message">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <p class="error-description">
          The page you requested may have been deleted, renamed, or is temporarily unavailable.
        </p>
        
        <div class="action-buttons">
          <router-link to="/" class="btn-primary">Go to Homepage</router-link>
          <button @click="goBack" class="btn-secondary">Go Back</button>
        </div>

        <div class="quick-links">
          <h2>Popular Pages</h2>
          <div class="links-grid">
            <router-link to="/wiki" class="link-card">
              <span class="link-icon">📚</span>
              <span class="link-text">Wiki</span>
            </router-link>
            <router-link to="/guides" class="link-card">
              <span class="link-icon">📖</span>
              <span class="link-text">Guides</span>
            </router-link>
            <router-link to="/calculator" class="link-card">
              <span class="link-icon">🧮</span>
              <span class="link-text">Calculator</span>
            </router-link>
            <router-link to="/codes" class="link-card">
              <span class="link-icon">🎁</span>
              <span class="link-text">Codes</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/')
  }
}
</script>

<style scoped>
.not-found-page {
  min-height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 90px 0;
}

.not-found-content {
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
}

.error-code {
  font-size: 120px;
  font-weight: 700;
  background: linear-gradient(135deg, #e3f2ff, #93c5fd);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1;
  margin-bottom: 20px;
}

h1 {
  font-size: 36px;
  color: #fff;
  margin: 0 0 16px;
  font-weight: 600;
}

.error-message {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 12px;
  line-height: 1.6;
}

.error-description {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 40px;
  line-height: 1.6;
}

.action-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-bottom: 60px;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary {
  padding: 14px 32px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  display: inline-block;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
}

.btn-primary {
  background: rgba(59, 130, 246, 0.9);
  color: #fff;
  border: 1px solid rgba(59, 130, 246, 0.5);
}

.btn-primary:hover {
  background: rgba(59, 130, 246, 1);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.quick-links {
  margin-top: 60px;
  padding-top: 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.quick-links h2 {
  font-size: 24px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 24px;
  font-weight: 600;
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 16px;
  max-width: 600px;
  margin: 0 auto;
}

.link-card {
  padding: 20px;
  border-radius: 16px;
  border: 1px solid rgba(59, 130, 246, 0.25);
  background: linear-gradient(160deg, rgba(20, 30, 50, 0.8), rgba(10, 15, 25, 0.7));
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
}

.link-card:hover {
  border-color: rgba(59, 130, 246, 0.5);
  background: linear-gradient(160deg, rgba(20, 30, 50, 0.95), rgba(10, 15, 25, 0.85));
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.2);
}

.link-icon {
  font-size: 32px;
  line-height: 1;
}

.link-text {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
}

@media (max-width: 768px) {
  .error-code {
    font-size: 80px;
  }

  h1 {
    font-size: 28px;
  }

  .error-message {
    font-size: 16px;
  }

  .action-buttons {
    flex-direction: column;
    align-items: stretch;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
  }

  .links-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>

