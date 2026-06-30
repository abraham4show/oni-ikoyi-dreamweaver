import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Html } from "@react-three/drei";
import { Loader2, Sun, Moon } from "lucide-react";

const HouseModel = () => {
  return (
    <group>
      {/* Foundation / Base */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[4, 0.2, 3]} />
        <meshStandardMaterial color="#d4c5a9" />
      </mesh>

      {/* Main Building Body */}
      <mesh position={[0, 1.1, 0]}>
        <boxGeometry args={[3.8, 1.8, 2.8]} />
        <meshStandardMaterial color="#f5f0e8" />
      </mesh>

      {/* Second Floor Setback */}
      <mesh position={[0.3, 2.8, 0]}>
        <boxGeometry args={[3, 1.6, 2.4]} />
        <meshStandardMaterial color="#f0ebe0" />
      </mesh>

      {/* Roof */}
      <mesh position={[0.3, 3.75, 0]}>
        <boxGeometry args={[3.2, 0.15, 2.6]} />
        <meshStandardMaterial color="#2a3a52" />
      </mesh>

      {/* Windows - Ground Floor */}
      {[[-1.2, 0.9, 1.41], [0, 0.9, 1.41], [1.2, 0.9, 1.41]].map((pos, i) => (
        <mesh key={`gw-${i}`} position={pos as [number, number, number]}>
          <boxGeometry args={[0.6, 0.8, 0.02]} />
          <meshStandardMaterial color="#87ceeb" metalness={0.3} roughness={0.1} />
        </mesh>
      ))}

      {/* Windows - Upper Floor */}
      {[[-0.6, 2.7, 1.21], [0.6, 2.7, 1.21]].map((pos, i) => (
        <mesh key={`uw-${i}`} position={pos as [number, number, number]}>
          <boxGeometry args={[0.7, 0.9, 0.02]} />
          <meshStandardMaterial color="#87ceeb" metalness={0.3} roughness={0.1} />
        </mesh>
      ))}

      {/* Door */}
      <mesh position={[0, 0.6, 1.41]}>
        <boxGeometry args={[0.5, 1.0, 0.02]} />
        <meshStandardMaterial color="#5a3825" />
      </mesh>

      {/* Balcony */}
      <mesh position={[1.4, 2.0, 1.5]}>
        <boxGeometry args={[1.2, 0.08, 0.6]} />
        <meshStandardMaterial color="#d4c5a9" />
      </mesh>
      {/* Balcony Railing */}
      <mesh position={[1.4, 2.25, 1.8]}>
        <boxGeometry args={[1.2, 0.5, 0.04]} />
        <meshStandardMaterial color="#c9961a" opacity={0.6} transparent />
      </mesh>

      {/* Pool */}
      <mesh position={[0, 0.02, -2.2]}>
        <boxGeometry args={[2.5, 0.04, 1.2]} />
        <meshStandardMaterial color="#4a9eda" metalness={0.1} roughness={0.05} />
      </mesh>
      <mesh position={[0, 0.01, -2.2]}>
        <boxGeometry args={[2.7, 0.02, 1.4]} />
        <meshStandardMaterial color="#d4c5a9" />
      </mesh>

      {/* Garage */}
      <mesh position={[-2.5, 0.65, 0.3]}>
        <boxGeometry args={[1.2, 1.1, 2]} />
        <meshStandardMaterial color="#e8e0d0" />
      </mesh>
      <mesh position={[-2.5, 0.55, 1.31]}>
        <boxGeometry args={[0.9, 0.8, 0.02]} />
        <meshStandardMaterial color="#8b7355" />
      </mesh>

      {/* Landscaping - Trees */}
      {[[2.5, 0, 1.5], [-2.5, 0, -1.5], [2.5, 0, -1.5]].map((pos, i) => (
        <group key={`tree-${i}`} position={pos as [number, number, number]}>
          <mesh position={[0, 0.4, 0]}>
            <cylinderGeometry args={[0.05, 0.08, 0.8]} />
            <meshStandardMaterial color="#5a3825" />
          </mesh>
          <mesh position={[0, 1.0, 0]}>
            <sphereGeometry args={[0.4, 8, 8]} />
            <meshStandardMaterial color="#2d5a27" />
          </mesh>
        </group>
      ))}

      {/* Ground */}
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#4a7a3d" />
      </mesh>
    </group>
  );
};

const LoadingFallback = () => (
  <Html center>
    <div className="flex items-center gap-2 text-muted-foreground">
      <Loader2 className="animate-spin" size={20} />
      <span className="text-sm">Loading 3D Model...</span>
    </div>
  </Html>
);

const PropertyViewer3D = () => {
  const [lighting, setLighting] = useState<"day" | "night">("day");

  return (
    <div className="relative w-full aspect-[16/10] bg-gradient-to-b from-muted/30 to-muted/60 rounded overflow-hidden border border-border">
      {/* Controls overlay */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <button
          onClick={() => setLighting(lighting === "day" ? "night" : "day")}
          className="p-2 bg-background/80 backdrop-blur-sm border border-border rounded-full hover:bg-background transition-colors"
          title="Toggle lighting"
        >
          {lighting === "day" ? <Moon size={16} /> : <Sun size={16} />}
        </button>
      </div>

      <div className="absolute bottom-4 left-4 z-10">
        <p className="text-xs text-muted-foreground bg-background/70 backdrop-blur-sm px-3 py-1.5 rounded-full">
          Drag to rotate · Scroll to zoom · Shift+drag to pan
        </p>
      </div>

      <Canvas
        camera={{ position: [6, 4, 6], fov: 45 }}
        shadows
        gl={{ antialias: true }}
      >
        <Suspense fallback={<LoadingFallback />}>
          {lighting === "day" ? (
            <>
              <ambientLight intensity={0.5} />
              <directionalLight position={[8, 10, 5]} intensity={1.2} castShadow />
              <Environment preset="city" />
            </>
          ) : (
            <>
              <ambientLight intensity={0.15} />
              <directionalLight position={[5, 8, 3]} intensity={0.4} color="#a0b4d0" castShadow />
              <pointLight position={[0, 3, 2]} intensity={0.8} color="#ffd699" />
              <Environment preset="night" />
            </>
          )}
          <HouseModel />
          <ContactShadows position={[0, -0.01, 0]} opacity={0.4} blur={2} />
          <OrbitControls
            enablePan
            enableZoom
            enableRotate
            minDistance={4}
            maxDistance={15}
            maxPolarAngle={Math.PI / 2.1}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default PropertyViewer3D;
