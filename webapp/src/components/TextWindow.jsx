import React, { useRef } from "react";
import { Text, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const TextWindow = ({ theme = 'dark' }) => {
  const data = useScroll();
  const windowRef = useRef(null);

  useFrame(() => {
    const c = data.range(0.65, 0.15);

    if (windowRef.current) {
      windowRef.current.setRotationFromAxisAngle(new THREE.Vector3(0, -1, 0), 0.5 * Math.PI * c);
      windowRef.current.position.x = -0.6 * c;
      windowRef.current.position.z = -0.6 * c;
    }
  });

  const fontProps = {
    font: "/soria-font.ttf",
  };

  const textColor = theme === 'dark' ? '#f8fafc' : '#0f172a';

  return (
    <group position={[0, -0.3, 0]} ref={windowRef}>
      <Text
        color={textColor}
        anchorX="left"
        anchorY="middle"
        fontSize={1.3}
        position={[0.12, 0, 0]}
        {...fontProps}
        scale={[1, -1, 1]}
        rotation={[0, 0, -Math.PI / 2]}
      >
        GIS RESEARCHER
      </Text>

      <Text
        color={textColor}
        anchorX="right"
        anchorY="middle"
        {...fontProps}
        scale={[-1, -1, 1]}
        fontSize={1.3}
        position={[0.12, 0, -1.4]}
        rotation={[0, 0, -Math.PI / 2]}
      >
        SPATIAL ANALYST
      </Text>

      <group position={[-0.45, 0, -0.3]}>
        <Text
          color={textColor}
          anchorX="left"
          anchorY="middle"
          {...fontProps}
          scale={[1, -1, 1]}
          fontSize={0.8}
          rotation={[0, -Math.PI / 2, -Math.PI / 2]}
        >
          MAPPING ADVOCATE
        </Text>

        <Text
          color={textColor}
          anchorX="left"
          anchorY="middle"
          {...fontProps}
          scale={[1, -1, 1]}
          fontSize={0.8}
          position={[0, 0, -0.6]}
          rotation={[0, -Math.PI / 2, -Math.PI / 2]}
        >
          STORY MAPS
        </Text>
      </group>

      <group position={[0.45, 0, -0.3]}>
        <Text
          color={textColor}
          anchorX="right"
          anchorY="middle"
          {...fontProps}
          scale={[-1, -1, 1]}
          fontSize={0.8}
          rotation={[0, -Math.PI / 2, -Math.PI / 2]}
        >
          DATA DRIVEN
        </Text>
        <Text
          color={textColor}
          anchorX="right"
          anchorY="middle"
          {...fontProps}
          scale={[-1, -1, 1]}
          fontSize={0.8}
          position={[0, 0, -0.6]}
          rotation={[0, -Math.PI / 2, -Math.PI / 2]}
        >
          RESEARCH FOCUSED
        </Text>
      </group>
    </group>
  );
};

export default TextWindow;
