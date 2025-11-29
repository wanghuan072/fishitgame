import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// Guides
import GuidesView from '@/views/guides/GuidesView.vue'
import GuideDetailView from '@/views/guides/GuideDetailView.vue'

// Wiki
import WikiView from '@/views/wiki/WikiView.vue'
import WikiBoatsView from '@/views/wiki/WikiBoatsView.vue'
import WikiBobbersView from '@/views/wiki/WikiBobbersView.vue'
import WikiFishView from '@/views/wiki/WikiFishView.vue'
import WikiRodsView from '@/views/wiki/WikiRodsView.vue'
import WikiDetailView from '@/views/wiki/WikiDetailView.vue'

// Calculator
import CalculatorView from '@/views/calculators/CalculatorView.vue'
import CalculatorRngView from '@/views/calculators/CalculatorRngView.vue'
import CalculatorLuckView from '@/views/calculators/CalculatorLuckView.vue'
import CalculatorValueView from '@/views/calculators/CalculatorValueView.vue'
import CalculatorSecretView from '@/views/calculators/CalculatorSecretView.vue'

// Codes
import CodesView from '@/views/CodesView.vue'

// Search
import SearchView from '@/views/SearchView.vue'

// Legal
import AboutView from '@/views/legal/AboutView.vue'
import ContactView from '@/views/legal/ContactView.vue'
import CopyrightView from '@/views/legal/CopyrightView.vue'
import PrivacyPolicyView from '@/views/legal/PrivacyPolicyView.vue'
import TermsOfServiceView from '@/views/legal/TermsOfServiceView.vue'

// 404
import NotFoundView from '@/views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        seo: {
          title: 'Fish It! - Guide, Wiki, Codes & Calculator | fishitgame.com',
          description: 'The Fish It! resource. Access our complete Wiki database, in-depth Guides, the latest list of working Codes, and a precise Calculator to optimize your setup.',
          keywords: 'Fish It!, Fish It! guide, Fish It! wiki, Fish It! codes, Fish It! calculator, Fish It! game, Fish It! tips, Fish It! tutorial, fishitgame'
        }
      }
    },
    {
      path: '/guides',
      name: 'guides',
      component: GuidesView,
      meta: {
        seo: {
          title: 'Fish It! Guides List, Tips & How-Tos | fishitgame.com',
          description: 'Browse all Fish It! guides and tutorials here. Find beginner tips, advanced strategies, how-to articles to help you level up and master the game.',
          keywords: 'Fish It! guides, Fish It! tutorials, Fish It! tips, Fish It! how-to, Fish It! walkthrough, Fish It! strategy, Fish It! beginner guide, fishitgame'
        }
      }
    },
    {
      path: '/guides/:slug',
      name: 'guide-detail',
      component: GuideDetailView,
    },
    {
      path: '/wiki',
      name: 'wiki',
      component: WikiView,
      meta: {
        seo: {
          title: 'Fish It! Wiki - Boats, Fish, Items & Info | fishitgame.com',
          description: 'Access the complete Fish It! Wiki and game database. Find detailed information on all Boats, Bobbers, Fish types, Fishing areas, and other important items.',
          keywords: 'Fish It! wiki, Fish It! database, Fish It! information, Fish It! data, Fish It! boats, Fish It! fish, Fish It! bobbers, Fish It! fishing spots, fishitgames'
        }
      }
    },
    {
      path: '/wiki/fish-it-boats',
      name: 'wiki-boats',
      component: WikiBoatsView,
      meta: {
        seo: {
          title: 'Fish It! Boats Wiki, Stats, Price | fishitgame.com',
          description: 'Fish It! boats Wiki. Get all data: Name, Coins cost, Acceleration, Passengers capacity, and Top Speed. Find the best boat for your fishing needs quickly!',
          keywords: 'Fish It! boats, Fish It! boat stats, Fish It! boat price, Fish It! boat wiki, how to get Fish It! boats, best Fish It! boat, boat guide, fishitgame'
        }
      }
    },
    {
      path: '/wiki/fish-it-baits',
      name: 'wiki-bobbers',
      component: WikiBobbersView,
      meta: {
        seo: {
          title: 'Fish It! Bobbers Wiki, Stats, Price | fishitgame.com',
          description: 'Complete Fish It! bobbers Wiki. Find Name, Description, Stats, Price, and Obtainment methods for all bobbers. Use the best float to improve your fishing success.',
          keywords: 'Fish It! bobbers, Fish It! bobber stats, Fish It! bobber price, Fish It! bobber wiki, how to get bobbers, best Fish It! bobber, fishing floats, fishitgame'
        }
      }
    },
    {
      path: '/wiki/fish-it-fish',
      name: 'wiki-fish',
      component: WikiFishView,
      meta: {
        seo: {
          title: 'Fish It! Fish Wiki, Value, Location | fishitgame.com',
          description: 'The complete Fish It! fish Wiki database. Find every Fish Name, Rarity details, and exact Location data to help you locate and complete your catch list.',
          keywords: 'Fish It! fish, Fish It! fish list, Fish It! fish rarity, Fish It! fish location, all Fish It! fish names, fish wiki, fishitgame'
        }
      }
    },
    {
      path: '/wiki/fish-it-rods',
      name: 'wiki-rods',
      component: WikiRodsView,
      meta: {
        seo: {
          title: 'Fish It! Rods Wiki - Name & Acquisition  | fishitgame.com',
          description: 'Complete Fish It! rods Wiki database. Includes Name, Price, Luck, Speed, Weight data, and Acquisition methods for all fishing rods. Optimize your gear now!',
          keywords: 'Fish It! rods, Fish It! rod stats, Fish It! rod price, Fish It! rod wiki, how to get rods, best Fish It! rod, fishing rod guide, fishitgame'
        }
      }
    },
    {
      path: '/wiki/:category/:slug',
      name: 'wiki-detail',
      component: WikiDetailView,
    },
    {
      path: '/calculator',
      name: 'calculator',
      component: CalculatorView,
      meta: {
        seo: {
          title: 'Fish It! Calculators - Luck, Value, RNG | fishitgame.com',
          description: 'Essential Fish It! Calculators: Luck, Value, RNG, and Secret Fish. Get precise estimates for profits and maximize your chance of catching rare fish.',
          keywords: 'Fish It! calculator, Luck Calculator, Value Calculator, RNG Calculator, Secret Fish Calculator, Fish It! tools, profit calculator, fishitgame'
        }
      }
    },
    {
      path: '/calculator/fish-it-rng-calculator',
      name: 'calculator-rng',
      component: CalculatorRngView,
      meta: {
        seo: {
          title: 'Fish It! RNG Calculator - Catch Odds & Success Chance | fishitgame.com',
          description: 'Use the Fish It! RNG Calculator to determine your exact catch odds and success chance. Input your stats to calculate the probability of catching rare and secret fish.',
          keywords: 'Fish It! RNG calculator, catch odds calculator, success chance, rare fish probability, secret fish odds, Fish It! calculator, fishitgame'
        }
      }
    },
    {
      path: '/calculator/fish-it-luck-calculator',
      name: 'calculator-luck',
      component: CalculatorLuckView,
      meta: {
        seo: {
          title: 'Fish It! Luck Calculator - Chance Boost & Odds Tool | fishitgame.com',
          description: 'Use the Fish It! Luck Calculator to see how your luck stat affects catch chance and rarity boost. Input gear and stats to maximize your odds for rare drops.',
          keywords: 'Fish It! Luck Calculator, luck stat, rarity chance, luck boost, catch probability, Fish It! calculator, fishitgame'
        }
      }
    },
    {
      path: '/calculator/fish-it-value-calculator',
      name: 'calculator-value',
      component: CalculatorValueView,
      meta: {
        seo: {
          title: 'Fish It! Value Calculator - Profit, Earnings & Selling Guide | fishitgame.com',
          description: 'Use the Fish It! Value Calculator to determine the profit and sell value of items and fish. Calculate potential earnings and optimize your farming strategy.',
          keywords: 'Fish It! Value Calculator, profit calculator, sell price, earnings calculator, farming strategy, Fish It! calculator, fishitgame'
        }
      }
    },
    {
      path: '/calculator/fish-it-secret-calculator',
      name: 'calculator-secret',
      component: CalculatorSecretView,
      meta: {
        seo: {
          title: 'Fish It! Secret Fish Calculator - Unlock & Catch Chance | fishitgame.com',
          description: 'Use the Secret Fish Calculator to determine the odds and requirements for all secret fish. Get the best gear and stats to unlock and catch the rarest fish in Fish It!',
          keywords: 'Fish It! Secret Fish Calculator, unlock requirements, rare fish odds, secret fish chance, rarest fish, Fish It! calculator, fishitgame'
        }
      }
    },
    {
      path: '/codes',
      name: 'codes',
      component: CodesView,
      meta: {
        seo: {
          title: 'Fish It! Codes, Active List, Rewards | fishitgame.com',
          description: 'Get the latest list of working Fish It! Codes here. We update daily with new codes for free in-game rewards. Find all active gift codes quickly and easily.',
          keywords: 'Fish It! codes, Fish It! working codes, Fish It! active codes, Fish It! redeem codes, Fish It! free rewards, Fish It! gift codes, fishitgame'
        }
      }
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView,
      meta: {
        seo: {
          title: 'Search - Fish It! Guides, Wiki & More | fishitgame.com',
          description: 'Search through all Fish It! guides, wiki items, boats, baits, fish, and rods. Find exactly what you need quickly.',
          keywords: 'Fish It! search, search guides, search wiki, Fish It! find, fishitgame'
        }
      }
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      meta: {
        seo: {
          title: 'About FishItgame.com | Community Wiki & Tools',
          description: 'Learn who maintains FishItgame.com and how we collect, review, and publish Fish It! guides, wiki updates, and calculators.',
          keywords: 'Fish It about, fishitgame team, fish it wiki maintainers'
        }
      }
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
      meta: {
        seo: {
          title: 'Contact FishItgame.com | Feedback & Support',
          description: 'Need help or want to report incorrect data? Contact the FishItgame.com maintainers via email. We reply within one business day.',
          keywords: 'Fish It contact, fishitgame support, fish it feedback'
        }
      }
    },
    {
      path: '/copyright',
      name: 'copyright',
      component: CopyrightView,
      meta: {
        seo: {
          title: 'Copyright Policy | FishItgame.com',
          description: 'Read the FishItgame.com copyright policy, fair use guidance, and DMCA contact details.',
          keywords: 'Fish It copyright, DMCA, fishitgame legal'
        }
      }
    },
    {
      path: '/privacy-policy',
      name: 'privacy-policy',
      component: PrivacyPolicyView,
      meta: {
        seo: {
          title: 'Privacy Policy | FishItgame.com',
          description: 'Understand what information FishItgame.com collects and how it is used to support the Fish It! community.',
          keywords: 'Fish It privacy policy, data policy, fishitgame privacy'
        }
      }
    },
    {
      path: '/terms-of-service',
      name: 'terms-of-service',
      component: TermsOfServiceView,
      meta: {
        seo: {
          title: 'Terms of Service | FishItgame.com',
          description: 'Review the FishItgame.com terms of service covering acceptable use, disclaimers, and legal notices.',
          keywords: 'Fish It terms, fishitgame terms of service'
        }
      }
    },
    // 旧路径重定向 - Guides
    {
      path: '/fish-it-guides',
      redirect: '/guides'
    },
    {
      path: '/fish-it-guides/:slug',
      redirect: (to) => `/guides/${to.params.slug}`
    },
    // 错误路径重定向 - 缺少斜杠
    {
      path: '/fish-it-guidesultimate-progression-locations',
      redirect: '/fish-it-guides/ultimate-progression-locations'
    },
    // 旧路径重定向 - Wiki
    {
      path: '/fish-it-wiki',
      redirect: '/wiki'
    },
    {
      path: '/fish-it-wiki/boats',
      redirect: '/wiki/fish-it-boats'
    },
    {
      path: '/fish-it-wiki/bobbers',
      redirect: '/wiki/fish-it-baits'
    },
    {
      path: '/fish-it-wiki/fish',
      redirect: '/wiki/fish-it-fish'
    },
    {
      path: '/fish-it-wiki/rods',
      redirect: '/wiki/fish-it-rods'
    },
    {
      path: '/fish-it-wiki/boats/:slug',
      redirect: (to) => `/wiki/fish-it-boats/${to.params.slug}`
    },
    {
      path: '/fish-it-wiki/bobbers/:slug',
      redirect: (to) => `/wiki/fish-it-baits/${to.params.slug}`
    },
    {
      path: '/fish-it-wiki/fish/:slug',
      redirect: (to) => `/wiki/fish-it-fish/${to.params.slug}`
    },
    {
      path: '/fish-it-wiki/rods/:slug',
      redirect: (to) => `/wiki/fish-it-rods/${to.params.slug}`
    },
    {
      path: '/wiki/boats',
      redirect: '/wiki/fish-it-boats'
    },
    {
      path: '/wiki/bobbers',
      redirect: '/wiki/fish-it-baits'
    },
    {
      path: '/wiki/fish',
      redirect: '/wiki/fish-it-fish'
    },
    {
      path: '/wiki/rods',
      redirect: '/wiki/fish-it-rods'
    },
    {
      path: '/wiki/boats/:slug',
      redirect: (to) => `/wiki/fish-it-boats/${to.params.slug}`
    },
    {
      path: '/wiki/bobbers/:slug',
      redirect: (to) => `/wiki/fish-it-baits/${to.params.slug}`
    },
    // 旧路径重定向 - Bobbers 到 Baits
    {
      path: '/wiki/fish-it-bobbers',
      redirect: '/wiki/fish-it-baits'
    },
    {
      path: '/wiki/fish-it-bobbers/:slug',
      redirect: (to) => `/wiki/fish-it-baits/${to.params.slug}`
    },
    {
      path: '/wiki/fish/:slug',
      redirect: (to) => `/wiki/fish-it-fish/${to.params.slug}`
    },
    {
      path: '/wiki/rods/:slug',
      redirect: (to) => `/wiki/fish-it-rods/${to.params.slug}`
    },
    // 旧路径重定向 - Calculator
    {
      path: '/fish-it-calculator',
      redirect: '/calculator'
    },
    {
      path: '/fish-it-calculator/fish-it-rng-calculator',
      redirect: '/calculator/fish-it-rng-calculator'
    },
    {
      path: '/fish-it-calculator/fish-it-luck-calculator',
      redirect: '/calculator/fish-it-luck-calculator'
    },
    {
      path: '/fish-it-calculator/fish-it-value-calculator',
      redirect: '/calculator/fish-it-value-calculator'
    },
    {
      path: '/fish-it-calculator/fish-it-secret-calculator',
      redirect: '/calculator/fish-it-secret-calculator'
    },
    // 旧路径重定向 - Codes
    {
      path: '/fish-it-codes',
      redirect: '/codes'
    },
    // 404 页面 - 所有未匹配的路径显示404页面
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
      meta: {
        seo: {
          title: '404 - Page Not Found | fishitgame.com',
          description: 'The page you are looking for does not exist. Return to the Fish It! homepage or browse our Wiki, Guides, Calculator, and Codes.',
          keywords: '404, page not found, fishitgame'
        }
      }
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
