import { Text, View, Alert, StatusBar, ScrollView, Image } from "react-native";
import React, { Component } from "react";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { db } from "../config";
import CustomInput from "../component/CustomInput";
import CustomButton from "../component/CustomButton";
import { LinearGradient } from "expo-linear-gradient";
import { StackActions } from "@react-navigation/native";

import logo4 from "../assets/logo/logo3.png";

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",

      secureTextEntry: true,
      eye: "",

      dataEmail: "",
      dataPassword: "",

      item: {},
      itemKey: [],
    };
  }

  onChangeText = (namaState, value) => {
    this.setState({
      [namaState]: value,
    });
  };

  getData() {
    getDocs(query(collection(db, "users"), where("email", "==", this.state.email))).then((docSnap) => {
      let users = [];
      docSnap.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });
      this.setState({
        item: users,
        itemKey: Object.keys(users),
      });
      Alert.alert(`🙂 Selamat Datang ${this.state.item[0].nama} `);
      this.props.navigation.dispatch(StackActions.replace("BottomNavigator", { user: this.state.item[0].nama, email: this.state.item[0].email }));

      this.setState({ email: "", password: "" });
    });
  }

  readData = () => {
    var email = this.state.email;
    var password = this.state.password;

    if (email.length === 0 || password.length === 0) {
      Alert.alert("😞 HARAP ISI FORM !!! 😞");
    } else if (email === "admin" && password === "admin") {
      Alert.alert("😎 Selamat Datang Admin 😎");
      this.props.navigation.dispatch(StackActions.replace("Admin"));

      this.setState({ email: "", password: "" });
    } else {
      email.includes("@")
        ? getDocs(query(collection(db, "users"), where("email", "==", email)))
            .then((docSnap) => {
              let users = [];
              docSnap.forEach((doc) => {
                users.push({ ...doc.data(), id: doc.id });
              });
              this.setState({
                dataPassword: users[0].password,
                dataEmail: users[0].email,
              });
              if (email === this.state.dataEmail && password === this.state.dataPassword) {
                this.getData();
              } else {
                Alert.alert("❌ PASSWORD ANDA SALAH ❌");
              }
            })
            .catch(() => {
              Alert.alert("❌ EMAIL ATAU PASSWORD ANDA SALAH ❌");
            })
        : Alert.alert("FORMAT EMAIL ANDA SALAH !!!");
    }
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
      <ScrollView style={{ backgroundColor: "#fff" }}>
        <LinearGradient locations={[0.1, 0.9]} colors={["#EBC96C", "#EBC96C"]} style={{ flex: 1, alignItems: "center", backgroundColor: "#eee", justifyContent: "center" }}>
          <StatusBar barStyle="dark-content" backgroundColor="#EBC96C" />
          <Image source={logo4} style={{ width: 340, height: 340 }} resizeMode="contain" />
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, width: "100%", backgroundColor: "#fff", padding: 30, paddingVertical: 50, borderTopRightRadius: 40, borderTopLeftRadius: 40, elevation: 5 }}>
              <CustomInput placeholder="example@gmail.com" onChangeText={this.onChangeText} value={this.state.email} namaState="email" icon="mail-outline" label="Email" />
              <CustomInput
                placeholder="password23"
                onChangeText={this.onChangeText}
                value={this.state.password}
                namaState="password"
                icon="lock-closed-outline"
                secureTextEntry={this.state.secureTextEntry}
                label="Password"
                onPress={this.updateSecureTextEntry}
                eye={this.state.secureTextEntry ? "eye-off-outline" : "eye-outline"}
              />
              <CustomButton
                text="Login"
                onPress={() => {
                  this.readData();
                }}
              />
              <CustomButton
                text="Sign Up"
                text2="Don't have an account ?  "
                type="secondary"
                onPress={() => {
                  this.props.navigation.navigate("Regis");
                  this.setState({ email: "", password: "" });
                }}
              />
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
    );
  }
}
