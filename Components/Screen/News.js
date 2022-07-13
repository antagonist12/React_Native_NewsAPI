import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import moment from "moment";

let stopFetchMore = true;

function News({ navigation }) {
  const [Active, setActive] = useState({
    btnSelected: 1,
    value: "us",
  });

  const [request, setRequest] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageCurrent, setPageCurrent] = useState(5);

  const url = `https://newsapi.org/v2/top-headlines?country=${Active.value}&page=${pageCurrent}&pageSize=5&apiKey=a29a3ccf7af046b1892c2ab70bd54d82`;

  // get Data From API
  const sendGetRequest = async () => {
    try {
      const resp = await axios.get(url);
      setRequest(resp.data);
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  };

  useEffect(() => {
    sendGetRequest();
  }, [url, pageCurrent]);

  // Render the flat list item
  const renderItem = ({ item, index }) => {
    if (index === 0) {
      return (
        <TouchableOpacity
          onPress={() => navigation.navigate("DetailNews", item)}
        >
          <View key={index} style={style.itemWrapperTop}>
            <Image source={{ uri: item.urlToImage }} style={style.images} />
            <Text style={{ color: "gray" }}>{item.name}</Text>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 19,
                marginTop: 5,
                marginBottom: 5,
              }}
            >
              {item.title}
            </Text>
            <Text numberOfLines={1} style={{ color: "gray" }}>
              {item.description}
            </Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={() => navigation.navigate("DetailNews", item)}
        >
          <View key={index} style={style.itemWrapper}>
            <Image source={{ uri: item.urlToImage }} style={style.itemImage} />
            <View style={style.contentWrapper}>
              <Text style={{ color: "gray", marginBottom: 5 }}>
                {item.source.name}
              </Text>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 14,
                  marginBottom: 5,
                }}
              >
                {item.title}
              </Text>
              {/* <Text numberOfLines={1} style={{ color: "gray" }}>
                {item.description}
              </Text> */}
              <Text>{moment(item.publishedAt).format("LL")}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  };

  // render the flatlist footer
  let renderFooter = () => {
    return (
      <View style={style.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  // handling onscroll bottom
  let handleLoadMore = async () => {
    setIsLoading(true);
    if (!stopFetchMore) {
      const response = await axios.get(url);
      if (response.data === []) return setIsLoading(false);
      setPageCurrent(pageCurrent + 1);
      setRequest([...request.articles, ...response.data.articles]);
    }
    setIsLoading(false);
  };

  // renderempty data
  let renderEmpty = ({ item }) => {
    return (
      <Text style={{ padding: 10, fontSize: 18, textAlign: "center" }}>
        No Data
      </Text>
    );
  };

  return (
    <View>
      <View
        style={{ flexDirection: "row", marginVertical: 15, marginLeft: 15 }}
      >
        <ScrollView horizontal={true}>
          <TouchableOpacity
            style={
              Active.btnSelected === 1 ? style.btnSelected : style.notSelected
            }
            onPress={() => setActive({ btnSelected: 1, value: "us" })}
          >
            <Text
              style={
                Active.btnSelected === 1
                  ? style.textBtnSelected
                  : style.textNotSelected
              }
            >
              United State
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              Active.btnSelected === 2 ? style.btnSelected : style.notSelected
            }
            onPress={() => setActive({ btnSelected: 2, value: "uk" })}
          >
            <Text
              style={
                Active.btnSelected === 2
                  ? style.textBtnSelected
                  : style.textNotSelected
              }
            >
              United Kingdom
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              Active.btnSelected === 3 ? style.btnSelected : style.notSelected
            }
            onPress={() => setActive({ btnSelected: 3, value: "au" })}
          >
            <Text
              style={
                Active.btnSelected === 3
                  ? style.textBtnSelected
                  : style.textNotSelected
              }
            >
              Australia
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              Active.btnSelected === 4 ? style.btnSelected : style.notSelected
            }
            onPress={() => setActive({ btnSelected: 4, value: "sg" })}
          >
            <Text
              style={
                Active.btnSelected === 4
                  ? style.textBtnSelected
                  : style.textNotSelected
              }
            >
              Singapore
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={request.articles}
        renderItem={renderItem}
        ListFooterComponent={renderFooter}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListEmptyComponent={renderEmpty}
        onScrollBeginDrag={() => {
          stopFetchMore = false;
        }}
      />
    </View>
  );
}

const style = StyleSheet.create({
  title: {
    textTransform: "uppercase",
    fontWeight: "bold",
    marginBottom: 30,
    fontSize: 22,
  },
  btnSelected: {
    alignItems: "center",
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 10,
    marginLeft: 5,
  },
  textBtnSelected: {
    color: "white",
  },
  notSelected: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginLeft: 5,
  },
  textNotSelected: {
    color: "gray",
  },
  images: {
    marginTop: 20,
    resizeMode: "contain",
    height: 200,
  },
  loader: {
    marginVertical: 16,
    alignItems: "center",
  },
  itemWrapperTop: {
    paddingHorizontal: 10,
    paddingBottom: "5%",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  itemWrapper: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: "5%",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  itemImage: {
    width: 50,
    height: 50,
    marginRight: 16,
    marginTop: 16,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: "space-around",
  },
});

export default News;
