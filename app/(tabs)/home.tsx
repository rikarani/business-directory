import { View } from "react-native";

import Header from "@/components/Home/Header";
import Slider from "@/components/Home/Slider";

export default function Home(): React.JSX.Element {
  return (
    <View>
      <Header />
      <Slider />
    </View>
  );
}
