import AsyncStorage from '@react-native-async-storage/async-storage';

// Update notes array saved in AsyncStorage
export const updateNotesArray = async (newNoteArray, setNotes) => {

    // Store the updated notes in AsyncStorage
    await AsyncStorage.setItem('notes', JSON.stringify(newNoteArray))
        .then(() => {
            setNotes(newNoteArray);
        })
        .catch((error) => {
            console.error('Error saving notes to AsyncStorage: ', error);
        });
}

// Get all notes saved in AsyncStorage
export const getAllNotes = async (setNotes) => {

    await AsyncStorage.getItem('notes')
        .then(savedNotes => {
            if (savedNotes) {
                const parsedNotes = JSON.parse(savedNotes);
                setNotes(parsedNotes)
            }
        })
        // Error message in case it's not able to load notes
        .catch(error => {
            console.error('Error loading notes from AsyncStorage: ', error);
        });
}

