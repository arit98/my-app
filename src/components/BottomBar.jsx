import React, { Children } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Dashboard from "../screens/Dashboard";
import Finance from "../screens/Finance";
import Revenue from "../screens/Revenue";
import Profile from "../screens/Profile";
import PostScreen from "../screens/PostScreen";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import {
  AntDesign,
  FontAwesome5,
  FontAwesome6,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -30,
      justifyContent: "center",
      alignItems: "center",
      ...styles.shadow,
    }}
    onPress={onPress}
  >
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "#e32f45",
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

const BottomBar = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: "#26232f",
          borderRadius: 15,
          height: 100,
          borderTopColor: "#26232f",
          ...styles.shadow
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                top: 10,
              }}
            >
              <MaterialIcons
                name="space-dashboard"
                size={36}
                color={!focused ? "#fff" : "#F1D36F"}
              />
              {/* <Text style={{ color:!focused ? "#fff" : "#2EBC8C" }}>Dashboard</Text> */}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Finance"
        component={Finance}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                top: 10,
              }}
            >
              <MaterialCommunityIcons
                name="finance"
                size={36}
                color={!focused ? "#fff" : "#F1D36F"}
              />
              {/* <Text style={{ color:!focused ? "#fff" : "#2EBC8C" }}>Revenue</Text> */}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Post"
        component={PostScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                top: 10,
              }}
            >
              <AntDesign
                name="pluscircle"
                size={70}
                style={{
                  marginTop: -90,
                  elevation: 5,
                  ...styles.shadow,
                  borderRadius: 50,
                }}
                color={!focused ? "#fff" : "#F1D36F"}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Revenue"
        component={Revenue}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                top: 10,
              }}
            >
              <FontAwesome6
                name="arrow-up-wide-short"
                size={30}
                color={!focused ? "#fff" : "#F1D36F"}
              />
              {/* <Text style={{ color:!focused ? "#fff" : "#2EBC8C" }}>Finance</Text> */}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                top: 10,
              }}
            >
              <FontAwesome5
                name="user-alt"
                size={30}
                color={!focused ? "#fff" : "#F1D36F"}
              />
              {/* <Text style={{ color:!focused ? "#fff" : "#2EBC8C" }}>User</Text> */}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowOpacity: 3.5,
    elevation: 5,
  },
});

export default BottomBar;
