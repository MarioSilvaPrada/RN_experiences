/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
  StyleSheet,
} from 'react-native';

import {LoadingButton, Modal} from 'storybook_sandbox/src/components';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  withSequence,
  withSpring,
  useAnimatedGestureHandler,
  withRepeat,
} from 'react-native-reanimated';

import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

type ContextType = {
  translateY: number;
  translateX: number;
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const opacityValue = useSharedValue(1);
  const translateY = useSharedValue(50);
  const translateX = useSharedValue(50);

  const backgroundStyle = {
    backgroundColor: '#ddd',
    flex: 1,
  };
  const styles = StyleSheet.create({});

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

  // useEffect(() => {
  //   opacityValue.value = withRepeat(withTiming(0, {duration: 1000}), 10, true);
  // }, [opacityValue]);

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
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View style={{marginBottom: 50}}>
          <LoadingButton />
        </View>
        <View style={{marginBottom: 50}}>
          <LoadingButton loading />
        </View>
        <View style={{alignItems: 'center'}}>
          <View style={{width: '80%'}}>
            <Modal text="My first modal" />
          </View>
        </View>
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View style={animatedStyle} />
        </PanGestureHandler>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
