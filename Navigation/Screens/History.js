import React from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import Styles from "../../Styles/mainStyles"; // Import your existing styles
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialIcons';

const History = () => {
  const navigation = useNavigation();

  const handleData = () => {
    // Implement your button logic here
    console.log("Data button pressed");
  };

  const handleSort = () => {
    // Implement your button logic here
    console.log("Sort button pressed");
  };

  const handleLogout = () => {
    // Implement your button logic here
    console.log("Logout button pressed");
  };
  
  return (
    <View style={{ flex: 1 }}>
      {/* Fixed header for History text */}
      <View style={{ backgroundColor: '#0b1933', marginTop: 30 ,paddingVertical: 40, alignItems: 'center' }}>
        <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold', textAlign: 'center' }}>History</Text>
      </View>

      {/* Background color behind the scrolled data buttons */}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ backgroundColor: '#0b1933', paddingBottom: 10 }}>
          {/* Data Buttons */}
          {[1, 2, 3, 4, 5, 6, 7].map(dataNumber => (
            <TouchableOpacity key={dataNumber} onPress={handleData}>
              <Text style={{ backgroundColor: '#fcb414', paddingVertical: 30, paddingHorizontal: 150, borderRadius: 20, marginTop: 20, alignSelf: 'center', color: 'white' }}>Data {dataNumber}</Text>
            </TouchableOpacity>
          ))}
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
