import { useState } from "react"
import { StyleSheet, Image, TextInput, Text, View, Keyboard } from "react-native";
import React from 'react'
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";
// import AsyncStorage from '@react-native-community/async-storage';

// AsyncStorage
// const STORAGE_KEY = '@save_mobileno';

const SignIn = () => {

    const [mobile_no,setMobile_no] = useState('');
    const [password,setPassword] = useState('');
    const [loading,setLoading] = useState();

    const saveMobileNumber = async () => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, mobile_no);
            alert('mobile Number successfully added')
        } catch (e) {
            alert('failed to save the data to storage');
        }
    }

    const readData = async () => {
        try {
            const userMobileNumber = await AsyncStorage.getItem(STORAGE_KEY)

            if (userMobileNumber !== null) {
                setMobile_no(userMobileNumber);
            }
        } catch (e) {
            alert('Failed to fetch the data from storage')
        }
    }

    const verfiyMobileNumber = () => {
        
        var phoneno = /^\d{10}$/;

        if (mobile_no.match(phoneno)) {
            if (mobile_no[0] > '5') {
                return true;
            } else {
                alert("invalid mobile number!");
                return false;
            }
        } else {
            alert("invalid mobile number!");
            return false
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
        //Check for the Mobile TextInput
        if (!mobile_no.trim()) {
          alert('Please Enter Mobile no.');
          return false;
        }
        if (!verfiyMobileNumber()) {
            return false;
        }
        //Check for the Gender TextInput
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
        if(checkTextInput()) {
            setLoading(true)
            axios.post('http://192.168.0.106:5000/user/signin',{mobile_no,password})
            .then((res)=> setLoading(false))
            .catch((err)=> {alert('Invalid username or password!'); setLoading(false)});

            // saveMobileNumber();
    }
    }

    return (
        <View style={styles.container}>
            <Spinner
          visible={loading}
          textContent={'Loading...'} />
            <View style={styles.form}>
                <TextInput onChangeText={val => setMobile_no(val)} 
                style={styles.input} placeholder='Mobile no.' />
                <TextInput onChangeText={val => setPassword(val)}
                secureTextEntry = {true}
                style={styles.input} placeholder='Password' />
                <Text onPress={submitHandler} style={styles.login}> Login </Text>
                <Text style={styles.forget_password}> Forget password? </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        width: '100%',
        padding: 20,
        alignContent: 'center'
    },
    input: {
        marginBottom: 25,
        borderBottomWidth: 1,
        borderBottomColor: '#a2a2a2',
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

export default SignIn