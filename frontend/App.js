import React, { useState } from 'react';
import PatientEntryForm from './Screens/PatientEntryForm.js';
import PatientFilter from './Screens/PatientFilter.js';
import SignIn from './Screens/SignIn';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import PatientDetails from './Screens/PatientDetails.jsx';
import AddDocotr from './Screens/AddDocotr.js';
import AddNurse from './Screens/AddNurse.jsx';
import AddHospital from './Screens/AddHospital.jsx';
import WardsStatusScreen from './Screens/WardsStatusScreen';
import FiltersScreen from './Screens/FitersScreen.js';


const Drawer = createDrawerNavigator();


export default function App() {

  const [patientList, setPatientList] = useState([{
    s_no: '1',
    patient_name: "Anuj",
    ward_name: "CT POW",
    UHID: "2346674",
    hospital_no: "686937",
    doa:"16/4/2021",
    age: '21',
    sex: 'male',
    pr: '99',
    bp: '120/80',
    rr: '18',
    bed: 'o2',
    spo2: '90',
    o2_niv_mv: 'NRBM',
    o2_niv_mv_level: 'nrbm',
    fresh_complaint: 'DM',
    duty_doctors: 'Doctor'
}]);

  const [patientUHID, setPatientUHID] = useState('58674653');

  return (
      <>
        <NavigationContainer>
            <Drawer.Navigator 
              initialRouteName="Apply"
              drawerContentOptions={{
              activeTintColor: '#0481eb',
              itemStyle: { marginVertical: 5 },
            }}>
              <Drawer.Screen name="Filter" component={PatientFilter} initialParams={{patientUHIDState: [patientUHID, setPatientUHID]}} />
              <Drawer.Screen name="Add doctor" component={AddDocotr} />
              <Drawer.Screen name="Add Nurse" component={AddNurse} />
              <Drawer.Screen name="PatientEntryForm" component={PatientEntryForm} />
              <Drawer.Screen name="PatientDetails" component={PatientDetails} initialParams={{patientUHID: patientUHID}} />
              <Drawer.Screen name="SignIn" component={SignIn} />
              <Drawer.Screen name="Add hospital" component={AddHospital} />
              <Drawer.Screen name="Wards Status" component={WardsStatusScreen} />
              <Drawer.Screen name="Apply" component={FiltersScreen} initialParams={{patientListState: [patientList, setPatientList]}} />
            </Drawer.Navigator>
          </NavigationContainer>
        </>
  );
}

