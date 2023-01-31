import { Text, View, StatusBar, Image, ScrollView, TouchableOpacity, Alert, RefreshControl } from "react-native";
import React, { Component } from "react";

import { collection, getDocs, query, where, setDoc, doc, deleteDoc, querySnapshot, ref } from "@firebase/firestore";
import { db } from "../config";
import CustomInput from "../component/CustomInput";
import CustomButton from "../component/CustomButton";
import { Ionicons } from "@expo/vector-icons";

import pict from "../assets/profile.png";
import { StackActions } from "@react-navigation/native";

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.route.params,
      itemKeyRegis: [],
      itemRegis: {},
      item: {},
      itemKey: [],
      id: "",
      telpon: "",
      nama: "",
      email: "",

      refreshing: false,

      toggle: false,
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
    getDocs(query(collection(db, "users"), where("email", "==", this.state.user.email))).then((docSnap) => {
      let users = [];
      docSnap.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });
      this.setState({
        item: users,
        itemKey: Object.keys(users),
        telpon: users[0].telpon,
        alamat: users[0].alamat,
        email: users[0].email,
        nama: users[0].nama,
        id: users[0].id,
      });
    });
  }

  getDataRegis = () => {
    getDocs(query(collection(db, "registrasi"), where("email", "==", this.state.user.email))).then((docSnap) => {
      let users = [];
      docSnap.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });
      this.setState({
        itemRegis: users,
        itemKeyRegis: Object.keys(users),
      });
    });
  };

  deleteData = () => {
    this.getDataRegis();
    Alert.alert("Info", "Anda Yakin Menghapus Data User? Seluruh Data Anda Akan Terhapus", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          for (let i = 0; i < this.state.itemKeyRegis.length; i++) {
            let idRegis = this.state.itemRegis[i].id;
            deleteDoc(doc(db, "registrasi", idRegis));
          }
          deleteDoc(doc(db, "users", this.state.id));
          this.props.navigation.dispatch(StackActions.replace("Login"));
          Alert.alert("Hapus Data Berhasil");
        },
      },
    ]);
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#f7f7f7" }}>
        <StatusBar barStyle="dark-content" backgroundColor="#EBC96C" />
        <View style={{ justifyContent: "center", alignItems: "flex-start", flexDirection: "row", padding: 16, paddingHorizontal: 20, backgroundColor: "#EBC96C" }}>
          <Text style={{ fontStyle: "italic", fontSize: 26, fontWeight: "800", color: "#fff", flex: 1, letterSpacing: 1 }}>Profile</Text>
          <TouchableOpacity onPress={() => this.setState({ toggle: !this.state.toggle })} style={{ flex: 0.1, justifyContent: "center" }}>
            <Ionicons name="ellipsis-vertical" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
        {this.state.toggle && (
          <View style={{ backgroundColor: "#EBC96c", padding: 15, paddingHorizontal: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("Edit", { email: this.state.user.email })} style={{ flexDirection: "row", paddingVertical: 5, alignItems: "center" }}>
              <Ionicons name="ellipsis-vertical" size={20} color="#fff" style={{ paddingHorizontal: 3, paddingRight: 10 }} />
              <Text style={{ fontSize: 18, fontWeight: "600", color: "#fff", paddingLeft: 5 }}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.deleteData()} style={{ flexDirection: "row", paddingVertical: 5, alignItems: "center" }}>
              <Ionicons name="close-circle" size={24} color="#fff" style={{ paddingHorizontal: 4, paddingRight: 5 }} />
              <Text style={{ fontSize: 18, fontWeight: "600", color: "#fff", paddingLeft: 5 }}>Hapus Account</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.dispatch(StackActions.replace("Login"))} style={{ flexDirection: "row", paddingVertical: 5, alignItems: "center" }}>
              <Ionicons name="exit-outline" size={24} color="#fff" style={{ paddingHorizontal: 5 }} />
              <Text style={{ fontSize: 18, fontWeight: "600", color: "#fff", paddingLeft: 5 }}>Keluar</Text>
            </TouchableOpacity>
          </View>
        )}
        <ScrollView refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.onRefresh()} />}>
          <View style={{ alignItems: "center" }}>
            <Image source={pict} style={{ width: 150, height: 150, marginVertical: 35 }} resizeMode="contain" />
          </View>
          <View style={{ flex: 1, paddingHorizontal: 30 }}>
            <CustomInput edit={false} icon="person-outline" label="Nama" value={this.state.nama} />
            <CustomInput edit={false} icon="mail-outline" label="Email" value={this.state.email} />
            <CustomInput edit={false} icon="call-outline" label="No. Telp" value={this.state.telpon} />
            <CustomInput isTextArea={true} edit={false} icon="map-outline" label="Alamat" value={this.state.alamat} />
          </View>
        </ScrollView>
      </View>
    );
  }
}
