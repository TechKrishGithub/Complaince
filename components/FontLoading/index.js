import React, { useEffect, useState } from "react";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";
import { View } from "react-native";

const FontLoading = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await useFonts({
      "OpenSans-Medium": require("../../assets/fonts/OpenSans-Medium.ttf"),
      "OpenSans-Regular": require("../../assets/fonts/OpenSans-Regular.ttf"),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return <View />; // Return a valid JSX component
};

export default FontLoading;
