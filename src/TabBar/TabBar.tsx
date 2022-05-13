import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ddd',
    flex: 1,
  },
});
export const TabBar = () => {
  return (
    <View style={styles.container}>
      <Text>TabBar</Text>
    </View>
  );
};
