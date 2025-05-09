// Furniture models configuration 

// Model size settings
export const FURNITURE_SIZES = {
  CHAIR: {
    width: 50,
    length: 50,
    height: 90,
  },
  TABLE: {
    width: 150,
    length: 90,
    height: 75,
  },
  SOFA: {
    width: 200,
    length: 85,
    height: 85,
  },
  BED: {
    width: 160,
    length: 220,
    height: 40,
  },
  PLANT: {
    width: 30,
    length: 30,
    height: 60,
  },
  BOOKSHELF: {
    width: 100,
    length: 40,
    height: 180,
  },
  DESK: {
    width: 120,
    length: 60,
    height: 75,
  },
  CABINET: {
    width: 80,
    length: 40,
    height: 120,
  }
}

// Material properties
export const FURNITURE_MATERIALS = {
  WOOD: {
    roughness: 0.5,
    metalness: 0.1,
    clearcoat: 0.2,
  },
  FABRIC: {
    roughness: 0.9,
    metalness: 0,
    clearcoat: 0,
  },
  METAL: {
    roughness: 0.2,
    metalness: 0.8,
    clearcoat: 0.5,
  },
  GLASS: {
    roughness: 0.1,
    metalness: 0.2,
    clearcoat: 1.0,
    transparency: 0.8,
  },
  PLANT: {
    roughness: 0.8,
    metalness: 0,
    clearcoat: 0.1,
  }
}

// Color palettes
export const COLOR_PALETTES = {
  WOOD: ['#8B4513', '#A0522D', '#6B4423', '#8B7355', '#CD853F'],
  FABRIC: ['#696969', '#808080', '#A9A9A9', '#C0C0C0', '#D3D3D3'],
  PLANT: ['#228B22', '#008000', '#006400', '#556B2F'],
  METAL: ['#C0C0C0', '#A9A9A9', '#808080', '#778899'],
  GLASS: ['#F0FFFF', '#E0FFFF', '#B0E0E6', '#AFEEEE', '#00CED1']
}

// Model paths
export const MODEL_PATHS = {
  CHAIR: '/models/chair.glb',
  TABLE: '/models/table.glb',
  SOFA: '/models/chair.glb', // Fallback to chair since sofa not available
  BED: '/models/bed.glb',
  PLANT: '/models/pot_plant.glb',
  BOOKSHELF: '/models/chair.glb', // Fallback
  DESK: '/models/table.glb', // Fallback
  CABINET: '/models/chair.glb' // Fallback
}

// Thumbnail paths
export const THUMBNAIL_PATHS = {
  CHAIR: '/thumbnails/chair.png',
  TABLE: '/thumbnails/table.png',
  SOFA: '/thumbnails/sofa.png',
  BED: '/thumbnails/bed.png',
  PLANT: '/thumbnails/plant.png',
  BOOKSHELF: '/thumbnails/bookshelf.png',
  DESK: '/thumbnails/desk.png',
  CABINET: '/thumbnails/cabinet.png'
}

// Furniture category mappings
export const FURNITURE_CATEGORIES = {
  SEATING: ['CHAIR', 'SOFA'],
  TABLES: ['TABLE', 'DESK'],
  BEDROOM: ['BED'],
  STORAGE: ['BOOKSHELF', 'CABINET'],
  DECOR: ['PLANT']
} 