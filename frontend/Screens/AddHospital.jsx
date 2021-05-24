import { useState } from "react"
import { StyleSheet, Image, TextInput, Text, View, Keyboard, ScrollView } from "react-native";
import React from 'react'
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";

const AddHospital = () => {
    const [hospital_name,setHospital_name] = useState();
    const [branch,setBranch] = useState()
    const [name,setName] = useState()
    const [mobile_no,setMobile_no] = useState();
    const [gender,setGender] = useState();
    const [designation,setDesignation] = useState()
    const [qualification,setQualification] = useState()
    const [password,setPassword] = useState()
    const [loading,setLoading] = useState(false)


    const verfiyMobileNumber = () => {
        var phoneno = /^\d{10}$/;

        if (mobile_no.match(phoneno)) {
            if (mobile_no[0] > '5') {
                return true;
            } else {
                alert('invalid mobile number!');
                return false;
            }
        } else {
            alert("invalid mobile number!");
            return false;
        }
    }

    const verfiyPassword = () => {
        var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{3,20}$/;

        if (password.match(passw)) {
            return true;
        } else {
            alert("password must contain a digit, a upper case character and lower case character!");
            return false;
        }
    }

    const checkTextInput = () => {
        //Check for the Hospital Name TextInput
        if (!hospital_name.trim()) {
          alert('Please Enter Hospital Name!');
          return false;
        }
        //Check for the Branch Name TextInput
        if (!branch.trim()) {
          alert('Please Enter Branch Name!');
          return false;
        }
        //Check for the Admin Name TextInput
        if (!name.trim()) {
          alert('Please Enter Admin Name!');
          return false;
        }
        //Check for the Mobile no. TextInput
        if (!mobile_no.trim()) {
          alert('Please Enter Mobile Number!');
          return false;
        }
        if (!verfiyMobileNumber()) {
            return false;
        }
        //Check for the Gender TextInput
        if (!gender.trim()) {
            alert('Please Enter gender');
            return false;
        }
        if (!designation.trim()) {
            alert('Please Enter Designation');
            return false;
        }
        if (!qualification.trim()) {
            alert('Please Enter Qualification');
            return false;
        }
        if (!password.trim()) {
            alert('Please Enter password');
            return false;
        }
        if (!verfiyPassword()) {
            return false;
        }
        //Checked Successfully
        //Do whatever you want
        return true;
    };

    const submitHandler = (e) => {
        setLoading(true)
        axios.post('http://192.168.0.106:5000/user/add/admin',{
                hospital_name, 
                branch,
                name,
                mobile_no,
                gender,
                designation,
                qualification,
                password
            }).then((res)=> {setLoading(false)})
            .catch((err)=> {alert(err); setLoading(false)})
        console.log('request sended to server');

        setHospital_name('');
        setBranch('');
        setName('');
        setMobile_no('');
        setGender('');
        setDesignation('');
        setQualification('');
        setPassword('');
    }


    return (

        <View style={styles.container}>
            <View style={styles.form}>
            <Spinner
          visible={loading}
          textContent={'Loading...'} />
            <ScrollView>
            <Text style={styles.title}>Hospital details:</Text>
                <TextInput onChangeText={val => setHospital_name(val)}
                style={styles.input} placeholder='Hospital name' />
                <TextInput onChangeText={val => setBranch(val)}
                style={styles.input} placeholder='Hospital branch' />
            <Text style={styles.title}>Admin details:</Text>
            <TextInput onChangeText={val => setName(val)}
                style={styles.input} placeholder='Name' />
                <TextInput onChangeText={val => setMobile_no(val)}
                style={styles.input} placeholder='Mobile no.' />
                <TextInput onChangeText={val => setGender(val)}
                style={styles.input} placeholder='Gender' />
                <TextInput onChangeText={val => setDesignation(val)}
                style={styles.input} placeholder='Designation' />
                <TextInput onChangeText={val => setQualification(val)}
                style={styles.input} placeholder='Qualification' />
                <TextInput onChangeText={val => setPassword(val)}
                secureTextEntry = {true}
                style={styles.input} placeholder='Password' />
                <Text onPress={submitHandler} style={styles.login}> Add Hospital </Text>
                </ScrollView>
            </View>
        </View>
    )
}
 
const styles = StyleSheet.create({
    form: {
        width: '100%',
        padding: 20,
    },
    title: {
        fontSize: 23,
        marginTop: 10,
        fontWeight: 'bold',
    },
    input: {
        marginBottom: 25,
        borderWidth: 1,
        borderColor: '#a2a2a2',
        fontSize: 20,
        padding: 10
    },
    forget_password: {
        fontSize: 15,
        marginTop: 20,
        alignSelf: "flex-end",
        fontWeight: 'bold',
        color: '#0481eb'
    },
    login: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: '#0481eb',
        borderRadius: 3,
        textAlign: 'center',
        padding: 10,
        fontSize: 20
    },
    image: {
        alignSelf: 'center',
        width:100,
        height: 150
    },
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'

    }
  });

export default AddHospital