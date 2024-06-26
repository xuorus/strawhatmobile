import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Simulate a loading process
    setTimeout(() => {
      // Navigate to the Save screen after the splash screen
      navigation.replace('Calculator'); // Replace 'LogIn' with the actual name of your Login screen
    }, 3000); 
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Animatable.Image
        animation="bounceIn"
        easing="ease-in-out"
        iterationCount={1}
        source={require('../../assets/images/logo.png')} 
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000', // Adjust the background color
  },
  logo: {
    width: 400, // Adjust the width of your logo
    height: 230, // Adjust the height of your logo
    resizeMode: 'contain', // Adjust the resizeMode based on your image aspect ratio
  },
});

export default SplashScreen;