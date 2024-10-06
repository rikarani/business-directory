import { useState, useEffect } from "react";

import { View, Text, FlatList, Image } from "react-native";
import { useNavigation, useLocalSearchParams } from "expo-router";

import { db } from "@/configs/firebase";
import { getDocs, query, collection, where } from "firebase/firestore";

type Data = Record<string, string> & {
  id: string;
};

export default function BusinessCategory() {
  const navigation = useNavigation();
  const { category } = useLocalSearchParams();
  const [data, setData] = useState<Data[] | []>([]);

  const fetchBusinesses = async () => {
    const q = query(collection(db, "business_list"), where("category", "==", category));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    setData(data);
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: category,
    });

    fetchBusinesses();
  }, []);

  return (
    <View>
      {data?.length > 0 ? (
        <FlatList
          style={{ padding: 16 }}
          contentContainerStyle={{ rowGap: 16 }}
          data={data}
          renderItem={({ item }) => {
            return (
              <View style={{ backgroundColor: "#fff", flexDirection: "row", gap: 8, borderRadius: 8, height: 130 }}>
                <View style={{ flex: 1 }}>
                  <Image source={{ uri: item.imageUrl }} style={{ width: "100%", height: "100%" }} />
                </View>
                <View style={{ padding: 8, flex: 1, justifyContent: "space-between" }}>
                  <View>
                    <Text style={{ fontFamily: "outfit-bold" }}>{item.name}</Text>
                    <Text style={{ fontFamily: "outfit-medium" }}>{item.website}</Text>
                  </View>
                  <View>
                    <Text style={{ fontSize: 12 }}>{item.address}</Text>
                    <Text style={{ fontSize: 12 }}>{item.contact}</Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
      ) : (
        <Text>Tidak Ada Data</Text>
      )}
    </View>
  );
}
