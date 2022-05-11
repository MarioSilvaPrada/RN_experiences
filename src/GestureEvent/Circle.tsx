import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

type ContextType = {
  translateY: number;
  translateX: number;
};
export const Circle = () => {
  const opacityValue = useSharedValue(1);

  const translateY = useSharedValue(50);
  const translateX = useSharedValue(50);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacityValue.value,
      transform: [
        {
          translateY: translateY.value,
        },
        {
          translateX: translateX.value,
        },
      ],
      width: 100,
      height: 100,
      backgroundColor: 'lime',
      borderRadius: 50,
    };
  });

  const styles = StyleSheet.create({
    circleContainer: {
      backgroundColor: '#ddd',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (_, context) => {
      context.translateY = translateY.value;
      context.translateX = translateX.value;
    },
    onActive: event => {
      translateY.value = event.translationY;
      translateX.value = event.translationX;
    },
    onEnd: () => {
      translateY.value = withSpring(0, {damping: 30});
      translateX.value = withSpring(0, {damping: 30});
    },
  });
  return (
    <View style={styles.circleContainer}>
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View style={animatedStyle} />
      </PanGestureHandler>
    </View>
  );
};
