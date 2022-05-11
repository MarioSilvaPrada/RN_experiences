import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import Svg, {Path} from 'react-native-svg';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ddd',
    flex: 1,
  },
});

const AnimatedPath = Animated.createAnimatedComponent(Path);

// https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths

export const AnimatedSVG = () => {
  const radius = useSharedValue(50);
  const animatedProps = useAnimatedProps(() => {
    // draw a circle
    const path = `
        M 200, 200
        m -${radius.value}, 0
        a ${radius.value},${radius.value} 0 1,0 ${radius.value * 2},0
        a ${radius.value},${radius.value} 0 1,0 ${-radius.value * 2},0
        `;
    return {
      d: path,
    };
  });

  useEffect(() => {
    radius.value = withSpring(70, {velocity: 10, mass: 5});
  }, []);
  return (
    <View style={styles.container}>
      <Text>Test</Text>
      <Svg>
        <AnimatedPath animatedProps={animatedProps} fill="#FF8D29" />
      </Svg>
    </View>
  );
};
