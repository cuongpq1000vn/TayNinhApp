import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import he from "he";
import { useState, useEffect } from "react";
import LoadingActivity from "./LoadingActivity";
export default function Event({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const res = await fetch("https://trangbang.vn/wp-json/wp/v2/posts");
    const data = await res.json();
    setData(data);
    setLoading(false);
  };

  const sendData = (data) => {
    navigation.navigate("Detail", { myParam: data });
  };

  useEffect(() => {
    const dataInterval = setInterval(() => fetchData(), 3000);
    return () => clearInterval(dataInterval);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        {loading ? (
          <LoadingActivity></LoadingActivity>
        ) : (
          <>
            {data.map((item) => (
              <View key={item.id}>
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => sendData(item)}
                >
                  <Image
                    source={{ uri: item.thumb_url.toString() }}
                    style={styles.image}
                  />
                  <Text style={styles.title}>
                    {he.decode(item.title.rendered)}
                  </Text>
                  <Text>
                    {he
                      .decode(item.excerpt.rendered)
                      .replaceAll("<p>", "")
                      .replaceAll("</p>", "")}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    height: 70,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  button: {
    justifyContent: "right",
    borderRadius: 5,
    alignItems: "center",
    backgroundColor: "skyblue",
    padding: 10,
    width: 130,
    height: 40,
    marginRight: 12,
    marginTop: 15,
  },
  title1: {
    fontSize: 20,
    marginLeft: 120,
    marginTop: 30,
  },
  loadingIndicator: {
    flex: 1,
    marginTop: 400,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    margin: 10,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    marginTop: 10,
    borderRadius: 10,
    width: 350,
    height: 200,
    marginBottom: 20,
  },
});
