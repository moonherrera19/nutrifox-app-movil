import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert, // Importa Alert
} from "react-native";
import { db } from "../database/firebaseConfig"; // Importa solo FIRESTORE_DB
import { collection, addDoc } from "firebase/firestore";

const { width, height } = Dimensions.get("window");

const Formulario = ({ navigation }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    noControl: "",
    carrera: "",
    semestre: "",
    grupo: "",

  });

  const [error, setError] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const 
  handleRegistro = async () => {
    const { nombre, noControl, carrera, semestre, grupo} =
      formData;

    if (
      !nombre ||
      !noControl ||
      !carrera ||
      !semestre ||
      !grupo 
    ) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    try {
      const userData = {
        nombre,
        noControl,
        carrera,
        semestre,
        grupo,
      };

      const usersCollectionRef = collection(db, "alumnos");
      const docRef = await addDoc(usersCollectionRef, userData); // Guarda la referencia del documento
      console.log("Documento escrito con ID: ", docRef.id);
      Alert.alert("Registro Exitoso", "Usuario registrado correctamente.", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Home"), // Navega DESPUÉS del OK
        },
      ]);
      setFormData({ // Limpia el formulario DESPUÉS del Alert
        nombre: "",
        noControl: "",
        carrera: "",
        semestre: "",
        grupo: "",
      });
    } catch (error) {
      console.error("Error al registrar:", error);
      Alert.alert("Error", `No se pudo registrar el usuario: ${error.message}`);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Registro de Usuario</Text>
        {error && <Text style={styles.errorText}>{error}</Text>}

        <TextInput
          placeholder="Nombre"
          value={formData.nombre}
          onChangeText={(value) => handleInputChange("nombre", value)}
          style={styles.input}
        />
        <TextInput
          placeholder="Número de Control"
          value={formData.numeroControl}
          onChangeText={(value) => handleInputChange("noControl", value)}
          keyboardType="numeric" // Tipo numérico para el número de control
          style={styles.input}
        />
        <TextInput
          placeholder="Carrera"
          value={formData.carrera}
          onChangeText={(value) => handleInputChange("carrera", value)}
          style={styles.input}
        />
        <TextInput
          placeholder="Semestre"
          value={formData.semestre}
          onChangeText={(value) => handleInputChange("semestre", value)}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          placeholder="Grado"
          value={formData.grado}
          onChangeText={(value) => handleInputChange("grupo", value)}
          keyboardType="numeric"
          style={styles.input}
        />


        <TouchableOpacity style={styles.button} onPress={handleRegistro}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
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
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
    borderRadius:50/2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', 
    justifyContent: 'center', 
  },
});   
export default Formulario;