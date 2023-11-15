import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Take photo or upload from media library functionality
export const mediaFunctionaliy = async (launchOption, setImageUri, setImageOptionsModalVisible) => {
    const result = await launchOption({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    if (!result.canceled) {
        // Update image state
        // returner heller resultatet
        setImageUri(result.assets[0].uri);
        // Hide modal
        setImageOptionsModalVisible(false)

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
}