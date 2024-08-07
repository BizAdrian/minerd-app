import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Audio } from 'expo-av';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

export default function RegisterVisitScreen({ navigation }) {
  const [directorId, setDirectorId] = useState('');
  const [centerCode, setCenterCode] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [comment, setComment] = useState('');
  const [photoUri, setPhotoUri] = useState('');
  const [audioUri, setAudioUri] = useState('');
  const [recording, setRecording] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [location, setLocation] = useState(null);
  const soundRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status: audioStatus } = await Audio.requestPermissionsAsync();
      const { status: imageStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      const { status: locationStatus } = await Location.requestPermissionsAsync();
      if (audioStatus !== 'granted' || imageStatus !== 'granted' || locationStatus !== 'granted') {
        Alert.alert('Error', 'Se necesitan permisos para usar el micrófono, la biblioteca de imágenes y la ubicación.');
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let { coords } = await Location.getCurrentPositionAsync({});
      setLocation(coords);
    })();
  }, []);

  const handlePhotoPick = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        setPhotoUri(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo seleccionar la foto.');
      console.error(error);
    }
  };

  const handleAudioRecord = async () => {
    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setAudioUri(uri);
        setRecording(null);
      } else {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        const { recording: newRecording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        setRecording(newRecording);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo grabar el audio.');
      console.error(error);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(Platform.OS === 'ios');
    setTime(currentTime);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const showTimepicker = () => {
    setShowTimePicker(true);
  };

  const handleSubmit = async () => {
    if (!directorId || !centerCode || !date || !time) {
      Alert.alert('Error', 'Por favor, proporciona todos los campos obligatorios.');
      return;
    }

    const newVisit = {
      directorId,
      centerCode,
      date: date.toISOString().split('T')[0],
      time: time.toISOString().split('T')[1].substring(0, 5),
      comment,
      photoUri,
      audioUri,
      latitude: location?.latitude,
      longitude: location?.longitude,
    };

    try {
      const storedVisits = await AsyncStorage.getItem('visits');
      const visits = storedVisits ? JSON.parse(storedVisits) : [];
      visits.push(newVisit);
      await AsyncStorage.setItem('visits', JSON.stringify(visits));
      Alert.alert('Éxito', '¡Visita registrada exitosamente!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar la visita.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Cédula del Director"
        value={directorId}
        onChangeText={setDirectorId}
        style={styles.input}
      />
      <TextInput
        placeholder="Código del Centro"
        value={centerCode}
        onChangeText={setCenterCode}
        style={styles.input}
      />
      <Button title="Seleccionar Fecha" onPress={showDatepicker} />
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <Button title="Seleccionar Hora" onPress={showTimepicker} />
      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}
      <Text>Fecha: {date.toDateString()}</Text>
      <Text>Hora: {time.toTimeString().substring(0, 5)}</Text>
      <TextInput
        placeholder="Comentario"
        value={comment}
        onChangeText={setComment}
        style={styles.input}
      />
      <Button title="Seleccionar una foto" onPress={handlePhotoPick} />
      {photoUri ? <Image source={{ uri: photoUri }} style={styles.image} /> : null}
      <Button
        title={recording ? "Detener Grabación" : "Grabar Audio"}
        onPress={handleAudioRecord}
      />
      <Button title="Enviar" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginVertical: 16,
  },
});