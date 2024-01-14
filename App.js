import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { LogBox} from 'react-native';
import BottomBar from './Bottom/BottomBar';
import DiscoverActivity from './components/DiscoverActivity';
import Detail from './components/Detail';
LogBox.ignoreAllLogs();
const stack = createStackNavigator();
import SplashScreen from './Splash';

export default function App() {
    return (
      <NavigationContainer>
        <stack.Navigator screenOptions={{
          headerShown: false
        }}>
          <stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{
            headerShown: false
          }}></stack.Screen>
          <stack.Screen name="Bottom" component={BottomBar}></stack.Screen>
          <stack.Screen name="DiscoverActivity" component={DiscoverActivity} />
          <stack.Screen name="Detail" component={Detail} />
        </stack.Navigator>
      </NavigationContainer>
    );
}