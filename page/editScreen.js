import { Text, View, StatusBar, Image, ScrollView, TouchableOpacity, Alert } from "react-native";
import React, { Component } from "react";

import { collection, getDocs, query, where, setDoc, doc, deleteDoc, querySnapshot, ref, updateDoc } from "@firebase/firestore";
import { db } from "../config";
import CustomInput from "../component/CustomInput";
import CustomButton from "../component/CustomButton";
import { Ionicons } from "@expo/vector-icons";

import pict from "../assets/profile.png";
import { StackActions } from "@react-navigation/native";

export default class EditScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.route.params,
      itemKeyRegis: [],
      itemRegis: {},
      item: {},
      itemKey: [],

      id: "",
      nama: "",
      telpon: "",
      telpon: "",
      alamat: "",
      password: "",
      password2: "",
      passwordAwal: "",

      secureTextEntry: true,
    };
  }

  onChangeText = (namaState, value) => {
    this.setState({
      [namaState]: value,
    });
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
        nama: users[0].nama,
        telpon: users[0].telpon,
        alamat: users[0].alamat,
        password: users[0].password,
        id: users[0].id,
        passwordAwal: users[0].password,
      });
    });
  }

  updateData = () => {
    var id = this.state.id;
    var nama = this.state.nama;
    var telpon = this.state.telpon;
    var alamat = this.state.alamat;
    var password = this.state.password;
    var password2 = this.state.password2;

    nama.length !== 0 && telpon.length !== 0 && alamat.length !== 0 && password.length !== 0
      ? password2 !== ""
        ? password === password2
          ? updateDoc(doc(db, "users", id), {
              nama: nama,
              telpon: telpon,
              alamat: alamat,
              password: password,
            }).then(() => {
              Alert.alert("Berhasil Edit Data");
              this.props.navigation.navigate("Profile");
            })
          : Alert.alert("CONFIRM PASSWORD ANDA DENGAN BENAR !!!")
        : password === this.state.passwordAwal
        ? updateDoc(doc(db, "users", id), {
            nama: nama,
            telpon: telpon,
            alamat: alamat,
            password: password,
          }).then(() => {
            Alert.alert("Berhasil Edit Data");
            this.props.navigation.navigate("Profile");
          })
        : Alert.alert("CONFIRM PASSWORD ANDA !!!")
      : Alert.alert("HARAP ISI FORM  !!!");
  };

  updateSecureTextEntry = () => {
    this.setState({
      ...this.state,
      secureTextEntry: !this.state.secureTextEntry,
      eye: !this.state.eye,
    });
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#f7f7f7" }}>
        <StatusBar barStyle="dark-content" backgroundColor="#EBC96C" />
        <View style={{ justifyContent: "center", alignItems: "flex-start", flexDirection: "row", padding: 16, paddingHorizontal: 20, backgroundColor: "#EBC96C" }}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("Profile")} style={{ flex: 0.45, justifyContent: "center" }}>
            <Ionicons name="arrow-back" size={30} color="#fff" />
          </TouchableOpacity>
          <Text style={{ fontStyle: "italic", fontSize: 26, fontWeight: "800", color: "#fff", flex: 1, letterSpacing: 1 }}>Edit Profile</Text>
        </View>
        <ScrollView>
          <View style={{ flex: 1, paddingHorizontal: 30, paddingTop: 20, paddingBottom: 70 }}>
            <CustomInput icon="person-outline" label="Nama" onChangeText={this.onChangeText} value={this.state.nama} namaState="nama" />
            <CustomInput max={12} icon="call-outline" label="No. Telp" v onChangeText={this.onChangeText} value={this.state.telpon} namaState="telpon" />
            <CustomInput isTextArea={true} max={90} icon="map-outline" label="Alamat" onChangeText={this.onChangeText} value={this.state.alamat} namaState="alamat" />
            <CustomInput placeholder="maxpassword:15!" onChangeText={this.onChangeText} value={this.state.password} namaState="password" icon="lock-closed-outline" secureTextEntry={true} label="Password" max={15} />
            <CustomInput placeholder="maxpassword:15!" onChangeText={this.onChangeText} value={this.state.password2} namaState="password2" icon="lock-closed-outline" secureTextEntry={true} label="Confirm Password" max={15} />
            <CustomButton text="Edit" onPress={() => this.updateData()} />
          </View>
        </ScrollView>
      </View>
    );
  }
}
