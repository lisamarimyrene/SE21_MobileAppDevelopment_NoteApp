import AsyncStorage from '@react-native-async-storage/async-storage';

// Update notes array saved in AsyncStorage
export const updateNotesFunction = async (newNoteArray) => {
    // Store the updated notes in AsyncStorage
    try {
        await AsyncStorage.setItem('notes', JSON.stringify(newNoteArray))
        console.log("Sucess saving!", JSON.stringify(newNoteArray));
    } catch (error) {
        console.error('Error saving notes to AsyncStorage: ', error);
    }
}

// Get all notes saved in AsyncStorage
export const getAllNotes = async () => {
    try {
        const savedNotes = await AsyncStorage.getItem("notes");
        if (savedNotes) {
            return JSON.parse(savedNotes);
        }
    } catch (error) {
        console.log('Error loading notes from AsyncStorage: ', error);
        return null
    }

    return []
}

