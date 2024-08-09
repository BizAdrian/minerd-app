import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text, TouchableOpacity, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
 
export default function LoginScreen({ navigation }) {
  const [cedula, setCedula] = useState('');
  const [clave, setClave] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity: 0
 
  const handleLogin = async () => {
    if (!cedula || !clave) {
      Alert.alert('Error', 'Los campos cédula y clave son requeridos.');
      return;
    };
 
    try {
      const url = 'https://adamix.net/minerd/def/iniciar_sesion.php';
      let formData = new FormData();
      formData.append('cedula', cedula);
      formData.append('clave', clave);
 
      let response = await fetch(url, {
        method: 'POST',
        body: formData,
      });
 
      let result = await response.json();
 
      if (result.exito) {
        const { token } = result.datos;
 
        await AsyncStorage.setItem('userToken', token);
 
        Alert.alert('Inicio de Sesión', 'La sesión se a iniciado correctamente');
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', result.mensaje);
      }
 
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
      console.error(error);
    }
  };
 
  // Fade in animation
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleCedulaChange = (text) => {
    if (text.length <= 11) {
      setCedula(text);
    }
  };
 
  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.title}>Skibiri Suport</Text>
      <Text style={styles.subTitle}>Iniciar Sesión</Text>
      <TextInput
          placeholder="Cédula"
          value={cedula}
          onChangeText={handleCedulaChange}
          style={styles.input}
          placeholderTextColor="#ccc"
          keyboardType="numeric"
        />
      <TextInput
        placeholder="Clave"
        value={clave}
        onChangeText={(text) => setClave(text)}
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#ccc"
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Acceder</Text>
      </TouchableOpacity>
     
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>¿No tienes cuenta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerButton}>Regístrate aquí</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#333', // Fondo gris oscuro
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#fff', // Texto blanco
    marginBottom: 5,
    borderCurve: 'circular'
  },
  subTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#fff', // Texto blanco
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#444', // Fondo gris oscuro para input
    color: '#fff', // Texto blanco
  },
  loginButton: {
    height: 50,
    borderRadius: 25, // Botón más redondeado
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E53935', // Rojo brillante
    marginBottom: 16,
    shadowColor: '#000', // Sombra
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  registerText: {
    fontSize: 16,
    color: '#ccc', // Texto gris claro
  },
  registerButton: {
    fontSize: 16,
    color: '#1E90FF', 
    marginTop: 4,
    borderRadius: 30,
  },
});