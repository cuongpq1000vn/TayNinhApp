import { View, ActivityIndicator, Dimensions } from "react-native";
export default function LoadingActivity() {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        height: Dimensions.get("window").height - 100,
      }}
    >
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}
