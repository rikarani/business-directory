import { useEffect } from "react";
import { warmUpAsync, coolDownAsync } from "expo-web-browser";

export function useWarmUpBrowser(): void {
  useEffect(() => {
    void warmUpAsync();

    return () => {
      void coolDownAsync();
    };
  }, []);
}
