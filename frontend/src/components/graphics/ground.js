import React from "react";
import { tilePosition } from "../utils.js";
import { useTexture } from "@react-three/drei";

const SCALE = 1;
const GRID_LENGTH = 8;
const INCREMENT = (GRID_LENGTH - 1) / 2;
const GROUND_LEVEL = 0;
const WASHER_LEVEL = 0.2;
const BOARD_WIDTH = 0.2;

const blackTextureRoot = "/textures/wood/white/";
const whiteTextureRoot = "/textures/wood/black/";

const boardColor = "rgb(90,90,90)";
const whiteColor = "white";
const blackColor = "rgb(90,90,90)";

const commonMaterialProps = {
  metalness: 0,
  roughness: 0.2,
  opacity: 1,
  transparent: true
};

const Ground = ({ possiblePositions, onClickTile }) => {
  const [wColorT, wDisplT, wNormalT, wRoughT] = useTexture([
    whiteTextureRoot + "color.jpg",
    whiteTextureRoot + "displacement.jpg",
    whiteTextureRoot + "normal.jpg",
    whiteTextureRoot + "roughness.jpg"
  ]);

  const [bColorT, bDisplT, bNormalT, bRoughT] = useTexture([
    blackTextureRoot + "color.jpg",
    blackTextureRoot + "displacement.jpg",
    blackTextureRoot + "normal.jpg",
    blackTextureRoot + "roughness.jpg"
  ]);
  return (
    <>
      {[0, 1, 2, 3].map((index) => {
        let position = [];
        let rotation = [0, 0, 0];
        let args = [8, 0.2, 0.5];

        switch (index) {
          case 0:
            position = [0, 0, -4.25];
            args[0] = 9;
            break;
          case 1:
            position = [0, 0, 4.25];
            args[0] = 9;
            break;
          case 2:
            position = [-4.25, 0, 0];
            rotation = [0, Math.PI / 2, 0];
            break;
          case 3:
            position = [4.25, 0, 0];
            rotation = [0, Math.PI / 2, 0];
            break;

          default:
        }

        return (
          <mesh key={index} position={position} receiveShadow rotation={rotation}>
            <boxBufferGeometry args={args} />
            <meshStandardMaterial
              {...commonMaterialProps}
              color={boardColor}
              roughnessMap={wRoughT}
              normalMap={wNormalT}
              map={wColorT}
              bumpMap={wDisplT}
              transparent={false}
              opacity={1}
            />
          </mesh>
        );
      })}

      <group receiveShadow>
        {[...Array(GRID_LENGTH).keys()].map((i) =>
          [...Array(GRID_LENGTH).keys()].map((j) => {
            let possible = false;
            for (let pos of possiblePositions) {
              if (pos[0] === i && pos[1] === j) {
                possible = true;
              }
            }
            return (
              <group key={i * GRID_LENGTH + j}>
                {possible && (
                  <mesh
                    receiveShadow
                    position={tilePosition(i, j, WASHER_LEVEL)}
                    scale={[1, 0.2, 1]}
                  >
                    <sphereBufferGeometry args={[0.15, 32, 32]} />
                    <meshStandardMaterial color="red" roughness={1} />
                  </mesh>
                )}
                <mesh
                  position={tilePosition(i, j, GROUND_LEVEL)}
                  scale={[SCALE, BOARD_WIDTH, SCALE]}
                  receiveShadow
                  onClick={(e) => {
                    if (possible) {
                      onClickTile(i, j);
                    }
                  }}
                >
                  <boxBufferGeometry />

                  {(i + j) % 2 === 0 ? (
                    <meshStandardMaterial
                      color={whiteColor}
                      roughnessMap={wRoughT}
                      normalMap={wNormalT}
                      map={wColorT}
                      bumpMap={wDisplT}
                      {...commonMaterialProps}
                    />
                  ) : (
                    <meshStandardMaterial
                      color={blackColor}
                      roughnessMap={bRoughT}
                      normalMap={bNormalT}
                      map={bColorT}
                      bumpMap={bDisplT}
                      {...commonMaterialProps}
                    />
                  )}
                </mesh>
              </group>
            );
          })
        )}
      </group>
    </>
  );
};

export default Ground;
