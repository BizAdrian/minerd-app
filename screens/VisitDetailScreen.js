import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { Audio } from 'expo-av';

export default function VisitDetailScreen({ route }) {
  const { visit } = route.params;
  const [sound, setSound] = useState();
  const soundRef = useRef(null);

  const playSound = async () => {
    if (soundRef.current) {
      await soundRef.current.playAsync();
    }
  };

  const stopSound = async () => {
    if (soundRef.current) {
      await soundRef.current.stopAsync();
    }
  };

  useEffect(() => {
    const loadSound = async () => {
      if (visit.audioUri) {
        const { sound: loadedSound } = await Audio.Sound.createAsync(
          { uri: visit.audioUri }
        );
        soundRef.current = loadedSound;
      }
    };
    loadSound();
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, [visit.audioUri]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles de la Visita</Text>
      <Text>Cédula del Director: {visit.directorId}</Text>
      <Text>Código del Centro: {visit.centerCode}</Text>
      <Text>Fecha: {visit.date}</Text>
      <Text>Hora: {visit.time}</Text>
      <Text>Comentario: {visit.comment}</Text>
      {visit.photoUri && <Image source={{ uri: visit.photoUri }} style={styles.image} />}
      {visit.audioUri && (
        <View>
          <Text>Audio:</Text>
          <Button title="Reproducir Audio" onPress={playSound} />
          <Button title="Detener Audio" onPress={stopSound} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
});
