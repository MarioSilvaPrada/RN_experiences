import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  LayoutChangeEvent,
} from 'react-native';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import Svg, {Path} from 'react-native-svg';
import {RectButton} from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ddd',
    flex: 1,
  },
});

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');

const AnimatedPath = Animated.createAnimatedComponent(Path);

// https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths

export const AnimatedSVG = () => {
  const [screenHeight, setScreenHeight] = useState<number>();
  const GRID_NUMBER = 10;
  const svgHeight = screenHeight ? screenHeight - 50 : 0;
  const px = WIDTH / GRID_NUMBER;
  const py = svgHeight / GRID_NUMBER;
  const initalValue = 2;
  const finalValue = GRID_NUMBER - 1;
  const radius = useSharedValue(initalValue);
  const animatedProps = useAnimatedProps(() => {
    const pathArr = [
      'M0 0',
      `L${px * radius.value} 0`,
      `Q${px * radius.value} ${py * 3},${px * 2} ${py * radius.value}`,
      `V${svgHeight}`,
      `L${px * 0} ${py * GRID_NUMBER}`,
      'Z',
    ];
    return {
      d: pathArr.join(' '),
    };
  });

  const options = {velocity: 10, damping: 12};

  const onClick = () => {
    if (radius.value === initalValue) {
      radius.value = withSpring(finalValue, options);
    } else {
      radius.value = withSpring(initalValue, options);
    }
  };

  useEffect(() => {
    radius.value = withSpring(finalValue, options);
  }, []);

  const onLayout = (e: LayoutChangeEvent) => {
    const {height} = e.nativeEvent.layout;
    setScreenHeight(height);
  };

  const getGrid = () => {
    const arr = [];

    for (let i = 0; i < GRID_NUMBER; i++) {
      arr.push(
        <Path
          key={`column-${i}`}
          stroke-width=".1"
          stroke="black"
          d={`M${(WIDTH / GRID_NUMBER) * i + 1} 0 V${svgHeight}`}
        />,
      );
    }

    for (let i = 0; i < GRID_NUMBER; i++) {
      arr.push(
        <Path
          key={`row-${i}`}
          stroke-width=".1"
          stroke="black"
          d={`M0 ${(svgHeight / GRID_NUMBER) * i + 1} H ${WIDTH}`}
        />,
      );
    }
    return arr;
  };

  return (
    <View style={styles.container} onLayout={onLayout}>
      {screenHeight && screenHeight > 0 && (
        <RectButton onPress={onClick}>
          <Svg
            viewBox={`0 0 ${WIDTH} ${svgHeight}`}
            width={WIDTH}
            height={svgHeight}
            style={{borderWidth: 2}}>
            {getGrid()}
            <AnimatedPath
              animatedProps={animatedProps}
              fill="white"
              stroke="red"
              strokeWidth="3"
            />
          </Svg>
        </RectButton>
      )}
    </View>
  );
};
