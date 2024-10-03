import { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";

import { db } from "@/configs/firebase";
import { getDocs, collection } from "firebase/firestore";

import { Colors } from "@/constants/Colors";

import CategoryItem from "./CategoryItem";

type Data = Record<string, string> & {
  id: string;
};

export default function Category(): React.JSX.Element {
  const [categories, setCategories] = useState<Data[] | []>([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const snapshot = await getDocs(collection(db, "categories"));

        const data = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });

        setCategories(data);
      } catch (err) {
        console.error(err);
      }
    };

    getCategories();
  }, []);

  return (
    <View>
      <View
        style={{
          padding: 20,
          marginTop: 10,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 20, fontFamily: "outfit-bold" }}>Category</Text>
        <Text style={{ color: Colors.GRAY }}>View All</Text>
      </View>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginLeft: 20 }}
        renderItem={({ item }) => {
          return <CategoryItem key={item.id} item={item} />;
        }}
      />
    </View>
  );
}
