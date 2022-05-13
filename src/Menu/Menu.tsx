import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps, Routes, ROUTES_OPTIONS} from '../../App';

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

  const Pages = Object.values(ROUTES_OPTIONS);
  return (
    <View style={styles.container}>
      {Pages.map(page => (
        <RectButton
          key={page}
          style={styles.button}
          onPress={() => navigate(page)}>
          <View style={styles.thumbnail}>
            <Text style={styles.title}>{page}</Text>
          </View>
        </RectButton>
      ))}
    </View>
  );
};
