import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";

import { useOAuth } from "@clerk/clerk-expo";
import { useCallback } from "react";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen(): React.JSX.Element {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
    } catch (err) {
      console.error("OAuth Error : ", err);
    }
  }, []);

  return (
    <View>
      <View style={style.imageWrapper}>
        <Image source={require("../assets/images/login.png")} style={style.image} />
      </View>
      <View style={style.contentWrapper}>
        <Text style={style.heading}>
          Your Ultimate <Text style={{ color: Colors.PRIMARY }}>Community Business Directory</Text> App
        </Text>
        <Text style={style.subHeading}>
          Find your favorite business near you and post your own business to your community
        </Text>
        <TouchableOpacity style={style.button} onPress={onPress}>
          <Text style={style.buttonLabel}>Let's Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  imageWrapper: {
    display: "flex",
    alignItems: "center",
    marginTop: 100,
  },
  image: {
    width: 220,
    height: 450,
    borderRadius: 20,
    borderWidth: 6,
    borderColor: "#000",
  },
  contentWrapper: {
    backgroundColor: "#fff",
    padding: 20,
    marginTop: -20,
  },
  heading: {
    fontFamily: "outfit-bold",
    fontSize: 30,
    textAlign: "center",
  },
  subHeading: {
    fontSize: 15,
    fontFamily: "outfit",
    textAlign: "center",
    marginVertical: 15,
    color: Colors.GRAY,
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 16,
    borderRadius: 99,
    marginTop: 20,
  },
  buttonLabel: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "outfit",
  },
});
