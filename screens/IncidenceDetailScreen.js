import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import Modal from 'react-native-modal';

export default function IncidenceDetailScreen({ route }) {
  const { incidence } = route.params;
  const [sound, setSound] = useState();
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
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
      if (incidence.audioUri) {
        const { sound: loadedSound } = await Audio.Sound.createAsync(
          { uri: incidence.audioUri }
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
  }, [incidence.audioUri]);

  const toggleImageModal = () => {
    setIsImageModalVisible(!isImageModalVisible);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Detalles de la Incidencia</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Título:</Text>
        <Text style={styles.value}>{incidence.title}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Centro Educativo:</Text>
        <Text style={styles.value}>{incidence.schoolCenter}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Regional:</Text>
        <Text style={styles.value}>{incidence.regional}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Distrito:</Text>
        <Text style={styles.value}>{incidence.district}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Fecha:</Text>
        <Text style={styles.value}>{incidence.date}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Descripción:</Text>
        <Text style={styles.value}>{incidence.description}</Text>
      </View>
      {incidence.photoUri && (
        <View style={styles.card}>
          <TouchableOpacity onPress={toggleImageModal}>
            <Image source={{ uri: incidence.photoUri }} style={styles.image} />
          </TouchableOpacity>
        </View>
      )}
      {incidence.audioUri && (
        <View style={styles.card}>
          <Text style={styles.label}>Audio:</Text>
          <View style={styles.audioControls}>
            <TouchableOpacity style={styles.iconButton} onPress={playSound}>
              <Ionicons name="play-circle" size={40} color="#1E90FF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={stopSound}>
              <Ionicons name="pause-circle" size={40} color="#E53935" />
            </TouchableOpacity>
          </View>
        </View>
      )}
      <Modal isVisible={isImageModalVisible} onBackdropPress={toggleImageModal} style={styles.modal}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={toggleImageModal}>
            <Image source={{ uri: incidence.photoUri }} style={styles.modalImage} />
          </TouchableOpacity>
        </View>
      </Modal>
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
    color: '#fff',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  audioControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  iconButton: {
    padding: 10,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 8,
    padding: 16,
    width: '90%',
    height: '80%',
  },
  modalImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
