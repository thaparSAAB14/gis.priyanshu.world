import React from 'react';
import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const CameraRig = () => {
  const data = useScroll();

  useFrame((state, delta) => {
    const { camera, pointer } = state;
    if (data) {
      // Custom mapping suited for the standard HTML sections
      // 0 to 0.4: Fly forward into the clouds slightly, slight downward tilt
      const a = data.range(0, 0.4);
      // 0.3 to 0.8: Huge descent on Y axis into the stars
      const b = data.range(0.3, 0.5);
      
      // Interpolate camera position/rotation for a smooth, dramatic scrollytelling feel
      const targetRotX = -0.15 * Math.PI * a;       // Tilt down 
      const targetPosY = 0 - (15 * b);             // Drop down through the clouds
      const targetPosZ = 6 - (8 * a);              // Push forward smoothly
      
      camera.rotation.x = THREE.MathUtils.damp(camera.rotation.x, targetRotX, 4, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, targetPosY, 4, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, targetPosZ, 4, delta);

      // Lazy mouse parallax on Y and X rotation for extra depth, similar to reference
      camera.rotation.y = THREE.MathUtils.lerp(
        camera.rotation.y, 
        -(pointer.x * Math.PI) / 45, 
        0.05
      );
      
      // We manually add the pointer.y to offset the tilt slightly
      const tiltOffset = -(pointer.y * Math.PI) / 60;
      camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, targetRotX + tiltOffset, 0.05);
    }
  });

  return null;
};

export default CameraRig;
