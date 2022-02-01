import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei";

import { PAWN_HEIGHT, tilePosition, possiblePositions } from "../utils";

const Pawn = ({ id, color, position, hoverColor, onClick, selected }) => {
  const chosen = selected === id;
  // const group = useRef();
  const { nodes } = useGLTF("/pawn.glb");

  useEffect(() => {
    if (nodes?.chessKitExport) {
      nodes.chessKitExport.traverse((node) => {
        if (node.isObject3D) {
          node.castShadow = true;
          node.receiveShadow = true;
        }
      });
    }
  }, [nodes]);

  return (
    <mesh
      castShadow
      receiveShadow
      position={tilePosition(position.x, position.y, PAWN_HEIGHT)}
      visible
      geometry={nodes.chessKitExport.geometry}
      scale={[0.16, 0.16, 0.16]}
      onClick={(e) => {
        const possibleMoves = possiblePositions(position.x, position.y);
        onClick(id, possibleMoves);
      }}
      rotation={[Math.PI / 2, 0, 0]}
    >
      <meshStandardMaterial
        color={chosen ? hoverColor : color}
        metalness={0}
        roughness={0}
      />
    </mesh>
  );
};

useGLTF.preload("/pawn.glb");

export default Pawn;
