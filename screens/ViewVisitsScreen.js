import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ViewVisitsScreen({ navigation }) {
  const [visits, setVisits] = useState([]);

  useEffect(() => {
    const fetchVisits = async () => {
      const storedVisits = await AsyncStorage.getItem('visits');
      if (storedVisits) {
        setVisits(JSON.parse(storedVisits));
      }
    };

    fetchVisits();
  }, []);

  const renderVisit = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("Detalles de la visita", { visit: item })}
      style={styles.visit}
    >
      <Text style={styles.visitTitle}>Centro: {item.codigoCentro}</Text>
      <Text style={styles.visitText}>{item.fecha} {item.hora}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={visits}
        renderItem={renderVisit}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay visitas registradas.</Text>
        }
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
  visit: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#444',
    borderRadius: 12,
    borderColor: '#FFF',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  visitTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
  },
  visitText: {
    fontSize: 16,
    color: '#ccc',
  },
  emptyText: {
    fontSize: 18,
    color: '#ccc',
    textAlign: 'center',
    marginTop: 20,
  },
});
