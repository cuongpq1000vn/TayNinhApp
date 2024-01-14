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
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import LoadingActivity from "./LoadingActivity";

export default function DiscoverActivity({ route, navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const myParam = route.params.myParam;

  const fetchData = async () => {
    const resp = await fetch(`${myParam}`);
    const data = await resp.json();
    setData(data);
    setLoading(false);
  };

  function sendData(data) {
    navigation.navigate("Detail", { myParam: data });
  }

  useEffect(() => {
    const dataInterval = setInterval(() => fetchData(), 2000);
    return () => clearInterval(dataInterval);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.leftContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesomeIcon icon={faArrowLeft} color="#000000" size={24} />
          </TouchableOpacity>
        </View>

        <Text style={styles.title1}>{route.params.title}</Text>

        <View style={styles.rightContainer}>
        </View>
      </View>
      <ScrollView style={{ flex: 1, marginTop: 20 }}>
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
                    source={{ uri: item.thumb_url }}
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
  rightContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "red",
  },
  leftContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 80,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  title1: {
    fontSize: 20,
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
