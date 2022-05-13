/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {View} from 'react-native';
import {StoryBook, Circle, Menu, AnimatedSVG, TabBar} from './src';

export enum ROUTES_OPTIONS {
  MENU = 'Menu',
  CIRCLE = 'Circle',
  STORYBOOK = 'StoryBook',
  ANIMATED_SVG = 'AnimatedSVG',
  TAB_BAR = 'TabBar',
}

export type Routes = {
  [ROUTES_OPTIONS.MENU]: undefined;
  [ROUTES_OPTIONS.CIRCLE]: undefined;
  [ROUTES_OPTIONS.STORYBOOK]: undefined;
  [ROUTES_OPTIONS.ANIMATED_SVG]: undefined;
  [ROUTES_OPTIONS.TAB_BAR]: undefined;
};

export type NavigationProps = NativeStackNavigationProp<
  Routes,
  ROUTES_OPTIONS.MENU
>;

const App = () => {
  const backgroundStyle = {
    backgroundColor: '#ddd',
    flex: 1,
  };

  const Stack = createNativeStackNavigator<Routes>();

  return (
    <View style={backgroundStyle}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={ROUTES_OPTIONS.MENU}
            component={Menu}
            options={{
              title: 'Menu',
            }}
          />
          <Stack.Screen
            name={ROUTES_OPTIONS.CIRCLE}
            component={Circle}
            options={{
              title: 'Circle Event',
            }}
          />
          <Stack.Screen
            name={ROUTES_OPTIONS.STORYBOOK}
            component={StoryBook}
            options={{
              title: 'StoryBook test',
            }}
          />
          <Stack.Screen
            name={ROUTES_OPTIONS.ANIMATED_SVG}
            component={AnimatedSVG}
            options={{
              title: 'Animated SVG',
            }}
          />
          <Stack.Screen
            name={ROUTES_OPTIONS.TAB_BAR}
            component={TabBar}
            options={{
              title: 'Animated TabBar',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default App;
