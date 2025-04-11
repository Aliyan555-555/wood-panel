import { useTexture } from "@react-three/drei";

import { useEffect, useRef } from "react";
import { MeshStandardMaterial, RepeatWrapping } from "three";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const CoreMaterial = () => {
  const materialRef = useRef<MeshStandardMaterial>(null);
  const { material, thickness } = useSelector((root:RootState) =>root.base)

  useEffect(() => {
    const texture = materialRef.current!.map;

    texture!.wrapS = texture!.wrapT = RepeatWrapping;
    texture!.offset.set(0, 0);
    texture!.repeat.set(1, 0.75 + Number(thickness.value));
    texture!.needsUpdate = true;
  }, [thickness]);

  return (
    <meshStandardMaterial
      ref={materialRef}
      roughness={0.5}
      metalness={1}
      map={useTexture(material.source ? material.source : `/cores/empty.png`, (texture) => {
        texture.flipY = false;
        texture.needsUpdate = true;
      })}
    />
  );
};

export default CoreMaterial;
