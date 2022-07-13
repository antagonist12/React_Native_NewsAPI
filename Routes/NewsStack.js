import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import News from "../Components/Screen/News";
import DetailNews from "../Components/Screen/DetailNews";

const screens = {
  News: {
    screen: News,
  },
  DetailNews: {
    screen: DetailNews,
  },
};

const NewsStack = createStackNavigator(screens);

export default createAppContainer(NewsStack);
