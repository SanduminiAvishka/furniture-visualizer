import {
  FURNITURE_SIZES,
  FURNITURE_MATERIALS,
  COLOR_PALETTES,
  MODEL_PATHS,
  THUMBNAIL_PATHS
} from './furnitureModels'

export const FURNITURE_MODELS = {
  chair: {
    type: 'chair',
    name: 'Dining Chair',
    width: FURNITURE_SIZES.CHAIR.width,
    length: FURNITURE_SIZES.CHAIR.length,
    height: FURNITURE_SIZES.CHAIR.height,
    color: COLOR_PALETTES.WOOD[0],
    availableColors: COLOR_PALETTES.WOOD,
    model: MODEL_PATHS.CHAIR,
    thumbnail: THUMBNAIL_PATHS.CHAIR,
    defaultPosition: [0, 0, 0],
    defaultRotation: [0, 0, 0],
    materials: {
      main: 'wood',
      wood: FURNITURE_MATERIALS.WOOD
    }
  },
  table: {
    type: 'table',
    name: 'Dining Table',
    width: FURNITURE_SIZES.TABLE.width,
    length: FURNITURE_SIZES.TABLE.length,
    height: FURNITURE_SIZES.TABLE.height,
    color: COLOR_PALETTES.WOOD[0],
    availableColors: COLOR_PALETTES.WOOD,
    model: MODEL_PATHS.TABLE,
    thumbnail: THUMBNAIL_PATHS.TABLE,
    defaultPosition: [0, 0, 0],
    defaultRotation: [0, 0, 0],
    materials: {
      main: 'wood',
      wood: FURNITURE_MATERIALS.WOOD
    }
  },
  sofa: {
    type: 'sofa',
    name: 'Three Seater Sofa',
    width: FURNITURE_SIZES.SOFA.width,
    length: FURNITURE_SIZES.SOFA.length,
    height: FURNITURE_SIZES.SOFA.height,
    color: COLOR_PALETTES.FABRIC[0],
    availableColors: COLOR_PALETTES.FABRIC,
    model: MODEL_PATHS.SOFA,
    thumbnail: THUMBNAIL_PATHS.SOFA,
    defaultPosition: [0, 0, 0],
    defaultRotation: [0, 0, 0],
    materials: {
      main: 'fabric',
      fabric: FURNITURE_MATERIALS.FABRIC
    }
  },
  bed: {
    type: 'bed',
    name: 'Double Bed',
    width: FURNITURE_SIZES.BED.width,
    length: FURNITURE_SIZES.BED.length,
    height: FURNITURE_SIZES.BED.height,
    color: COLOR_PALETTES.WOOD[0],
    availableColors: COLOR_PALETTES.WOOD,
    model: MODEL_PATHS.BED,
    thumbnail: THUMBNAIL_PATHS.BED,
    defaultPosition: [0, 0, 0],
    defaultRotation: [0, 0, 0],
    materials: {
      main: 'wood',
      wood: FURNITURE_MATERIALS.WOOD
    }
  },
  plant: {
    type: 'plant',
    name: 'Potted Plant',
    width: FURNITURE_SIZES.PLANT.width,
    length: FURNITURE_SIZES.PLANT.length,
    height: FURNITURE_SIZES.PLANT.height,
    color: COLOR_PALETTES.PLANT[0],
    availableColors: COLOR_PALETTES.PLANT,
    model: MODEL_PATHS.PLANT,
    thumbnail: THUMBNAIL_PATHS.PLANT,
    defaultPosition: [0, 0, 0],
    defaultRotation: [0, 0, 0],
    materials: {
      main: 'plant',
      plant: FURNITURE_MATERIALS.PLANT
    }
  }
}

export const FURNITURE_CATEGORIES = {
  seating: ['chair', 'sofa'],
  tables: ['table'],
  bedroom: ['bed'],
  decor: ['plant']
}

export const MATERIAL_PRESETS = {
  wood: FURNITURE_MATERIALS.WOOD,
  fabric: FURNITURE_MATERIALS.FABRIC,
  plant: FURNITURE_MATERIALS.PLANT,
  metal: FURNITURE_MATERIALS.METAL,
  glass: FURNITURE_MATERIALS.GLASS
} 