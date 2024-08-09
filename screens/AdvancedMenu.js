import React, { useEffect } from 'react';
import { View, Button, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IncidenceDetailScreen from './IncidenceDetailScreen';
import { Ionicons } from '@expo/vector-icons';

const handleLogout = async (navigation) => {
  try {
    await AsyncStorage.removeItem('userToken');
    Alert.alert("Has cerrado sesión correctamente");
    navigation.navigate('Login');
  } catch (e) {
    Alert.alert("Error al cerrar sesión");
    console.error(e);
  }
};

export default function AdvancedMenu({ navigation }) {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={styles.botonsuperior} onPress={() => handleLogout(navigation)}>
      <Ionicons name="log-out-outline" size={24} color="red" />
    </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Gestión de Incidencias</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Registrar Nueva Incidencia")}
      >
        <Text style={styles.buttonText}>Registrar Incidencia</Text>
      
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Lista de incidencias")}
      >
        <Text style={styles.buttonText}>Ver Incidencias </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#333',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', 
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#E53935', 
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25, 
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: '#fff', 
    fontSize: 18,
    fontWeight: 'bold',
  },
  botonsuperior: {
    padding: 10,
    backgroundColor: 'transparent',
  },
});