import { Text, View, ScrollView, TouchableOpacity, StatusBar } from "react-native";
import React, { Component } from "react";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { db } from "../config";
import TopBarNavigation from "../navigators/topBarNavigation";
import { Ionicons } from "@expo/vector-icons";

export class ListAdminScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.route.params,
      tipeRS: props.route.params.namaDB,

      item: {},
      itemKey: [],
    };
  }

  componentDidMount() {
    var tipeRS = this.state.tipeRS;

    getDocs(query(collection(db, "registrasi"), where("tipeRS", "==", tipeRS), where("status", "==", "pending"))).then((docSnap) => {
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
    const { item, itemKey } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" backgroundColor="#EBC96C" />
        <View style={{ justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "row", padding: 12, backgroundColor: "#EBC96C", width: "100%" }}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("Admin")}>
            <Ionicons name="arrow-back" size={30} color="#FFF" />
          </TouchableOpacity>
          <Text style={{ fontSize: 24, fontWeight: "700", color: "#FFF", textTransform: "capitalize", flex: 0.91, textAlign: "center" }}>List Pendaftaran</Text>
        </View>
        <TopBarNavigation style={{ flex: 1 }} id={this.state.tipeRS} />
      </View>
    );
  }
}

export default ListAdminScreen;
