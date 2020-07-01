import { WIDTH, HEIGHT } from "../constants/dimensions";
const radiusRange = [30, 70, 100, 130, 150];

// (0,0) is top-left corner of the screen

export function calculatePosition(rssi) {
  const radiusIndex = Math.round(Math.abs(rssi) / 30);
  const radius = radiusRange[radiusIndex];

  const radarHeight = HEIGHT - 150;

  const left = (Math.random() * 2 - 1) * radius;
  const top = Math.sqrt(Math.pow(radius, 2) - Math.pow(left, 2));

  return {
    left: WIDTH / 2 + left,
    top: radarHeight / 2 + top,
    radius,
  };
}
