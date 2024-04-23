import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Calculator from "./Screens/Calculator";
import SavedScreen from "./Screens/SavedScreen";
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
      <Stack.Screen name="QuickGPA - Calculator" component={Calculator}></Stack.Screen>
      <Stack.Screen name="SavedScreen" component={SavedScreen} ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default AuthenticationStack;