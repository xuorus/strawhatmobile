import React, { useState, useEffect } from "react";
import { Text, View, Image, TextInput, TouchableOpacity, ScrollView, Button, Alert } from "react-native";
import Styles from "../../Styles/mainStyles";
import { Picker } from "@react-native-picker/picker";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { db } from "../../firebaseConfig";
import { ref, get } from 'firebase/database'; // Import get method for querying
import Icon from 'react-native-vector-icons/MaterialIcons';

const Calculator = () => {
  const [idNumber, setIdNumber] = useState('');
  const [studentData, setStudentData] = useState(null);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  // Function to handle text change and ensure only numbers are inputted
  const handleIdNumberChange = async (text) => {
    // Remove any non-numeric characters
    const numericText = text.replace(/[^0-9]/g, '');
    setIdNumber(numericText);

    if (numericText.length > 0) {
      try {
        const studentRef = ref(db, `students/${numericText}`);
        const snapshot = await get(studentRef);

        if (snapshot.exists()) {
          setStudentData(snapshot.val());
          console.log("Student data found: ", snapshot.val());
        } else {
          setStudentData(null);
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
  };

  // Function to clear the text input
  const clearText = () => {
    setIdNumber('');
    setStudentData(null);
  };

  const handleLogin = () => {
    // Implement your login logic here
    console.log("Login button pressed");
    if (studentData) {
      navigation.navigate('StudentDetails', { studentData });
    } else {
      Alert.alert("Error", "Student ID not found");
    }
  };

  return (
    <ScrollView contentContainerStyle={Styles.scrollViewContentContainer}>
      <View style={Styles.MainContainer}>
        <View style={Styles.logoContainer}>
          <Image
            source={require('../../assets/images/logo.png')} // Adjust the path to your logo image
            style={Styles.logo}
          />
          <Text style={Styles.title}>Student Grade</Text>
          <Text style={Styles.title}>Average Calculator</Text>
        </View>
        <View style={Styles.inputContainer}>
          <Text style={Styles.inputLabel}>ID Number</Text>
          <View style={Styles.inputWrapper}>
            <TextInput
              style={Styles.input}
              keyboardType="numeric"
              value={idNumber}
              onChangeText={handleIdNumberChange}
              placeholder="Enter your ID number"
              placeholderTextColor="white"
            />
            {idNumber !== '' && (
              <TouchableOpacity onPress={clearText} style={Styles.clearButton}>
                <Icon name="clear" size={20} color="white" />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <TouchableOpacity onPress={handleLogin} style={Styles.loginButton}>
          <Text style={Styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Calculator;
