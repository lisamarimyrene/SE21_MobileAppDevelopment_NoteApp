
import { TextInput, Text, View, StyleSheet, TouchableOpacity, Alert, Image, Modal, ScrollView } from 'react-native'
import { colorOptions } from '../utils/colorFunctions';
import Svg, { Path, Rect } from 'react-native-svg';
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { colors } from '../../themes/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const NewNote = ({ onSave, onCancel, noteId, editNote }) => {
    // Set states, and populate fields if note exists (compares)
    const [title, setTitle] = useState(editNote ? editNote.title : '');
    const [content, setContent] = useState(editNote ? editNote.content : '');
    const [color, setColor] = useState(editNote ? editNote.color : 'yellow');
    const [imageUri, setImageUri] = useState(editNote ? editNote.image : null);
    // Opens and close image modal
    const [isImageOptionsModalVisible, setImageOptionsModalVisible] = useState(false); // To show/hide modal


    // Handle color change of the post-it note
    const handleColorChange = (color) => {
        setColor(color);
    };

    // Get media library permission
    const getCameraRollPermission = async () => {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission to access camera roll is required!');
        }
    };

    // Get camera permission
    const getCameraPermission = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission to access the camera is required!');
        }
    };

    // Update persmission
    useEffect(() => {
        getCameraRollPermission();
        getCameraPermission();
    }, []);

    // Take photo functionality
    const takePhoto = async () => {
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        // console.log(result);
        // If user took a picture
        if (!result.canceled) {
            // Update image state
            setImageUri(result.assets[0].uri);
            // Hide modal
            setImageOptionsModalVisible(false)

            // Set a filename for the uploaded image
            const filename = 'image.jpg'; // Set a filename for the saved image
            // Set the file uri for the uploaded image
            const newFileUri = `${FileSystem.documentDirectory}${filename}`;

            // Create a promise and show error if not fulfilled
            try {
                // Copy file and save
                await FileSystem.copyAsync({
                    from: result.uri, // Use result.uri as the source
                    to: newFileUri,
                });

                // Set the selected image URI
                setImageUri(result.assets[0].uri);

                // Save image data using AsyncStorage
                await AsyncStorage.setItem(newFileUri, result.uri);

                console.log('Image saved successfully to', newFileUri);
            } catch (error) {
                console.error('Error saving image:', error);
            }
        }
    };

    // Choose picture from cameraroll functionality
    const chooseFromCameraRoll = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        // If user uploaded image from camera roll
        if (!result.canceled) {
            // Update image state
            setImageUri(result.assets[0].uri);
            // Hide modal
            setImageOptionsModalVisible(false)
            // Set a filename for the uploaded image
            const filename = 'image.jpg'; // Set a filename for the saved image
            // Set the file uri for the uploaded image
            const newFileUri = `${FileSystem.documentDirectory}${filename}`;

            // Create a promise and show error if not fulfilled
            try {
                // Copy file and save
                await FileSystem.copyAsync({
                    from: result.uri, // Use result.uri as the source
                    to: newFileUri,
                });

                // Set the selected image URI
                setImageUri(result.assets[0].uri);

                // Save image data using AsyncStorage
                await AsyncStorage.setItem(newFileUri, result.uri);

                console.log('Image saved successfully to', newFileUri);
            } catch (error) {
                console.error('Error saving image:', error);
            }
        }
        // Hide modal
        setImageOptionsModalVisible(false)
    };

    // Handle the saving functionality
    const handleSave = async () => {
        if (title || content) {
            const newNote = {
                id: editNote ? editNote.id : noteId(),
                color: color,
                title: title,
                content: content,
                image: imageUri,
            };

            onSave(newNote);
            onCancel();

        }
        else {
            Alert.alert(
                'Did you mean to save?',
                'Please enter some input or delete the note.',
                [
                    {
                        text: 'OK',
                    },
                ],
                { cancelable: true }
            );
        }
    };

    // Handle the cancel action with a confirmation dialog
    const handleCancel = () => {
        // If the note has title or content, give alert.
        if (title || content) {
            Alert.alert(
                'Confirm Delete',
                'Are you sure you want to delete this note?',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'Delete',
                        onPress: () => {
                            onCancel(true);
                        },
                    },
                ],
                { cancelable: false }
            );
            // If the note doesnt have title or content, just close window.
        } else if (!title || !content) {
            onCancel(true);
            // Else, don't close window. 
        } else {
            onCancel(false);
        }
    };


    return (
        <Modal styles={styles.newNote} animationType="slide">
            <View style={styles.newNoteContainer}>
                <View style={styles.saveSection}>
                    <TouchableOpacity onPress={handleCancel}>
                        <Svg width="35" height="35" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M19.5 0C8.73113 0 0 8.73113 0 19.5C0 30.2689 8.73113 39 19.5 39C30.2689 39 39 30.2689 39 19.5C39 8.73113 30.2689 0 19.5 0ZM21.7977 19.5C21.7977 19.5 26.8986 24.6009 27.1489 24.8511C27.7843 25.4865 27.7843 26.5151 27.1489 27.1489C26.5135 27.7843 25.4849 27.7843 24.8511 27.1489C24.6009 26.9003 19.5 21.7977 19.5 21.7977C19.5 21.7977 14.3991 26.8986 14.1489 27.1489C13.5135 27.7843 12.4849 27.7843 11.8511 27.1489C11.2158 26.5135 11.2158 25.4849 11.8511 24.8511C12.0998 24.6009 17.2023 19.5 17.2023 19.5C17.2023 19.5 12.1014 14.3991 11.8511 14.1489C11.2158 13.5135 11.2158 12.4849 11.8511 11.8511C12.4865 11.2158 13.5151 11.2158 14.1489 11.8511C14.3991 12.0998 19.5 17.2023 19.5 17.2023C19.5 17.2023 24.6009 12.1014 24.8511 11.8511C25.4865 11.2158 26.5151 11.2158 27.1489 11.8511C27.7843 12.4865 27.7843 13.5151 27.1489 14.1489C26.9003 14.3991 21.7977 19.5 21.7977 19.5Z" fill="#D18290" />
                        </Svg>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSave} style={styles.saveBtn}>
                        <Svg width="45" height="45" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M24.4999 4.89999C13.6758 4.89999 4.8999 13.6759 4.8999 24.5C4.8999 35.3241 13.6758 44.1 24.4999 44.1C35.324 44.1 44.0999 35.3241 44.0999 24.5C44.0999 13.6759 35.324 4.89999 24.4999 4.89999ZM35.4547 20.7548L23.1067 33.1028C22.7996 33.4098 22.3847 33.5813 21.9519 33.5813C21.5191 33.5813 21.1026 33.4098 20.7971 33.1028L15.1572 27.4629C14.5186 26.8242 14.5186 25.792 15.1572 25.1533C15.7959 24.5147 16.8281 24.5147 17.4668 25.1533L21.9519 29.6385L33.1451 18.4452C33.7838 17.8066 34.816 17.8066 35.4547 18.4452C36.0933 19.0839 36.0933 20.1161 35.4547 20.7548Z" fill="#ACD3A9" />
                        </Svg>
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.inputSection}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >
                    <TextInput
                        style={styles.titleInput}
                        placeholder="Title"
                        value={title}
                        multiline={true}
                        onChangeText={text => setTitle(text)}
                    />
                    <TextInput
                        style={styles.contentInput}
                        placeholder="What's on your mind?"
                        value={content}
                        multiline={true}
                        onChangeText={text => setContent(text)}
                    />
                    {imageUri && (
                        <Image
                            source={{ uri: imageUri }}
                            style={styles.imageInput}
                        />
                    )}
                </ScrollView>

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
                                    <TouchableOpacity style={styles.modalChooseBtn} onPress={takePhoto}>
                                        <Text style={styles.modalOptionText}>Take a Photo</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.modalChooseBtn} onPress={chooseFromCameraRoll}>
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
        </Modal>
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
    saveSection: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'

    },
    saveBtn: {
        paddingLeft: 10
    },
    inputSection: {
        paddingBottom: 20,
    },
    titleInput: {
        fontSize: 26,
        marginBottom: 30,
        height: 50,
        fontFamily: 'Menlo',
    },
    contentInput: {
        fontSize: 16,
        height: 'auto',
        fontFamily: 'Menlo',
    },
    imageInput: {
        height: 200,
        width: '100%',
        marginTop: 30
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