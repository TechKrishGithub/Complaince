import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";

import { DrawerNavigator } from "./routes/index";
import GWDetailsPage from "./pages/GroundWaterComplaince/GWDetailsPage/index";
import Authentication from "./pages/Authentication";
import PinAccess from "./pages/LocalSecurity/PinAccess";
import PinGeneration from "./pages/LocalSecurity/PinGeneration";
import SignInScreen from "./pages/Authentication/SignIn";

const Stack = createStackNavigator();

// Prevent native splash screen from autohiding before App component declaration
SplashScreen.preventAutoHideAsync()
  .then((result) =>
    console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`)
  )
  .catch(console.warn); // it's good to explicitly catch and inspect any error

const App = () => {
  const [fontsLoaded] = useFonts({
    "OpenSans-Medium": require("./assets/fonts/OpenSans-Medium.ttf"),
    "OpenSans-Regular": require("./assets/fonts/OpenSans-Regular.ttf"),
    "OpenSans-Italic": require("./assets/fonts/OpenSans-Italic.ttf"),
    "OpenSans-SemiBold": require("./assets/fonts/OpenSans-SemiBold.ttf"),
    "OpenSans-ExtraBold": require("./assets/fonts/OpenSans-ExtraBold.ttf"),
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [getPin,setGetPin]=useState(false);

  useEffect(() => {
    // Hides native splash screen after 2s
    setTimeout(async () => {
      await SplashScreen.hideAsync();
      setIsLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    const token = await AsyncStorage.getItem("username");
    const Pin= await AsyncStorage.getItem('Pin');
    setGetPin(!!Pin);
    setIsAuthenticated(!!token);
  };

  if (!fontsLoaded || isLoading) {
    return null; // Return null or a loading component while the fonts are being loaded or the splash screen is still visible
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <>
           <Stack.Screen
           name="PinGeneration" 
           component={PinGeneration}  
           options={{ headerShown: false }}
           />
            <Stack.Screen
           name="PinAccess" 
           component={PinAccess}  
           options={{ headerShown: false }}
           />
            
            <Stack.Screen
              name="DrawerNavigator"
              component={DrawerNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="GW Details Page" 
              options={{ headerTitle: 'Complaince Details Page'}}
            component={GWDetailsPage} />
            <Stack.Screen
            name="Authentication"
            options={{ headerShown: false}}
            component={SignInScreen}
          />
          
          </>
        ) : 
        (
          <>
          <Stack.Screen
            name="Authentication"
            options={{ headerShown: false }}
            component={SignInScreen}
          />
           <Stack.Screen
           name="PinGeneration" 
           component={PinGeneration}  
           options={{ headerShown: false }}
           />
           <Stack.Screen
           name="PinAccess" 
           component={PinAccess}  
           options={{ headerShown: false }}
           /> 
          <Stack.Screen
              name="DrawerNavigator"
              component={DrawerNavigator}
              options={{ headerShown: false }}
            />
          

            <Stack.Screen name="GW Details Page"
              options={{ headerTitle: 'Complaince Details Page'}}
            component={GWDetailsPage} />
            
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
