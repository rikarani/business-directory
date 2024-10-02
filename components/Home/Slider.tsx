import { useState, useEffect } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";

import { getDocs, collection } from "firebase/firestore";
import { db } from "@/configs/firebase";

type Data = Record<string, string> & {
  id: string;
};

export default function Slider(): React.JSX.Element {
  const [slides, setSlides] = useState<Data[] | []>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const ss = await getDocs(collection(db, "slides"));

        const data = ss.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });

        setSlides(data);
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, []);

  return (
    <View>
      <Text style={style.text}>Special For You</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        style={style.flatList}
        data={slides}
        renderItem={({ item }) => {
          return <Image style={style.image} source={{ uri: item.imageUrl }} />;
        }}
      />
    </View>
  );
}

const style = StyleSheet.create({
  text: {
    fontFamily: "outfit-medium",
    fontSize: 20,
    paddingLeft: 20,
    paddingTop: 20,
    marginBottom: 5,
  },
  flatList: {
    paddingLeft: 20,
  },
  image: {
    width: 300,
    height: 150,
    borderRadius: 16,
    marginRight: 16,
  },
});
