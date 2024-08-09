import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ViewIncidentsScreen({ navigation }) {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const fetchIncidents = async () => {
      const storedIncidents = await AsyncStorage.getItem('incidents');
      if (storedIncidents) {
        setIncidents(JSON.parse(storedIncidents));
      }
    };

    fetchIncidents();
  }, []);

  const renderIncidence = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("Detalles de Incidencia", { incidence: item })}
      style={styles.incidence}
    >
      <Text style={styles.incidenceText}>Título: {item.title}</Text>
      <Text style={styles.incidenceText}>Centro Educativo: {item.schoolCenter}</Text>
      <Text style={styles.incidenceText}>Regional: {item.regional}</Text>
      <Text style={styles.incidenceText}>Distrito: {item.district}</Text>
      <Text style={styles.incidenceText}>Fecha: {item.date}</Text>
      <Text style={styles.incidenceText}>Hora: {item.time}</Text>
      <Text style={styles.incidenceText}>Descripción: {item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={incidents}
        renderItem={renderIncidence}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#333',
  },
  incidence: {
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
  incidenceText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
});
