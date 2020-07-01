import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

export const WIDTH = width;
export const HEIGHT = height;
export const isSmallDevice = height < 650;
