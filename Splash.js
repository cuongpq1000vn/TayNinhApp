import React, { useEffect } from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
function SplashScreen({ navigation }) {
  useEffect(() => {
    // Wait for 3 seconds and then navigate to the next screen
    setTimeout(() => {
      navigation.navigate('Bottom');
    }, 5000);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LottieView
        source={require('./assets/253.json')}
        autoPlay
        loop
      />
    </View>
  );
}

export default SplashScreen;
