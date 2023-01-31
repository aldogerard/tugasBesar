import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";

/* SCREEEN */
import HomeScreen from "../page/homeScreen";
import LoginScreen from "../page/loginScreen";
import RegisScreen from "../page/regisScreen";
import SplashScreen from "../page/splashScreen";
import ProfileScreen from "../page/profileScreen";
import ListScreen from "../page/listScreen";
import DetailScreen from "../page/detailScreen";
import RegisRsScreen from "../page/regisRsScreen";
import HistoryScreen from "../page/historyScreen";
import TopBarNavigation from "./topBarNavigation";
import AdminScreen from "../page/adminScreen";
import ListAdminScreen from "../page/listAdminScreen";
import EditScreen from "../page/editScreen";
import NewsScreen from "../page/newsScreen";
import NewsDetailScreen from "../page/newsDetailScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BottomNavigator = ({ route }) => {
  const user = route.params;
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;
          if (rn === "Home") {
            iconName = focused ? "home-sharp" : "home-outline";
          } else if (rn == "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (rn == "News") {
            iconName = focused ? "newspaper-sharp" : "newspaper-outline";
          }
          return <Ionicons name={iconName} size={30} color="#EBC96C" />;
        },
        tabBarStyle: {
          height: 60,
          borderTopWidth: 0.7,
          // borderTopColor: "purple",
          backgroundColor: "#fff",
        },
      })}
    >
      <Tab.Screen
        initialParams={user}
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: () => {
            return null;
          },
        }}
      />
      <Tab.Screen
        // initialParams={user}
        name="News"
        component={NewsScreen}
        options={{
          headerShown: false,
          tabBarLabel: () => {
            return null;
          },
        }}
      />
      <Tab.Screen
        initialParams={user}
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarLabel: () => {
            return null;
          },
        }}
      />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Regis" component={RegisScreen} />
        <Stack.Screen name="List" component={ListScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="RegisRS" component={RegisRsScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
        <Stack.Screen name="Admin" component={AdminScreen} />
        <Stack.Screen name="ListAdmin" component={ListAdminScreen} />
        <Stack.Screen name="Edit" component={EditScreen} />
        <Stack.Screen name="NewsDetail" component={NewsDetailScreen} />
        <Stack.Screen name="TopBar" component={TopBarNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
