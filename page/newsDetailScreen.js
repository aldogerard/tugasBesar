import { Text, View, StatusBar, TouchableOpacity } from "react-native";
import React, { Component } from "react";
import { Image, Link, Box, NativeBaseProvider } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";

const NewsDetailScreen = ({ route, navigation }) => {
  const data = route.params.data;
  return (
    <NativeBaseProvider>
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="#EBC96C" />
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: "#EBC96C", padding: 16 }}>
          <TouchableOpacity style={{ flex: 0.45 }} onPress={() => navigation.navigate("News")}>
            <Ionicons name="md-chevron-back" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={{ fontSize: 26, fontWeight: "800", color: "#fff", flex: 1 }}>Detail Berita</Text>
        </View>
        <View style={{ flex: 1, padding: 15 }}>
          <View style={{ flex: 5 }}>
            <Text style={{ fontSize: 24, fontWeight: "800" }}>{data.title}</Text>
            <Image source={{ uri: data.thumbnail }} alt="Alternate Text" height="35%" width="100%" resizeMode="cover" style={{ borderRadius: 10, marginTop: 15 }} />
            <Text style={{ fontSize: 14, textAlign: "right", marginBottom: 15 }}>{data.pubDate}</Text>
            <Text style={{ fontSize: 18, fontWeight: "500", textAlign: "justify" }}>{data.description}</Text>
          </View>
          <TouchableOpacity style={{ width: "100%", alignItems: "center", marginTop: 20, flex: 1 }}>
            <Link width="100%" href={data.link} style={{ alignItems: "center", justifyContent: "center", height: 55 }}>
              <LinearGradient style={{ flex: 1, width: "100%", height: "100%", borderRadius: 12, justifyContent: "center", alignItems: "center" }} start={{ x: -1, y: 0 }} end={{ x: 1.5, y: 0 }} colors={["#fcc396", "#f4666f"]}>
                <Text style={{ fontSize: 18, fontWeight: "700", color: "#fff" }}>READ MORE</Text>
              </LinearGradient>
            </Link>
          </TouchableOpacity>
        </View>
      </View>
    </NativeBaseProvider>
  );
};

export default NewsDetailScreen;
