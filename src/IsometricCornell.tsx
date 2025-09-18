import React, { useEffect, useState } from "react";

type Voxel = null | { color: string };

interface IsometricCornellProps {
  width?: number;
  height?: number;
  viewingAngle?: number;
  className?: string;
}

const TILE_SIZE = 20;
const PADDING = 40; // extra space around the scene

const IsometricCornell: React.FC<IsometricCornellProps> = ({
  width = 15,
  height = 10,
  className,
}) => {
  const [voxels, setVoxels] = useState<Voxel[][][] | null>(null);
  const [bounds, setBounds] = useState<{
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
  } | null>(null);

  useEffect(() => {
    const populated = populateBlock(width, height);
    setVoxels(populated);

    // Compute bounds from all projected voxel corners
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    for (let z = 0; z < height; z++) {
      for (let y = 0; y < width; y++) {
        for (let x = 0; x < width; x++) {
          if (populated[x][y][z]) {
            const [isoX, isoY] = isoProject(x, y, z);

            // Estimate bounds for full cube size
            minX = Math.min(minX, isoX);
            minY = Math.min(minY, isoY - TILE_SIZE * 0.5); // top face goes higher
            maxX = Math.max(maxX, isoX + TILE_SIZE * 2); // right face extends to the right
            maxY = Math.max(maxY, isoY + TILE_SIZE * 1.5); // left face goes lower
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
  }, [width, height]);

  const renderVoxels = () => {
    if (!voxels) return null;

    const rendered = [];

    // Back-to-front rendering
    for (let z = 0; z < height; z++) {
      for (let y = 0; y < width; y++) {
        for (let x = 0; x < width; x++) {
          const voxel = voxels[x][y][z];
          if (voxel) {
            rendered.push(
              <g key={`${x}-${y}-${z}`}>{drawVoxel(x, y, z, voxel.color)}</g>
            );
          }
        }
      }
    }

    return rendered;
  };

  if (!bounds) return null; // wait until bounds are calculated

  const viewBoxWidth = bounds.maxX - bounds.minX;
  const viewBoxHeight = bounds.maxY - bounds.minY;

  return (
    <svg
      viewBox={`${bounds.minX} ${bounds.minY} ${viewBoxWidth} ${viewBoxHeight}`}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {renderVoxels()}
    </svg>
  );
};

export default IsometricCornell;

//
// -- Helper Functions --
//

function populateBlock(width: number, height: number): Voxel[][][] {
  const block: Voxel[][][] = Array.from({ length: width }, () =>
    Array.from({ length: width }, () =>
      Array.from({ length: height }, () => null)
    )
  );

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < width; y++) {
      const h = Math.floor(
        (Math.sin(x / 2) + Math.cos(y / 3)) * (height / 4) + height / 2
      );

      for (let z = 0; z < h && z < height; z++) {
        block[x][y][z] = {
          color: `hsl(${(x * 10 + y * 5 + z * 15) % 360}, 60%, 60%)`,
        };
      }
    }
  }

  return block;
}

function isoProject(x: number, y: number, z: number, tileSize = TILE_SIZE) {
  const isoX = (x - y) * tileSize;
  const isoY = (x + y) * tileSize * 0.5 - z * tileSize;
  return [isoX, isoY];
}

function drawVoxel(x: number, y: number, z: number, color: string) {
  const [isoX, isoY] = isoProject(x, y, z);
  const size = TILE_SIZE;

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
        stroke="#ccc"
        strokeWidth="0.5"
      />
      <path
        d={left}
        fill={shadeColor(color, -15)}
        stroke="#bbb"
        strokeWidth="0.5"
      />
      <path
        d={right}
        fill={shadeColor(color, -30)}
        stroke="#aaa"
        strokeWidth="0.5"
      />
    </>
  );
}

function shadeColor(color: string, percent: number): string {
  const match = color.match(/^hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)$/);
  if (!match) return color;

  const [, h, s, l] = match;
  const newL = Math.max(0, Math.min(100, parseFloat(l) + percent));

  return `hsl(${h}, ${s}%, ${newL}%)`;
}
