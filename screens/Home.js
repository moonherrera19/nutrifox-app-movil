import React,{useState, useEffect}from 'react';
import { StyleSheet, View, Text, Button, Image, ImageBackground } from 'react-native';

const Home = ({navigation}) => {
  const [counter, setCounter] = useState(70);
  const handleDecrement = () => {
    if (counter > 0) {
      setCounter(prevCounter => prevCounter - 1);
    }
  };

  const handleReset = () => {
    setCounter(70);
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
      <Text style={styles.counterText}>{counter}</Text>
      <View style={styles.buttonContainer}>
      <View style={styles.buttonWrapper}>
            <Button
              color='#000'
              title="Cobrar"
              onPress={handleDecrement}
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              color='#000'
              title="Reiniciar"
              onPress={handleReset}
            />
          </View>
        <View style={styles.buttonWrapper}>
        <Button
          color='#ff8000'
          style={styles.button}
          title="QR"
          onPress={() => navigation.navigate('Qr')}
        />
        </View>
        <View style={styles.buttonWrapper}>
        <Button
          color='#ff8000'
          style={styles.button}
          title="Nuevo"
          onPress={() => navigation.navigate('Formulario')} 
        />
        </View>
      </View>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
    borderRadius:50/2,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '80%',
  },
  button: {
    backgroundColor: '#ff9900',
    borderRadius: 10,
    padding: 20,
    width: '45%',
  },
  buttonWrapper: {
    marginBottom: 20, // Espacio entre botones
  },
  buttonText: {
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
    
  },
  counterText: {
    fontSize: 40, // Adjust size as needed
    fontWeight: 'bold',
    marginBottom: 20,
    color:"white"
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', 
    justifyContent: 'center', 
  },
});

export default Home;