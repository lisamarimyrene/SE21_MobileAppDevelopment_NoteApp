import AsyncStorage from '@react-native-async-storage/async-storage';


export const overwriteNotes = (newNoteArray) => {

    // Store the updated notes in AsyncStorage
    AsyncStorage.setItem('notes', JSON.stringify(newNoteArray))
    .then(() => {
        // todo: create toggle modal
        console.log('saved new notes')
        // setShowNewNote(false);
    })
    .catch((error) => {
        console.error('Error saving notes to AsyncStorage: ', error);
    });
}