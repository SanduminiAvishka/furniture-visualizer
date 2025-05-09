// 3D Viewer Configuration

// Camera Settings
export const CAMERA_CONFIG = {
  POSITION: [400, 400, 400],
  FOV: 35,
  NEAR: 0.1,
  FAR: 2000,
  MIN_DISTANCE: 100,
  MAX_DISTANCE: 1000,
  MAX_POLAR_ANGLE: Math.PI / 2.1,
  DAMPING_FACTOR: 0.05
}

// Model Scaling
export const MODEL_SCALING = {
  DEFAULT_SCALE_FACTOR: 15,  // Increased from 5 to make models bigger
  WIDTH_DIVISOR: 10,
  HEIGHT_DIVISOR: 20,
  LENGTH_DIVISOR: 10,
  // Add specific scaling factors for different furniture types
  FURNITURE_SPECIFIC: {
    chair: {
      SCALE_FACTOR: 12,
      WIDTH_DIVISOR: 10,
      HEIGHT_DIVISOR: 15,
      LENGTH_DIVISOR: 10,
      Y_OFFSET: -50
    },
    table: {
      SCALE_FACTOR: 57,
      WIDTH_DIVISOR: 10,
      HEIGHT_DIVISOR: 15,
      LENGTH_DIVISOR: 10,
      Y_OFFSET: -40
    },
    sofa: {
      SCALE_FACTOR: 18,
      WIDTH_DIVISOR: 10,
      HEIGHT_DIVISOR: 25,
      LENGTH_DIVISOR: 10,
      Y_OFFSET: -50
    },
    bed: {
      SCALE_FACTOR: 8,
      WIDTH_DIVISOR: 15,
      HEIGHT_DIVISOR: 3,
      LENGTH_DIVISOR: 15,
      Y_OFFSET: -20
    },
    plant: {
      SCALE_FACTOR: 5,
      WIDTH_DIVISOR: 20,
      HEIGHT_DIVISOR: 30,
      LENGTH_DIVISOR: 20,
      Y_OFFSET: -30
    }
  }
}

// Material Properties
export const MATERIAL_CONFIG = {
  DEFAULT_COLOR: "#ffffff",
  ROUGHNESS: 0.7,
  METALNESS: 0.2,
  FLOOR: {
    ROUGHNESS: 0.8,
    CLEARCOAT: 0.2
  },
  WALLS: {
    ROUGHNESS: 0.7
  },
  CEILING: {
    ROUGHNESS: 0.9
  },
  SELECTED: {
    EMISSIVE: "#ffffff",
    EMISSIVE_INTENSITY: 0.2
  }
}

// Lighting Configuration
export const LIGHTING_CONFIG = {
  DEFAULT_AMBIENT: 0.5,
  DEFAULT_SHADOW_INTENSITY: 0.3,
  DIRECTIONAL_LIGHT_POSITION: [10, 10, 10],
  SHADOW_MAP_SIZE: [2048, 2048]
}

// Grid Configuration
export const GRID_CONFIG = {
  SIZE: [1000, 1000],
  POSITION: [0, 0.01, 0],
  CELL_SIZE: 50,
  CELL_THICKNESS: 0.5,
  CELL_COLOR: "#94a3b8",
  SECTION_SIZE: 100,
  SECTION_THICKNESS: 1,
  SECTION_COLOR: "#64748b",
  FADE_DISTANCE: 1000,
  FADE_STRENGTH: 1
}

// Measurement Configuration
export const MEASUREMENT_CONFIG = {
  OFFSET: 50,
  LINE_COLOR: "black",
  LINE_WIDTH: 2,
  TEXT_COLOR: "black",
  FONT_SIZE: 20
}

// Model Fallback Configuration
export const FALLBACK_CONFIG = {
  DEFAULT_WIDTH: 100,
  DEFAULT_HEIGHT: 100,
  DEFAULT_LENGTH: 100,
  DEFAULT_COLOR: "hotpink"
}

// Environment Configuration
export const ENVIRONMENT_CONFIG = {
  PRESET: "sunset"
} 