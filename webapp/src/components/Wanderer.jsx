import React from 'react';
import { useGLTF } from '@react-three/drei';

export function Wanderer(props) {
  const { nodes, materials } = useGLTF('/models/wanderer_above_the_sea_of_fog.glb');
  
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.676}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[-11.413, 3.033, 16.793]} rotation={[0.082, -0.72, 0.054]} scale={53.755}>
            <mesh geometry={nodes.Object_14.geometry} material={materials['media_image_Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog']} scale={0.05} />
          </group>
          <mesh geometry={nodes.Object_4.geometry} material={materials.brush_Ink} position={[-1.085, -5.504, -1.053]} scale={15.005} />
          <mesh geometry={nodes.Object_6.geometry} material={materials.brush_Ink} position={[-67.987, 12.094, 0.873]} scale={301.917} />
          <mesh geometry={nodes.Object_8.geometry} material={materials.brush_Ink} position={[-76.965, 320.305, 42.352]} scale={436.942} />
          <mesh geometry={nodes.Object_10.geometry} material={materials.brush_ThickPaint} position={[-22.074, -11.378, 36.479]} scale={159.654} />
          <mesh geometry={nodes.Object_12.geometry} material={materials.brush_Marker} position={[-2.158, -3.686, -0.914]} scale={0.259} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/models/wanderer_above_the_sea_of_fog.glb');
