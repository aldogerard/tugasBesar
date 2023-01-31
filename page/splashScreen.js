import React, { Component } from "react";
import { View, Image, StatusBar, Text } from "react-native";
import { StackActions } from "@react-navigation/native";
import logo from "../assets/logo/logo6.png";
import { LinearGradient } from "expo-linear-gradient";

export default class SplashScreen extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.dispatch(StackActions.replace("Login"));
    }, 2000);
  }

  render() {
    return (
      <LinearGradient
        locations={[0, 0.9]}
        colors={["#FFFFDf", "#FFFFDf"]}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StatusBar backgroundColor="#EBC96C" />
        <Image
          source={logo}
          resizeMode="contain"
          style={{
            width: "120%",
          }}
        />
      </LinearGradient>
    );
  }
}
