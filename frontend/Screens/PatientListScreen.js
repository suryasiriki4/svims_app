import React, { useState } from 'react';
import { ScrollView, ActivityIndicator, View } from 'react-native';
import { List } from 'react-native-paper';
import PatientDetails from './PatientDetails';

const PatientListScreen = (props) => {

    // const [loading] = props.loadingState;
    const [patientList, setPatientList] = props.patientListState;
    const [patientUHID, setPatientUHID] = props.patientUHIDState;


    console.log(patientList);

    const loading = false;

    const viewPatient = (x) => {
    //    setPatientUHID(x.UHID);
       setPatientDetailsModal(true);
    }

    return(
        <>
        {
            loading ? 
            <View style={{marginTop: 40}}>
                <ActivityIndicator size="large" color="#0481eb" />
            </View>
             :
            <View>
                <ScrollView>
                    {patientList.map((x,index) => {
                        return <List.Item
                        title={x.patient_name}
                        key={index}
                        description={x.UHID}
                        onPress={() => viewPatient(x)}
                    />
                    })}
                </ScrollView>
            </View>
        }
        </>
    );


}

export default PatientListScreen;