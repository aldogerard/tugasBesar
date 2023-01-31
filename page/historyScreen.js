import { Text, View, TouchableOpacity, StatusBar } from "react-native";
import React, { Component } from "react";
import { Ionicons } from "@expo/vector-icons";
import TopBarNavigation from "../navigators/topBarNavigation";

export default class HistoryScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.route.params,
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" backgroundColor="#EBC96C" />
        <View style={{ justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "row", padding: 12, backgroundColor: "#EBC96C", width: "100%" }}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("Home")}>
            <Ionicons name="arrow-back" size={30} color="#fff" />
          </TouchableOpacity>
          <Text style={{ fontSize: 24, fontWeight: "700", color: "#fff", textTransform: "capitalize", flex: 0.91, textAlign: "center" }}>Riwayat Saya</Text>
        </View>
        <TopBarNavigation style={{ flex: 1 }} id={this.state.user.email} />
      </View>
    );
  }
}
