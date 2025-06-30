import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, StyleSheet } from "react-native";

import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import DrawerNavigator from "./DrawerNavigator";
import LoadingScreen from "./src/screens/LoadingScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={styles.app}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Loading" component={LoadingScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Main" component={DrawerNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "#1a1f36",
  },
});
