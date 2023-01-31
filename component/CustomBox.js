import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useReducer } from "react";

const CustomBox = ({ icon, label, hero, navigation, name, user, email, nav }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(nav, { namaDB: name, user: user, email: email })} style={styles.container}>
      <Image source={icon} style={styles.hero} resizeMode="contain" />
      <Text style={styles.title}>{label}</Text>
    </TouchableOpacity>
  );
};

export default CustomBox;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "48%",
    height: 190,
    padding: 2,
    marginBottom: 15,
    justifyContent: "center",
    borderRadius: 10,
    elevation: 3,
  },
  hero: {
    width: "100%",
    height: "80%",
  },
  title: {
    color: "#252525",
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center",
    letterSpacing: 1,
  },
});
