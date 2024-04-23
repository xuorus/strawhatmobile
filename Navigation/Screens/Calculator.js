import React, { useState, useEffect } from "react";
import { Text, View, Image, TextInput, TouchableOpacity, ScrollView, Button, Alert } from "react-native";
import Styles from "../../Styles/mainStyles";
import { Picker } from "@react-native-picker/picker";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { db } from "../../firebaseConfig";
import { push, ref } from 'firebase/database';
import Icon from 'react-native-vector-icons/MaterialIcons'; 

const Calculator = () => {
  const [courseData, setCourseData] = useState([]);
  const [yearLevel, setYearLevel] = useState('');
  const [academicTerm, setAcademicTerm] = useState('');
  const [gpa, setGpa] = useState('');
  const [remarks, setRemarks] = useState('');
  const [deansList, setDeansList] = useState('');
  const [hasCalculatedGPA, setHasCalculatedGPA] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();


  const handleSave = () => {
    if (!yearLevel || !academicTerm) {
      Alert.alert("Incomplete Information", "Please select Year Level and Academic Term");
    } else {
      const data = {
        courseData,
        yearLevel,
        academicTerm,
        gpa,
        remarks,
        deansList,
      };
  
      Alert.alert(
        "Confirm Save",
        "Do you want to save this data?",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          {
            text: "Save",
            onPress: () => {
              // Generate a new child location using push
              const newGradeRef = push(ref(db, 'grades'));
              const newGradeKey = newGradeRef.key;
  
              // Set the data at the generated key
              set(ref(db, 'grades/' + newGradeKey), data)
                .then(() => {
                  Alert.alert("Success", "Data successfully saved! Click Button located at the upper right corner to see saved calculations.");
                  resetFields();
                })
                .catch((error) => {
                  console.error("Error saving data: ", error);
                  Alert.alert("Error", "Failed to save data. Please try again.");
                });
            }
          }
        ]
      );
    }
  };
  



  const addCourse = () => {
    setCourseData([...courseData, { title: '', grade: '' }]);
  };

  const removeCourse = (index) => {
    const updatedCourseData = [...courseData];
    updatedCourseData.splice(index, 1);
    setCourseData(updatedCourseData);
  };

  const handleInputChange = (text, index, key) => {
    const updatedCourseData = [...courseData];
    updatedCourseData[index][key] = text;
    setCourseData(updatedCourseData);
  };

  const validateGrade = (text) => {

    if (text === "") {
      return true
    }

    if (/^\d+(\.\d{0,2})?$/.test(text)) {
      return true;
    } else {
      Alert.alert("Invalid Input", "Grade must be a float with up to two decimal places.");
      return false;
    }
  };

  const calculateGpa = () => {

    for (const course of courseData) {
      if (course.title === '' || course.grade === '') {
        setGpa("");
        setRemarks("");
        setDeansList("");
        Alert.alert("Incomplete Course Data", "Please fill in all fields for each course.");
        return;
      }
    }
    let totalGradePoints = 0;
    let totalUnits = 0;
    let hasLowGrade = false;

    courseData.forEach(course => {
      const grade = parseFloat(course.grade);

      if (!isNaN(grade)) {
        totalGradePoints += grade;
        totalUnits += 1;

        // Check if any grade is below 2.5
        if (grade > 2.5) {
          hasLowGrade = true;
        }
      }
    });

    if (totalUnits > 0) {
      const calculatedGpa = totalGradePoints / totalUnits;
      setGpa(calculatedGpa.toFixed(3));

      if (calculatedGpa <= 3) {
        setRemarks("Passed");
      } else {
        setRemarks("Failed");
      }

      if (calculatedGpa <= 1.75 && !hasLowGrade) {
        setDeansList("Yes");
        if (calculatedGpa > 0 && calculatedGpa <= 1.25) {
        }
        if (calculatedGpa > 1.25 && calculatedGpa <= 1.50) {
        }
        if (calculatedGpa > 1.50 && calculatedGpa <= 1.75) {
        }
      } else {
        setDeansList("No");
      }
      setHasCalculatedGPA(true);
    } else {
      setGpa("");
      setRemarks("");
      setDeansList("");
    }
  };

  const resetFields = () => {
    setCourseData([]);
    setYearLevel('');
    setAcademicTerm('');
    setGpa("");
    setRemarks("");
    setDeansList("");
    setHasCalculatedGPA(false); // Reset the state when fields are reset
  };

  useEffect(() => {
    if (!isFocused) {
      resetFields();
    }
  }, [isFocused]);

  const goToSaved =()=>{
      navigation.navigate('SavedScreen')
  };

  return (
    <ScrollView contentContainerStyle={Styles.scrollViewContentContainer}>
      <View style={Styles.MainContainer}>
        <View style={Styles.HeaderContainer}>
          <Image 
            style={{
              height: 40,
              width: 25,
            }} />

          <Text style={Styles.title}>Student Grade Average Calculator</Text>

          <TouchableOpacity onPress = {goToSaved}>
              <Image source={require('../../assets/images/history.png')}
                style={{
                  width: 47,
                  height: 40,
                  marginTop: 25,
                  marginRight: 20,
                  marginLeft: 10,
                }} />
          </TouchableOpacity>
        </View>

        <View style={Styles.tableContainer}>
          <View style={Styles.firstrow}>
            <Picker
              style={Styles.pickerStyle}
              selectedValue={yearLevel}
              onValueChange={(itemValue, itemIndex) =>
                setYearLevel(itemValue)
              }>
              <Picker.Item label="Choose Year Level" value="" />
              <Picker.Item label="1st Year" value="1st Year" />
              <Picker.Item label="2nd Year" value="2nd Year" />
              <Picker.Item label="3rd Year" value="3rd Year" />
              <Picker.Item label="4th Year" value="4th Year" />
              <Picker.Item label="5th Year" value="5th Year" />
            </Picker>

            <Picker
              style={Styles.pickerStyle}
              selectedValue={academicTerm}
              onValueChange={(itemValue, itemIndex) =>
                setAcademicTerm(itemValue)
              }>
              <Picker.Item label="Select Academic Term" value="" />
              <Picker.Item label="1st Sem" value="1st Sem" />
              <Picker.Item label="2nd Sem" value="2nd Sem" />
            </Picker>

           <TouchableOpacity onPress={addCourse}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Image source={require('../../assets/images/add.png')}
      style={{
        width: 25,
        height: 25,
        marginRight: 5
      }} />
    <Text style={Styles.colorText}>Add Course</Text>
  </View>
</TouchableOpacity>

          </View>

          {courseData.map((course, index) => (
  <View style={Styles.thirdrow} key={index}>
    <TextInput
      style={Styles.inputStyles}
      placeholder="Course Title"
      value={course.title}
      onChangeText={(text) => handleInputChange(text, index, 'title')}
    />
    
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TextInput
        style={Styles.inputStyles}
        placeholder="Grade"
        value={course.grade}
        onChangeText={(text) => {
          if (validateGrade(text)) {
            handleInputChange(text, index, 'grade');
          }
        }}
        keyboardType="numeric"
      />
      {/* Remove the condition index > 0 here */}
      <TouchableOpacity onPress={() => removeCourse(index)}>
        <Icon name="close" size={25} color="black" />
      </TouchableOpacity>
    </View>
  </View>
))}


          <View style={Styles.secondrow}>
           <View style={Styles.secondrow}>
  <View style={Styles.textWithIcon}>
    <Icon name="book" size={20} color="#FFA500" style={Styles.icon} />
    <Text style={Styles.colorText}>Course</Text>
  </View>
  <View style={Styles.textWithIcon}>
    <Icon name="star" size={20} color="#FFA500" style={Styles.icon} />
    <Text style={Styles.colorText}>Grade</Text>
  </View>
</View>
          </View>


          <View style={Styles.ResultStyle}>
            <View>
              <Text style={Styles.colorText}>GPA: {gpa !== '' ? gpa : ''}</Text>
              <Text style={Styles.colorText}>Remarks: {remarks}</Text>
              <Text style={Styles.colorText}>Dean's Lister: {deansList}</Text>
            </View>
          </View>
        </View>

        <View style={Styles.footerContainer}>
          {/* <View>
            <Text style={Styles.noteStyle}>Note: Don’t include Physical Education (PE) and National Service Training Program (NSTP). Also only the final grade for the semester is required for calculating your general point-average.</Text>
          </View> */}

          <View style={Styles.footerButton}>
            {hasCalculatedGPA && (
              <>
                <Button
                  onPress={handleSave}
                  title="Save"
                  color={'#FCB315'}
                />
                <Button
                  onPress={resetFields}
                  title="Reset"
                  color={'#FCB315'}
                />
              </>
            )}

            <Button
              onPress={calculateGpa}
              title="Calculate"
              color={'#FCB315'}
            />

          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Calculator;
