import { Text, View, StatusBar, Alert, ScrollView } from "react-native";
import React, { Component } from "react";

import { db } from "../config";
import { setDoc, doc, getDocs, collection } from "@firebase/firestore";

import CustomInput from "../component/CustomInput";
import CustomButton from "../component/CustomButton";

export default class RegisScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      nama: "",
      alamat: "",
      telpon: "",

      secureTextEntry: true,
      eye: "",

      fontsLoaded: false,
    };
  }
  onChangeText = (namaState, value) => {
    this.setState({
      [namaState]: value,
    });
  };

  componentDidMount() {
    getDocs(collection(db, "users")).then((docSnap) => {
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

  insertNewUser = () => {
    var email = this.state.email;
    var password = this.state.password;
    var nama = this.state.nama;
    var telpon = this.state.telpon;
    var alamat = this.state.alamat;
    var id = email + Math.floor(Math.random() * 999999);
    let i = 0;

    if (email.length === 0 || password.length === 0 || nama.length === 0 || telpon.length === 0 || alamat.length === 0) {
      Alert.alert("😞 HARAP ISI FORM !!! 😞");
    } else if (email.includes("@")) {
      for (i; i < this.state.itemKey.length; i++) {
        if (email === this.state.item[i].email) {
          Alert.alert("EMAIL SUDAH TERDAFTAR");
          return;
        }
      }
      setDoc(doc(db, "users", id), {
        nama: nama,
        email: email,
        password: password,
        alamat: alamat,
        telpon: telpon,
      })
        .then(() => {
          Alert.alert("Berhasil Registrasi User");
          this.props.navigation.navigate("Login");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      Alert.alert("FORMAT EMAIL ANDA SALAH !!!");
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
      <ScrollView style={{ flex: 1, backgroundColor: "#EBC96C" }}>
        <View style={{ flex: 0.1, backgroundColor: "#EBC96C", paddingVertical: 25, alignItems: "center" }}>
          <Text style={{ color: "#f4666f", fontSize: 36, fontWeight: "800" }}>Create Account</Text>
        </View>
        <View style={{ backgroundColor: "#fff", flex: 1, paddingVertical: 15, borderTopRightRadius: 40, borderTopLeftRadius: 40 }}>
          <StatusBar barStyle="dark-content" backgroundColor="#EBC96C" />
          <View style={{ width: "100%", paddingHorizontal: 30 }}>
            <CustomInput placeholder="Enter your name" onChangeText={this.onChangeText} value={this.state.nama} namaState="nama" icon="person-outline" label="Nama" />
            <CustomInput placeholder="example@gmail.com" onChangeText={this.onChangeText} value={this.state.email} namaState="email" icon="mail-outline" label="Email" />
            <CustomInput placeholder="Enter your phone number" onChangeText={this.onChangeText} value={this.state.telpon} namaState="telpon" icon="md-call-outline" label="Telephone" max={12} />
            <CustomInput
              placeholder="maxpassword:15!"
              onChangeText={this.onChangeText}
              value={this.state.password}
              namaState="password"
              icon="lock-closed-outline"
              secureTextEntry={this.state.secureTextEntry}
              label="Password"
              max={15}
              onPress={this.updateSecureTextEntry}
              eye={this.state.secureTextEntry ? "eye-off-outline" : "eye-outline"}
            />
            <CustomInput isTextArea={true} max={90} placeholder="Enter your address" onChangeText={this.onChangeText} value={this.state.alamat} namaState="alamat" icon="map-outline" label="Alamat" />
            <CustomButton
              text="Sign Up"
              onPress={() => {
                this.insertNewUser();
              }}
            />
            <CustomButton
              text="Sign In"
              text2="Already have an account ?  "
              type="secondary"
              onPress={() => {
                this.props.navigation.navigate("Login");
              }}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}
