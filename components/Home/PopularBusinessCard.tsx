import { View, Text, Image, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

type Props = {
  business: Record<string, string> & {
    id: string;
  };
};

export default function PopularBusinessCard({ business }: Props) {
  return (
    <View style={style.container}>
      <View>
        <Image source={{ uri: business.imageUrl }} style={style.image} />
      </View>
      <View style={style.text}>
        <View>
          <Text style={style.name}>{business.name}</Text>
          <Text style={style.address}>{business.address}</Text>
        </View>
        <View>
          <View style={{ marginTop: 8, flexDirection: "row", justifyContent: "flex-end" }}>
            <Text
              style={{
                color: Colors.PRIMARY,
                fontFamily: "outfit-medium",
              }}
            >
              {business.category}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    maxWidth: 200,
    borderRadius: 12,
  },
  image: {
    width: "auto",
    height: 100,
    borderRadius: 4,
  },
  text: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  name: {
    fontFamily: "outfit-bold",
    fontSize: 16,
  },
  address: {
    color: Colors.GRAY,
    fontFamily: "outfit",
  },
});
