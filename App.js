import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import NewsScreen from "./Components/Screen/News";
// import ListNews from "./Components/Screen/ListNews";
import Navigation from "./Routes/Navigation";
import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Navigation />
      {/* <Stack.Navigator> */}
      {/* <Stack.Screen name="News" component={NewsScreen} /> */}
      {/* </Stack.Navigator> */}
    </NavigationContainer>

    // <SafeAreaView style={style.container}>
    //   <View>

    //     {/* <NavigationContainer> */}
    //       {/* <News /> */}
    //     {/* </NavigationContainer> */}
    //     {/* <Text>Test</Text> */}
    //     {/* <ListNews /> */}
    //     <View style={style.border}></View>
    //   </View>
    // </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    marginHorizontal: 16,
    marginTop: 50,
  },
  border: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "gray",
  },
});
