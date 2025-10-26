import { Image } from 'expo-image';
import React from 'react';
import Dashboard from './dashboard';
import ParallaxScrollView from '@/components/parallax-scroll-view';

export default function HomeScreen() {
  return (
    <>
      <ParallaxScrollView
        headerImage={
          <Image
            source={require('../../assets/images/logo3333.png')}
            style={{ width: '100%', height: 300 }}
            contentFit="cover"
          />
        }
        headerBackgroundColor={{ light: '#fff', dark: '#000' }}
      >
        <Dashboard />
      </ParallaxScrollView>
    </>
  );
}
