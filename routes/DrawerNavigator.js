import React from "react";
import { View, Text, Image } from "react-native";
import {
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import {
  SimpleLineIcons,
  MaterialIcons,
  MaterialCommunityIcons,
  AntDesign,
  Ionicons
} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../assets/logo.jpg";
import WiseLogo from "../assets/wise_logo.png";
import {
  Dashboard,
  ConstructionComplaince,
  DrillingComplaince,
  GroundWaterComplaince,
  SurfaceWaterComplaince,
  WasteWaterComplaince,
  WasteWaterDischargePermitHolders,
  Logout,
} from "../pages/index";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => {
        return (
          <SafeAreaView>
            <View
              style={{
                height: 250,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                borderBottomColor: "#f4f4f4",
                borderBottomWidth: 1,
                backgroundColor:'white',
                borderRadius:90,
              }}
            >
              <Image
                source={Logo}
                style={{
                  height: 130,
                  width: 130,
                }}
              />
               <Text
                 style={{
                  fontSize:12,
                  marginVertical: 6,
                  fontWeight: "bold",
                  color: "#156235"
                }}

              >
              Republic Of Uganda
              </Text>
           
              <Text
                style={{
                  marginVertical: 6,
                  fontWeight: "bold",
                  fontSize:13,
                  color: "#156235"
                }}
              >
              Ministry of Water and Environment
              </Text>
            
            </View>
            <DrawerItemList {...props} />

            <View
              style={{
                height: 100,
                width: "100%",
                justifyContent: "center",
                marginLeft:10,
                borderTopColor: "#f4f4f4",
                borderTopWidth: 1,
              }}
            >
              <Image
                source={WiseLogo}
                style={{
                  height: 100,
                  width: "60%",
                }}
              />
            </View>
          </SafeAreaView>
        );
      }}
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#fff",
          width: 320,
        },
        headerStyle: {
          backgroundColor: "#0D47A1",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        drawerLabelStyle: {
          color: "#111",
        },
      }}
    >
      <Drawer.Screen
        name="Dashboard"
        options={{
          drawerLabel: "Dashboard",
          title: "Dashboard",
          headerTitleStyle:{fontSize:15},
          drawerIcon: () => (
            <SimpleLineIcons name="home" size={15} color="#808080" />
          ),
          headerRight: () => (
            <Image
              source={WiseLogo}
              style={{ width: 100, height: 50, marginRight: 10}}
            />
          ),
        }}
        component={Dashboard}
      />
      <Drawer.Screen
        name="ConstructionComplaince"
        options={{
          drawerLabel: "Construction Complaince",
          title: "Construction Complaince",
          headerTitleStyle:{fontSize:15},
          drawerIcon: () => (
            <AntDesign name="codepen"  size={18} color="#808080"/>

          ),
          headerRight: () => (
            <Image
              source={WiseLogo}
              style={{ width: 100, height: 50, marginRight: 10}}
            />
          ),
        }}
        component={ConstructionComplaince}
      />
      <Drawer.Screen
        name="DrillingComplaince"
        options={{
          drawerLabel: "Drilling Complaince",
          title: "Drilling Complaince",
          headerTitleStyle:{fontSize:15},
          drawerIcon: () => (
            <MaterialIcons name="timer"  size={18} color="#808080" />
          ),
          headerRight: () => (
            <Image
              source={WiseLogo}
              style={{ width: 100, height: 50, marginRight: 10}}
            />
          ),
        }}
        component={DrillingComplaince}
      />
      <Drawer.Screen
        name="Ground Water Complaince"
        options={{
          drawerLabel: "Ground Water Complaince",
          title: "Ground Water Complaince",
          headerTitleStyle:{fontSize:15},
          drawerIcon: () => (
            <MaterialIcons name="category"  size={18} color="#808080" />
          ),
          headerRight: () => (
            <Image
              source={WiseLogo}
              style={{ width: 100, height: 50, marginRight: 10}}
            />
          ),
        }}
        component={GroundWaterComplaince}
      />
      <Drawer.Screen
        name="Surface Water Complaince"
        options={{
          drawerLabel: "Surface Water Complaince",
          title: "Surface Water Complaince",
          headerTitleStyle:{fontSize:15},
          drawerIcon: () => (
            <MaterialIcons
              name="dashboard-customize"
               size={18}
              color="#808080"
            />
          ),
          headerRight: () => (
            <Image
              source={WiseLogo}
              style={{ width: 100, height: 50, marginRight: 10}}
            />
          ),
        }}
        component={SurfaceWaterComplaince}
      />
      <Drawer.Screen
        name="Waste Water Complaince"
        options={{
          drawerLabel: "Waste Water Complaince",
          title: "Waste Water Complaince",
          headerTitleStyle:{fontSize:15},
          drawerIcon: () => (
            <MaterialCommunityIcons
              name="certificate"
               size={18}
              color="#808080"
            />
          ),
          headerRight: () => (
            <Image
              source={WiseLogo}
              style={{ width: 100, height: 50, marginRight: 10}}
            />
          ),
        }}
        component={WasteWaterComplaince}
      />

      <Drawer.Screen
        name="Waste Water Discharge Permit Holders"
        options={{
          drawerLabel: "Waste Water Discharge Permit Holders",
          title: "Waste Water Discharge Permit Holders",
          headerTitleStyle:{fontSize:13},
          drawerIcon: () => (
            <MaterialCommunityIcons name="water"  size={18} color="#808080" />
          ),
          headerRight: () => (
            <Image
              source={WiseLogo}
              style={{ width: 100, height: 50, marginRight: 10}}
            />
          ),
        }}
        component={WasteWaterDischargePermitHolders}
      />
      <Drawer.Screen
        name="Logout"
        options={{
          drawerLabel: "Logout",
          title: "Logout",
          headerTitleStyle:{fontSize:15},
          drawerIcon: () => (
            <AntDesign name="logout"  size={18} color="#808080" />
          ),
        }}
        component={Logout}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
