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
        onlyOnce: true
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
            <Image source={require('../../assets/images/return.png')}
              style={{
                height: 40,
                width: 40,
                marginLeft:-120,
                marginTop: 30,
              }} />
          </Pressable>

          <Text style={Styles.title2}>History</Text>

        </View>

        <View style={Save.tableContainer}>
          {Object.keys(savedData).map((key) => {
            const { courseData, yearLevel, academicTerm, gpa, remarks, deansList } = savedData[key];
            return (
              <View key={key}>
                <View style={Save.firstrow}>
                  <Text style={Save.colorText}>{yearLevel}</Text>
                  <Text style={Save.colorText}>{academicTerm}</Text>
                </View>
                <View style={Save.secondrow}>
                  <View>
                    <Text style={Save.textStyle}>Course</Text>
                  </View>
                  <View>
                    <Text style={Save.textStyle}>Grade</Text>
                  </View>
                </View>

                {courseData.map((course, index) => (
                  <View style={Save.thirdrow} key={index}>
                    <Text style={Save.thirdrowAlignment}>{course.title}</Text>
                    <Text style={Save.thirdrowAlignment}>{course.grade}</Text>
                  </View>
                ))}

                <View style={Save.ResultStyle}>
      <View>
        <Text style={Styles.colorText}>GPA: {gpa}</Text>
        <Text style={Styles.colorText}>Dean's Lister: {deansList}</Text>
       <Text style={Styles.colorText}>Remarks: {remarks}</Text>
      </View>

  <View style={Styles.delete}>
    <Button 
      title="Delete"
      color={'red'}
      onPress={() => handleDelete(key)}
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
