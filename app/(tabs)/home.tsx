import { View } from "react-native";

import Header from "@/components/Home/Header";
import Slider from "@/components/Home/Slider";
import Category from "@/components/Home/Category";

export default function Home(): React.JSX.Element {
  return (
    <View>
      <Header />
      <Slider />
      <Category />
    </View>
  );
}
