import { FlatList, Text, TouchableOpacity, StatusBar, View } from "react-native";
import React, { Component } from "react";
import MapView, { Marker } from "react-native-maps";
import { collection, getDocs, docSnap, doc, where, query, deleteDoc } from "@firebase/firestore";
import { db } from "../config";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default class DetailScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      getData: props.route.params,
      item: {},
      itemKey: [],
      nama: "",
      Fasilitas: [],
      latitude: null,
      longitude: null,
      latitudeMarker: null,
      longitudeMarker: null,

      toggle: false,
    };
  }

  componentDidMount() {
    this.getAlldata();
  }

  getAlldata() {
    let data = this.state.getData.getData;
    let nama = this.state.getData.nama;
    getDocs(query(collection(db, data), where("nama", "==", nama))).then((docSnap) => {
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
    const nama = this.state.getData.nama;

    return (
      <View style={{ flex: 1 }}>
        {itemKey.map((key) => {
          let dt = item[key];
          this.state.nama = dt.nama;
          this.state.latitude = dt.latitude;
          this.state.latitudeMarker = dt.latitudeMarker;
          this.state.longitude = dt.longitude;
          this.state.longitudeMarker = dt.longitudeMarker;
          this.state.Fasilitas = dt.Fasilitas;
        })}
        <StatusBar barStyle="dark-content" backgroundColor="#EBC96C" />
        <View style={{ justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "row", padding: 12, backgroundColor: "#EBC96C", width: "100%" }}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("List")}>
            <Ionicons name="arrow-back" size={30} color="#fff" />
          </TouchableOpacity>
          <Text style={{ fontSize: 22, fontWeight: "800", color: "#fff", textTransform: "uppercase", flex: 0.91, textAlign: "center" }}>{nama}</Text>
        </View>
        {this.state.latitude === null ? (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 28, fontWeight: "700", color: "#f4666f" }}>Loading . . . . .</Text>
          </View>
        ) : (
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: 0.007,
              longitudeDelta: 0.007,
            }}
          >
            <Marker
              coordinate={{
                latitude: this.state.latitudeMarker,
                longitude: this.state.longitudeMarker,
              }}
            />
          </MapView>
        )}
        {this.state.latitude ? (
          <View style={{ flex: 0.6, padding: 10, backgroundColor: "#fff", borderTopLeftRadius: 25, borderTopRightRadius: 25, elevation: 3 }}>
            <View style={{ width: "100%", padding: 5, alignItems: "center", justifyContent: "center", borderBottomWidth: 1 }}>
              <Text style={{ fontSize: 24, fontWeight: "700", color: "#EBC96C" }}>Fasilitas Yang Tersedia</Text>
            </View>
            <View style={{ flex: 1, paddingHorizontal: 15 }}>
              <FlatList
                data={this.state.Fasilitas}
                renderItem={({ item, index }) => (
                  <View style={{ marginTop: 14, flexDirection: "row", flexWrap: "wrap" }}>
                    <Ionicons name="checkmark-circle-sharp" size={22} color="#EBC96C" />
                    <Text style={{ fontSize: 16, fontWeight: "500", marginLeft: 12, color: "#252525" }}>{item}</Text>
                  </View>
                )}
                keyExtractor={(item) => item}
              />
            </View>
          </View>
        ) : (
          console.log()
        )}
        {this.state.latitude ? (
          <TouchableOpacity onPress={() => this.props.navigation.navigate("RegisRS", { getData: this.state.getData })} style={{ flex: 0.12, backgroundColor: "#f4666f", justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 20, fontWeight: "700", textTransform: "uppercase", color: "white" }}>Daftar</Text>
          </TouchableOpacity>
        ) : (
          console.log()
        )}
      </View>
    );
  }
}
