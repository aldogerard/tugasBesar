import { Text, View, StatusBar, TouchableOpacity, ScrollView, RefreshControl } from "react-native";
import React, { Component } from "react";
import { Ionicons } from "@expo/vector-icons";
import CustomBox from "../component/CustomBox";

import { collection, getDocs, query, where, setDoc, doc, deleteDoc, querySnapshot, ref, updateDoc } from "@firebase/firestore";
import { db } from "../config";

import icon1 from "../assets/hospital.png";
import icon2 from "../assets/hospital3.png";
import icon3 from "../assets/hospital2.png";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.route.params,

      nama: "",

      refreshing: false,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    getDocs(query(collection(db, "users"), where("email", "==", this.state.user.email))).then((docSnap) => {
      let users = [];
      docSnap.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });
      this.setState({
        item: users,
        itemKey: Object.keys(users),
        nama: users[0].nama,
      });
    });
  }

  onRefresh = () => {
    this.setState({
      refreshing: true,
    });
    setTimeout(() => {
      this.setState({
        refreshing: false,
      });
      this.getData();
    }, 1500);
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#f7f7f7" }} ref>
        <StatusBar barStyle="dark-content" backgroundColor="#EBC96C" />
        <View style={{ justifyContent: "center", alignItems: "flex-start", flexDirection: "row", padding: 12, paddingVertical: 16, backgroundColor: "#EBC96C" }}>
          <Text style={{ fontStyle: "italic", fontSize: 26, fontWeight: "800", color: "#fff", flex: 1, letterSpacing: 1 }}>E-HOSPITAL</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("History", { user: this.state.user.user, email: this.state.user.email })} style={{ flex: 0.1, justifyContent: "center" }}>
            <Ionicons name="apps-sharp" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, paddingHorizontal: 18 }}>
          <View style={{ paddingVertical: 16 }}>
            <Text style={{ fontSize: 14, color: "#EBC96C" }}>Selamat Datang,</Text>
            <Text style={{ fontSize: 22, color: "#EBC96C", fontWeight: "700", textTransform: "uppercase" }}>{this.state.nama}</Text>
          </View>
          <ScrollView style={{ flex: 1 }} refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.onRefresh()} />}>
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap" }}>
              <CustomBox icon={icon1} label="RSUD" hero="pictRsud" {...this.props} name="rsud" user={this.state.user.user} email={this.state.user.email} nav="List" />
              <CustomBox icon={icon2} label="RSU" hero="pictRsud" {...this.props} name="rsu" user={this.state.user.user} email={this.state.user.email} nav="List" />
              <CustomBox icon={icon3} label="RSJ" hero="pictRsud" {...this.props} name="rsj" user={this.state.user.user} email={this.state.user.email} nav="List" />
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
