import React, { useRef } from 'react';
import { Text, useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import GridTile from './GridTile';
import { usePortalStore } from '../store';

// We'll build the inside of the portals next
import WorkPortal from './WorkPortal';
import ProjectsPortal from './ProjectsPortal';

const Experience = () => {
  const titleRef = useRef(null);
  const groupRef = useRef(null);
  const data = useScroll();
  const isActive = usePortalStore((state) => !!state.activePortalId);

  const fontProps = {
    font: '/soria-font.ttf',
    fontSize: 0.4,
    color: 'white',
  };

  useFrame((state, delta) => {
    if (!data) return;
    const d = data.range(0.8, 0.2);
    const e = data.range(0.7, 0.2);

    if (groupRef.current && !isActive) {
      // Reveal the portals at the bottom
      groupRef.current.position.y = d > 0 ? -1 : -30;
      groupRef.current.visible = d > 0;
    }

    if (titleRef.current) {
      titleRef.current.children.forEach((text, i) => {
        const y = Math.max(Math.min((1 - d) * (10 - i), 10), 0.5);
        text.position.y = THREE.MathUtils.damp(text.position.y, y, 7, delta);
        text.fillOpacity = e;
      });
    }
  });

  const getTitle = () => {
    const title = 'YOUR WORK'.toUpperCase();
    return title.split('').map((char, i) => (
      <Text key={i} {...fontProps} position={[i * 0.8, 2, 1]}>
        {char}
      </Text>
    ));
  };

  return (
    // Put this at the very bottom of the cloud dive (-41.5 matching reference)
    <group position={[0, -41.5, 12]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]}>
      <group rotation={[0, 0, Math.PI / 2]}>
        
        <group ref={titleRef} position={[-3.6, 2, -2]}>
          {getTitle()}
        </group>

        <group position={[0, -1, 0]} ref={groupRef}>
          <GridTile 
            title="ACADEMIC BACKGROUND"
            id="work"
            color="#0b0f19" // Dark background for the academic scene
            textAlign="left"
            position={new THREE.Vector3(-2, 0, 0)}
          >
            <WorkPortal />
          </GridTile>
          
          <GridTile 
            title="GIS PROJECTS"
            id="projects"
            color="#05060a" // Dark background for GIS projects
            textAlign="right"
            position={new THREE.Vector3(2, 0, 0)}
          >
            <ProjectsPortal />
          </GridTile>
        </group>
        
      </group>
    </group>
  );
};

export default Experience;
