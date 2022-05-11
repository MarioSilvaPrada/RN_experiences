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
import {StoryBook, Circle, Menu, AnimatedSVG} from './src';

export type Routes = {
  Menu: undefined;
  Circle: undefined;
  StoryBook: undefined;
  AnimatedSVG: undefined;
};

export type NavigationProps = NativeStackNavigationProp<Routes, 'Menu'>;

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
            name="Menu"
            component={Menu}
            options={{
              title: 'Menu',
            }}
          />
          <Stack.Screen
            name="Circle"
            component={Circle}
            options={{
              title: 'Circle Event',
            }}
          />
          <Stack.Screen
            name="StoryBook"
            component={StoryBook}
            options={{
              title: 'StoryBook test',
            }}
          />
          <Stack.Screen
            name="AnimatedSVG"
            component={AnimatedSVG}
            options={{
              title: 'Animated SVG',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default App;
