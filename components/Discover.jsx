import {
  Text,
  Image,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { useEffect, useState } from "react";
import he from "he";
import LoadingActivity from "./LoadingActivity";
export default function Discover({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");

  const fetchData = async () => {
    let api = "";
    if (selectedCategory === "Ẩm thực") {
      api += "https://trangbang.vn/wp-json/wp/v2/posts?categories=39";
    } else if (selectedCategory === "Lưu trú") {
      api += "https://trangbang.vn/wp-json/wp/v2/posts?categories=37";
    } else if (selectedCategory === "Mua sắm") {
      api += "https://trangbang.vn/wp-json/wp/v2/posts?categories=40";
    } else if (selectedCategory === "Tất cả") {
      api += "https://trangbang.vn/wp-json/wp/v2/posts?categories=42";
    }
    const res = await fetch(api);
    const data = await res.json();
    setTimeout(() => {
      setData(data);
      setLoading(false);
    }, 3000);
  };

  const handleReload = (temp) => {
    setLoading(true);
    setSelectedCategory(temp);
    fetchData(temp);
  };

  const sendData = (data) => {
    navigation.navigate("Detail", { myParam: data });
  };

  useEffect(() => {
    fetchData();
  }, [selectedCategory]);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <ScrollView horizontal>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleReload("Tất cả")}
          >
            <Text style={styles.buttonText}>Tất cả</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleReload("Ẩm thực")}
          >
            <Text style={styles.buttonText}>Ẩm thực</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleReload("Lưu trú")}
          >
            <Text style={styles.buttonText}>Lưu trú</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleReload("Mua sắm")}
          >
            <Text style={styles.buttonText}>Mua sắm</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
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
