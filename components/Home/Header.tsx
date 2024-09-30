import { Image, View, Text, StyleSheet, TextInput } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export default function Header(): React.JSX.Element {
  const { user } = useUser();

  return (
    <View style={style.container}>
      <View style={style.wrapper}>
        <Image source={{ uri: user?.imageUrl }} style={style.userImage} />
        <View>
          <Text style={{ color: "#fff" }}>Welcome</Text>
          <Text style={{ color: "#fff", fontSize: 18, fontFamily: "outfit-medium" }}>{user?.fullName}</Text>
        </View>
      </View>
      <View style={style.searchBar}>
        <Ionicons name="search" size={24} color={Colors.PRIMARY} />
        <TextInput style={{ fontFamily: "outfit", fontSize: 16 }} placeholder="Search..." />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: Colors.PRIMARY,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  userImage: {
    width: 45,
    height: 45,
    borderRadius: 99,
  },
  searchBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 10,
    marginTop: 15,
    borderRadius: 8,
  },
});
