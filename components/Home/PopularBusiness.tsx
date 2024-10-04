import { useState, useEffect } from "react";
import { View, Text, FlatList, ScrollView } from "react-native";

import { query, limit, collection, getDocs } from "firebase/firestore";
import { db } from "@/configs/firebase";

import { Colors } from "@/constants/Colors";

import PopularBusinessCard from "./PopularBusinessCard";

type Data = Record<string, string> & {
  id: string;
};

export default function PopularBusiness() {
  const [popularBusiness, setPopularBusiness] = useState<Data[] | []>([]);

  useEffect(() => {
    const getPopularBusiness = async () => {
      try {
        const snapshot = await getDocs(query(collection(db, "business_list"), limit(5)));

        const data = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });

        setPopularBusiness(data);
      } catch (err) {
        console.error(err);
      }
    };

    getPopularBusiness();
  }, []);

  return (
    <View style={{ marginBottom: 20 }}>
      <View
        style={{
          padding: 20,
          marginTop: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 20, fontFamily: "outfit-bold" }}>Popular Business</Text>
        <Text style={{ color: Colors.GRAY }}>View All</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <FlatList
          data={popularBusiness}
          numColumns={5}
          columnWrapperStyle={{ columnGap: 12 }}
          style={{ paddingHorizontal: 20 }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return <PopularBusinessCard business={item} />;
          }}
        />
      </ScrollView>
    </View>
  );
}
