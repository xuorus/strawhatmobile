import React, { useState } from "react";
import { Text, View, ScrollView, TouchableOpacity, Alert } from "react-native";
import Styles from "../../Styles/mainStyles"; // Import your existing styles
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialIcons';

const History = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { studentData } = route.params; // Receive studentData from route params
  const [existingData, setExistingData] = useState([]);

  const handleData = () => {
    // Implement your button logic here
    console.log("Data button pressed");
    // Check if student ID already exists
    const existingStudent = existingData.find(data => data.id === studentData.id);
    if (existingStudent) {
      // If student ID exists, update the existing data or add new data
      const updatedData = existingData.map(data => {
        if (data.id === studentData.id) {
          // Update existing data
          return { ...data, /* Update data fields here */ };
        }
        return data;
      });
      setExistingData(updatedData);
    } else {
      // If student ID doesn't exist, add new data
      setExistingData(prevData => [...prevData, studentData]);
    }
    navigation.navigate('Detailed_Data', { studentData }); // Pass studentData to the next screen
  };

  const handleSort = () => {
    // Implement your button logic here
    console.log("Sort button pressed");
  };

  const handleLogout = () => {
    // Implement your button logic here
    Alert.alert("Success", "Logout Successfully");
    console.log("Logout button pressed");
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#0b1933' }}>
      {/* Fixed header for History text */}
      <View style={{ backgroundColor: '#0b1933', paddingTop: 70, alignItems: 'center' }}>
        <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}>History</Text>
      </View>

      {/* Background color behind the scrolled data buttons */}
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingTop: 50, paddingBottom: 20 }}>
        <View style={{ backgroundColor: '#0b1933', paddingHorizontal: 20 }}>
          {/* Data Buttons */}
          <TouchableOpacity onPress={handleData} style={{ marginBottom: 20, alignItems: 'center' }}>
            <Text style={{ backgroundColor: '#fcb414', fontSize: 20, paddingVertical: 30, paddingHorizontal: 80, borderRadius: 20, color: 'white', textAlign: 'center' }}>
              {`View Grade History`} {/* Display student data */}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Fixed Buttons with Background */}
      <View style={{ backgroundColor: '#0b1933', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 20 }}>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={{ backgroundColor: '#fcb414', paddingVertical: 15, paddingHorizontal: 50, borderRadius: 20, color: 'white' }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default History;