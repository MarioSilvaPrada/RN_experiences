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

const {width: WIDTH} = Dimensions.get('window');
const TAB_HEIGHT = 100;

const AnimatedPath = Animated.createAnimatedComponent(Path);

// https://dribbble.com/shots/15785696-Liquid-Tab-Bar-Animation

export const TabBar = () => {
  const POINT_Y = 80;

  const [isOpen, setIsOpen] = useState(false);
  const pointY = useSharedValue(POINT_Y);
  const translateY = useSharedValue(-10);

  const animatedProps = useAnimatedProps(() => {
    const px = WIDTH / 2.8;
    const MARGIN = 15;
    const pathArr = [
      `M0 ${MARGIN}`,
      `L${px} ${MARGIN}`,
      `C${px} ${MARGIN}, ${WIDTH / 2} ${pointY.value + MARGIN}, ${
        WIDTH - px
      } ${MARGIN}`,
      `L${WIDTH} ${MARGIN}`,
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
