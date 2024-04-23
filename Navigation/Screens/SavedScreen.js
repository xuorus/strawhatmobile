import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, Image, Button } from "react-native";
import Styles from "../../Styles/mainStyles";
import Save from "../../Styles/ScreenStyle";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../firebaseConfig";
import { ref, onValue, remove } from 'firebase/database';

const SavedScreen = () => {
  const [grades, setGrades] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = () => {
      const databaseRef = ref(db, 'grades');
      onValue(databaseRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setGrades(Object.values(data)); // Convert object values to array
        } else {
          console.log("No data available");
        }
      }, {
        onlyOnce: true // This option ensures the callback is called only once
      });
    };

    fetchData();
  }, []);

  const handleDelete = (key) => {
    const databaseRef = ref(db, 'grades', key);
    remove(databaseRef)
      .then(() => {
        // Remove the deleted item from the grades array
        setGrades(prevGrades => prevGrades.filter(item => item.key !== key));
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
          <Text style={Styles.title2}>History</Text>
        </View>

        <View style={Save.tableContainer}>
          {grades.map((item) => {
            const { key, courseData, yearLevel, academicTerm, gpa, remarks, deansList } = item;
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
