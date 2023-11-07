
import { TextInput, Text, View, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native'
import { colorOptions } from '../../utils/colorFunctions';
import Svg, { Path, Rect } from 'react-native-svg';
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';




export const NewNote = ({ onSave, onCancel, noteId, editNote }) => {
    // Set states, and populate fields if note exists.
    const [title, setTitle] = useState(editNote ? editNote.title : '');
    const [content, setContent] = useState(editNote ? editNote.content : '');
    const [color, setColor] = useState(editNote ? editNote.color : 'yellow');
    const [imageUri, setImageUri] = useState(null); // Store the image URI

    // Handle color change of the post-it note
    const handleColorChange = (color) => {
        setColor(color);
    };

    // Ger media library permission
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
    
        if (!result.cancelled) {
            // Set the image URI to display the captured photo
            const uri = result.assets[0].uri;
            setImageUri(uri);
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
    
        if (!result.cancelled) {
            // Set the image URI to display the selected image
            const uri = result.assets[0].uri;
            setImageUri(uri);
        }
    };

    // Handle the saving functionality
    const handleSave = () => {
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
        <View style={styles.newNoteContainer}>
            <View style={styles.saveSection}>
                <TouchableOpacity onPress={handleSave} style={styles.saveBtn}>
                    <Svg width="45" height="45" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M24.4999 4.89999C13.6758 4.89999 4.8999 13.6759 4.8999 24.5C4.8999 35.3241 13.6758 44.1 24.4999 44.1C35.324 44.1 44.0999 35.3241 44.0999 24.5C44.0999 13.6759 35.324 4.89999 24.4999 4.89999ZM35.4547 20.7548L23.1067 33.1028C22.7996 33.4098 22.3847 33.5813 21.9519 33.5813C21.5191 33.5813 21.1026 33.4098 20.7971 33.1028L15.1572 27.4629C14.5186 26.8242 14.5186 25.792 15.1572 25.1533C15.7959 24.5147 16.8281 24.5147 17.4668 25.1533L21.9519 29.6385L33.1451 18.4452C33.7838 17.8066 34.816 17.8066 35.4547 18.4452C36.0933 19.0839 36.0933 20.1161 35.4547 20.7548Z" fill="#ACD3A9" />
                    </Svg>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCancel}>
                    <Svg width="38" height="38" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M19.5 0C8.73113 0 0 8.73113 0 19.5C0 30.2689 8.73113 39 19.5 39C30.2689 39 39 30.2689 39 19.5C39 8.73113 30.2689 0 19.5 0ZM21.7977 19.5C21.7977 19.5 26.8986 24.6009 27.1489 24.8511C27.7843 25.4865 27.7843 26.5151 27.1489 27.1489C26.5135 27.7843 25.4849 27.7843 24.8511 27.1489C24.6009 26.9003 19.5 21.7977 19.5 21.7977C19.5 21.7977 14.3991 26.8986 14.1489 27.1489C13.5135 27.7843 12.4849 27.7843 11.8511 27.1489C11.2158 26.5135 11.2158 25.4849 11.8511 24.8511C12.0998 24.6009 17.2023 19.5 17.2023 19.5C17.2023 19.5 12.1014 14.3991 11.8511 14.1489C11.2158 13.5135 11.2158 12.4849 11.8511 11.8511C12.4865 11.2158 13.5151 11.2158 14.1489 11.8511C14.3991 12.0998 19.5 17.2023 19.5 17.2023C19.5 17.2023 24.6009 12.1014 24.8511 11.8511C25.4865 11.2158 26.5151 11.2158 27.1489 11.8511C27.7843 12.4865 27.7843 13.5151 27.1489 14.1489C26.9003 14.3991 21.7977 19.5 21.7977 19.5Z" fill="#D18290" />
                    </Svg>
                </TouchableOpacity>
            </View>

            <View style={styles.textSection}>
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
            </View>
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
                <TouchableOpacity onPress={takePhoto} style={styles.takePhotoBtn}>
                    <Svg width="40" height="40" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M43.75 6.25H36.25L33.125 3.125H16.875L13.75 6.25H6.25C3.83172 6.25 1.875 8.20672 1.875 10.625V37.5C1.875 39.9183 3.83172 41.875 6.25 41.875H43.75C46.1683 41.875 48.125 39.9183 48.125 37.5V10.625C48.125 8.20672 46.1683 6.25 43.75 6.25ZM25 36.25C18.8813 36.25 13.75 31.1187 13.75 25C13.75 18.8813 18.8813 13.75 25 13.75C31.1187 13.75 36.25 18.8813 36.25 25C36.25 31.1187 31.1187 36.25 25 36.25ZM36.25 18.125C34.5775 18.125 33.125 19.5775 33.125 21.25C33.125 22.9225 34.5775 24.375 36.25 24.375C37.9225 24.375 39.375 22.9225 39.375 21.25C39.375 19.5775 37.9225 18.125 36.25 18.125ZM26.875 33.125H23.125V30H26.875V33.125ZM40.625 31.875C39.5469 31.875 38.6664 32.7555 38.6664 33.8336V38.8899H11.3336V33.8336C11.3336 32.7555 10.4531 31.875 9.37498 31.875H6.25V12.5H43.75V31.875H40.625Z" fill="#324D5B" />
                    </Svg>
                    <Text style={styles.takePhotoText}>Take a Photo</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={chooseFromCameraRoll} style={styles.choosePhotoBtn}>
                    <Svg width="40" height="40" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M1.25 7.5V42.5C1.25 44.9817 3.20672 46.9375 5.68748 46.9375H44.6875C47.1683 46.9375 49.125 44.9817 49.125 42.5V7.5C49.125 5.01823 47.1683 3.0625 44.6875 3.0625H5.68748C3.20672 3.0625 1.25 5.01823 1.25 7.5ZM3.43748 7.5C3.43748 6.4027 4.25415 5.5625 5.31248 5.5625H44.3125C45.3708 5.5625 46.1875 6.4027 46.1875 7.5V16.5625L31.8042 27.625L18.75 16.8023L4.125 27.0593V7.5ZM2.5 40H47.75V43.4375H2.5V40Z" fill="#324D5B" />
                    </Svg>
                    <Text style={styles.choosePhotoText}>Choose from Camera Roll</Text>
                </TouchableOpacity>

                {/* Display the selected image */}
                {imageUri && (
                    <Image
                        source={{ uri: imageUri }}
                        style={styles.selectedImage}
                    />
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    newNoteContainer: {
        height: '100%',
        width: '100%',
        paddingHorizontal: 20,

    },
    saveSection: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'

    },
    saveBtn: {
        paddingRight: 10
    },
    textSection: {
        height: '50%',
        paddingVertical: 20,
    },
    titleInput: {
        fontSize: 26,
        marginBottom: 30,
        height: '10%',
        fontFamily: 'Menlo'
    },
    contentInput: {
        fontSize: 16,
        height: '40%',
        fontFamily: 'Menlo'
    },
    optionsContainer: {
        width: '100%',
        justifyContent: 'space-between'
    },
    chooseColorSection: {
        flexDirection: 'row',
        width: '65%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20
    },
    imageTxt: {
        width: '100%',
        alignItems: 'flex-end'
    }
})