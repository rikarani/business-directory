import { type TokenCache } from "@/types/TokenCache";

import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";

import * as SecureStore from "expo-secure-store";

import LoginScreen from "@/components/LoginScreen";

export default function RootLayout(): React.JSX.Element | null {
  const [loaded, error] = useFonts({
    outfit: require("../assets/fonts/Outfit-Regular.ttf"),
    "outfit-medium": require("../assets/fonts/Outfit-Medium.ttf"),
    "outfit-bold": require("../assets/fonts/Outfit-Bold.ttf"),
  });

  if (!loaded && !error) {
    return null;
  }

  const tokenCache: TokenCache = {
    async getToken(key) {
      try {
        const item = await SecureStore.getItemAsync(key);

        if (item) {
          console.log(`${key} was used \n`);
        } else {
          console.log("No values stored under key: " + key);
        }

        return item;
      } catch (err) {
        console.error("SecureStore get item error : ", err);
        await SecureStore.deleteItemAsync(key);

        return null;
      }
    },

    async saveToken(key, token) {
      try {
        return SecureStore.setItemAsync(key, token);
      } catch (err) {
        return;
      }
    },
  };

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string}>
      <SignedIn>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </SignedIn>
      <SignedOut>
        <LoginScreen />
      </SignedOut>
    </ClerkProvider>
  );
}
