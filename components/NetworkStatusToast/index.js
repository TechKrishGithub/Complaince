import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import Toast from "react-native-toast-message";

const NetworkStatusToast = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const showToast = () => {
      Toast.show({
        type: isConnected ? "success" : "error",
        position: "top",
        text1: isConnected ? "Online" : "Offline",
        text2: isConnected ? "You are online" : "You are offline",
        visibilityTime: 2000, // 2 seconds
        autoHide: true,
      });
    };

    showToast();
  }, [isConnected]);

  return (
    <View style={{ display: "none" }}>
      {/* This component is just for handling the network status and displaying toast */}
    </View>
  );
};

export default NetworkStatusToast;
