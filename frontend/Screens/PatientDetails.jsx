import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { Modal, StyleSheet,TextInput, Text, View, StatusBar, ScrollView, Alert } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay'
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const PatientDetails = ({navigation, route}) => {

    // patient from PatientFilter
    const patientUHID = route.params.patientUHID;
    
    // const patientUHID = '58674653';

    const [patientDetails,setPatientDetails] = useState({})
    const [ward_name, setWard_name] = useState();
    const [doa, setDoa] = useState();
    const [pr, setPr] = useState();
    const [bpsys, setBpSys] = useState();
    const [bpdis, setBpDis] = useState();
    const [rr, setRr] = useState();
    const [spo2,setSpo2] = useState();
    const [o2_niv_mv, setO2_niv_mv] = useState();
    const [o2_niv_mv_level, setO2_niv_mv_level] = useState();
    const [complaints, setFreshComplaints] = useState();
    const [duty_doctor,setDutyDoctor] = useState();
    const [age,setAge] = useState();
    const [bed,setBed] = useState();
    const hospital_id = '1';
    const [loading,setLoading] = useState(false);
    const [editable,setEditable] = useState(false);
    const [fetchData,setFetchData] = useState(false);
    const [status,setStatus] = useState('');

    useEffect(()=> {    
    
        axios.get(`http://192.168.29.245:5000/patient/UHID/${patientUHID}/${hospital_id}`)
        .then((res)=> {
                setPatientDetails(res.data);
                console.log(res.data);
                setLoading(false);
            }
        ).catch((err) => console.log(err))
        // setPatientDetails({
        //     s_no: '1',
        //     name: "Anuj",
        //     ward: "CT POW",
        //     UHID: "2346674",
        //     hospital_no: "686937",
        //     doa:"16/4/2021",
        //     age: '21',
        //     sex: 'male',
        //     pr: '99',
        //     bp: '120/80',
        //     rr: '18',
        //     bed: 'o2',
        //     spo2: '90',
        //     o2_niv_mv: 'NRBM',
        //     fresh_complaint: 'DM',
        //     duty_doctors: 'Doctor'
        // });
    },[fetchData]);

    const setBlankStates = () => {
        setWard_name('')
        setDoa(new Date())
        setPr('')
        setBpSys('')
        setBpDis('')
        setRr('')
        setSpo2('')
        setO2_niv_mv('')
        setO2_niv_mv_level('')
        setFreshComplaints('')
        setDutyDoctor('')
        setAge('')
        setBed('')
        setStatus('')
    }

    const buttonHandler = () => {
        if(editable) {
            setLoading(true)
            console.log('data updated');
            axios.post('http://192.168.0.106:5000/patient/add/record',{
                ward_name,pr,bpsys,bpdis,spo2,o2_niv_mv,o2_niv_mv_level,complaints,UHID: patientDetails.UHID,
                doa: doa.toLocaleDateString(),age,duty_doctor,bed,rr,hospital_id:'1',status
            }).then((res) => {setPatientDetails(res.data);alert('Data successfully uploaded!')
                 setFetchData(true); setLoading(false)})
            .catch((err) => {console.log(err); alert('Sorry, your request failed!')});
            setBlankStates()
        }
        setEditable(!editable)
    }

    const cancelEditMode = () => {
        if(editable) {
            setBlankStates()
            setEditable(false)
        }
    }

    const createDeleteButtonAlert = () => {
        Alert.alert(
        "Confirm Delete",
        "deleting the patient!",
        [
            {
            text: "Cancel",
            onPress: () => {alert('patient not deletd!')},
            style: "cancel"
            },
            { text: "OK", onPress: () => {deleteRecord()} }
        ]
        );
    }

    const deleteButtonHandler = () => {
        createDeleteButtonAlert();        
    }

    const deleteRecord = () => {
        console.log("patient Deleted");
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 20,
            paddingBottom: 20
        },
        title: {
            fontSize: 23,
            fontWeight: 'bold',
        },
        TextInput: {
            borderWidth: 1,
            borderColor: '#a2a2a2',
            fontSize: 20,
            borderRadius: 5,
            padding: 10
        },
        smallFieldsContainer: {
            flexDirection: 'row',
        }, 
        smallTextInput: {
            borderWidth: 1,
            borderColor: '#a2a2a2',
            borderRadius: 5,
            fontSize: 20,
            padding: 10
        },
        submitButton: {
            fontWeight: 'bold',
            color: 'white',
            backgroundColor: '#0481eb',
            borderRadius: 3,
            textAlign: 'center',
            padding: 10,
            fontSize: 20,
            marginTop: 20,
            width:'45%'
        },
        deleteButton: {
            fontWeight: 'bold',
            color: 'white',
            backgroundColor: '#FF0000',
            borderRadius: 3,
            textAlign: 'center',
            padding: 10,
            fontSize: 20,
            marginTop: 20,
            width:'45%'
        }
    });

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

    return(

       
        
            <View style={styles.container}>
             { loading ? <Spinner
          visible={loading}
          textContent={'Loading...'}
        /> : 
            <ScrollView>
                    <StatusBar backgroundColor="#0481eb" />
                    <Text style={styles.title}>Patient Details :</Text>
                    <View style={{marginTop: 10}}>
                    <Text style={{fontSize: 12}}> Name: </Text>
                    <TextInput 
                        value={patientDetails.patient_name}
                        style={styles.TextInput}
                        editable = {false}
                    />
                    </View>
                    <View style={{marginTop: 10}}>
                    <Text style={{fontSize: 12}}> Duty doctors: </Text>
                    <TextInput 
                        value={editable? duty_doctor : patientDetails.duty_doctor}
                        style={styles.TextInput}
                        editable = {editable}
                        onChangeText = {val => setDutyDoctor(val)}
                        
                    />
                    </View>
                    <View style={styles.smallFieldsContainer}>
                    <View style={{marginTop: 10,flex: 1}}>
                        <Text style={{fontSize: 12}}> Hospital no.: </Text>
                        <TextInput 
                            value={patientDetails.hospital_no}
                            style={styles.smallTextInput} 
                            editable = {false}
                        />
                    </View>
                        <View style={{marginTop: 10,flex: 1}}>
                        <Text style={{fontSize: 12}}> UHID: </Text>
                        <TextInput 
                            style={styles.smallTextInput} 
                            value={patientDetails.UHID}
                            editable = {false}
                        />
                        </View>
                    </View>
                    <View style={styles.smallFieldsContainer}>
                    <View style={{marginTop: 10,flex: 1}}>
                    <Text style={{fontSize: 12}}> Bed type: </Text>
                        <TextInput 
                            value={editable ? bed : patientDetails.bed}
                            onChangeText = {val => setBed(val)}
                            style={styles.smallTextInput}
                            editable = {editable}
                            onChangeText={(text) => setBed(text)}
                        />
                    </View>
                    <View style={{marginTop: 10,flex: 1}}>
                    <Text style={{fontSize: 12}}> DOA(dd/mm/yyyy): </Text>
                    <View style={{flexDirection: 'row', flex:1,justifyContent:'center',
                        borderWidth: 1, borderColor: '#a2a2a2', borderRadius: 5}}
                    >
                        <TextInput style={{flex: 1, padding: 8,
                                fontSize: 20}}
                                value={doa ? doa.toLocaleDateString() : null}
                         placeholder='DOA' editable={false}/>
                        <View style={{marginTop: 10}}>
                            <MaterialIcons onPress={showDatepicker}
                             name="date-range" size={30} color="#0481eb" />
                        </View>
                        {editable && show && 
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={doa}
                            mode={'date'}
                            display="default"
                            onChange={onChange}
                        />}
                    </View> 
                    </View>
                    <View style={{marginTop: 10,flex: 1}}>
                        <Text style={{fontSize: 12}}> Ward: </Text>
                        <TextInput 
                            value={editable? ward_name : patientDetails.ward_name}
                            onChangeText = {val => setWard_name(val)}
                            style={styles.smallTextInput} editable = {editable}/>
                        </View>
                    </View>
                    <View style={styles.smallFieldsContainer}>
                    <View style={{marginTop: 10,flex: 1}}>
                        <Text style={{fontSize: 12}}> Age: </Text>
                        <TextInput 
                        onChangeText = {val => setAge(val)}
                            value={editable ? age : patientDetails.age}
                            style={styles.smallTextInput} 
                            editable = {editable}
                            onChangeText={(text) => setAge(text)} 
                        />
                    </View>
                    <View style={{marginTop: 10,flex: 1}}>
                        <Text style={{fontSize: 12}}> Sex : </Text>
                        <TextInput 
                            value={patientDetails.sex}
                            style={styles.smallTextInput}
                            editable = {false}
                        />
                    </View>
                    <View style={{marginTop: 10,flex: 1}}>
                        <Text style={{fontSize: 12}}> PR: </Text>
                        <TextInput 
                            value={editable? pr : patientDetails.pr}
                            onChangeText = {val => setPr(val)}
                            style={styles.smallTextInput} editable = {editable}
                        />
                    </View>
                    </View>


                    <View style={styles.smallFieldsContainer}>
                    <View style={{marginTop: 10,flex: 1}}>
                        <Text style={{fontSize: 12}}> BP(systolic): </Text>
                        <TextInput
                            value={editable? bpdis : patientDetails.bpdis}
                            onChangeText = {val => setBpDis(val)}
                            style={styles.smallTextInput}
                            editable = {editable}/>
                    </View>
                    <View style={{marginTop: 10,flex: 1}}>
                        <Text style={{fontSize: 12}}> BP(distolic): </Text>
                        <TextInput
                            value={editable? bpsys : patientDetails.bpsys}
                            onChangeText = {val => setBpSys(val)}
                            style={styles.smallTextInput}
                            editable = {editable}/>
                    </View>
                    <View style={{marginTop: 10,flex: 1}}>
                        <Text style={{fontSize: 12}}> RR: </Text>
                        <TextInput 
                        onChangeText = {val => setRr(val)}
                            value={editable? rr :patientDetails.rr}
                            style={styles.smallTextInput} 
                            editable = {editable}/>
                    </View>
                    </View>

                    <View style={styles.smallFieldsContainer}>
                    <View style={{marginTop: 10,flex: 1}}>
                        <Text style={{fontSize: 12}}> SPO2: </Text>
                        <TextInput 
                            value={editable? spo2 : patientDetails.spo2}
                            style={styles.smallTextInput} 
                            onChangeText = {val => setSpo2(val)}
                            editable = {editable}
                            onChangeText={(text) => setSpo2(text)}
                        />
                    </View>
                    <View style={{marginTop: 10,flex: 1}}>
                        <Text style={{fontSize: 12}}> O2 NIV MIV: </Text>
                        <TextInput 
                        onChangeText = {val => setO2_niv_mv(val)}
                            value={editable? o2_niv_mv : patientDetails.o2_niv_mv}
                            style={styles.smallTextInput}
                            editable = {editable}
                            onChangeText={(text) => setO2_niv_mv(text)}    
                        />
                    </View>
                    <View style={{marginTop: 10,flex: 1}}>
                        <Text style={{fontSize: 12}}> O2/NRBM in L : </Text>
                        <TextInput 
                        onChangeText = {val => setO2_niv_mv_level(val)}
                            value={editable? o2_niv_mv_level : patientDetails.o2_niv_mv_level}
                            style={styles.smallTextInput}
                            editable = {editable}
                            onChangeText={(text) => setO2_niv_mv_level(text)}
                        />
                    </View>
                    </View>
                    <View style={{marginTop: 10,flex: 1}}>
                        <Text style={{fontSize: 12, color: 'black'}}> Complaints: </Text>
                        <TextInput 
                        onChangeText = {val => setFreshComplaints(val)}
                            value={editable? complaints :patientDetails.complaints}
                            style={styles.smallTextInput} editable = {editable}
                        />
                    </View>
                    <View style={{marginTop: 10,flex: 1}}>
                        <Text style={{fontSize: 12, color: 'black'}}> Patient current status: </Text>
                        <TextInput 
                        onChangeText = {val => setStatus(val)}
                            value={editable? status :patientDetails.status}
                            style={styles.smallTextInput} editable = {editable}
                        />
                    </View>
                    <View style={{flexDirection:'row',justifyContent: 'space-around'}}>
                        <Text style={styles.submitButton} onPress={buttonHandler}>
                        {editable ? 'Update' : "Edit"} </Text>
                        <Text onPress={e=> {if(editable) setEditable(false)}} style={{...styles.submitButton,
                        backgroundColor: editable?"#DC143C":"#ff9999"}} onClick={cancelEditMode}>
                        Cancel </Text>
                    </View>
                    <View  style={{flexDirection:'row',justifyContent: 'space-around'}}>
                        <Text style={styles.deleteButton} onPress={deleteButtonHandler}>
                        DELETE </Text>
                    </View>
            </ScrollView> 
}
            </View>
       
    );
}

export default PatientDetails;