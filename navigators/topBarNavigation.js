import { View, Text, TouchableOpacity } from "react-native";
import React, { Component } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";

import FinishScreen from "../page/history/finishScreen";
import ProcessScreen from "../page/history/processScreen";
import ConfirmScreen from "../page/history/confirmScreen";
import CancelScreen from "../page/history/cancelScreen";

const Tabs = createMaterialTopTabNavigator();

const TopTabsNavigator = ({ route, id }) => {
  const inset = useSafeAreaInsets();
  return (
    <Tabs.Navigator
      initialRouteName="Process"
      screenOptions={({ route }) => ({
        tabBarStyle: {
          height: 50,
          backgroundColor: "#fff",
        },
        tabBarLabelStyle: {
          fontWeight: "600",
          fontSize: 14,
          marginTop: inset.top,
        },
        tabBarActiveTintColor: "#f4666f",
        swipeEnabled: true,
      })}
    >
      <Tabs.Screen
        initialParams={id}
        name="menu"
        component={ProcessScreen}
        options={{
          headerShown: true,
          tabBarLabel: "Proses",
        }}
      />
      <Tabs.Screen
        initialParams={id}
        name="Finish2"
        component={ConfirmScreen}
        options={{
          headerShown: true,
          tabBarLabel: "Berhasil",
        }}
      />
      <Tabs.Screen
        initialParams={id}
        name="Finish"
        component={FinishScreen}
        options={{
          headerShown: true,
          tabBarLabel: "Selesai",
        }}
      />
      <Tabs.Screen
        initialParams={id}
        name="Cancel"
        component={CancelScreen}
        options={{
          headerShown: true,
          tabBarLabel: "Batal",
        }}
      />
    </Tabs.Navigator>
  );
};

export default TopTabsNavigator;
