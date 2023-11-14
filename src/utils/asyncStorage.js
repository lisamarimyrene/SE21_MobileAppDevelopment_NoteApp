import AsyncStorage from '@react-native-async-storage/async-storage';

export const updateNotesArray = (newNoteArray, setNotes) => {

    // Store the updated notes in AsyncStorage
    AsyncStorage.setItem('notes', JSON.stringify(newNoteArray))
    .then(() => {
        // todo: create toggle modal

        console.log('saved new notes')
        setNotes(newNoteArray);
    })
    .catch((error) => {
        console.error('Error saving notes to AsyncStorage: ', error);
    });
}