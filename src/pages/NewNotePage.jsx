import { Text, View, StyleSheet, TouchableOpacity, Alert, Modal } from 'react-native'
import React, { useEffect } from 'react';

// Utils & Hooks
import { colors } from '../themes/colors';
import { mediaFunctionaliy } from '../src/utils/mediaFunctionality';
import { getCameraPermission, getCameraRollPermission } from '../src/utils/getPermissions';
import { useNotes } from '../src/hooks/useNotes';

// Components
import { SaveDeleteSection } from '../src/components/NewNote/SaveDeleteSection';
import { InputSection } from '../src/components/NewNote/InputSection';
import { OptionsSection } from '../components/NewNote/OptionsSection';

// Libraries
import { useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';


export const NewNotePage = () => {
    const { id } = useLocalSearchParams();
    console.log(`PARAM ID: ${id}`);
    const { notes } = useNotes(id);

    const existingNoteObject = notes.find((note) => note.id === id) ;
    console.log('Existing Note Object:', existingNoteObject);
    // console.log('Existing title:', existingNoteObject.title);

    // Update persmission
    useEffect(() => {
        getCameraRollPermission();
        getCameraPermission();
    }, []);


    return (
            <View style={styles.newNoteContainer}>
                
                <SaveDeleteSection id={id}/>

                <InputSection/>

                <OptionsSection />
                
                {/* ---- Camera or Media Lirbary modal ---- */}
                <View style={styles.modalContainer}>
                    <Modal
                        visible={isImageOptionsModalVisible}
                        transparent={true}
                        animationType="slide"
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                            setImageOptionsModalVisible(!isImageOptionsModalVisible)
                        }}>

                        <View style={styles.centeredModal}>
                            <View style={styles.imageOptionsModal}>
                                <View style={styles.modalPictureOptionsContainer}>
                                    <TouchableOpacity style={styles.modalChooseBtn} onPress={() => mediaFunctionaliy(ImagePicker.launchCameraAsync, setImageUri, setImageOptionsModalVisible)}>
                                        <Text style={styles.modalOptionText}>Take a Photo</Text>
                                    </TouchableOpacity>
                                    
                                    <TouchableOpacity style={styles.modalChooseBtn} onPress={() => mediaFunctionaliy(ImagePicker.launchImageLibraryAsync, setImageUri, setImageOptionsModalVisible)}>
                                        <Text style={styles.modalOptionText}>Choose from Camera Roll</Text>
                                    </TouchableOpacity>

                                </View>
                                <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setImageOptionsModalVisible(false)}>
                                    <Text style={styles.modalOptionText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
  
    )
}

const styles = StyleSheet.create({
    newNote: {
        height: '90%'
    },
    newNoteContainer: {
        height: '100%',
        width: '100%',
        paddingHorizontal: 30,
        paddingTop: 60,
        paddingBottom: 30
    },
    
    
    centeredModal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageOptionsModal: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.background,
        height: '20%',
        width: '80%',
        paddingBottom: 10,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 0.13,
        shadowRadius: 8.00,
        elevation: 4,
    },
    modalPictureOptionsContainer: {
        flexDirection: 'row',
        width: '80%',
        justifyContent: 'space-between'

    },
    modalOptionText: {
        textAlign: 'center',
    },
    modalChooseBtn: {
        backgroundColor: 'white',
        padding: 10,
        width: 110,
        borderRadius: 5,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalCancelBtn: {
        backgroundColor: colors.blue.medium,
        padding: 10,
        borderRadius: 20,
        marginTop: 20
    }
})
