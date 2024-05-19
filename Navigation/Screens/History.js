import React from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import Styles from "../../Styles/mainStyles"; // Import your existing styles
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialIcons';

const History = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { studentData } = route.params; // Receive studentData from route params

  const handleData = () => {
    // Implement your button logic here
    console.log("Data button pressed");
    navigation.navigate('Detailed_Data', { studentData }); // Pass studentData to the next screen
  };

  const handleSort = () => {
    // Implement your button logic here
    console.log("Sort button pressed");
  };

  const handleLogout = () => {
    // Implement your button logic here
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
          <TouchableOpacity onPress={handleData} style={{ marginBottom: 20 }}>
            <Text style={{ backgroundColor: '#fcb414', paddingVertical: 20, paddingHorizontal: 150, borderRadius: 20, alignSelf: 'center', color: 'white' }}>
              {`Data for ${studentData.id}`} {/* Display student data */}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Fixed Buttons with Background */}
      <View style={{ backgroundColor: '#0b1933', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 20 }}>
        <TouchableOpacity onPress={handleSort}>
          <Text style={{ backgroundColor: '#fcb414', paddingVertical: 15, paddingHorizontal: 50, borderRadius: 20, marginRight: 10, color: 'white' }}>Sort</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={{ backgroundColor: '#fcb414', paddingVertical: 15, paddingHorizontal: 50, borderRadius: 20, color: 'white' }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default History;
