import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

const CustomButton = ({ onPress, text2, text, type = "primary" }) => {
  return type === "primary" ? (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient start={{ x: -1, y: 0 }} end={{ x: 1.5, y: 0 }} colors={["#fcc396", "#f4666f"]} style={[styles.container, styles[`container_${type}`]]}>
        <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={onPress} style={[styles.container, styles[`container_${type}`]]}>
      <Text style={styles.text2}>{text2}</Text>
      <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",

    height: 55,
    marginVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    flexDirection: "row",
  },
  container_primary: {
    backgroundColor: "#841e62",
    marginTop: 45,
  },
  text_secondary: {
    color: "#f4666f",
    fontSize: 14,
    fontWeight: "600",
  },
  text_third: {
    color: "#841e62",
    fontSize: 14,
    fontWeight: "600",
  },
  text2: {
    color: "#252525",
  },
  text: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 20,
  },
});

export default CustomButton;
