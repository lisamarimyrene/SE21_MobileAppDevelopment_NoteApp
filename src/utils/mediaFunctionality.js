import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

// Take photo or upload from media library functionality
export const mediaFunctionaliy = async (launchOption, setImageUri, setMediaModalVisible) => {

    const result = await launchOption({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    if (!result.canceled) {
        // Update image state
        setImageUri(result.assets[0].uri);

        setMediaModalVisible(false);

        const filename = "image.jpg"; 
        const newFileUri = `${FileSystem.documentDirectory}${filename}`;

        try {
            // Copy file and save
            await FileSystem.copyAsync({
                from: result.assets[0].uri, // Use result.uri as the source
                to: newFileUri,
            });

            setImageUri(result.assets[0].uri);

            await AsyncStorage.setItem(newFileUri, result.assets[0].uri);

            console.log("Image saved successfully to", newFileUri);
        } catch (error) {
            console.error("Error saving image:", error);
        }
    }
    setMediaModalVisible(false);
};