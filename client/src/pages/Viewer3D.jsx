import { Suspense, useState } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { 
  OrbitControls, 
  Environment, 
  PerspectiveCamera,
  TransformControls,
  Grid,
  Text,
  Line,
  Select,
  Html
} from '@react-three/drei'
import { useRoom } from '../context/RoomContext'
import { useNavigate } from 'react-router-dom'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { FURNITURE_MODELS } from '../constants/furniture'
import ErrorBoundary from '../components/ErrorBoundary'
import * as THREE from 'three'
import {
  CAMERA_CONFIG,
  MODEL_SCALING,
  MATERIAL_CONFIG,
  LIGHTING_CONFIG,
  GRID_CONFIG,
  MEASUREMENT_CONFIG,
  FALLBACK_CONFIG,
  ENVIRONMENT_CONFIG
} from '../constants/viewer3dConfig'

function RoomMeasurements({ config }) {
  const offset = MEASUREMENT_CONFIG.OFFSET
  
  return (
    <group>
      {/* Width measurement */}
      <group position={[0, 0, -config.size.length/2 - offset]}>
        <Line 
          points={[[-config.size.width/2, 0, 0], [config.size.width/2, 0, 0]]}
          color={MEASUREMENT_CONFIG.LINE_COLOR}
          lineWidth={MEASUREMENT_CONFIG.LINE_WIDTH}
        />
        <Text
          position={[0, 20, 0]}
          color={MEASUREMENT_CONFIG.TEXT_COLOR}
          fontSize={MEASUREMENT_CONFIG.FONT_SIZE}
          anchorX="center"
          anchorY="middle"
        >
          {`${config.size.width} cm`}
        </Text>
      </group>

      {/* Length measurement */}
      <group position={[-config.size.width/2 - offset, 0, 0]}>
        <Line 
          points={[[0, 0, -config.size.length/2], [0, 0, config.size.length/2]]}
          color={MEASUREMENT_CONFIG.LINE_COLOR}
          lineWidth={MEASUREMENT_CONFIG.LINE_WIDTH}
        />
        <Text
          position={[-20, 20, 0]}
          color={MEASUREMENT_CONFIG.TEXT_COLOR}
          fontSize={MEASUREMENT_CONFIG.FONT_SIZE}
          anchorX="center"
          anchorY="middle"
          rotation={[0, Math.PI/2, 0]}
        >
          {`${config.size.length} cm`}
        </Text>
      </group>

      {/* Height measurement */}
      <group position={[-config.size.width/2 - offset, config.size.height/2, -config.size.length/2]}>
        <Line 
          points={[[0, -config.size.height/2, 0], [0, config.size.height/2, 0]]}
          color={MEASUREMENT_CONFIG.LINE_COLOR}
          lineWidth={MEASUREMENT_CONFIG.LINE_WIDTH}
        />
        <Text
          position={[-20, 0, 0]}
          color={MEASUREMENT_CONFIG.TEXT_COLOR}
          fontSize={MEASUREMENT_CONFIG.FONT_SIZE}
          anchorX="center"
          anchorY="middle"
        >
          {`${config.size.height} cm`}
        </Text>
      </group>
    </group>
  )
}

function ModelWithFallback({ url, ...props }) {
  const [error, setError] = useState(false);
  
  // Always call useLoader regardless of conditions to prevent React hook errors
  const gltf = useLoader(
    GLTFLoader, 
    url, 
    undefined, 
    (err) => {
      console.error(`Error loading model: ${url}`, err);
      setError(true);
    }
  );
  
  // If there's an error, return a colored box
  if (error) {
    return (
      <mesh {...props}>
        <boxGeometry args={[
          props.width || FALLBACK_CONFIG.DEFAULT_WIDTH, 
          props.height || FALLBACK_CONFIG.DEFAULT_HEIGHT, 
          props.length || FALLBACK_CONFIG.DEFAULT_LENGTH
        ]} />
        <meshStandardMaterial color={props.color || FALLBACK_CONFIG.DEFAULT_COLOR} />
      </mesh>
    );
  }
  
  // Apply material to all meshes in the model
  if (gltf && gltf.scene) {
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        // Create a new material with the specified color
        child.material = new THREE.MeshPhysicalMaterial({
          color: props.color || MATERIAL_CONFIG.DEFAULT_COLOR,
          roughness: MATERIAL_CONFIG.ROUGHNESS,
          metalness: MATERIAL_CONFIG.METALNESS,
          transparent: true,
          opacity: props.opacity || 1,
          wireframe: props.wireframe || false
        });
      }
    });
  }
  
  // Clone the model scene to avoid issues with reusing the same object
  const clone = gltf ? gltf.scene.clone() : null;
  
  return clone ? (
    <primitive object={clone} {...props} />
  ) : (
    <mesh {...props}>
      <boxGeometry args={[
        props.width || FALLBACK_CONFIG.DEFAULT_WIDTH, 
        props.height || FALLBACK_CONFIG.DEFAULT_HEIGHT, 
        props.length || FALLBACK_CONFIG.DEFAULT_LENGTH
      ]} />
      <meshStandardMaterial color={props.color || FALLBACK_CONFIG.DEFAULT_COLOR} />
    </mesh>
  );
}

function FurnitureObject({ item, isSelected, onSelect, config }) {
  const [hovered, setHovered] = useState(false);
  const modelUrl = FURNITURE_MODELS[item.type]?.model || '/models/chair.glb';
  
  // Get the furniture-specific scaling if available, otherwise use default
  const furnitureScaling = MODEL_SCALING.FURNITURE_SPECIFIC[item.type] || {
    SCALE_FACTOR: MODEL_SCALING.DEFAULT_SCALE_FACTOR,
    WIDTH_DIVISOR: MODEL_SCALING.WIDTH_DIVISOR,
    HEIGHT_DIVISOR: MODEL_SCALING.HEIGHT_DIVISOR,
    LENGTH_DIVISOR: MODEL_SCALING.LENGTH_DIVISOR,
    Y_OFFSET: 0  // Default to 0 if not specified
  };
  
  // Calculate position and rotation with Y offset adjustment
  const position = [
    item.x - config.size.width/2, 
    (item.height/2) + (furnitureScaling.Y_OFFSET || 0),  // Add Y_OFFSET here
    item.y - config.size.length/2
  ];
  
  const rotation = [0, item.rotation ? (item.rotation * Math.PI) / 180 : 0, 0];

  return (
    <Select enabled={!isSelected}>
      <group
        position={position}
        rotation={rotation}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(item.id);
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <Suspense fallback={
          <mesh>
            <boxGeometry args={[item.width, item.height, item.length]} />
            <meshPhysicalMaterial 
              color={item.color}
              opacity={item.opacity || 1}
              transparent={true}
              wireframe={isSelected || hovered}
            />
          </mesh>
        }>
          <ModelWithFallback 
            url={modelUrl}
            color={item.color}
            opacity={item.opacity || 1}
            wireframe={isSelected || hovered}
            scale={[
              (item.scaleX || 1) * (item.width / furnitureScaling.WIDTH_DIVISOR) * furnitureScaling.SCALE_FACTOR,
              (item.height / furnitureScaling.HEIGHT_DIVISOR) * furnitureScaling.SCALE_FACTOR,
              (item.scaleY || 1) * (item.length / furnitureScaling.LENGTH_DIVISOR) * furnitureScaling.SCALE_FACTOR
            ]}
            width={item.width}
            height={item.height}
            length={item.length}
          />
        </Suspense>
      </group>
      
      {/* Item label */}
      {(isSelected || hovered) && (
        <Html center position={[
          position[0], 
          position[1] + item.height * 0.75, // Adjust label position
          position[2]
        ]}>
          <div className="bg-blue-600 text-white px-2 py-1 rounded text-sm whitespace-nowrap">
            {item.name}
          </div>
        </Html>
      )}
    </Select>
  );
}

function Room({ config, furniture, selectedId, onSelect }) {
  return (
    <group>
      {/* Floor */}
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[config.size.width, config.size.length]} />
        <meshPhysicalMaterial 
          color={config.colorScheme.floor}
          roughness={MATERIAL_CONFIG.FLOOR.ROUGHNESS}
          clearcoat={MATERIAL_CONFIG.FLOOR.CLEARCOAT}
        />
      </mesh>

      {/* Walls */}
      <group position={[0, config.size.height / 2, 0]}>
        {/* Back wall */}
        <mesh 
          position={[0, 0, -config.size.length / 2]}
          castShadow
          receiveShadow
        >
          <planeGeometry args={[config.size.width, config.size.height]} />
          <meshPhysicalMaterial 
            color={config.colorScheme.walls}
            roughness={MATERIAL_CONFIG.WALLS.ROUGHNESS}
          />
        </mesh>

        {/* Side walls */}
        <mesh 
          position={[-config.size.width / 2, 0, 0]} 
          rotation={[0, Math.PI / 2, 0]}
          castShadow
          receiveShadow
        >
          <planeGeometry args={[config.size.length, config.size.height]} />
          <meshPhysicalMaterial 
            color={config.colorScheme.walls}
            roughness={MATERIAL_CONFIG.WALLS.ROUGHNESS}
          />
        </mesh>
        <mesh 
          position={[config.size.width / 2, 0, 0]} 
          rotation={[0, -Math.PI / 2, 0]}
          castShadow
          receiveShadow
        >
          <planeGeometry args={[config.size.length, config.size.height]} />
          <meshPhysicalMaterial 
            color={config.colorScheme.walls}
            roughness={MATERIAL_CONFIG.WALLS.ROUGHNESS}
          />
        </mesh>

        {/* Ceiling */}
        <mesh 
          position={[0, config.size.height / 2, 0]} 
          rotation={[Math.PI / 2, 0, 0]}
          receiveShadow
        >
          <planeGeometry args={[config.size.width, config.size.length]} />
          <meshPhysicalMaterial 
            color={config.colorScheme.ceiling}
            roughness={MATERIAL_CONFIG.CEILING.ROUGHNESS}
          />
        </mesh>
      </group>

      {/* Add measurements if enabled */}
      {config.showMeasurements && <RoomMeasurements config={config} />}

      {/* Furniture */}
      {furniture.map(item => (
        <FurnitureObject
          key={item.id}
          item={item}
          config={config}
          isSelected={selectedId === item.id}
          onSelect={onSelect}
        />
      ))}
    </group>
  )
}

function ViewControls() {
  const { roomConfig, updateRoomConfig } = useRoom()
  const lighting = roomConfig.lighting || { 
    ambient: LIGHTING_CONFIG.DEFAULT_AMBIENT, 
    shadowIntensity: LIGHTING_CONFIG.DEFAULT_SHADOW_INTENSITY 
  }

  return (
    <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 w-80 z-10 transition-all duration-200 hover:bg-white/90">
      <div className="space-y-6">
        {/* Room Shading Controls */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
            </svg>
            Room Shading
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Ambient Light</label>
              <input
                type="range"
                min="0.2"
                max="1"
                step="0.1"
                value={lighting.ambient}
                onChange={(e) => updateRoomConfig({
                  lighting: {
                    ...roomConfig.lighting,
                    ambient: Number(e.target.value)
                  }
                })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Shadow Intensity</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={lighting.shadowIntensity}
                onChange={(e) => updateRoomConfig({
                  lighting: {
                    ...roomConfig.lighting,
                    shadowIntensity: Number(e.target.value)
                  }
                })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* View Options with improved styling */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View Options
          </h3>
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={roomConfig.showGrid}
                onChange={(e) => updateRoomConfig({ showGrid: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Show Grid</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={roomConfig.showMeasurements}
                onChange={(e) => updateRoomConfig({ showMeasurements: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Show Measurements</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

function Viewer3D() {
  const { roomConfig, furniture } = useRoom()
  const [selectedId, setSelectedId] = useState(null)
  const lighting = roomConfig.lighting || { 
    ambient: LIGHTING_CONFIG.DEFAULT_AMBIENT, 
    shadowIntensity: LIGHTING_CONFIG.DEFAULT_SHADOW_INTENSITY 
  }
  const navigate = useNavigate()

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={() => navigate('/editor')}
          className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Switch to 2D View
        </button>
      </div>

      <ViewControls />
      
      <ErrorBoundary>
        <Canvas 
          shadows="soft" 
          dpr={[1, 2]}
          camera={{ 
            position: CAMERA_CONFIG.POSITION,
            fov: CAMERA_CONFIG.FOV,
            near: CAMERA_CONFIG.NEAR,
            far: CAMERA_CONFIG.FAR
          }}
          className="w-full h-full"
          onClick={(event) => {
            if (!event.intersections.length) {
              setSelectedId(null)
            }
          }}
        >
          <Suspense fallback={null}>
            <color attach="background" args={['#f8fafc']} />
            
            <ambientLight intensity={lighting.ambient} />
            <directionalLight
              position={LIGHTING_CONFIG.DIRECTIONAL_LIGHT_POSITION}
              intensity={lighting.shadowIntensity}
              castShadow
              shadow-mapSize={LIGHTING_CONFIG.SHADOW_MAP_SIZE}
            />
            
            <Room 
              config={roomConfig} 
              furniture={furniture}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />

            {roomConfig.showGrid && (
              <Grid
                args={GRID_CONFIG.SIZE}
                position={GRID_CONFIG.POSITION}
                cellSize={GRID_CONFIG.CELL_SIZE}
                cellThickness={GRID_CONFIG.CELL_THICKNESS}
                cellColor={GRID_CONFIG.CELL_COLOR}
                sectionSize={GRID_CONFIG.SECTION_SIZE}
                sectionThickness={GRID_CONFIG.SECTION_THICKNESS}
                sectionColor={GRID_CONFIG.SECTION_COLOR}
                fadeDistance={GRID_CONFIG.FADE_DISTANCE}
                fadeStrength={GRID_CONFIG.FADE_STRENGTH}
                followCamera={false}
              />
            )}
            
            <OrbitControls 
              enableDamping
              dampingFactor={CAMERA_CONFIG.DAMPING_FACTOR}
              minDistance={CAMERA_CONFIG.MIN_DISTANCE}
              maxDistance={CAMERA_CONFIG.MAX_DISTANCE}
              maxPolarAngle={CAMERA_CONFIG.MAX_POLAR_ANGLE}
            />
            
            <Environment preset={ENVIRONMENT_CONFIG.PRESET} />
          </Suspense>
        </Canvas>
      </ErrorBoundary>
    </div>
  )
}

export default Viewer3D 