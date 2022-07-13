import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import moment from "moment";

const ListNews = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageCurrent, setPageCurrent] = useState(1);
  const url =
    "https://newsapi.org/v2/top-headlines?country=us&page=" +
    pageCurrent +
    "&pageSize=5&apiKey=ac5d1d1b06314e3bb1b2f00942196088";
  const delay = 5;

  useEffect(() => {
    console.log("useEffect");
    console.log("useEffect pageCurrent : ", pageCurrent);
    setIsLoading(true);
    let timer1 = setTimeout(() => setIsLoading(true), delay * 1000);
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
    return () => {
      clearTimeout(timer1);
    };
  }, [pageCurrent]);

  let renderItem = ({ item }) => {
    return (
      <View style={style.itemRow}>
        <Image source={{ uri: item.urlToImage }} style={style.itemImage} />
        <Text style={style.itemText}>{item.title}</Text>
        <Text numberOfLines={3}>{item.description}</Text>
      </View>
    );
  };

  let renderFooter = () => {
    return isLoading ? (
      <View style={style.loader}>
        <ActivityIndicator size="large" />
      </View>
    ) : null;
  };

  let handleLoadMore = () => {
    // alert("hai");
    // console.log("Function HandleMore");
    setPageCurrent(pageCurrent + 1);
    setIsLoading(true);
  };

  return (
    <FlatList
      style={style.container}
      data={data.articles}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      ListFooterComponent={renderFooter}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.001}
    />
  );
};

const style = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: "#f5fcff",
  },
  itemRow: {
    borderBottomColor: "#ccc",
    marginBottom: "10%",
    borderBottomWidth: 1,
  },
  itemImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  itemText: {
    fontSize: 16,
    padding: 5,
    color: "black",
  },
  loader: {
    marginTop: 10,
    alignItems: "center",
  },
});

export default ListNews;
