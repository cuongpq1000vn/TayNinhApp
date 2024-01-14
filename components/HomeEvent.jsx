import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  Pressable,
  ImageBackground,
  StyleSheet,
} from "react-native";
export default function HomeEvent({ props }) {
  const navigation = useNavigation();
  function sendData(data) {
    navigation.navigate("Detail", { myParam: data });
  }
  return (
    <View style={styles.new_wraper}>
      <Pressable onPress={() => sendData(props)} style={{ width: "100%" }}>
        <ImageBackground
          source={{
            uri: props.thumb_url,
          }}
          style={styles.image}
        >
          <View
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              backgroundColor: "rgba(0,0,0,0.4)",
            }}
          >
            <Text style={{ fontSize: 15, color: "white" }}>
              {props.title.rendered}
            </Text>
          </View>
        </ImageBackground>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    height: 200,
    borderRadius: 20,
    resizeMode: "cover",
  },
  new_wraper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
});
