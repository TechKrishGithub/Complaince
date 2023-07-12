import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Platform,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SignInScreen from "./SignIn";
import SignUpScreen from "./SignUp";
import styles from "./style";

const Tab = createMaterialTopTabNavigator();

const Authentication = () => {
  return (
    <View style={styles.authViewContainer}>
      <Tab.Navigator
        tabBarPosition="top"
        style={{ backgroundColor: "#f4fbfd" }}

      >
        <Tab.Screen name="Login" component={SignInScreen} 
        />
      </Tab.Navigator>
    </View>
  );
};

export default Authentication;
