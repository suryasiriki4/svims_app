import React, { useState } from 'react';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { Text, View, StyleSheet, KeyboardAvoidingView, TextInput } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay'
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import { SectionGrid } from 'react-native-super-grid';
import axios from 'axios';
import { SafeAreaView } from 'react-navigation';


const WardsStatusScreen = () => {

    // beds state
    const [beds, setBeds] = useState({});
    const [o2Empty, setO2Empty] = useState('24');
    const [o2Occupied, setO2Occupied] = useState('24');
    const [nonO2Empty, setNonO2Empty] = useState('24');
    const [nonO2Occupied, setNonO2Occupied] = useState('24');
    const [icuEmpty, setIcuEmpty] = useState('24');
    const [icuOccupied, setIcuOccupied] = useState('24');



    //Item array for the ward dropdown
    const [wardName, setWardName] = useState('');

    const [editable,setEditable] = useState(false);

    const [loading, setLoading] = useState(false);

    const [viewBedStatus, setViewBedStatus] = useState(false);

    const wardItems = [
        //name key is must.It is to show the text in front
        { id: 1, name: 'I-GS1' },
        { id: 2, name: 'I-GS2' },
        { id: 3, name: 'I-GS3' },
        {id: 4, name: ''},
    ];



    const styles = StyleSheet.create({
        modal: {
            flex: 1,
            backgroundColor: '#fff',
            padding: 20,
        },
        containerStyle: {
            padding: 5
        },
        textInputStyle: {
            //inserted text style
            padding: 12,
            borderWidth: 1,
            borderColor: '#ccc',
            backgroundColor: '#FAF7F6',
        },
        itemStyle: {
            //single dropdown item style
            padding: 10,
            marginTop: 2,
            backgroundColor: '#FAF9F8',
            borderColor: '#bbb',
            borderWidth: 1,
        },
        itemTextStyle: {
            //text style of a single dropdown item
            color: '#222',
        },
        itemsContainerStyle: {
            //items container style you can pass maxHeight
            //to restrict the items dropdown hieght
            maxHeight: '60%',
        },
        headingText: {
            padding: 2,
        },
        subHeadingText: {
            padding: 1,
        },
        titleText: {
            padding: 8,
            fontSize: 16,
            textAlign: 'center',
            fontWeight: 'bold',
        },
        // date-picker styles
        container: {
            flex: 1,
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
        },
        title: {
            textAlign: 'center',
            fontSize: 30,
            fontWeight: 'bold',
            padding: 20,
        },
        datePickerStyle: {
            width: 150,
            marginTop: 10,
        },
        // styles for bed status
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
        }
        
    });

    const selectWard = (item) => {
        setWardName(item.name);
        const hospital_id = '1';
        const ward_name = wardName;
        console.log(ward_name);
        console.log(hospital_id);
        axios.get(`http://192.168.29.245:5000/equipment/get/${ward_name}/${hospital_id}`)
        .then((res) => {setBeds(res.data); console.log(res.data.ward_name + " is the response");})
        .catch((err) => console.log(err));

        setO2Empty(beds.o2_vac_beds);
        setO2Occupied(beds.o2_occ_beds);
        setNonO2Empty(beds.no2_vac_beds);
        setNonO2Occupied(beds.no2_occ_beds);
        setIcuEmpty(beds.icu_vac_beds);
        setIcuOccupied(beds.icu_occ_beds);

        setViewBedStatus(true);
        console.log(item.name + " : selcted ward");
    }

    const buttonHandler = () => {
        if(editable) {
            setLoading(true);
            const hospital_id = '1';
            const ward_name = wardName;
            const o2_occ_beds= o2Occupied;
            const o2_vac_beds= o2Empty;
            const no2_occ_beds= nonO2Occupied;
            const no2_vac_beds= nonO2Empty;
            const icu_occ_beds= icuOccupied;
            const icu_vac_beds= icuEmpty;

            console.log('data updated');
            axios.post('http://192.168.29.245:5000/equipment/add', {
                ward_name,o2_occ_beds,o2_vac_beds,
                no2_occ_beds,no2_vac_beds, icu_occ_beds, icu_vac_beds, hospital_id
            }).then((res) => { alert('Data successfully uploaded!'); console.log(res.data.ward_name + " got it");
                })
            .catch((err) => {console.log(err); alert('Sorry, your request failed!')});
            // setBlankStates();
        }
        setEditable(!editable)
    }

    const cancelEditMode = () => {
        if(editable) {
            setBlankStates()
            setEditable(false)
        }
    }

    
    
    return(
        <SafeAreaView>
            
            <View style={{padding: 20}}>
                <Text style={styles.headingText}>
                    Ward Name
                </Text>
                <SearchableDropdown
                    onTextChange={(text) => console.log(text)}
                    //On text change listner on the searchable input
                    onItemSelect={(item) => selectWard(item)}
                    //onItemSelect called after the selection from the dropdown
                    containerStyle={styles.containerStyle}
                    //suggestion container style
                    textInputStyle={styles.textInputStyle}
                    itemStyle={styles.itemStyle}
                    itemTextStyle={styles.itemTextStyle}
                    itemsContainerStyle={styles.itemsContainerStyle}
                    items={wardItems}
                    //mapping of item array
                    defaultIndex={3}
                    //default selected item index
                    placeholder="Ward Name"
                    //place holder for the search input
                    resetValue={false}
                    //reset textInput Value with true and false state
                    underlineColorAndroid="transparent"
                    //To remove the underline from the android input
                    listProps={{ nestedScrollEnabled: true }}
                    //enabling nested scrolling part in WARDS
                />
            </View>

            {
                viewBedStatus ?
                    <View>
                        <Text style={styles.title}>
                            {wardName} Beds Status
                        </Text>
                        <View style={styles.smallFieldsContainer}>
                            <View style={{marginTop: 10,flex: 1}}>
                                <Text style={{fontSize: 20, fontWeight: 'bold', padding: 17}}> O2 Beds : </Text>

                            </View>
                            <View style={{marginTop: 10,flex: 1}}>
                                <Text style={{fontSize: 12}}> Empty </Text>
                                <TextInput 
                                    value={o2Empty}
                                    style={styles.smallTextInput}
                                    onChangeText={val => setO2Empty(val)}
                                    editable = {editable}
                                />
                            </View>
                            <View style={{marginTop: 10,flex: 1}}>
                                <Text style={{fontSize: 12}}> Occupied </Text>
                                <TextInput 
                                    value={o2Occupied}
                                    onChangeText = {val => setO2Occupied(val)}
                                    style={styles.smallTextInput}
                                    editable = {editable}
                                />
                            </View>
                        </View>
                        <View style={styles.smallFieldsContainer}>
                            <View style={{marginTop: 10,flex: 1}}>
                                <Text style={{fontSize: 20, fontWeight: 'bold', padding: 15}}> NON-O2 Beds : </Text>

                            </View>
                            <View style={{marginTop: 10,flex: 1}}>
                                <Text style={{fontSize: 12}}> Empty </Text>
                                <TextInput 
                                    value={nonO2Empty}
                                    onChangeText = {val => setNonO2Empty(val)}
                                    style={styles.smallTextInput}
                                    editable = {editable}
                                />
                            </View>
                            <View style={{marginTop: 10,flex: 1}}>
                                <Text style={{fontSize: 12}}> Occupied </Text>
                                <TextInput 
                                    value={nonO2Occupied}
                                    onChangeText = {val => setNonO2Occupied(val)}
                                    style={styles.smallTextInput}
                                    editable = {editable}
                                />
                            </View>
                        </View>
                        <View style={styles.smallFieldsContainer}>
                            <View style={{marginTop: 10,flex: 1}}>
                                <Text style={{fontSize: 20, fontWeight: 'bold', padding: 15}}> ICU Beds : </Text>

                            </View>
                            <View style={{marginTop: 10,flex: 1}}>
                                <Text style={{fontSize: 12}}> Empty </Text>
                                <TextInput 
                                    value={icuEmpty}
                                    onChangeText={val => setIcuEmpty(val)}
                                    style={styles.smallTextInput}
                                    editable = {editable}
                                />
                            </View>
                            <View style={{marginTop: 10,flex: 1}}>
                                <Text style={{fontSize: 12}}> Occupied </Text>
                                <TextInput 
                                    value={icuOccupied}
                                    onChangeText = {val => setIcuOccupied(val)}
                                    style={styles.smallTextInput}
                                    editable = {editable}
                                />
                            </View>
                        </View>
                        <View style={{flexDirection:'row',justifyContent: 'space-around'}}>
                            <Text style={styles.submitButton} onPress={buttonHandler}>
                            {editable ? 'Update' : "Edit"} </Text>
                            <Text onPress={e=> {if(editable) setEditable(false)}} style={{...styles.submitButton,
                            backgroundColor: editable?"#DC143C":"#ff9999"}} onClick={cancelEditMode}>
                            Cancel </Text>
                        </View>
               
                </View> 
                :
                <>
                </>
            }
        </SafeAreaView>
    );
}

export default WardsStatusScreen;