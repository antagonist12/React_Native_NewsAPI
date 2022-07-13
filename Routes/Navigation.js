import { StyleSheet, Text, View } from "react-native";
import React from "react";
import NewsScreen from "../Components/Screen/News";
import DetailNewsScreen from "../Components/Screen/DetailNews";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="News" component={NewsScreen} />
      <Stack.Screen name="DetailNews" component={DetailNewsScreen} />
    </Stack.Navigator>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
