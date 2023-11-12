import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { handleData } from '../hooks/useNotesData';

export const handleImageSelection = async (pickerFunction, setImageUri, setImageOptionsModalVisible) => {
    
    // const {
    //     setImageUri,
    //     setImageOptionsModalVisible,
    // } = handleData()

    const result = await pickerFunction({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    // If user selected an image
    if (!result.canceled) {
        // Update image state
        setImageUri(result.assets[0].uri);
        // Hide modal
        setImageOptionsModalVisible(false);
        // Set a filename for the uploaded image
        const filename = 'image.jpg';
        // Set the file uri for the uploaded image
        const newFileUri = `${FileSystem.documentDirectory}${filename}`;

        // Create a promise and show error if not fulfilled
        try {
            // Copy file and save
            await FileSystem.copyAsync({
                from: result.uri,
                to: newFileUri,
            });

            // Set the saved file URI
            setImageUri(result.assets[0].uri);

            // Save image data using AsyncStorage
            await AsyncStorage.setItem(newFileUri, result.uri);

            console.log('Image saved successfully to', newFileUri);
        } catch (error) {
            console.error('Error saving image:', error);
        }
    }

    // Hide modal
    setImageOptionsModalVisible(false);
};

export default handleImageSelection;
