import { Text, View, TouchableOpacity, ScrollView, StyleSheet, StatusBar } from "react-native";
import React, { Component } from "react";
import { db } from "../config";
import { collection, getDocs, docSnap, doc, where, query, deleteDoc } from "@firebase/firestore";
import { Ionicons } from "@expo/vector-icons";
import CustomList from "../component/CustomList";
import { LinearGradient } from "expo-linear-gradient";

import rsud from "../assets/hospital.png";
import rsu from "../assets/hospital3.png";
import rsj from "../assets/hospital2.png";

export default class ListScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.route.params,
      item: {},
      itemKey: [],
      searchValue: "",
    };
  }

  componentDidMount() {
    this.getAlldata();
  }

  getAlldata() {
    let data = this.state.data.namaDB;
    getDocs(collection(db, data)).then((docSnap) => {
      let users = [];
      docSnap.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });
      this.setState({
        item: users,
        itemKey: Object.keys(users),
      });
    });
  }

  render() {
    const { item, itemKey, data } = this.state;
    const getData = data.namaDB;
    const user = data.user;
    const email = data.email;

    const icon = getData === "rsud" ? rsud : getData === "rsu" ? rsu : rsj;
    return (
      <View style={{ flex: 1, alignItems: "center", backgroundColor: "#f7f7f7" }}>
        <StatusBar barStyle="dark-content" backgroundColor="#EBC96C" />
        <View style={{ justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "row", padding: 12, backgroundColor: "#EBC96C", width: "100%" }}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("Home")}>
            <Ionicons name="arrow-back" size={30} color="#fff" />
          </TouchableOpacity>
          <Text style={{ fontSize: 24, fontWeight: "800", color: "#fff", textTransform: "uppercase", flex: 0.91, textAlign: "center" }}>{getData}</Text>
        </View>
        <LinearGradient locations={[0.3, 0.6]} colors={["#f4666f", "#E55760"]} style={styles.circle}>
          <Text style={styles.fontCircle}>{itemKey.length}</Text>
        </LinearGradient>
        <ScrollView style={{ flex: 1, width: "100%", paddingHorizontal: 12 }}>
          <View style={{ flex: 1, padding: 10 }}>
            {itemKey.map((key) => (
              <CustomList icon={icon} email={email} user={user} key={key} item={item[key]} id={key} count={itemKey.length} getData={getData} {...this.props} />
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  circle: {
    height: 150,
    width: 150,
    backgroundColor: "#f4666f",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
    borderWidth: 2,
    borderColor: "white",
    marginTop: 25,
    marginBottom: 25,
  },
  fontCircle: {
    fontSize: 60,
    fontWeight: "700",
    color: "#fff",
  },
});
