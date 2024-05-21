import React from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import Styles from "../../Styles/mainStyles"; // Import your existing styles
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Detailed_Data = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { studentData } = route.params; // Receive studentData from route params

  return (
    <View style={{ flex: 1, backgroundColor: '#0b1933', justifyContent: 'center', alignItems: 'center' }}>
      {/* Back button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 340, top: 119 }}>
        <FontAwesomeIcon icon={faArrowLeft} size={24} color="white" />
      </TouchableOpacity>

      {/* Fixed header for History text */}
      <View style={{ paddingVertical: 40, alignItems: 'center', left: -110 }}>
        <Text style={{ fontSize: 35, color: 'white', fontWeight: 'bold', textAlign: 'center' }}>History</Text>
      </View>

      {/* White container */}
      <View style={{ backgroundColor: 'white', width: '90%', height: '70%', paddingHorizontal: 20, paddingVertical: 20, borderRadius: 10 }}>
        {/* Four additional containers */}
        <View style={{ flex: 1, justifyContent: 'center', marginVertical:5 }}>
          <View style={{ backgroundColor: '#0b1933', justifyContent: 'center', width: '100%', height: '20%', borderRadius: 10 }}>
          <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold', marginLeft: 20 }}>ID: {studentData.id}</Text>
          </View>

          <View style={{ backgroundColor: '#EBECF0', justifyContent: 'center', width: '100%', height: '20%', borderRadius: 10, marginTop: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 20 }}>Name: {studentData.name}</Text>
          </View>

          <View style={{ backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', width: '100%', height: '20%', borderRadius: 10, marginTop: 10, marginBottom: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 20 }}>GPA: {studentData.gpa}</Text>
          </View>

          <View style={{ backgroundColor: '#fcb414', justifyContent: 'center', width: '100%', height: '20%', borderRadius: 10}}>
          <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold', marginLeft: 20 }}>Dean's List: {studentData.deansList}</Text>
          <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold', marginLeft: 20 }}>Remarks: {studentData.remarks}</Text>
          </View>
        </View> 
      </View>
    </View>
  );
};

export default Detailed_Data;

{/* <ScrollView>
          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>ID: {studentData.id}</Text>
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Name: {studentData.name}</Text>
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>GPA: {studentData.gpa}</Text>
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Dean's List: {studentData.deansList}</Text>
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Remarks: {studentData.remarks}</Text>
          </View>
        </ScrollView> */}