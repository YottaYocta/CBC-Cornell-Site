import React, { useEffect, useState } from "react";

type VoxelType = "grass" | "tower";
type VoxelMesh = "cube" | "pyramid";

interface Voxel {
  type: VoxelType;
  mesh: VoxelMesh;
  color: string;
  lineColor?: string;
}

type VoxelGrid = (Voxel | null)[][][];

interface IsometricCornellProps {
  width?: number;
  height?: number;
  viewingAngle?: number;
  className?: string;
}

const TILE_SIZE = 20;
const PADDING = 40;

const IsometricCornell: React.FC<IsometricCornellProps> = ({
  width = 15,
  height = 10,
  className,
}) => {
  const [voxels, setVoxels] = useState<VoxelGrid | null>(null);
  const [bounds, setBounds] = useState<{
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
  } | null>(null);

  useEffect(() => {
    const populated = populateBlock(width, height);
    setVoxels(populated);
  }, [width, height]);

  useEffect(() => {
    // Compute bounds
    if (voxels) {
      let minX = Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;

      for (let x = 0; x < voxels.length; x++) {
        for (let y = 0; y < voxels[x].length; y++) {
          for (let z = 0; z < voxels[x][y].length; z++) {
            const voxel = voxels[x][y][z];
            if (voxel) {
              const [isoX, isoY] = isoProject(x, y, z);

              minX = Math.min(minX, isoX);
              minY = Math.min(minY, isoY - TILE_SIZE * 0.5);
              maxX = Math.max(maxX, isoX + TILE_SIZE * 2);
              maxY = Math.max(maxY, isoY + TILE_SIZE * 1.5);
            }
          }
        }
      }

      setBounds({
        minX: minX - PADDING,
        minY: minY - PADDING,
        maxX: maxX + PADDING,
        maxY: maxY + PADDING,
      });
    }
  }, [voxels]);

  function checkAbove(x: number, y: number, z: number): boolean {
    if (!voxels) return false;

    for (let dz = z + 1; dz <= z + 3; dz++) {
      if (dz >= height) continue;
      if (voxels[x]?.[y]?.[dz]) return false;
    }

    return true;
  }

  function handleAddTower(x: number, y: number, z: number) {
    setVoxels((prev) => {
      if (!prev) return prev;

      const newVoxels = [...prev.map((col) => col.map((stack) => [...stack]))]; // Deep clone 3D array

      const currentCol = newVoxels[x][y];
      const requiredHeight = z + 4;

      // Expand column height if needed
      while (currentCol.length < requiredHeight) {
        currentCol.push(null);
      }

      const towerColor = toHSLString({ h: 45, s: 80, l: 88 });

      newVoxels[x][y][z + 1] = {
        type: "tower",
        mesh: "cube",
        color: towerColor,
      };
      newVoxels[x][y][z + 2] = {
        type: "tower",
        mesh: "cube",
        color: towerColor,
      };
      newVoxels[x][y][z + 3] = {
        type: "tower",
        mesh: "pyramid",
        color: towerColor,
      };

      return newVoxels;
    });
  }

  const renderVoxels = () => {
    if (!voxels) return null;

    const rendered = [];

    for (let x = 0; x < voxels.length; x++) {
      for (let y = 0; y < voxels[x].length; y++) {
        for (let z = 0; z < voxels[x][y].length; z++) {
          const voxel = voxels[x][y][z];
          if (!voxel) continue;

          const isTopGrass = voxel.type === "grass" && checkAbove(x, y, z);

          const voxelElement =
            voxel.mesh === "cube"
              ? drawCubeVoxel(x, y, z, voxel.color, voxel.lineColor)
              : drawPyramidVoxel(x, y, z, voxel.color, voxel.lineColor);

          rendered.push(
            <g
              key={`${x}-${y}-${z}`}
              className={
                isTopGrass
                  ? "hover:-translate-y-1 duration-75 transition hover:brightness-110 cursor-pointer"
                  : undefined
              }
              onClick={isTopGrass ? () => handleAddTower(x, y, z) : undefined}
            >
              {voxelElement}
            </g>
          );
        }
      }
    }

    return rendered;
  };

  if (!bounds) return null;

  const viewBoxWidth = bounds.maxX - bounds.minX;
  const viewBoxHeight = bounds.maxY - bounds.minY;

  return (
    <svg
      strokeLinejoin="round"
      strokeLinecap="round"
      viewBox={`${bounds.minX} ${bounds.minY} ${viewBoxWidth} ${viewBoxHeight}`}
      xmlns="http://www.w3.org/2000/svg"
      className={`${className}`}
    >
      {renderVoxels()}
    </svg>
  );
};

export default IsometricCornell;

//
// -- Helper Functions --
//

function populateBlock(width: number, height: number): VoxelGrid {
  const block: VoxelGrid = Array.from({ length: width }, () =>
    Array.from({ length: width }, () =>
      Array.from({ length: height }, () => null)
    )
  );

  const solidHeight = 1;
  const maxWaveHeight = height - solidHeight - 1;

  const sinPeriod = 2;
  const cosPeriod = 9;
  const globalOffset = (Math.PI / 4) * Math.random();

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < width; y++) {
      const waveHeight =
        Math.sin(x / sinPeriod + globalOffset) +
        Math.cos(y / cosPeriod + globalOffset);

      const additionalHeight = Math.floor(
        ((waveHeight + 2) / 4) * maxWaveHeight
      );
      const h = solidHeight + additionalHeight;

      const baseColor = toHSLString({ h: 116, s: 46, l: 93 });

      for (let z = 0; z < h; z++) {
        block[x][y][z] = {
          type: "grass",
          mesh: "cube",
          color: baseColor,
        };
      }
    }
  }

  // Tower placement
  const towerCount = Math.floor(Math.random() * 5) + 3;
  const usedCoords = new Set<string>();

  let attempts = 0;
  while (usedCoords.size < towerCount && attempts < 20) {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * width);
    const column = block[x][y];
    const topZ = column.findLastIndex((v) => v !== null);

    if (topZ + 3 < height) {
      const towerColor = toHSLString({ h: 45, s: 80, l: 88 });

      block[x][y][topZ + 1] = {
        type: "tower",
        mesh: "cube",
        color: towerColor,
      };
      block[x][y][topZ + 2] = {
        type: "tower",
        mesh: "cube",
        color: towerColor,
      };
      block[x][y][topZ + 3] = {
        type: "tower",
        mesh: "pyramid",
        color: towerColor,
      };

      usedCoords.add(`${x},${y}`);
    }

    attempts++;
  }

  return block;
}

function isoProject(
  x: number,
  y: number,
  z: number,
  tileSize = TILE_SIZE
): [number, number] {
  const isoX = (x - y) * tileSize;
  const isoY = (x + y) * tileSize * 0.5 - z * tileSize;
  return [isoX, isoY];
}

function drawCubeVoxel(
  x: number,
  y: number,
  z: number,
  color: string,
  lineColor?: string
) {
  const [isoX, isoY] = isoProject(x, y, z);
  const size = TILE_SIZE;

  const stroke = lineColor ?? shadeColor(color, -40);

  const top = `
    M ${isoX},${isoY}
    l ${size},${-size * 0.5}
    l ${size},${size * 0.5}
    l ${-size},${size * 0.5}
    Z`;

  const left = `
    M ${isoX},${isoY}
    l 0,${size}
    l ${size},${size * 0.5}
    l 0,${-size}
    Z`;

  const right = `
    M ${isoX + size * 2},${isoY}
    l 0,${size}
    l ${-size},${size * 0.5}
    l 0,${-size}
    Z`;

  return (
    <>
      <path
        d={top}
        fill={shadeColor(color, 0)}
        stroke={stroke}
        strokeWidth="0.5"
      />
      <path
        d={left}
        fill={shadeColor(color, -5)}
        stroke={stroke}
        strokeWidth="0.5"
      />
      <path
        d={right}
        fill={shadeColor(color, -15)}
        stroke={stroke}
        strokeWidth="0.5"
      />
    </>
  );
}

function drawPyramidVoxel(
  x: number,
  y: number,
  z: number,
  color: string,
  lineColor?: string
) {
  const stroke = lineColor ?? shadeColor(color, -40);

  const p0: [number, number] = isoProject(x + 1, y + 1, z);
  const p3: [number, number] = isoProject(x + 2, y + 1, z);
  const p2: [number, number] = isoProject(x + 2, y, z);

  const apex: [number, number] = isoProject(x + 1.5, y + 0.5, z + 1);

  const polygon = (pts: [number, number][]) =>
    `M ${pts.map(([x, y]) => `${x},${y}`).join(" L ")} Z`;

  return (
    <>
      <path
        d={polygon([p0, apex, p3])}
        fill={shadeColor(color, -5)}
        stroke={stroke}
        strokeWidth="0.5"
      />
      <path
        d={polygon([p3, apex, p2])}
        fill={shadeColor(color, -10)}
        stroke={stroke}
        strokeWidth="0.5"
      />
    </>
  );
}

function shadeColor(color: string, percent: number): string {
  const match = color.match(
    /hsl\s*\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*\)/i
  );

  if (!match) return color;

  const [, hStr, sStr, lStr] = match;
  let h = parseFloat(hStr);
  const s = parseFloat(sStr);
  const l = parseFloat(lStr);

  const newL = Math.max(0, Math.min(100, l + percent));
  h = normalizeHue(h);

  return toHSLString({ h, s, l: newL });
}

function toHSLString({ h, s, l }: { h: number; s: number; l: number }): string {
  h = normalizeHue(h);
  return `hsl(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%)`;
}

function normalizeHue(h: number): number {
  return ((h % 360) + 360) % 360;
}
