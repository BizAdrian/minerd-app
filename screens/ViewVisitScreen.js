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
      onPress={() => navigation.navigate('VisitDetail', { visit: item })}
      style={styles.visit}
    >
      <Text>Código del Centro: {item.centerCode}</Text>
      <Text>Fecha: {item.date}</Text>
      <Text>Hora: {item.time}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={visits}
        renderItem={renderVisit}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  visit: {
    padding: 16,
    borderBottomWidth: 1,
  },
});
