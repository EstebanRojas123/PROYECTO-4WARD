// src/navigation/DrawerNavigator.js
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./src/screens/Home";
import Historial from "./src/screens/Historial";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Inicio">
      <Drawer.Screen name="Inicio" component={Home} />
      <Drawer.Screen name="Historial" component={Historial} />
    </Drawer.Navigator>
  );
}
