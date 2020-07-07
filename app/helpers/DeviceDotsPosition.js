import { WIDTH, HEIGHT } from "../constants/dimensions";
const radiusRange = [10, 50, 90, 100, 130];

// (0,0) is top-left corner of the screen

export function calculatePosition(rssi) {
  const radiusIndex = Math.floor(Math.abs(rssi) / 55);
  const radius = radiusRange[radiusIndex];

  const radarHeight = HEIGHT - 180;

  const left = (Math.random() * 2 - 1) * radius;
  const top = Math.sqrt(Math.pow(radius, 2) - Math.pow(left, 2));

  return {
    left: WIDTH / 2 + left,
    top: radarHeight / 2 + top,
    radius,
  };
}
