import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ClickProvider } from "../Sportify/context/ClickContext";
import LoginScreen from "../Sportify/components/LoginScreen";
import SignUpScreen from "../Sportify/components/SignupScreen";
import HomeScreen from "../Sportify/components/HomeScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <ClickProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignUp">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ClickProvider>
  );
}
