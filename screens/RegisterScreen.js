import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text, TouchableOpacity, Animated, ScrollView } from 'react-native';

export default function RegisterScreen({ navigation }) {
  const [cedula, setCedula] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [clave, setClave] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity: 0

  const handleRegister = async () => {
    if (!cedula || !nombre || !apellido || !clave || !correo || !telefono || !fechaNacimiento) {
      Alert.alert('Error', 'Todos los campos son requeridos.');
      return;
    } else {
      await saveUser();
    }
  };

  const saveUser = async () => {
    const url = "https://adamix.net/minerd/def/registro.php";

    try {
      let formData = new FormData();
      formData.append('cedula', cedula);
      formData.append('nombre', nombre);
      formData.append('apellido', apellido);
      formData.append('clave', clave);
      formData.append('correo', correo);
      formData.append('telefono', telefono);
      formData.append('fecha_nacimiento', fechaNacimiento);

      let response = await fetch(url, {
        method: "POST",
        body: formData
      });

      let result = await response.json();

      if (result.exito) {
        Alert.alert('Éxito', 'Registro exitoso');
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', result.mensaje);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
      console.error(error);
    }
  };

  const handleCedulaChange = (text) => {
    if (text.length <= 11) {
      setCedula(text);
    }
  };

  const handleTelefonoChange = (text) => {
    if (text.length <= 10) {
      setTelefono(text);
    }
  };

  const handleFechaNacimientoChange = (text) => {
    // Auto-insert the dashes as the user types the date
    if (/^\d{2}$/.test(text)) {
      setFechaNacimiento(text + '-');
    } else if (/^\d{2}-\d{2}$/.test(text)) {
      setFechaNacimiento(text + '-');
    } else {
      setFechaNacimiento(text);
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

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Registrarse</Text>
        <TextInput
          placeholder="Cédula"
          value={cedula}
          onChangeText={handleCedulaChange}
          style={styles.input}
          placeholderTextColor="#ccc"
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Nombre"
          value={nombre}
          onChangeText={(text) => setNombre(text)}
          style={styles.input}
          placeholderTextColor="#ccc"
        />
        <TextInput
          placeholder="Apellido"
          value={apellido}
          onChangeText={(text) => setApellido(text)}
          style={styles.input}
          placeholderTextColor="#ccc"
        />
        <TextInput
          placeholder="Contraseña"
          value={clave}
          onChangeText={(text) => setClave(text)}
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#ccc"
        />
        <TextInput
          placeholder="Correo"
          value={correo}
          onChangeText={(text) => setCorreo(text)}
          keyboardType="email-address"
          style={styles.input}
          placeholderTextColor="#ccc"
        />
        <TextInput
          placeholder="Teléfono"
          value={telefono}
          onChangeText={handleTelefonoChange}
          keyboardType="phone-pad"
          style={styles.input}
          placeholderTextColor="#ccc"
        />
        <TextInput
          placeholder="Fecha de Nacimiento"
          value={fechaNacimiento}
          onChangeText={handleFechaNacimientoChange}
          style={styles.input}
          placeholderTextColor="#ccc"
          keyboardType="numeric"
          maxLength={10} // Enforce the "DD-MM-YYYY" format
        />
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Registrarse</Text>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>¿Ya tienes cuenta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginButton}>Inicia Sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
  },
  scrollContainer: {
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#fff',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#444',
    color: '#fff',
  },
  registerButton: {
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E53935',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 16,
    color: '#ccc',
  },
  loginButton: {
    fontSize: 16,
    color: '#1E90FF',
    marginTop: 4,
    borderRadius: 30,
  },
});
