import React, { useState, useEffect } from "react";
import { Text, View, Image, TextInput, TouchableOpacity, ScrollView, Button, Alert } from "react-native";
import Styles from "../../Styles/mainStyles";
import { Picker } from "@react-native-picker/picker";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { db } from "../../firebaseConfig";
import { push, ref } from 'firebase/database';

const Calculator = () => {
  const [courseData, setCourseData] = useState([]);
  const [yearLevel, setYearLevel] = useState('');
  const [academicTerm, setAcademicTerm] = useState('');
  const [academicYear, setAcademicYear] = useState('');
  const [gpa, setGpa] = useState('');
  const [remarks, setRemarks] = useState('');
  const [deansList, setDeansList] = useState('');
  const [rank, setRank] = useState('');
  const [hasCalculatedGPA, setHasCalculatedGPA] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();


  const handleSave = () => {
    if (!yearLevel || !academicTerm || !academicYear) {
      Alert.alert("Incomplete Information", "Please select Year Level, Academic Term, and Academic Year.");
    } else {
      const data = {
        courseData,
        yearLevel,
        academicTerm,
        academicYear,
        gpa,
        remarks,
        deansList,
        rank
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
              // Push data to Firebase
              push(ref(db, 'savedData'), data)
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
    setCourseData([...courseData, { title: '', units: '', grade: '' }]);
  };

  const removeCourse = () => {
    if (courseData.length > 1) {
      setCourseData(courseData.slice(0, -1));
    }
  };

  const handleInputChange = (text, index, key) => {
    const updatedCourseData = [...courseData];
    updatedCourseData[index][key] = text;
    setCourseData(updatedCourseData);
  };

  const validateUnits = (text) => {
    if (text === "") {
      return true
    }

    if (/^\d+$/.test(text)) {
      return true;
    } else {
      Alert.alert("Invalid Input", "Units must be a whole number.");
      return false;
    }
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
      if (course.title === '' || course.units === '' || course.grade === '') {
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
      const units = parseFloat(course.units);
      const grade = parseFloat(course.grade);

      if (!isNaN(units) && !isNaN(grade)) {
        totalGradePoints += units * grade;
        totalUnits += units;

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
          setRank('First Honor');
        }
        if (calculatedGpa > 1.25 && calculatedGpa <= 1.50) {
          setRank('Second Honor');
        }
        if (calculatedGpa > 1.50 && calculatedGpa <= 1.75) {
          setRank('Third Honor');
        }
      } else {
        setDeansList("No");
        setRank("")
      }
      setHasCalculatedGPA(true);
    } else {
      setRank("")
      setGpa("");
      setRemarks("");
      setDeansList("");
    }
  };

  const resetFields = () => {
    setCourseData([]);
    setYearLevel('');
    setAcademicTerm('');
    setAcademicYear('');
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
          <Image source={require('../../assets/images/Logo.png')}
            style={{
              height: 45,
              width: 45,
            }} />

          <Text style={Styles.title}>QuickGPA</Text>

          <TouchableOpacity onPress = {goToSaved}>
              <Image source={require('../../assets/images/history.png')}
                style={{
                  width: 45,
                  height: 45
                }} />
          </TouchableOpacity>
        </View>

        <View style={Styles.CourseContainer}>
          <View style={Styles.textContainer}>
            <Text style={Styles.CourseText}>Number of Courses: {courseData.length}</Text>
          </View>

          <View style={Styles.buttonsContainer}>
            <TouchableOpacity onPress={removeCourse}>
              <Image source={require('../../assets/images/Minus.png')}
                style={{
                  width: 25,
                  height: 25,
                  flexShrink: 0,
                }} />
            </TouchableOpacity>
            <Text style={Styles.buttonLable}>Remove Course</Text>
            <TouchableOpacity onPress={addCourse}>
              <Image source={require('../../assets/images/add.png')}
                style={{
                  width: 25,
                  height: 25,
                  flexShrink: 0,
                }} />
            </TouchableOpacity>
            <Text style={Styles.buttonLable}>Add Course</Text>
          </View>
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

            <Picker
              style={Styles.pickerStyle}
              selectedValue={academicYear}
              onValueChange={(itemValue, itemIndex) =>
                setAcademicYear(itemValue)
              }>
              <Picker.Item label="Select Academic Year" value="" />
              <Picker.Item label="2021 - 2022" value="2021 - 2022" />
              <Picker.Item label="2022 - 2023" value="2022 - 2023" />
              <Picker.Item label="2023 - 2024" value="2023 - 2024" />
              <Picker.Item label="2024 - 2025" value="2024 - 2025" />
              <Picker.Item label="2025 - 2026" value="2025 - 2026" />
              <Picker.Item label="2026 - 2027" value="2026 - 2027" />
              <Picker.Item label="2027 - 2028" value="2027 - 2028" />
            </Picker>
          </View>
          <View style={Styles.secondrow}>
            <View style={Styles.textStyle}>
              <Text style={Styles.colorText}>Course Title</Text>
            </View>
            <View style={Styles.textStyle}>
              <Text style={Styles.colorText}>Units</Text>
            </View>
            <View style={Styles.textStyle}>
              <Text style={Styles.colorText}>Grade</Text>
            </View>
          </View>

          {courseData.map((course, index) => (
            <View style={Styles.thirdrow} key={index}>
              <TextInput
                style={Styles.inputStyles}
                placeholder="Course Title"
                value={course.title}
                onChangeText={(text) => handleInputChange(text, index, 'title')}
              />
              <TextInput
                style={Styles.inputStyles}
                placeholder="Units"
                value={course.units}
                onChangeText={(text) => {
                  if (validateUnits(text)) {
                    handleInputChange(text, index, 'units');
                  }
                }}
                keyboardType="numeric"
              />
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
            </View>
          ))}

          <View style={Styles.ResultStyle}>
            <View>
              <Text style={Styles.colorText}>GPA: {gpa !== '' ? gpa : ''}</Text>
              <Text style={Styles.colorText}>Remarks: {remarks}</Text>
            </View>

            <View>
              <Text style={Styles.colorText}>Dean's Lister: {deansList}</Text>
              <Text style={Styles.colorText}>Rank: {rank}</Text>
            </View>
          </View>
        </View>

        <View style={Styles.footerContainer}>
          <View>
            <Text style={Styles.noteStyle}>Note: Don’t include Physical Education (PE) and National Service Training Program (NSTP). Also only the final grade for the semester is required for calculating your general point-average.</Text>
          </View>

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
