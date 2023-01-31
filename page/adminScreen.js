import { Text, View, StatusBar, ScrollView, TouchableOpacity } from "react-native";
import { StackActions } from "@react-navigation/native";
import React, { Component } from "react";
import { Ionicons } from "@expo/vector-icons";

import icon1 from "../assets/hospital.png";
import icon2 from "../assets/hospital3.png";
import icon3 from "../assets/hospital2.png";

import CustomBox from "../component/CustomBox";

export default class AdminScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#eee" }}>
        <StatusBar barStyle="dark-content" backgroundColor="#EBC96C" />
        <View style={{ justifyContent: "center", alignItems: "flex-start", flexDirection: "row", padding: 12, paddingVertical: 16, backgroundColor: "#EBC96C" }}>
          <Text style={{ fontStyle: "italic", fontSize: 26, fontWeight: "800", color: "#fff", flex: 1, letterSpacing: 1 }}>E-HOSPITAL</Text>
          <TouchableOpacity onPress={() => this.props.navigation.dispatch(StackActions.replace("Login"))} style={{ flex: 0.1, justifyContent: "center" }}>
            <Ionicons name="exit-outline" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, paddingHorizontal: 18 }}>
          <View style={{ paddingVertical: 16 }}>
            <Text style={{ fontSize: 14, color: "#f4666f" }}>Hi,</Text>
            <Text style={{ fontSize: 22, color: "#f4666f", fontWeight: "700", textTransform: "uppercase" }}>Admin</Text>
          </View>
          <ScrollView style={{ flex: 1 }}>
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap" }}>
              <CustomBox icon={icon1} label="RSUD" hero="pictRsud" {...this.props} name="rsud" nav="ListAdmin" />
              <CustomBox icon={icon2} label="RSU" hero="pictRsud" {...this.props} name="rsu" nav="ListAdmin" />
              <CustomBox icon={icon3} label="RSJ" hero="pictRsud" {...this.props} name="rsj" nav="ListAdmin" />
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
