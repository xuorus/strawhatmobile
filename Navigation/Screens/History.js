import React, { useState } from "react";
import { Text, View, ScrollView, TouchableOpacity, Alert } from "react-native";
import Styles from "../../Styles/mainStyles";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialIcons';

const History = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { studentData } = route.params;
  const [existingData, setExistingData] = useState([]);

  const handleData = () => {
    console.log("Data button pressed");
    navigation.navigate('Detailed_Data', { studentData });
  };

  const handleLogout = () => {
    Alert.alert("Success", "Logout Successfully");
    console.log("Logout button pressed");
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#0b1933' }}>
      <View style={{ backgroundColor: '#0b1933', paddingTop: 70, alignItems: 'center' }}>
        <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}>History</Text>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingTop: 50, paddingBottom: 20 }}>
        <View style={{ backgroundColor: '#0b1933', paddingHorizontal: 20 }}>

          <TouchableOpacity onPress={handleData} style={{ marginBottom: 20, alignItems: 'center' }}>
            <Text style={{ backgroundColor: '#fcb414', fontSize: 20, paddingVertical: 30, paddingHorizontal: 80, borderRadius: 20, color: 'white', textAlign: 'center' }}>
              {`View Grade History`}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={{ backgroundColor: '#0b1933', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 20 }}>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={{ backgroundColor: '#fcb414', paddingVertical: 15, paddingHorizontal: 50, borderRadius: 20, color: 'white' }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default History;