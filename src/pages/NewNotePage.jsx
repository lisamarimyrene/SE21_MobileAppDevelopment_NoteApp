import { Text, View, StyleSheet, TouchableOpacity, Alert, Modal } from 'react-native'
import Svg, { Path, Rect } from 'react-native-svg';
import React, { useEffect } from 'react';

// Utils & Hooks
import { colors } from '../themes/colors';
import { colorOptions } from '../src/utils/colorFunctions';
import { mediaFunctionaliy } from '../src/utils/mediaFunctionality';
import { getCameraPermission, getCameraRollPermission } from '../src/utils/getPermissions';
import { useNotes } from '../src/hooks/useNotes';

// Components
import { SaveDeleteSection } from '../src/components/NewNote/SaveDeleteSection';
import { InputSection } from '../src/components/NewNote/InputSection';

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

    // Handle color change of the post-it note
    const handleColorChange = (color) => {
        setColor(color);
    };

    // Update persmission
    useEffect(() => {
        getCameraRollPermission();
        getCameraPermission();
    }, []);


    return (
            <View style={styles.newNoteContainer}>
                
                <SaveDeleteSection id={id}/>

                <InputSection/>

                {/* ---- Choose color and image section ---- */}
                <View style={styles.optionsContainer}>
                    <View style={styles.chooseColorSection}>
                        {colorOptions.map((colorOption) => (
                            <TouchableOpacity
                                key={colorOption.name}
                                onPress={() => handleColorChange(colorOption.name)}
                            >
                                <Svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Rect
                                        width="41"
                                        height="41"
                                        rx="3"
                                        fill={color === colorOption.name ? colorOption.activeFill : colorOption.fill}
                                        stroke={colorOption.stroke}
                                        strokeWidth="7"
                                    />
                                </Svg>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <TouchableOpacity style={styles.takePhotoBtn} onPress={() => setImageOptionsModalVisible(true)}>
                        <Svg width="40" height="40" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M23 17C23 17.5304 22.7893 18.0391 22.4142 18.4142C22.0391 18.7893 21.5304 19 21 19H3C2.46957 19 1.96086 18.7893 1.58579 18.4142C1.21071 18.0391 1 17.5304 1 17V6C1 5.46957 1.21071 4.96086 1.58579 4.58579C1.96086 4.21071 2.46957 4 3 4H7L9 1H15L17 4H21C21.5304 4 22.0391 4.21071 22.4142 4.58579C22.7893 4.96086 23 5.46957 23 6V17Z" stroke="#707070" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <Path d="M12 15C14.2091 15 16 13.2091 16 11C16 8.79086 14.2091 7 12 7C9.79086 7 8 8.79086 8 11C8 13.2091 9.79086 15 12 15Z" stroke="#707070" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </Svg>
                        {/* <Text style={styles.takePhotoText}>Take a Photo</Text> */}
                    </TouchableOpacity>
                </View>

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
    
    optionsContainer: {
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10
    },
    chooseColorSection: {
        flexDirection: 'row',
        width: '65%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
    },
    takePhotoBtn: {
        width: '15%',
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
