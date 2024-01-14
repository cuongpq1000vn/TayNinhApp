import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export default function HomeButton({ categories }) {
  const navigation = useNavigation();

  function getData(category) {
    let api = "";
    if (category === "Ẩm thực") {
      api += "https://trangbang.vn/wp-json/wp/v2/posts?categories=39";
    } else if (category === "Lưu trú") {
      api += "https://trangbang.vn/wp-json/wp/v2/posts?categories=37";
    } else if (category === "Tham quan") {
      api += "https://trangbang.vn/wp-json/wp/v2/posts?categories=42";
    } else if (category === "Mua sắm") {
      api += "https://trangbang.vn/wp-json/wp/v2/posts?categories=40";
    } else {
      api += "https://trangbang.vn/wp-json/wp/v2/posts?categories=42";
    }
    navigation.navigate("DiscoverActivity", { myParam: api, title: category });
  }
  function getIcon(categories) {
    if (categories === "Ẩm thực") {
      return "md-restaurant-outline";
    } else if (categories === "Lưu trú") {
      return "bed-outline";
    } else if (categories === "Tham quan") {
      return "location-outline";
    } else if (categories === "Mua sắm") {
      return "ios-cart-outline";
    } else {
      return "ios-bus-outline";
    }
  }
  return (
    <TouchableOpacity
      style={[styles.box, { backgroundColor: "skyblue" }]}
      onPress={() => getData(categories)}
    >
      <Icon name={getIcon(categories)} size={60} style={styles.icon} />
      <Text style={{ alignSelf: "center", marginBottom: 5, color: "white" }}>
        {categories}
      </Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  box: {
    marginLeft: 20,
    borderRadius: 10,
    width: 100,
    height: 100,
    justifyContent: "space-between",
  },
  icon: {
    color: "white",
    alignSelf: "center",
  },
});
