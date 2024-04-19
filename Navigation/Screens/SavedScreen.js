import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, Image, Pressable, Button } from "react-native";
import Styles from "../../Styles/mainStyles";
import Save from "../../Styles/ScreenStyle";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../firebaseConfig";
import { ref, onValue, remove } from 'firebase/database';

const SavedScreen = () => {
  const [savedData, setSavedData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = () => {
      const databaseRef = ref(db, 'savedData');
      onValue(databaseRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setSavedData(data);
        } else {
          console.log("No data available");
        }
      }, {
        onlyOnce: true // This option ensures the callback is called only once
      });
    };

    fetchData();
  }, []);

  const goToCalculator = () => {
    navigation.navigate('QuickGPA - Calculator');
  };

  const handleDelete = (key) => {
    const databaseRef = ref(db, 'savedData', key);
    remove(databaseRef)
      .then(() => {
        // Remove the deleted data from the local state
        setSavedData((prevData) => {
          const newData = { ...prevData };
          delete newData[key];
          return newData;
        });
        console.log("Data deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting data: ", error);
      });
  };

  return (
    <ScrollView contentContainerStyle={Styles.scrollViewContentContainer}>
      <View style={Styles.MainContainer}>
        <View style={Styles.HeaderContainer}>
          <Pressable onPress={goToCalculator}>
            <Image source={require('../../assets/images/Logo.png')}
              style={{
                height: 45,
                width: 45,
              }} />
          </Pressable>

          <Text style={Styles.title}>QuickGPA</Text>

          <Image source={require('../../assets/images/history.png')}
            style={{
              width: 45,
              height: 45
            }} />
        </View>

        <View style={Save.tableContainer}>
          {Object.keys(savedData).map((key) => {
            const { courseData, yearLevel, academicTerm, academicYear, gpa, remarks, deansList, rank } = savedData[key];
            return (
              <View key={key}>
                <View style={Save.firstrow}>
                  <Text style={Save.colorText}>{yearLevel}</Text>
                  <Text style={Save.colorText}>{academicTerm}</Text>
                  <Text style={Save.colorText}>{academicYear}</Text>
                </View>
                <View style={Save.secondrow}>
                  <View>
                    <Text style={Save.textStyle}>Course Title</Text>
                  </View>
                  <View >
                    <Text style={Save.textStyle}>Units</Text>
                  </View>
                  <View>
                    <Text style={Save.textStyle}>Grade</Text>
                  </View>
                </View>

                {courseData.map((course, index) => (
                  <View style={Save.thirdrow} key={index}>
                    <Text style={Save.thirdrowAlignment}>{course.title}</Text>
                    <Text style={Save.thirdrowAlignment}>{course.units}</Text>
                    <Text style={Save.thirdrowAlignment}>{course.grade}</Text>
                  </View>
                ))}

                <View style={Save.ResultStyle}>
                  <View>
                    <Text style={Styles.colorText}>GPA:{gpa}</Text>
                    <Text style={Styles.colorText}>Remarks: {remarks}</Text>
                  </View>

                  <View>
                    <Text style={Styles.colorText}>Dean's Lister: {deansList}</Text>
                    <Text style={Styles.colorText}>Rank: {rank}</Text>
                  </View>
                  <View style={Styles.footerButton}>
                    <Button 
                      title="Delete"
                      color={'#FF6418'}
                      onPress={() => handleDelete(key)} // Pass the key to the delete function
                    />
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default SavedScreen;
