import { Environment, Loader, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
// import { Panel } from "./Panel";
import { WoodPanel } from "./WoodPanel";

const Render = () => {
  return (
    <div id="react-3d">
      <Canvas>
        <PerspectiveCamera
          makeDefault
          position={[0, 1.5, 3.5]}
          rotation-x={-Math.PI * 0.1}
        />
        <Environment preset="warehouse" />
        <Suspense fallback={null}>
          <WoodPanel />
        </Suspense>
      </Canvas>
      <Loader />
    </div>
  );
};

export default Render;
