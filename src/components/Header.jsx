import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";

const Header = ({ headerIcon1, headerIcon2 }) => {
  return (
    <View
      style={{
        backgroundColor: "#26232f",
        borderBottomWidth: 1,
        borderBottomColor: "#616161"
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "#26232f",
          height: 100,
          alignItems: "center",
          marginHorizontal: 20
        }}
      >
        <FontAwesome name={headerIcon1} size={24} color="#fff" />
        <FontAwesome name={headerIcon2} size={24} color="#fff" />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
