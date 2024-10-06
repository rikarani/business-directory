import { View, Image, Text, TouchableOpacity } from "react-native";
import { Colors } from "@/constants/Colors";
import { Href, useRouter } from "expo-router";

type Props = {
  item: Record<string, string> & {
    id: string;
  };
};

export default function CategoryItem({ item }: Props): React.JSX.Element {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.push(`/business/${item.name}` as Href)}>
      <View
        style={{
          padding: 10,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 99,
          marginRight: 20,
        }}
      >
        <Image source={{ uri: item.icon }} style={{ width: 40, height: 40 }} />
      </View>
      <Text
        style={{
          textAlign: "center",
          fontSize: 12,
          fontFamily: "outfit-medium",
          marginTop: 5,
          marginRight: 20,
        }}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );
}
