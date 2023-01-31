import { Text, View, Platform, TouchableOpacity, Alert, StatusBar, ScrollView } from "react-native";
import React, { Component } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

import { collection, getDocs, query, where, setDoc, doc } from "@firebase/firestore";
import { db } from "../config";

import DropDownPicker from "react-native-dropdown-picker";

import CustomInput from "../component/CustomInput";
import CustomButton from "../component/CustomButton";
import { Ionicons } from "@expo/vector-icons";

export default class RegisRsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      getData: props.route.params.getData,
      tipeRS: props.route.params.getData.getData,
      //nama user
      user: props.route.params.getData.user,
      //nama rumah sakit
      nama: props.route.params.getData.nama,
      email: props.route.params.getData.email,

      namaPasien: "",
      telpon: "",
      alamat: "",

      date: new Date(),
      showTanggal: false,
      showWaktu: false,
      tanggal: "",
      waktu: "",

      item: {},
      itemKey: [],
    };
  }

  onChangeText = (namaState, value) => {
    this.setState({
      [namaState]: value,
    });
  };
  onChangeDate = (event, selectDate) => {
    const currentDate = selectDate || this.state.date;
    this.setState({
      show: Platform.OS === "android",
      date: currentDate,
    });

    let dt = new Date(currentDate);
    let getTanggal = dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear();

    this.setState({
      tanggal: getTanggal,
      showTanggal: false,
    });
  };

  onChangeTime = (event, selectDate) => {
    const currentDate = selectDate || this.state.date;
    this.setState({
      show: Platform.OS === "android",
      date: currentDate,
    });

    let dt = new Date(currentDate);
    let getWaktu = dt.getMinutes() < 10 ? dt.getHours() + ":" + "0" + dt.getMinutes() : dt.getHours < 10 ? "0" + dt.getHours() + ":" + dt.getMinutes() : dt.getHours() + ":" + dt.getMinutes();

    this.setState({
      waktu: getWaktu,
      showWaktu: false,
    });
  };

  showMode = (type) => {
    if (type === "tanggal") {
      this.setState({
        showTanggal: true,
      });
    } else {
      this.setState({
        showWaktu: true,
      });
    }
  };

  componentDidMount() {
    // console.log(this.state.email);
    getDocs(query(collection(db, "users"), where("email", "==", this.state.email))).then((docSnap) => {
      let users = [];
      docSnap.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });
      this.setState({
        item: users,
        itemKey: Object.keys(users),
        alamat: users[0].alamat,
        telpon: users[0].telpon,
      });
    });
  }

  insertRegister = () => {
    var nama = this.state.user;
    var telpon = this.state.telpon;
    var alamat = this.state.alamat;
    var tanggal = this.state.tanggal;
    var waktu = this.state.waktu;
    var namaRS = this.state.nama;
    var namaPasien = this.state.namaPasien;
    var email = this.state.email;
    var tipeRS = this.state.tipeRS;

    var dt = new Date();
    var s = dt.getMilliseconds();

    var a = tanggal + waktu + "" + s;
    var x = a.replace(/[:/]/gi, "");
    var id = email + x;

    nama.length === 0 || telpon.length === 0 || alamat.length === 0 || tanggal.length === 0 || waktu.length === 0
      ? Alert.alert("😞 HARAP ISI FORM !!! 😞")
      : setDoc(doc(db, "registrasi", id), {
          nama: nama,
          alamat: alamat,
          telpon: telpon,
          tanggal: tanggal,
          waktu: waktu,
          namaRS: namaRS,
          status: "pending",
          pesan: "",
          namaPasien: namaPasien,
          email: email,
          tipeRS: tipeRS,
        })
          .then(() => {
            Alert.alert(`Berhasil Registrasi di ${namaRS} ✅`);
            this.props.navigation.navigate("BottomNavigator");
          })
          .catch((error) => {
            console.log(error);
          });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" backgroundColor="#EBC96C" />
        <View style={{ justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "row", padding: 12, backgroundColor: "#EBC96C", width: "100%" }}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("Detail")}>
            <Ionicons name="arrow-back" size={30} color="#fff" />
          </TouchableOpacity>
          <Text style={{ fontSize: 24, fontWeight: "800", color: "#fff", textTransform: "uppercase", flex: 0.91, textAlign: "center" }}>Registrasi</Text>
        </View>
        <View style={{ flex: 1, paddingHorizontal: 30, paddingVertical: 50, backgroundColor: "#f7f7f7" }}>
          <CustomInput placeholder="Masukkan Nama Pasien Lengkap" onChangeText={this.onChangeText} value={this.state.namaPasien} namaState="namaPasien" icon="person-outline" label="Nama Pasien" />
          <CustomInput max={12} placeholder="Masukkan Nomor Telephone" onChangeText={this.onChangeText} value={this.state.telpon} namaState="telpon" icon="call-outline" label="No. Telp" />
          <CustomInput isTextArea={true} max={90} placeholder="Masukkan Alamat" onChangeText={this.onChangeText} value={this.state.alamat} namaState="alamat" icon="map-outline" label="Alamat" />
          <CustomInput
            edit={false}
            placeholder="Pilih Tanggal"
            onPress={this.showMode}
            onChangeText={this.onChangeText}
            value={this.state.tanggal}
            namaState="tanggal"
            icon="calendar-outline"
            label="tanggal"
            isDate={true}
            eye="md-chevron-down"
          />
          <CustomInput edit={false} placeholder="Pilih Waktu" onPress={this.showMode} onChangeText={this.onChangeText} value={this.state.waktu} namaState="waktu" icon="time-outline" label="waktu" isDate={true} eye="md-chevron-down" />
          <CustomButton
            text="Register"
            onPress={() => {
              this.insertRegister();
            }}
          />
        </View>
        {this.state.showTanggal && <DateTimePicker testID="dateTimePicker" value={this.state.date} mode="date" is24Hour={true} display="default" onChange={this.onChangeDate} />}
        {this.state.showWaktu && <DateTimePicker testID="dateTimePicker" value={this.state.date} mode="time" is24Hour={true} display="default" onChange={this.onChangeTime} />}
      </View>
    );
  }
}
