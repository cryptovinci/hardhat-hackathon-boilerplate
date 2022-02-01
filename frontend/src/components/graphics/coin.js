import React, { useRef } from "react";
import { useFrame } from "react-three-fiber";

const Coin = ({ position }) => {
  const ref = useRef();
  // Hold state for hovered and clicked events
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.y += 0.01));
  return (
    <mesh
      ref={ref}
      scale={[0.03, 0.03, 0.03]}
      castShadow
      receiveShadow
      position={position}
      visible
    >
      <ambientLight intensity={0.5} />
      <torusBufferGeometry attach="geometry" args={[10, 3, 16, 100]} />
      <meshPhongMaterial attach="material" shininess={150} color="blue" />
    </mesh>
  );
};

export default Coin;
