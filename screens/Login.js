import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TextInput,ImageBackground, Button } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../database/firebaseConfig'; 


export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async ()  => {
    try {
        // Inicia sesión con correo electrónico y contraseña
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('Usuario iniciado sesión:', user);
        navigation.navigate('Home'); 
        // Navega a la siguiente pantalla o realiza alguna acción
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        Alert.alert('Error', 'Correo electrónico o contraseña incorrectos.');
      }
  };

  return (
    <ImageBackground
      source={require('../assets/degradado.jpg')} 
      style={styles.backgroundImage}
    >
    <View style={styles.container}>
      <Image 
        source={require('../assets/logo.jpeg')} // Reemplaza con la ruta a tu logo
        style={styles.logo} 
      />
      <Text style={styles.title}>Iniciar Sesión</Text>
      <View style={styles.formSquare}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
        <Button title="Iniciar Sesión" onPress={handleLogin} color='#ff8000'/>
      </View>
      </View>
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', 
    justifyContent: 'center', 
  },
  logo: {
    width: 150, // Ajusta el tamaño según tu logo
    height: 150,
    marginBottom: 30,
    borderRadius:50/2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'white'
  },
  form: {
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  formSquare: {
    backgroundColor: '#ffff', // Color de fondo del cuadrado
    padding: 20,
    borderRadius: 10, // Ajusta el radio para controlar la redondez de las esquinas
    width: '100%', // Ocupa todo el ancho del contenedor padre
    // Agrega sombras si lo deseas (opcional)
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    }
  },
});