import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import moment from "moment";

const DetailNews = ({ route: { params } }) => {
  const detailNews = {
    title: params.title,
    desc: params.description,
    image: params.urlToImage,
    sourceName: params.source.name,
    author: params.author,
    publishedAt: params.publishedAt,
    content: params.content,
    url: params.url,
  };

  return (
    <View>
      <Image source={{ uri: detailNews.image }} style={styles.images} />
      <Text style={{ color: "gray", marginVertical: 8 }}>
        {detailNews.sourceName}
      </Text>
      <Text style={{ fontWeight: "bold", fontSize: 20, textAlign: "justify" }}>
        {detailNews.title}
      </Text>
      <Text style={{ marginVertical: 15, fontSize: 12 }}>
        {detailNews.author} | {moment(detailNews.publishedAt).format("LL")}
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: "gray",
          textAlign: "justify",
          marginBottom: 15,
        }}
      >
        {detailNews.desc}
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: "gray",
          textAlign: "justify",
          marginBottom: 15,
        }}
        numberOfLines={6}
      >
        {detailNews.content}
      </Text>
      <Text style={{ color: "blue" }}>{detailNews.url}</Text>
    </View>
  );
};

export default DetailNews;

const styles = StyleSheet.create({
  images: {
    marginTop: 20,
    resizeMode: "contain",
    height: 200,
  },
});
