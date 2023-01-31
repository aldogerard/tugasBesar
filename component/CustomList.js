import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";

const CustomList = ({ id, item, navigation, getData, user, email, icon }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Detail", { nama: item.nama, getData: getData, user: user, email: email })}>
      <View style={styles.container}>
        <Image style={styles.pict} source={icon} resizeMode="contain" />
        <View style={styles.content}>
          <Text style={styles.titleContent}>{item.nama}</Text>
          <Text style={styles.textContent}>Tekan untuk melihat detail rumah sakit</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    flexDirection: "row",
    height: 110,
    borderRadius: 15,
    padding: 8,
    elevation: 3,
    marginBottom: 16,
  },
  pict: {
    flex: 1,
    width: "90%",
    height: "90%",
  },
  content: {
    paddingLeft: 10,
    flex: 3,
  },
  titleContent: {
    fontSize: 24,
    fontWeight: "700",
    color: "#252520",
  },
  textContent: {
    fontSize: 14,
    fontWeight: "600",
    color: "#888",
  },
});

export default CustomList;
