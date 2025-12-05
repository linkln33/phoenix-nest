// Demo listings data - used as fallback when database is not available
export const demoListings = [
  {
    id: "listing-1",
    sellerId: "user-1",
    title: "Elixir of Eternal Youth",
    description: "A potent elixir brewed under a full moon, granting vitality and youth. Crafted from rare moonpetals and phoenix tears. One drop restores energy, three drops reverse aging by a decade. Warning: Use responsibly.",
    price: 10000000000, // 10 GUL
    category: "elixirs",
    images: [
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=800&fit=crop",
    ],
    sold: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "listing-2",
    sellerId: "user-2",
    title: "Ancient Grimoire of Shadows",
    description: "A rare spell book containing forgotten incantations and dark rituals. Bound in dragonhide with silver clasps. Contains over 500 spells including protection, summoning, and transformation magic. Handle with care.",
    price: 50000000000, // 50 GUL
    category: "books",
    images: [
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop",
    ],
    sold: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "listing-3",
    sellerId: "user-1",
    title: "Moonpetal Potion",
    description: "A shimmering potion crafted from rare moonpetals, enhancing intuition and psychic abilities. Glows softly in the dark. Perfect for divination rituals and dream work. Fresh batch, harvested during the last blue moon.",
    price: 15000000000, // 15 GUL
    category: "potions",
    images: [
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=800&fit=crop",
    ],
    sold: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "listing-4",
    sellerId: "user-2",
    title: "Dragon's Breath Incense",
    description: "Hand-rolled incense with a fiery aroma, perfect for protection rituals. Made from dragon scale powder and sacred herbs. Burns for 3 hours, creates a protective aura. Ideal for warding off negative energies.",
    price: 8000000000, // 8 GUL
    category: "incense",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=800&fit=crop",
    ],
    sold: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "listing-5",
    sellerId: "user-3",
    title: "Amethyst Protection Crystal",
    description: "A powerful amethyst crystal charged under the stars for protection and spiritual growth. Enhances intuition and wards off negative energy. Comes with a hand-woven leather cord. Size: 3 inches.",
    price: 12000000000, // 12 GUL
    category: "crystals",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=800&fit=crop",
    ],
    sold: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "listing-6",
    sellerId: "user-1",
    title: "Rare Herbs Bundle - Protection Mix",
    description: "A carefully curated bundle of rare protective herbs: sage, rosemary, lavender, and mugwort. Hand-harvested during the solstice. Perfect for cleansing rituals and protection spells. Includes instructions.",
    price: 6000000000, // 6 GUL
    category: "herbs",
    images: [
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop",
    ],
    sold: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "listing-7",
    sellerId: "user-3",
    title: "Enchanted Talisman of Fortune",
    description: "A silver talisman inscribed with ancient runes for luck and prosperity. Blessed by three high priestesses. Wear it close to your heart for maximum effect. Comes in a velvet pouch.",
    price: 20000000000, // 20 GUL
    category: "talismans",
    images: [
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop",
    ],
    sold: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "listing-8",
    sellerId: "user-2",
    title: "Sacred Ritual Candles Set",
    description: "A set of 7 hand-dipped candles in black, white, red, green, blue, yellow, and purple. Made with beeswax and essential oils. Each candle is consecrated for specific rituals. Burn time: 4 hours each.",
    price: 10000000000, // 10 GUL
    category: "candles",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=800&fit=crop",
    ],
    sold: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "listing-9",
    sellerId: "user-1",
    title: "Mystical Essential Oil Blend",
    description: "A powerful blend of essential oils: frankincense, myrrh, sandalwood, and patchouli. Charged with lunar energy. Use for anointing, meditation, or adding to ritual baths. 30ml bottle.",
    price: 7000000000, // 7 GUL
    category: "oils",
    images: [
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=800&fit=crop",
    ],
    sold: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "listing-10",
    sellerId: "user-3",
    title: "Quartz Crystal Cluster",
    description: "A beautiful clear quartz cluster from the mountains. Excellent for energy cleansing and amplification. Size: 5 inches. Perfect for altars or meditation spaces. Includes care instructions.",
    price: 9000000000, // 9 GUL
    category: "crystals",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=800&fit=crop",
    ],
    sold: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "listing-11",
    sellerId: "user-2",
    title: "Spell Book: Elemental Magic",
    description: "A comprehensive guide to elemental magic with over 200 spells. Covers fire, water, earth, and air magic. Includes illustrations and step-by-step instructions. Hardcover, 400 pages.",
    price: 25000000000, // 25 GUL
    category: "books",
    images: [
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop",
    ],
    sold: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "listing-12",
    sellerId: "user-1",
    title: "Love Potion No. 9",
    description: "A classic love potion made from rose petals, honey, and a drop of starlight. Enhances attraction and deepens emotional connections. Use with intention and respect for free will. 50ml bottle.",
    price: 18000000000, // 18 GUL
    category: "potions",
    images: [
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=800&fit=crop",
    ],
    sold: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "listing-13",
    sellerId: "user-3",
    title: "Black Obsidian Mirror",
    description: "A hand-polished black obsidian scrying mirror for divination and spirit communication. Framed in ancient oak with protective runes carved around the edge. Perfect for seeing into other realms and receiving visions.",
    price: 35000000000, // 35 GUL
    category: "ritual",
    images: [
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop",
    ],
    sold: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "listing-14",
    sellerId: "user-2",
    title: "Dragon's Blood Resin",
    description: "Premium dragon's blood resin from ancient trees. Used for protection, banishing, and strengthening spells. Comes in a 100g block. Burn on charcoal or use in spell work. Very potent and rare.",
    price: 22000000000, // 22 GUL
    category: "incense",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=800&fit=crop",
    ],
    sold: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "listing-15",
    sellerId: "user-1",
    title: "Phoenix Feather Quill",
    description: "An authentic phoenix feather quill for writing spells and sigils. Imbued with fire magic, anything written with this quill carries extra power. Comes with a bottle of enchanted ink. Handle with care - feathers are extremely rare.",
    price: 40000000000, // 40 GUL
    category: "ritual",
    images: [
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop",
    ],
    sold: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "listing-16",
    sellerId: "user-3",
    title: "Celestial Alignment Crystals Set",
    description: "A complete set of 12 crystals aligned with the zodiac signs. Each crystal is charged during its corresponding astrological period. Includes amethyst, citrine, rose quartz, and more. Perfect for astrological magic and personal alignment.",
    price: 30000000000, // 30 GUL
    category: "crystals",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=800&fit=crop",
    ],
    sold: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "listing-17",
    sellerId: "user-2",
    title: "Ancient Rune Stones Set",
    description: "A complete set of 24 hand-carved rune stones made from yew wood. Each rune is inscribed with traditional symbols and blessed by a rune master. Includes a velvet pouch and instruction booklet for divination.",
    price: 28000000000, // 28 GUL
    category: "ritual",
    images: [
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop",
    ],
    sold: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

