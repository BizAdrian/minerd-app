import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

export default function AboutUsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Skibiri Suport</Text>
      
      <Text style={styles.description}>
      Skibiri Support es un grupo de desarrollo especializado en software de logística. Actualmente, estamos trabajando en una innovadora solución para el MINERD, enfocada en optimizar y modernizar sus procesos logísticos.      </Text>

      <Text style={styles.title}>Acerca de Nosotros</Text>
    
      <Text style={styles.description}>
        En nuestro equipo, estamos comprometidos con el desarrollo de soluciones que mejoren la educación y el servicio a la comunidad.
      </Text>

      <View style={styles.card}>
      <Image source={require('../assets/Estefani.jpg')} style={styles.image}/>
        <Text style={styles.cardTitle}>Estefani Ariana Lorenzo Soriano</Text>
        <Text style={styles.cardItem}>Matrícula: 2022-0852</Text>
      </View>
      <View style={styles.card}>
      <Image source={require('../assets/Christopher.jpg')} style={styles.image}/>
        <Text style={styles.cardTitle}>Christopher Alexis Peguero Encarnacion</Text>
        <Text style={styles.cardItem}>Matrícula: 2022-1024</Text>
      </View>
      <View style={styles.card}>
      <Image source={require('../assets/Diego.jpg')} style={styles.image}/>
        <Text style={styles.cardTitle}>Diego Jossel Vega Kelly</Text>
        <Text style={styles.cardItem}>Matrícula: 2022-0587</Text>
      </View>
      <View style={styles.card}>
      <Image source={require('../assets/Josue.jpg')} style={styles.image}/>
        <Text style={styles.cardTitle}>Josue Nina Diaz</Text>
        <Text style={styles.cardItem}>Matricula: 2022-0079</Text>
      </View>
      <View style={styles.card}>
        <Image source={require('../assets/Adrian.jpg')} style={styles.image}/>
        <Text style={styles.cardTitle}>Adrian Alberto Encarnacion Rubiera</Text>
        <Text style={styles.cardItem}>Matrícula: 2022-0502</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#333', 
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff', 
    textAlign: 'center',
    marginVertical: 20,
  },
  description: {
    fontSize: 16,
    color: '#fff', 
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#444', 
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginBottom: 20, 
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff', 
    marginBottom: 10,
  },
  cardItem: {
    fontSize: 16,
    color: '#fff', 
    marginBottom: 5,
  },
  image: {
    width: 120,  // Ajusta el ancho de la imagen
    height: 120, // Ajusta la altura de la imagen
    borderRadius: 60, // Hace que la imagen sea circular
    marginBottom: 10,
  },
});
