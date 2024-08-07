// screens/AboutScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
// import photo from '../assets/photo.png';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
        
      {/* <Image source={photo} style={styles.image} /> */}
      <Text>Nombre: Alexis José </Text>
      <Text>Apellido: Ramirez Taveras </Text>
      <Text>Matrícula: 2022-1995</Text>
      <Text style={styles.phrase}>
      "La vigilancia efectiva es el arte de proteger lo que valoramos, asegurando el bienestar de todos a través de la observación y el compromiso."
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  phrase: {
    marginTop: 16,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

