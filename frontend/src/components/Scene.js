import { OrbitControls } from "@react-three/drei";
import React, { useState, Suspense } from "react";
import { Canvas } from "react-three-fiber";
import Pawn from "./graphics/pawn";
import Coin from "./graphics/coin";
import Ground from "./graphics/ground";
import Light from "./graphics/light";
import "./styles.css";
import { COIN_HEIGHT, tilePosition } from "./utils";

const initialDB = {
  "alien-0": {
    id: "alien-0",
    color: "rgb(55,55,55)",
    hoverColor: "#00BBF9",
    position: { x: 0, y: 0 },
    distort: 1.1,
    speed: 1.3
  },
  "alien-1": {
    id: "alien-1",
    color: "rgb(55,55,55)",
    hoverColor: "#00BBF9",
    position: { x: 0, y: 7 },
    distort: 1.1,
    speed: 1.3
  },
  "alien-2": {
    id: "alien-2",
    color: "rgb(55,55,55)",
    hoverColor: "#00BBF9",
    position: { x: 7, y: 7 },
    distort: 1.1,
    speed: 1.3
  },
  "alien-3": {
    id: "alien-3",
    color: "rgb(55,55,55)",
    hoverColor: "#00BBF9",
    position: { x: 7, y: 0 },
    distort: 1.1,
    speed: 1.3
  }
};

export default function App() {
  const [selected, setSelected] = useState(null);
  const [alienDB, setAlienDB] = useState(initialDB);

  const [possibleMoves, setPossibleMoves] = useState([]);

  const handleSelected = (id, possibleMoves) => {
    setSelected(id);
    setPossibleMoves(possibleMoves);
  };

  const handleMove = (i, j) => {
    const newDB = JSON.parse(JSON.stringify(alienDB));
    newDB[selected].position = { x: i, y: j };
    setAlienDB(newDB);
    setPossibleMoves([]);
    setSelected(null);
  };

  return (
    <Canvas
      colorManagement
      camera={{
        position: [0, 10, 10],
        fov: 75
      }}
      shadowMap
    >
      <hemisphereLight color={"white"} groundColor={"brown"} intensity={0.4} />
      <directionalLight position={[2, 10, -10]} castShadow />
      <ambientLight intensity={0.2} />
      {Object.values(alienDB).map(
        ({ id, color, hoverColor, position, distort, speed }) => (
          <Suspense fallback={"loading"}>
            <Pawn
              key={id}
              id={id}
              color={color}
              hoverColor={hoverColor}
              position={position}
              distort={distort}
              speed={speed}
              onClick={handleSelected}
              selected={selected}
            />
          </Suspense>
        )
      )}
      <Light />
      <Coin position={tilePosition(2, 4, COIN_HEIGHT)} />
      <Coin position={tilePosition(1, 5, COIN_HEIGHT)} />
      <Coin position={tilePosition(5, 3, COIN_HEIGHT)} />
      <Coin position={tilePosition(7, 4, COIN_HEIGHT)} />
      <Suspense fallback={"loading"}>
        <Ground possiblePositions={possibleMoves} onClickTile={handleMove} />
      </Suspense>
      {/* Enables the user to move around the scene*/}
      <OrbitControls />
    </Canvas>
  );
}
