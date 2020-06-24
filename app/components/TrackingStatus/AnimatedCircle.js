import React from "react";
import Animated, { Easing } from "react-native-reanimated";
import { mix } from "react-native-redash";
import { useMemoOne } from "use-memo-one";
import styles from "./styles";

const {
  Value,
  Clock,
  useCode,
  set,
  block,
  cond,
  timing,
  startClock,
  stopClock,
} = Animated;

function AnimatedCircle({ delayTime = 0 }) {
  const { isPlaying, animation, clock } = useMemoOne(
    () => ({
      isPlaying: new Value(0),
      animation: new Value(0),
      clock: new Clock(),
    }),
    []
  );

  useCode(() => set(animation, delay(loop({ duration: 6000 }), delayTime)), []);

  const scale = mix(animation, 0, 1);
  const indicatorOpcaity = mix(animation, 0.2, 0);

  return (
    <Animated.View
      style={[
        styles.trackingIndicator,
        {
          transform: [{ scale }],
          opacity: indicatorOpcaity,
        },
      ]}
    />
  );
}

export function delay(node, delayTime) {
  const clock = new Clock();

  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: new Value(delayTime),
    toValue: new Value(1),
    easing: Easing.linear,
  };

  return block([
    // start right away
    startClock(clock),
    // process your state
    timing(clock, state, config),
    // when over (processed by timing at the end)
    cond(state.finished, node),
  ]);
}

export function loop({ duration, toValue, easing }) {
  const clock = new Clock();

  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: new Value(duration),
    toValue: new Value(toValue || 1),
    easing: easing || Easing.inOut(Easing.linear),
  };

  return block([
    startClock(clock),
    timing(clock, state, config),
    cond(state.finished, [
      stopClock(clock),
      set(state.finished, 0),
      set(state.position, 0),
      set(state.time, 0),
      set(state.frameTime, 0),
      startClock(clock),
    ]),
    state.position,
  ]);
}

export default AnimatedCircle;
