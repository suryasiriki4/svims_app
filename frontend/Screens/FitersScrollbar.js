import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Button } from 'react-native';

const FiltersScrollbar = (props) => {

    const [showModal, setShowModal] = props.modalState;
    
    const styles = StyleSheet.create({
        scrollbar: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
        }
    });

    const viewFilters = () => {
        setShowModal(!showModal);
    }
    
    return(
        <>
            <View style={styles.scrollbar}>
                <Button
                    title="filters"
                    onPress={() => viewFilters()}
                />
            </View>
        </>
    );
}

export default FiltersScrollbar