import React, { useState } from 'react';
import { View, Alert, Text, StyleSheet, Animated, TouchableOpacity, LayoutAnimation, Platform, UIManager, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configuración de animación para iOS y Android
if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const clearStorage = async () => {
  Alert.alert(
    "Confirmación",
    "Estás a punto de borrar todos los datos, esta acción no puede revertirse.",
    [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Aceptar",
        onPress: async () => {
          try {
            await AsyncStorage.clear();
            Alert.alert("Haz eliminado de forma permanente todos los registros");
          } catch (e) {
            Alert.alert("Error al borrar los registros");
          }
        },
      },
    ],
    { cancelable: true }
  );
};

const handleLogout = async (navigation) => {
  try {
    await AsyncStorage.removeItem('userToken');
    Alert.alert("Cerraste Sesión");
    navigation.navigate('Login');
  } catch (e) {
    Alert.alert("Error al cerrar sesión");
    console.error(e);
  }
};

export default function HomeScreen({ navigation }) {
  const [expandedButton, setExpandedButton] = useState(null);

  const handlePress = (button) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedButton(expandedButton === button ? null : button);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.welcomeText}>Bienvenido</Text>
      <View style={styles.gridContainer}>
        <TouchableOpacity 
          style={[styles.button, expandedButton === 'registro' && styles.expandedButton]} 
          onPress={() => {
            handlePress('registro');
            navigation.navigate('Registro de Visitas');
          }}
        >
          <Text style={styles.buttonText}>Registrar visita</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, expandedButton === 'visitas' && styles.expandedButton]} 
          onPress={() => {
            handlePress('visitas');
            navigation.navigate("Listado de Visitas");
          }}
        >
          <Text style={styles.buttonText}>Ver visitas</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, expandedButton === 'horoscopo' && styles.expandedButton]} 
          onPress={() => {
            handlePress('horoscopo');
            navigation.navigate("Opciones Avanzadas");
          }}
        >
          <Text style={styles.buttonText}>Ver horóscopo</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, expandedButton === 'noticias' && styles.expandedButton]} 
          onPress={() => {
            handlePress('noticias');
            navigation.navigate("Noticias");
          }}
        >
          <Text style={styles.buttonText}>Ver noticias</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, expandedButton === 'mapa' && styles.expandedButton]} 
          onPress={() => {
            handlePress('mapa');
            navigation.navigate("Mapa");
          }}
        >
          <Text style={styles.buttonText}>Ver mapa</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, expandedButton === 'centros' && styles.expandedButton]} 
          onPress={() => {
            handlePress('centros');
            navigation.navigate("Centros");
          }}
        >
          <Text style={styles.buttonText}>Buscar centro</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, expandedButton === 'opciones' && styles.expandedButton]} 
          onPress={() => {
            handlePress('opciones');
            navigation.navigate("Opciones Avanzadas");
          }}
        >
          <Text style={styles.buttonText}>Opciones avanzadas</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, expandedButton === 'AboutScreen' && styles.expandedButton]} 
          onPress={() => {
            handlePress('About');
            navigation.navigate('About');
          }}
        >
          <Text style={styles.buttonText}>Acerca de</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, styles.deleteButton, expandedButton === 'delete' && styles.expandedButton]} 
          onPress={() => {
            handlePress('delete');
            clearStorage();
          }}
        >
          <Text style={[styles.buttonText, styles.deleteButtonText]}>Eliminar registros</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#1B263B', // Fondo azul marino
  },
  welcomeText: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff', // Texto blanco
    fontWeight: 'bold',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    width: '48%', // Igualar el tamaño de los botones
    backgroundColor: 'rgba(100, 149, 237, 0.6)', // Azul claro translúcido
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  expandedButton: {
    backgroundColor: 'rgba(173, 216, 230, 0.9)', // Azul claro translúcido más claro
  },
  deleteButton: {
    backgroundColor: 'rgba(255, 0, 0, 0.8)', // Rojo translúcido
  },
  buttonText: {
    color: 'white', // Texto blanco por defecto
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  deleteButtonText: {
    color: '#fff', // Texto blanco para el botón de eliminar
    fontWeight: 'bold',
  },
  expandedText: {
    color: '#000', // Texto negro para detalles
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
});
