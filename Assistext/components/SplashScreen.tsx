import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import tw from 'twrnc';

const SplashScreen = () => {
  return (
    <View style={tw`flex-1 items-center justify-center bg-gray-900`}>
      <ActivityIndicator size="large" color="#fff" />
      <Text style={tw`text-white text-2xl mt-4`}>Assistext</Text>
    </View>
  );
};

export default SplashScreen;
