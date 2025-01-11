import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

const Qr() { // Nombre del componente cambiado a Qr
  // ... (El resto del código de la cámara es igual al que te proporcioné anteriormente)
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');

      if (Platform.OS === 'ios') {
        const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
        if (mediaLibraryPermission.status !== 'granted') {
          Alert.alert('Permiso Denegado', 'Necesitas dar permiso para guardar fotos.');
        }
      }
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        let photo = await cameraRef.current.takePictureAsync();
        if (Platform.OS === 'android'){
          await MediaLibrary.saveToLibraryAsync(photo.uri);
          Alert.alert('Foto Guardada', 'La foto se ha guardado en la galería.');
        } else {
          const asset = await MediaLibrary.createAssetAsync(photo.uri);
          const album = await MediaLibrary.getAlbumAsync('Expo');
          if (album === null) {
            await MediaLibrary.createAlbumAsync('Expo', asset, false);
          } else {
            await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
          }
           Alert.alert('Foto Guardada', 'La foto se ha guardado en el album Expo.');
        }
      } catch (error) {
        console.error("Error al tomar la foto:", error);
        Alert.alert('Error', 'No se pudo tomar la foto.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={styles.text}> Voltear </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.text}> Tomar Foto </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    padding:10,
    borderRadius:8
  },
  text: {
    fontSize: 18,
    color: 'black',
  },
});
export default Qr;
