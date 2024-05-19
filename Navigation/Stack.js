import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Calculator from "./Screens/Calculator";
import History from "./Screens/History";
import SplashScreen from "./Screens/SplashScreen";
const Stack = createNativeStackNavigator();

const AuthenticationStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Calculator"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name= "SplashScreen" component={SplashScreen}></Stack.Screen>
      <Stack.Screen name="Calculator" component={Calculator}></Stack.Screen>
      <Stack.Screen name="History" component={History} ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default AuthenticationStack;