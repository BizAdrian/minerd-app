import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function RegisterScreen() {
  const [cedula, setCedula] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [clave, setClave] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');

  const navigation = useNavigation();

  const handleRegister = async () => {
    // Remove validation checks
    // Directly navigate to the next screen
    navigation.navigate('Home');

    // If you still want to send data to the server, keep this part
    try {
      const response = await fetch('https://adamix.net/minerd/def/registro.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          cedula,
          nombre,
          apellido,
          clave,
          correo,
          telefono,
          fecha_nacimiento: fechaNacimiento,
        }),
      });

      const result = await response.json();

      if (result.exito) {
        Alert.alert('Éxito', 'Registro exitoso');
      } else {
        Alert.alert('Error', result.mensaje);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Cédula"
        value={cedula}
        onChangeText={setCedula}
        style={styles.input}
      />
      <TextInput
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
      />
      <TextInput
        placeholder="Apellido"
        value={apellido}
        onChangeText={setApellido}
        style={styles.input}
      />
      <TextInput
        placeholder="Clave"
        value={clave}
        onChangeText={setClave}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Correo"
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        placeholder="Teléfono"
        value={telefono}
        onChangeText={setTelefono}
        keyboardType="phone-pad"
        style={styles.input}
      />
      <TextInput
        placeholder="Fecha de Nacimiento (YYYY-MM-DD)"
        value={fechaNacimiento}
        onChangeText={setFechaNacimiento}
        style={styles.input}
      />
      <Button title="Registrarse" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});


