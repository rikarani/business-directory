import { ScrollView } from "react-native";

import Header from "@/components/Home/Header";
import Slider from "@/components/Home/Slider";
import Category from "@/components/Home/Category";
import PopularBusiness from "@/components/Home/PopularBusiness";

export default function Home(): React.JSX.Element {
  return (
    <ScrollView>
      <Header />
      <Slider />
      <Category />
      <PopularBusiness />
    </ScrollView>
  );
}
