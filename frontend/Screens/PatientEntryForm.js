import axios from 'axios';
import React, { useState } from 'react';
import { StyleSheet,TextInput, Text, View, StatusBar, ScrollView, KeyboardAvoidingView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Button,  } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import Picker from 'react-native-picker-dropdown/Picker';

const PatientEntryForm = () => {

    const [s_no, setS_no] = useState('');
    const [patient_name, setPatient_name] = useState('');
    const [ward_name, setWard_name] = useState('');
    const [UHID, setUHID] = useState('');
    const [hospital_no, setHospital_no] = useState('');
    const [bed, setbed] = useState('');
    const [age, setAge] = useState('');
    const [sex, setSex] = useState('');
    const [pr, setPr] = useState('');
    const [bpsys, setBpsys] = useState('');
    const [bpdis, setBpdis] = useState('');
    const [rr, setRr] = useState('');
    const [spo2,setSpo2] = useState('');
    const [o2_niv_mv, setO2_niv_mv] = useState('');
    const [o2_niv_mv_level, setO2_niv_mv_level] = useState('');
    const [complaints, setcomplaints] = useState('');
    const [duty_doctor,setduty_doctor] = useState('');
    const hospital_id = '1'
    const [doa,setDoa] = useState(new Date())
    const [status,setStatus] = useState('')

    const [loading,setLoading] = useState(false)

    const checkTextInput = () => {
        //Check for the s.no TextInput
        if (!s_no.trim()) {
            alert('Please Enter s.no');
            return false;
        }
        //Check for the Name TextInput
        if (!patient_name.trim()) {
          alert('Please Enter Patient Name');
          return false;
        }
        //Check for the Duty Doctor TextInput
        if (!duty_doctor.trim()) {
            alert('Please Enter Duty Doctor Name');
            return false;
          }
        //Check for the Ward Name TextInput
        if (!ward_name.trim()) {
          alert('Please Enter Ward Name');
          return false;
        }
        //Check for the UHID TextInput
        if (!UHID.trim()) {
            alert('Please Enter UHID');
            return false;
        }
        if (isNaN(UHID)) {
            alert('UHID must be a number!');
            return false;
        }
        if (!hospital_no.trim()) {
            alert('Please Enter Hospital number');
            return false;
        }
        if (isNaN(hospital_no)) {
            alert('Hospital no. must be a number!');
            return false;
        }
        if (!bed.trim()) {
            alert('Please Enter Bed type');
            return false;
        }
        if (!age.trim()) {
            alert('Please Enter Age');
            return false;
        }
        if (isNaN(age)) {
            alert('Age must be a number!');
            return false;
        }
        if (!sex.trim()) {
            alert('Please fill the Sex field');
            return false;
        }
        
        //Checked Successfully
        //Do whatever you want
        return true;
    };

    const handleSubmit = () => {
        if (!checkTextInput()) return;
        setLoading(true)
        axios.post('http://192.168.0.106:5000/patient/add',{
            patient_name,
            s_no,
            ward_name,
            UHID,
            hospital_no,
            bed,
            age,
            sex,
            pr,
            bpsys,
            bpdis,
            rr,
            doa: doa.toLocaleDateString(),
            spo2,
            o2_niv_mv,
            o2_niv_mv_level,
            complaints,
            duty_doctor,
            hospital_id,
            status
        }).then((res)=> {console.log(res.data);alert('Patient successfully added!');setLoading(false)})
        .catch ((err) => {alert('UHID already used. Please use different UHID'); setLoading(false)});

        setS_no('');
        setPatient_name('');
        setduty_doctor('');
        setWard_name('');
        setUHID('');
        setHospital_no('');
        setbed('');
        setAge('');
        setSex('');
        setDoa(new Date())
        setPr('');
        setBpdis('');
        setBpsys('')
        setRr('');
        setSpo2('');
        setO2_niv_mv('');
        setO2_niv_mv_level('');
        setcomplaints(''); 
        setStatus('')
    }

    const [show, setShow] = useState(false);
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || doa;
        console.log(currentDate);
        setShow(false);
        setDoa(currentDate);
    };

    const showDatepicker = () => {
        setShow(true);
    }

    const bedTypes = ['O2','Non O2','ICU','Ventilator'];

    return(

        <>
            <View style={styles.container}>
            <Spinner
          visible={loading}
          textContent={'Loading...'} /> 
            <ScrollView>
                    <StatusBar backgroundColor="#0481eb" />
                    
                    <Text style={styles.title}>Enter new patient information :</Text>
                    <View style={{marginTop: 10,flex: 1}}>
                        <Text style={{fontSize: 12}}> S no.: </Text>
                    <TextInput 
                        placeholder='S. no'
                        value={s_no}
                        theme={{colors:{primary: "#0481eb"}}}
                        style={styles.textInput}
                        onChangeText={(text)=>setS_no(text)}
                    />
                    </View>
                    <View style={{marginTop: 10,flex: 1}}>
                        <Text style={{fontSize: 12}}> Patient name: </Text>
                    <TextInput 
                        placeholder='Patient Name'
                        value={patient_name}
                        theme={{colors:{primary: "#0481eb"}}}
                        style={styles.textInput}
                        onChangeText={(text)=>setPatient_name(text)}
                    />
                    </View>
                    <View style={{marginTop: 10,flex: 1}}>
                        <Text style={{fontSize: 12}}> Duty Doctors: </Text>
                    <TextInput 
                        placeholder='Duty Doctors (e.g. Doctor1, Doctor2,..)'
                        value={duty_doctor}
                        theme={{colors:{primary: "#0481eb"}}} 
                        style={styles.textInput}
                        onChangeText={(text)=>setduty_doctor(text)}
                    />
                    </View>
                    <View style={styles.smallFieldsContainer}>
                    <View style={{flex: 1}}>
                        <Text style={{fontSize: 12}}> Ward name: </Text>
                    <TextInput  
                        placeholder='Ward'
                        value={ward_name}
                        theme={{colors:{primary: "#0481eb"}}}
                        onChangeText={(text)=>setWard_name(text)}
                        style={styles.smallTextInput} />
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={{fontSize: 12}}> UHID: </Text>
                        <TextInput 
                        value={UHID}
                        placeholder='UHID'
                        theme={{colors:{primary: "#0481eb"}}}
                        onChangeText={(text)=>setUHID(text)}
                        style={styles.smallTextInput} />
                    </View>
                    </View>
                    <View style={styles.smallFieldsContainer}>
                    <View style={{flex: 1}}>
                        <Text style={{fontSize: 12}}> Hospital no.: </Text>
                    <TextInput 
                        placeholder='Hospital No'
                        value={hospital_no}
                        theme={{colors:{primary: "#0481eb"}}}
                        onChangeText={(text)=>setHospital_no(text)}
                        style={styles.smallTextInput} />
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={{fontSize: 12}}> Doa: </Text>
                        <View style={{flexDirection: 'row', flex:1,justifyContent:'center',
                        borderWidth: 1, borderColor: '#a2a2a2', borderRadius: 5}}
                    >
                        <TextInput style={{flex: 1, padding: 8,
                                fontSize: 20}}
                                value={doa ? doa.toLocaleDateString() : null} editable={false}
                         placeholder='DOA' />
                        <View style={{marginTop: 10}}>
                            <MaterialIcons onPress={showDatepicker}
                             name="date-range" size={30} color="#0481eb" />
                        </View>
                        {show && 
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={doa}
                            mode={'date'}
                            display="default"
                            onChange={onChange}
                        />}
                    </View> 
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={{fontSize: 12}}> Bed type: </Text>
                        <Picker
                        selectedValue = {bed}
                        style={{ flex: 1, borderColor: '#a2a2a2', borderWidth: 1, borderRadius: 5 }}
                        onValueChange={(itemValue, itemIndex) => setbed(itemValue)}>
                        <Picker.Item label="Bed type" value={null} />
                        {bedTypes.map((x, index) => {
                        return <Picker.Item key={index} label={x} value={x} />})}
                </Picker>
                    </View>
                    </View>
                    <View style={styles.smallFieldsContainer}>
                    <View style={{flex: 1}}>
                        <Text style={{fontSize: 12}}> Age: </Text>
                    <TextInput 
                        placeholder='Age'
                        value={age}
                        theme={{colors:{primary: "#0481eb"}}}
                        onChangeText={(text)=>setAge(text)}
                        style={styles.smallTextInput} />
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={{fontSize: 12}}> Sex </Text>
                        <TextInput 
                        placeholder='Sex'
                        value={sex}
                        theme={{colors:{primary: "#0481eb"}}}
                        onChangeText={(text)=>setSex(text)}
                        style={styles.smallTextInput} />
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={{fontSize: 12}}> PR: </Text>
                        <TextInput 
                        placeholder='PR'
                        value={pr}
                        theme={{colors:{primary: "#0481eb"}}}
                        onChangeText={(text)=>setPr(text)}
                        style={styles.smallTextInput} />
                    </View>
                    </View>
                    <View style={styles.smallFieldsContainer}>
                    <View style={{flex: 1}}>
                        <Text style={{fontSize: 12}}> BP (Systolic): </Text>
                        <TextInput 
                        value={bpsys}
                        placeholder='BP'
                        theme={{colors:{primary: "#0481eb"}}}
                        onChangeText={(text)=>setBpsys(text)}
                        style={styles.smallTextInput} />
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={{fontSize: 12}}> BP (Diastolic): </Text>
                        <TextInput 
                        value={bpdis}
                        placeholder='BP'
                        theme={{colors:{primary: "#0481eb"}}}
                        onChangeText={(text)=>setBpdis(text)}
                        style={styles.smallTextInput} />
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={{fontSize: 12}}> RR: </Text>
                        <TextInput 
                    value={rr}
                        placeholder='RR'
                        theme={{colors:{primary: "#0481eb"}}}
                        onChangeText={(text)=>setRr(text)}
                        style={styles.smallTextInput} />
                    </View>
                    </View>
                    <View style={styles.smallFieldsContainer}>
                    <View style={{flex: 1}}>
                        <Text style={{fontSize: 12}}> SPO2: </Text>
                    <TextInput 
                    value={spo2}
                        placeholder='SPO2'
                        theme={{colors:{primary: "#0481eb"}}}
                        onChangeText={(text)=>setSpo2(text)}
                        style={styles.smallTextInput} />
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={{fontSize: 12}}> O2 NIV MV: </Text>
                    <TextInput 
                    value={o2_niv_mv}
                        placeholder='O2 NIV MV'
                        theme={{colors:{primary: "#0481eb"}}}
                        onChangeText={(text)=>setO2_niv_mv(text)}
                        style={styles.smallTextInput} />
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={{fontSize: 12}}> O2/NRBM in L: </Text>
                    <TextInput 
                    value={o2_niv_mv_level}
                        placeholder='O2/NRBM'
                        theme={{colors:{primary: "#0481eb"}}}
                        onChangeText={(text)=>setO2_niv_mv_level(text)}
                        style={styles.smallTextInput} />
                    </View>
                    </View>
                    <View style={{marginTop: 10,flex: 1}}>
                        <Text style={{fontSize: 12}}> Fresh complaints: </Text>
                    <TextInput
                    value={complaints}
                        placeholder='Fresh Complaints'
                        theme={{colors:{primary: "#0481eb"}}}
                        onChangeText={(text)=>setcomplaints(text)}
                        style={styles.textInput} />
                    </View>
                    <View style={{marginTop: 10,flex: 1}}>
                        <Text style={{fontSize: 12}}> Patient's current condition: </Text>
                         <TextInput
                    value={status}
                        placeholder="Patient's current condition"
                        theme={{colors:{primary: "#0481eb"}}}
                        onChangeText={(text)=>setStatus(text)}
                        style={styles.textInput} />
                    </View>
                    <Text style={styles.submitButton} onPress={handleSubmit}> Submit </Text>
            </ScrollView>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        width:"100%",
        height:"100%",
        paddingTop: 20,
        paddingBottom: 20,
        paddingRight: 10,
        paddingLeft: 10
    },
    title: {
        fontSize: 23,
        fontWeight: 'bold',
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#a2a2a2',
        borderRadius: 5,
        fontSize: 20,
        padding: 8
    },
    smallFieldsContainer: {
        flexDirection: 'row',
        marginTop: 10,
    }, 
    smallTextInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#a2a2a2',
        borderRadius: 5,
        fontSize: 20,
        padding: 8
    },
    submitButton: {
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: '#0481eb',
        borderRadius: 3,
        textAlign: 'center',
        padding: 10,
        fontSize: 20,
        marginTop: 20
    }
});

export default PatientEntryForm;