import React, { useState, useEffect } from "react";
import { Text, View, Image, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import Styles from "../../Styles/mainStyles";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { db } from "../../firebaseConfig";
import { ref, get, query, orderByChild, equalTo } from 'firebase/database';
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
        const gradesRef = ref(db, 'grades');
        const gradesQuery = query(gradesRef, orderByChild('id'), equalTo(numericText));
        const snapshot = await get(gradesQuery);

        if (snapshot.exists()) {
          const data = snapshot.val();
          const studentData = Object.values(data)[0]; // Assuming the first match is the correct one
          setStudentData(studentData);
          console.log("Student data found: ", studentData);
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
    console.log("Login button pressed");
    if (studentData) {
      navigation.navigate('History', { studentData });
    } else {
      Alert.alert("Error", "Student ID not found");
    }
  };

  return (
    <ScrollView contentContainerStyle={Styles.scrollViewContentContainer}>
      <View style={Styles.MainContainer}>
        <View style={Styles.logoContainer}>
          <Image
            source={require('../../assets/images/Logo.png')} // Adjust the path to your logo image
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
