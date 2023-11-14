import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Take photo functionality
export const takePhoto = async (setImageUri, setImageOptionsModalVisible) => {
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
export const chooseFromCameraRoll = async (setImageUri, setImageOptionsModalVisible) => {
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