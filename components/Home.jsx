import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import { ScrollView } from "react-native";
import HomeEvent from "./HomeEvent";
import HomeButton from "./HomeButton";
import { useState, useEffect } from "react";
import LoadingActivity from "./LoadingActivity";

export default function Home({ navigation }) {
  const state = {
    images: [
      "https://trangbang.vn/wp-content/uploads/2023/01/b1.jpg",
      "https://trangbang.vn/wp-content/uploads/2023/01/b2.4.jpg",
      "https://trangbang.vn/wp-content/uploads/2023/01/FARMSTAY.jpg",
    ],
  };
  const [event, setEvent] = useState([]);
  const [discover, setDiscover] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const respEvent = await fetch("https://trangbang.vn/wp-json/wp/v2/posts");
    const respDiscover = await fetch(
      "https://trangbang.vn/wp-json/wp/v2/posts?categories=42"
    );
    const event = await respEvent.json();
    const discover = await respDiscover.json();
    setDiscover(discover[0]);
    setEvent(event[1]);
    setLoading(false);
  };

  useEffect(() => {
    const dataInterval = setInterval(() => fetchData(), 2000);
    return () => clearInterval(dataInterval);
  }, []);
  return (
    <ScrollView styles={{ flex: 1 }}>
      <SliderBox images={state.images} />
      <Text style={styles.title}>Nổi bật</Text>

      <View style={styles.wrapper}>
        <HomeButton categories="Ẩm thực"></HomeButton>
        <HomeButton categories="Lưu trú"></HomeButton>
        <HomeButton categories="Tham quan"></HomeButton>
      </View>

      <View style={styles.wrapper1}>
        <HomeButton categories="Mua sắm"></HomeButton>
        <HomeButton categories="Tiện ích"></HomeButton>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <Text style={styles.title}>Sự kiện</Text>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate("Sự kiện")}
          style={styles.button}
        >
          <Text>Xem thêm</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <LoadingActivity></LoadingActivity>
      ) : (
        <>
          <HomeEvent props={event}></HomeEvent>
        </>
      )}
      <View style={styles.new_wraper}>
        <Text style={styles.title}>Khám phá</Text>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate("Khám phá")}
          style={styles.button}
        >
          <Text>Xem thêm</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
       <LoadingActivity></LoadingActivity>
      ) : (
        <>
          <HomeEvent props={discover}></HomeEvent>
        </>
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    marginHorizontal: 10,
  },
  text: {
    alignSelf: "bottom",
  },
  card: {
    marginLeft: 20,
    borderRadius: 10,
    width: 100,
    height: 100,
    justifyContent: "space-between",
  },
  new_wraper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  button: {
    justifyContent: "right",
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#C8C8C8",
    padding: 10,
    width: 150,
    height: 40,
    marginRight: 12,
    marginTop: 15,
  },
  wrapper: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 22,
  },
  wrapper1: {
    alignSelf: "center",
    flex: 1,
    flexDirection: "row",
    marginBottom: 22,
  },
  title: {
    fontWeight: "bold",
    textAlign: "left",
    marginLeft: 12,
    fontSize: 22,
    marginBottom: 15,
    marginTop: 25,
    color: "skyblue",
  },
});
