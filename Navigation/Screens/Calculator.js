import React, { useState } from "react";
import { Text, View, Image, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import Styles from "../../Styles/mainStyles";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { db } from "../../firebaseConfig";
import { ref, get, query, orderByChild, equalTo } from 'firebase/database';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Calculator = () => {
  const [idNumber, setIdNumber] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [studentData, setStudentData] = useState(null);
  const [loginAttempted, setLoginAttempted] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const handleIdNumberChange = async (text) => {
    const numericText = text.replace(/[^0-9]/g, '');
    setIdNumber(numericText);

    if (numericText.length > 0) {
      try {
        const gradesRef = ref(db, 'grades');
        const gradesQuery = query(gradesRef, orderByChild('id'), equalTo(numericText));
        const snapshot = await get(gradesQuery);

        if (snapshot.exists()) {
          const data = snapshot.val();
          const studentData = Object.values(data)[0];
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

  const clearText = () => {
    setIdNumber('');
    setPassword('');
    setStudentData(null);
    setLoginAttempted(false);
  };

  const handleLogin = () => {
    console.log("Login button pressed");
    setLoginAttempted(true);

    if (studentData && studentData.password === password) {
      Alert.alert("Success", "Login Successfully");
      navigation.navigate('History', { studentData });
      setLoginAttempted(false);
    } else {
      Alert.alert("Error", "Invalid Student ID or Password");
    }
  };

  return (
    <ScrollView contentContainerStyle={Styles.scrollViewContentContainer}>
      <View style={Styles.MainContainer}>
        <View style={Styles.logoContainer}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={Styles.logo}
          />
          <Text style={Styles.title}>Student Grade</Text>
          <Text style={Styles.title}>Average Calculator</Text>
        </View>
        <View style={Styles.inputContainer}>
          <Text style={Styles.inputLabel}>ID Number</Text>
          <View style={[
            Styles.inputWrapper,
            loginAttempted && (!studentData || studentData.password !== password) ? { borderColor: 'red', borderWidth: 4, borderRadius: 10 } : {}
          ]}>
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
        
        <View style={Styles.inputContainer}>
          <Text style={Styles.inputLabel}>Password</Text>
          <View style={[
            Styles.inputWrapper,
            loginAttempted && (!studentData || studentData.password !== password) ? { borderColor: 'red', borderWidth: 4, borderRadius: 10 } : {}
          ]}>
            <TextInput
              style={Styles.input}
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              placeholderTextColor="white"
            />
            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={Styles.showHideButton}>
              <Icon name={passwordVisible ? "visibility-off" : "visibility"} size={20} color="white" />
            </TouchableOpacity>
            {password !== '' && (
              <TouchableOpacity onPress={() => setPassword('')} style={Styles.clearButton}>
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
