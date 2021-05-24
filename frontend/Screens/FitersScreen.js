import React, { Component, useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Button, Modal, TextInput, SafeAreaView } from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { Picker } from 'react-native-picker-dropdown';
import DatePicker from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';


const FiltersScreen = ({ navigation, route}) => {

    const [patientList, setPatientList] = useState([]);

    const [duty_doctor,setDuty_doctor] = useState('')
    const [patient_name,setPatient_name] = useState('')
    const [ward,setWard] = useState('')
    const [bpsys,setbpsys] = useState('')
    const [bpdis,setbpdis] = useState('')
    const [doa,setDoa] = useState('')
    const [date,setDate] = useState('')
    const [doaPass,setDoaPass] = useState(false)
    const [UHID,setUHID] = useState('')
    const [spo2,setSpo2] = useState('')
    const [pr,setPr] = useState('')
    const [o2_niv_mv,setO2_niv_mv] = useState('')
    const [o2_niv_mv_level,setO2_niv_mv_level] = useState('')
    const [rr,setRr] = useState('')
    const [complaints,setFreshComplaints] = useState('')


    const spo2List = ['<70','71-80','81-90','91-100'];
    const prList = ['>100','91-100','81-90','71-80','60-70','<60'];
    const rrList = ['<10','10-20','21-30','>30']

    const [show, setShow] = useState(false);
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date ;
        console.log(doa);
        setShow(false);
        setDoa(currentDate.toLocaleDateString());
        setDate(currentDate)
    };

    const showDatepicker = () => {
        setShow(true);
    }

    const applyFilter = () => {
        // console.log(doa);
        
        axios.post('http://192.168.29.245:5000/patient/filter', {
            duty_doctor,ward,patient_name,bpsys,bpdis,doa,UHID
        ,spo2,pr,o2_niv_mv,o2_niv_mv_level,rr,complaints
        }).then((res)=> {setPatientList(res.data); console.log("from res"); console.log(res.data);})
        .catch((err) => console.log(err));

        // axios.post('http://192.168.29.245:5000/patient/Name', {
        //     patient_name,
        //     hospital_no
        // }).then((res) => {setPatientList(res.data); console.log(patientList);})
        // .catch((err) => console.log(err));

        navigation.navigate({
            name: 'Filter',
            params: {patientListState: [patientList, setPatientList]},
            merge: true,
        });
    }



return(
    <View style={styles.modal}>
        <ScrollView keyboardShouldPersistTaps = 'always'>
        {/*All views of Modal*/}
        {/*Animation can be slide, slide, none*/}
            <Text style={styles.title}>
                Filters :
            </Text>
            <View style={{marginTop: 10,flex: 1}}>
                        <Text style={{fontSize: 12}}> Duty doctors: </Text>
                <TextInput style={styles.textInput}
                    value={duty_doctor}
                    onChangeText={(val)=> setDuty_doctor(val)}
                placeholder='Doctor name' />
                </View>
                <View style={{marginTop: 10,flex: 1}}>
                        <Text style={{fontSize: 12}}> Ward name: </Text>
                <TextInput style={styles.textInput}
                    value={ward}
                    onChangeText={(val)=> setWard(val)}
                placeholder='Ward name' />
            </View>
            <View style={{marginTop: 10,flex: 1}}>
                        <Text style={{fontSize: 12}}> Patient name: </Text>
                 <TextInput style={styles.textInput}
                    value={patient_name}
                    onChangeText={(val)=> setPatient_name(val)}
                placeholder='Patient Name' />
            </View>
                <View style={{flexDirection: 'row'}}>
                <View style={{marginTop: 10,flex: 1}}>
                        <Text style={{fontSize: 12}}> BP(Systolic): </Text>
                    <TextInput
                    value={bpsys}
                    onChangeText={(val)=> setbpsys(val)}
                    style={styles.textInput}
                        placeholder='BP (systolic)'
                    />
                </View>
                <View style={{marginTop: 10,flex: 1}}>
                        <Text style={{fontSize: 12}}> BP(diastolic): </Text>
                    <TextInput
                    style={styles.textInput}
                    value={bpdis}
                    onChangeText={(val)=> setbpdis(val)}
                        placeholder='BP (diastolic)'
                    />
                </View>
                </View>
                <View style={{flexDirection:'row', marginTop: 10}}>
                <View style={{flex: 1}}>
                        <Text style={{fontSize: 12}}> Doa: </Text>
                    <View style={{flexDirection: 'row', flex:1,justifyContent:'center',
                        borderWidth: 1, borderColor: '#a2a2a2', borderRadius: 5}}
                    >
                        <TextInput style={{flex: 1, padding: 8,
                                fontSize: 20}}
                                value={doa}
                         placeholder='DOA' editable={false}/>
                        <View style={{marginTop: 10}}>
                            <MaterialIcons onPress={showDatepicker}
                             name="date-range" size={35} color="#0481eb" />
                        </View>
                        {show && 
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={'date'}
                            display="default"
                            onChange={onChange}
                        />}
                    </View>    
                </View>
                <View style={{flex: 1}}>
                        <Text style={{fontSize: 12}}> UHID: </Text>
                    <TextInput style={styles.textInput} 
                        placeholder='UHID'
                        value={UHID}
                    onChangeText={(val)=> setUHID(val)}
                    />
                </View>
                    </View>
                <View style={{flexDirection:'row'}}>
                <View style={{marginTop: 10,flex: 1}}>
                        <Text style={{fontSize: 12}}> SPO2: </Text>
                <Picker
                        selectedValue = {spo2}
                        style={{ flex: 1, borderColor: '#a2a2a2', borderWidth: 1, borderRadius: 5 }}
                        onValueChange={(itemValue, itemIndex) => setSpo2(itemValue)}>
                        <Picker.Item label="SPO2" value={null} />
                        {spo2List.map((x, index) => {
                        return <Picker.Item key={index} label={x} value={x} />})}
                </Picker>
            </View>
            <View style={{marginTop: 10,flex: 1}}>
                        <Text style={{fontSize: 12}}> PR: </Text>
                <Picker
                    selectedValue = {pr}
                    style={{ flex: 1, borderColor: '#a2a2a2', borderWidth: 1, borderRadius: 5}}
                    onValueChange={(itemValue, itemIndex) => setPr(itemValue)}>
                    <Picker.Item label="PR" value={null} />
                    {prList.map((x, index) => {
                    return <Picker.Item key={index} label={x} value={x} />})}
                </Picker>
            </View>
                </View>
                <View style={{flexDirection:'row'}}>
                <View style={{marginTop: 10,flex: 1}}>
                        <Text style={{fontSize: 12}}> O2 NIV MV: </Text>
                <TextInput placeholder='O2 NIV MIV' style={styles.textInput}
                 value={o2_niv_mv} onChangeText={(val)=> setO2_niv_mv(val)}/>
                </View>
                <View style={{marginTop: 10,flex: 1}}>
                        <Text style={{fontSize: 12}}> O2/MRBM in L: </Text>
                <TextInput placeholder='O2/NRBM in L' style={styles.textInput}
                value={o2_niv_mv_level} onChangeText={(val)=> setO2_niv_mv_level(val)}/>
            </View>
                </View>
                <View style={{flexDirection:'row'}}>
                <View style={{marginTop: 10,flex: 1}}>
                        <Text style={{fontSize: 12}}> RR: </Text>
                <Picker
                selectedValue = {rr}
                    style={{ borderWidth: 1, borderColor: '#a2a2a2',
                    flex: 1, borderRadius: 5 }}
                    onValueChange={(itemValue, itemIndex) => setRr(itemValue)}>
                    <Picker.Item label="RR" value={null} />
                    {rrList.map((x, index) => {
                    return <Picker.Item key={index} label={x} value={x} />})}
                    </Picker>
                </View>
                <View style={{marginTop: 10,flex: 1}}>
                        <Text style={{fontSize: 12}}> Fresh complaints: </Text>
                <TextInput placeholder='Fresh complaint' style={styles.textInput}
                value={complaints} onChangeText={(val)=> setFreshComplaints(val)}/>
                </View>
                </View>
                <Text style={styles.submitButton} onPress={applyFilter}> Apply </Text>
        </ScrollView>
        </View>

);
}

const styles = StyleSheet.create({
modal: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
},
// date-picker styles
title: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    padding: 20,
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
},
textInput: {
    borderWidth: 1,
    borderColor: '#a2a2a2',
    borderRadius: 5,
    padding: 8,
    fontSize: 20,
    flex: 1
}
});

export default FiltersScreen;