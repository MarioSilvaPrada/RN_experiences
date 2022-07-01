import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Home} from '../assets/svg/home';
import {Plus} from '../assets/svg/plus';
import {Book} from '../assets/svg/book';
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import Svg, {Path} from 'react-native-svg';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ddd',
    flex: 1,
    justifyContent: 'flex-end',
  },
  tabWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 40,
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
  btnWrapper: {
    padding: 15,
    paddingBottom: 20,
  },
  floatingBtn: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export interface Vector<T = number> {
  x: T;
  y: T;
}

const {width: WIDTH} = Dimensions.get('window');
const TAB_HEIGHT = 100;

const AnimatedPath = Animated.createAnimatedComponent(Path);

const vec2 = (x: number, y: number) => {
  'worklet';
  return {x, y};
};

const curve = (c1: Vector, c2: Vector, to: Vector) => {
  'worklet';
  return `C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${to.x} ${to.y}`;
};

// https://dribbble.com/shots/15785696-Liquid-Tab-Bar-Animation

export const TabBar = () => {
  const POINT_Y = 80;

  const [isOpen, setIsOpen] = useState(false);
  const pointY = useSharedValue(POINT_Y);
  const translateY = useSharedValue(-10);

  const animatedProps = useAnimatedProps(() => {
    const R = 10;
    const px = WIDTH / 3;
    const py = 20;

    const p1 = {x: px, y: py};
    const p2 = {x: p1.x, y: pointY.value + p1.y};
    const p3 = {x: WIDTH - p1.x + R, y: py};
    const p4 = {x: p3.x + R, y: p3.y + R};
    // const p2 = vec2(p1.x + 20, pointY.value + py);
    // const p3 = vec2(WIDTH - p1.x, py);

    const c11 = vec2(p1.x, p1.y);
    const c12 = vec2(p2.x, p2.y);
    const c13 = vec2(p3.x, p3.y);

    const pathArr = [
      `M0 ${p1.y}`,
      `L${p1.x} ${p1.y}`,
      curve(c11, c12, c13),
      `L${WIDTH} ${py}`,
      `V${TAB_HEIGHT}`,
      `L0 ${TAB_HEIGHT}`,
      'Z',
    ];
    return {
      d: pathArr.join(' '),
    };
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: 60,
      height: 60,
      borderRadius: 50,
      backgroundColor: '#2F8F9D',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.39,
      shadowRadius: 8.3,
      elevation: 13,
      position: 'absolute',
      top: -30,
      left: '54%',
      zIndex: 1,
      transform: [
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  useEffect(() => {
    const options = {velocity: 3, damping: 4};
    if (isOpen) {
      pointY.value = withSpring(0, options);
      translateY.value = withSpring(-40, options);
      return;
    }
    pointY.value = withSpring(POINT_Y, options);
    translateY.value = withSpring(-10, options);
  }, [isOpen, pointY, translateY]);
  return (
    <View style={styles.container}>
      <Svg
        viewBox={`0 0 ${WIDTH} ${TAB_HEIGHT}`}
        width={WIDTH}
        height={TAB_HEIGHT}
        fill="red">
        <AnimatedPath animatedProps={animatedProps} fill="#3BACB6" />
      </Svg>
      <View style={styles.tabWrapper}>
        <TouchableOpacity style={styles.btnWrapper}>
          <Home color="white" />
        </TouchableOpacity>
        <Animated.View style={animatedStyle}>
          <TouchableOpacity
            style={[styles.floatingBtn]}
            onPress={() => setIsOpen(!isOpen)}>
            <Plus color="white" />
          </TouchableOpacity>
        </Animated.View>
        <TouchableOpacity style={styles.btnWrapper}>
          <Book color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
