import { Text, View, ScrollView, RefreshControl } from "react-native";
import React, { Component } from "react";

import { collection, getDocs, query, where } from "@firebase/firestore";
import { db } from "../../config";

import CustomListHistory from "../../component/CustomListHistory";

export default class CancelScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.route.params,
      data: "",
      tipeRS: "",
      item: {},
      itemKey: [],
    };
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

  componentDidMount() {
    this.getData();
  }
  getData() {
    let i;
    let data = "";
    for (i = 0; i < Object.keys(this.state.user).length; i++) {
      data += this.state.user[i];
    }
    this.setState({
      data: data,
    });

    data.includes("@")
      ? getDocs(query(collection(db, "registrasi"), where("email", "==", data), where("status", "==", "ditolak"))).then((docSnap) => {
          let users = [];
          docSnap.forEach((doc) => {
            users.push({ ...doc.data(), id: doc.id });
          });
          this.setState({
            item: users,
            itemKey: Object.keys(users),
          });
        })
      : getDocs(query(collection(db, "registrasi"), where("tipeRS", "==", data), where("status", "==", "ditolak"))).then((docSnap) => {
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
    const user = !this.state.data.includes("@") ? "admin" : "user";
    const { item, itemKey } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: "#eee", alignItems: "center" }}>
        <ScrollView refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.onRefresh()} />} style={{ flex: 1, width: "100%", paddingHorizontal: 18 }}>
          <View style={{ flex: 1, paddingVertical: 10 }}>
            {itemKey.map((key) => (
              <CustomListHistory key={key} item={item[key]} id={key} user={user} {...this.props} />
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}
