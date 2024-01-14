import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Discover from "../components/Discover";
import Event from "../components/Event";
import Home from "../components/Home";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
const tab = createBottomTabNavigator();

const BottomBar = () => {
  return (
    <tab.Navigator>
      <tab.Screen
        name="Trang chủ"
        component={Home}
        options={{
          tabBarLabel: "Trang chủ",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      ></tab.Screen>
      <tab.Screen
        name="Khám phá"
        component={Discover}
        options={{
          tabBarLabel: "Khám phá",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="eye" color={color} size={size} />
          ),
        }}
      ></tab.Screen>

      <tab.Screen
        name="Sự kiện"
        component={Event}
        options={{
          tabBarLabel: "Sự kiện",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="calendar" color={color} size={size} />
          ),
        }}
      ></tab.Screen>
    </tab.Navigator>
  );
};

export default BottomBar;
