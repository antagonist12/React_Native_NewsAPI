import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

function NewsHighlight({ data }) {
  //   console.log(data.totalResults);

  let content = null;

  if (data.totalResults === 0 || data === null) {
    content = (
      <Text style={{ marginTop: 30, fontWeight: "bold" }}>
        There was an error please try again later.
      </Text>
    );
  }

  if (data.totalResults != 0) {
    content = (
      <View>
        <Image
          source={{ uri: `${data.articles[0].urlToImage}` }}
          style={style.images}
        />
        <Text style={{ color: "gray" }}>{data.articles[0].source.name}</Text>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 19,
            marginTop: 5,
            marginBottom: 5,
          }}
        >
          {data.articles[0].title}
        </Text>
        <Text numberOfLines={1} style={{ color: "gray" }}>
          {data.articles[0].description}
        </Text>
        {/* <View style={style.border}></View> */}
      </View>
    );
  }

  return <View>{content}</View>;
}

const style = StyleSheet.create({
  images: {
    marginTop: 20,
    resizeMode: "contain",
    height: 200,
  },
  border: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "gray",
  },
});

export default NewsHighlight;
