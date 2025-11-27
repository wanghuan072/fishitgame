<template>
  <header class="site-header">
    <div class="container">
      <div class="header-content">
        <a href="/" class="logo" @click="closeMenu">
          <img src="/images/logo.webp" alt="Fish It Logo" class="logo-image">
          <span class="logo-text">Fish It</span>
        </a>
        <button class="menu-toggle" @click="toggleMenu" aria-label="Toggle menu">
          <span class="hamburger-line" :class="{ active: isMenuOpen }"></span>
          <span class="hamburger-line" :class="{ active: isMenuOpen }"></span>
          <span class="hamburger-line" :class="{ active: isMenuOpen }"></span>
        </button>
        <div class="menu-overlay" :class="{ open: isMenuOpen }" @click="closeMenu"></div>
        <nav class="nav-links" :class="{ open: isMenuOpen }">
          <router-link to="/" @click="closeMenu">Home</router-link>
          <router-link to="/fish-it-wiki" @click="closeMenu">Wiki</router-link>
          <router-link to="/fish-it-guides" @click="closeMenu">Guides</router-link>
          <router-link to="/fish-it-codes" @click="closeMenu">Codes</router-link>
          <router-link to="/fish-it-calculator" @click="closeMenu">Calculator</router-link>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 20;
  background: linear-gradient(90deg, rgba(18, 30, 50, 0.95), rgba(30, 50, 80, 0.75));
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 18px 0;
  position: relative;
}

.logo {
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
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

.menu-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  z-index: 21;
}

.hamburger-line {
  width: 24px;
  height: 2px;
  background: rgba(255, 230, 230, 0.7);
  transition: all 0.3s ease;
  border-radius: 2px;
  transform-origin: center;
}

.hamburger-line.active:nth-child(1) {
  transform: rotate(45deg) translateY(7px);
}

.hamburger-line.active:nth-child(2) {
  opacity: 0;
  transform: scale(0);
}

.hamburger-line.active:nth-child(3) {
  transform: rotate(-45deg) translateY(-7px);
}

.nav-links {
  display: flex;
  gap: 14px;
  font-size: 0.95rem;
}

.nav-links a {
  color: rgba(255, 230, 230, 0.7);
  text-decoration: none;
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid transparent;
  letter-spacing: 0.08em;
  transition: color 0.2s ease, border 0.2s ease, background 0.2s ease;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: #fff;
  border-color: rgba(255, 255, 255, 0.25);
  background: rgba(59, 130, 246, 0.08);
  box-shadow: 0 0 12px rgba(59, 130, 246, 0.25);
}

/* Tablet - 1024px */
@media (max-width: 1024px) {
  .nav-links {
    gap: 12px;
    font-size: 0.9rem;
  }
}

.menu-overlay {
  display: none;
}

/* Mobile - 768px */
@media (max-width: 768px) {
  .menu-toggle {
    display: flex;
  }

  .menu-overlay {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
    z-index: 19;
  }

  .menu-overlay.open {
    opacity: 1;
    visibility: visible;
  }

  .nav-links {
    position: fixed;
    top: 0;
    right: -100%;
    width: 280px;
    height: 100vh;
    background: linear-gradient(180deg, rgba(18, 30, 50, 0.98), rgba(30, 50, 80, 0.95));
    flex-direction: column;
    align-items: flex-start;
    padding: 80px 24px 24px;
    gap: 0;
    transition: right 0.3s ease;
    box-shadow: -4px 0 20px rgba(0, 0, 0, 0.5);
    z-index: 20;
    overflow-y: auto;
  }

  .nav-links.open {
    right: 0;
  }

  .nav-links a {
    width: 100%;
    padding: 14px 16px;
    border-radius: 8px;
    margin-bottom: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .nav-links a:hover,
  .nav-links a.router-link-active {
    background: rgba(59, 130, 246, 0.15);
    border-color: rgba(59, 130, 246, 0.3);
  }
}
</style>

