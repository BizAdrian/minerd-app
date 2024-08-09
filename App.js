import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import RegisterIncidenceScreen from "./screens/RegisterIncidenceScreen";
import ViewIncidenceScreen from "./screens/ViewIncidenceScreen";
import IncidenceDetailScreen from "./screens/IncidenceDetailScreen";
import AboutScreen from "./screens/AboutScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import AdvancedMenu from "./screens/AdvancedMenu";
import RegisterVisit from "./screens/RegisterVisitScreen";
import ViewVisitsScreen from "./screens/ViewVisitsScreen";
import VisitDetailScreen from "./screens/VisitDetailScreen";
import Mapa from "./screens/Mapa";
import Noticias from "./screens/Noticias";
import CentersScreen from "./screens/CentersScreen";
import { Ionicons } from '@expo/vector-icons';

const StackNav = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StackNav.Navigator initialRouteName="Home">

      <StackNav.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerBackVisible: false,
          headerTitle: () => (
            <Ionicons name="home" size={24} color="black" /> 
          ),
        }}
      />

    <StackNav.Screen
        options={{
          headerBackVisible: true,
          headerTitle: () => (
            <Ionicons name="settings" size={24} color="black" />
          ),
        }}
        name="Opciones Avanzadas"
        component={AdvancedMenu}
      />

        <StackNav.Screen
          name="Registrar Nueva Incidencia"
          component={RegisterIncidenceScreen}
        />
        <StackNav.Screen
          name="Lista de incidencias"
          component={ViewIncidenceScreen} />

        <StackNav.Screen
          name="Detalles de Incidencia"
          component={IncidenceDetailScreen}
        />
        <StackNav.Screen
          name="Register"
          component={RegisterScreen} />

        <StackNav.Screen
          name="Registro de Visitas"
          component={RegisterVisit} />

        <StackNav.Screen
          name="Listado de Visitas"
          component={ViewVisitsScreen} />

        <StackNav.Screen
          name="Detalles de la visita"
          component={VisitDetailScreen} />

        <StackNav.Screen
          name="Mapa"
          component={Mapa} />

        <StackNav.Screen
          name="Noticias"
          component={Noticias} />

        <StackNav.Screen
          name="Centros"
          component={CentersScreen} />

        <StackNav.Screen name="Login"
          component={LoginScreen}
          options={{ headerBackVisible: false }}
        />

        <StackNav.Screen
          name="About"
          component={AboutScreen} />
      </StackNav.Navigator>
    </NavigationContainer>
  );
}