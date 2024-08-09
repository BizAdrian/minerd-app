import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

function Mapa() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [latitud, setLatitud] = useState('');
  const [longitud, setLongitud] = useState('');
  const [mostrarMapa, setMostrarMapa] = useState(false);
  const [direccion, setDireccion] = useState('');

  useEffect(() => {
    if (latitud && longitud && mostrarMapa) {
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitud}&lon=${longitud}`)
        .then((response) => response.json())
        .then((data) => {
          const addressComponent = data.display_name;
          setDireccion(addressComponent);
        })
        .catch((error) => {
          console.warn(error);
        });
    }
  }, [latitud, longitud, mostrarMapa]);

  function manejarSiguiente() {
    setMostrarMapa(true);
  }

  return (
    <View style={estilos.contenedor}>
      {mostrarMapa ? (
        <MapView
          style={estilos.mapa}
          initialRegion={{
            latitude: parseFloat(latitud),
            longitude: parseFloat(longitud),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{ latitude: parseFloat(latitud), longitude: parseFloat(longitud) }}
            title={`${nombre} ${apellido}`}
            description={direccion}
          />
        </MapView>
      ) : (
        <View style={estilos.formulario}>
          <Text style={estilos.texto}>Nombre:</Text>
          <TextInput
            style={estilos.entrada}
            value={nombre}
            onChangeText={setNombre}
            placeholder="Ingresa tu nombre"
            placeholderTextColor="#ccc"
          />

          <Text style={estilos.texto}>Apellido:</Text>
          <TextInput
            style={estilos.entrada}
            value={apellido}
            onChangeText={setApellido}
            placeholder="Ingresa tu apellido"
            placeholderTextColor="#ccc"
          />

          <Text style={estilos.texto}>Latitud:</Text>
          <TextInput
            style={estilos.entrada}
            value={latitud}
            onChangeText={setLatitud}
            keyboardType="numeric"
            placeholder="Ingresa latitud"
            placeholderTextColor="#ccc"
          />

          <Text style={estilos.texto}>Longitud:</Text>
          <TextInput
            style={estilos.entrada}
            value={longitud}
            onChangeText={setLongitud}
            keyboardType="numeric"
            placeholder="Ingresa longitud"
            placeholderTextColor="#ccc"
          />

          <TouchableOpacity style={estilos.boton} onPress={manejarSiguiente}>
            <Text style={estilos.botonTexto}>Siguiente</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#333',
  },
  mapa: {
    flex: 1,
  },
  formulario: {
    flex: 1,
    justifyContent: 'center',
    padding: 40,
  },
  texto: {
    color: '#fff',
    marginBottom: 8,
    fontSize: 18,
    fontWeight: 'bold',
  },
  entrada: {
    height: 40,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 8,
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 5,
  },
  boton: {
    backgroundColor: '#E53935',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  botonTexto: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Mapa;
