import boats from './boats.js'
import bobbers from './bobbers.js'
import fish from './fish.js'
import rods from './rods.js'

export const wikiCategories = [
  {
    key: 'boats',
    title: 'Boats & Utility',
    description: 'Hull tiers, module slots, and unlock steps.',
    to: '/wiki/fish-it-boats',
    count: boats.length,
  },
  {
    key: 'bobbers',
    title: 'Bobbers / Floats',
    description: 'Luck, Mutation, and Shiny bonuses.',
    to: '/wiki/fish-it-bobbers',
    count: bobbers.length,
  },
  {
    key: 'fish',
    title: 'Fish Index',
    description: 'Spawn windows, recommended gear, and rarity.',
    to: '/wiki/fish-it-fish',
    count: fish.length,
  },
  {
    key: 'rods',
    title: 'Fishing Rods',
    description: 'From tutorial sticks to event mythics.',
    to: '/wiki/fish-it-rods',
    count: rods.length,
  },
]

export const wikiDataMap = {
  boats,
  bobbers,
  fish,
  rods,
}
 
export default wikiCategories
