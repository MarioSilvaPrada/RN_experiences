import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps, Routes} from '../../App';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ddd',
    flex: 1,
  },
  content: {
    paddingBottom: 32,
  },
  thumbnail: {
    backgroundColor: 'white',
    padding: 20,
  },
  title: {
    fontSize: 15,
  },
  button: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
});
export const Menu = () => {
  const {navigate} = useNavigation<NavigationProps>();
  const Pages: {screen: keyof Routes; title: string}[] = [
    {
      screen: 'Circle',
      title: 'Circle',
    },
    {
      screen: 'StoryBook',
      title: 'StoryBook',
    },
    {
      screen: 'AnimatedSVG',
      title: 'AnimatedSVG',
    },
  ];
  return (
    <View style={styles.container}>
      {Pages.map(page => (
        <RectButton
          key={page.screen}
          style={styles.button}
          onPress={() => navigate(page.screen)}>
          <View style={styles.thumbnail}>
            <Text style={styles.title}>{page.title}</Text>
          </View>
        </RectButton>
      ))}
    </View>
  );
};
