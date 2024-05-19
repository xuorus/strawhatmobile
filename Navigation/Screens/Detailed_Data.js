import React from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import Styles from "../../Styles/mainStyles"; // Import your existing styles
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Detailed_Data = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: '#0b1933', justifyContent: 'center', alignItems: 'center' }}>
      {/* Back button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 20, top: 115 }}>
        <FontAwesomeIcon icon={faArrowLeft} size={24} color="white" />
      </TouchableOpacity>

      {/* Fixed header for History text */}
      <View style={{ paddingVertical: 40, alignItems: 'center' }}>
        <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold', textAlign: 'center' }}>History</Text>
      </View>

      {/* White container */}
      <View style={{ backgroundColor: 'white', width: '90%', height: '70%', paddingHorizontal: 20, paddingVertical: 20, borderRadius: 10 }}>
        {/* Four additional containers */}
        <View style={{ flex: 1, justifyContent: 'center', marginVertical:5 }}>
          <View style={{ backgroundColor: '#0b1933', width: '100%', height: '20%', borderRadius: 10 }} />
          <View style={{ backgroundColor: 'gray', width: '100%', height: '20%', borderRadius: 10, marginTop: 10 }} />
          <View style={{ backgroundColor: 'white', width: '100%', height: '40%', borderRadius: 10, borderColor: 'black', borderWidth: 2, marginTop: 10, marginBottom: 10 }} />
          <View style={{ backgroundColor: '#fcb414', width: '100%', height: '20%', borderRadius: 10}} />
        </View>
      </View>
    </View>
  );
};

export default Detailed_Data;
