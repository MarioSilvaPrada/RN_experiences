import React from 'react';
import {ScrollView, View} from 'react-native';
import {LoadingButton, Modal} from 'storybook_sandbox/src/components';

export const StoryBook = () => {
  return (
    <View style={{flex: 1}}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
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
      </ScrollView>
    </View>
  );
};
