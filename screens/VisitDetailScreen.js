import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { CurrentRenderContext } from '@react-navigation/native';

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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Detalles de la visita</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Cédula del Director:</Text>
        <Text style={styles.value}>{visit.cedulaDirector}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>ID del Centro:</Text>
        <Text style={styles.value}>{visit.codigoCentro}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Fecha:</Text>
        <Text style={styles.value}>{visit.fecha}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Hora:</Text>
        <Text style={styles.value}>{visit.hora}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Comentario:</Text>
        <Text style={styles.value}>{visit.comentario}</Text>
      </View>
      {visit.fotoUri && (
        <View style={styles.card}>
          <Image source={{ uri: visit.fotoUri }} style={styles.image} />
        </View>
      )}
      {visit.audioUri && (
        <View style={styles.card}>
          <Text style={styles.label}>Audio:</Text>
          <View style={styles.audioControls}>
            <TouchableOpacity style={styles.iconButton} onPress={playSound}>
              <Ionicons name="play-circle" size={40} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={stopSound}>
              <Ionicons name="pause-circle" size={40} color="#E53935" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 16,
    textAlign: "center"
  },
  card: {
    backgroundColor: '#444',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderColor: '#FFF',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
  },
  value: {
    fontSize: 16,
    color: '#ccc',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 12,
  },
  audioControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  iconButton: {
    padding: 10,
  },
});
