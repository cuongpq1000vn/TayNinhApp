import React, { useState, useEffect } from "react";
import { NativeBaseProvider, Text } from "native-base";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import he from "he";
import LoadingActivity from "./LoadingActivity";
import HTML, { HTMLSource } from "react-native-render-html";
import { useWindowDimensions } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import IframeRenderer, { iframeModel } from "@native-html/iframe-plugin";
import WebView from "react-native-webview";
export default function Detail({ route, navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { myParam } = route.params;
  const width = useWindowDimensions().width;
  const renderers = {
    iframe: IframeRenderer,
  };
  const customHTMLElementModels = {
    iframe: iframeModel,
  };
  useEffect(() => {
    setLoading(true);
    const data = myParam;
    setData(data);
    setLoading(false);
  }, []);

  return (
    <NativeBaseProvider>
      <View style={styles.topBar}>
        <View style={styles.leftContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesomeIcon icon={faArrowLeft} color="#000000" size={24} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View style={styles.container}>
          {loading ? (
            <LoadingActivity></LoadingActivity>
          ) : (
            <>
              <View>
                <Image source={{ uri: data.thumb_url }} style={styles.image} />
                <Text style={styles.title}>
                  {he.decode(data.title.rendered)}
                </Text>
                <HTML
                  WebView={WebView}
                  contentWidth={width - 10}
                  renderers={renderers}
                  source={{ html: data.content.rendered }}
                  customHTMLElementModels={customHTMLElementModels}
                />
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </NativeBaseProvider>
  );
}
const styles = StyleSheet.create({
  leftContainer: {
    marginTop: 40,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 100,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    paddingHorizontal: 16,
  },
  title1: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    alignItems: "center",
    marginTop: 30,
    marginLeft: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingIndicator: {
    flex: 1,
    marginTop: 350,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  image: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    width: 415,
    height: 300,
    marginBottom: 20,
  },
});
