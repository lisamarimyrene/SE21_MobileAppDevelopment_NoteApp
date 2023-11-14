import { useEffect, useState } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllNotes, updateNotesArray } from "../utils/asyncStorage";
import { generateNewId } from "../utils/generateNewId";
import { router } from 'expo-router';

export const useNotes = () => {
    const [notes, setNotes] = useState([])

    // Refresh notes data that are listening on the refreshTrigger state
    useEffect(() => {
        getAllNotes(setNotes);
    }, [])

    // Save note created or edited
    const handleSaveNote = (title, content, color, imageUri) => {

        let newNotesArray;

        const newNote = {
            id: generateNewId(),
            color: color,
            title: title,
            content: content,
            image: imageUri,
        };

        newNotesArray = [...notes, newNote];
        console.log(newNotesArray);

        updateNotesArray(newNotesArray, setNotes)

        router.back()

    }


    // // Handle the cancel action with a confirmation dialog
    // const handleCancel = () => {
    //     // If the note has title or content, give alert.
    //     if (title || content) {
    //         Alert.alert(
    //             'Confirm Delete',
    //             'Are you sure you want to delete this note?',
    //             [
    //                 {
    //                     text: 'Cancel',
    //                     style: 'cancel',
    //                 },
    //                 {
    //                     text: 'Delete',
    //                     onPress: () => {
    //                         onCancel(true);
    //                     },
    //                 },
    //             ],
    //             { cancelable: false }
    //         );
    //         // If the note doesnt have title or content, just close window.
    //     } else if (!title || !content) {
    //         onCancel(true);
    //         // Else, don't close window. 
    //     } else {
    //         onCancel(false);
    //     }
    // };


    //     if (isDelete) {
    //         if (tempId) {
    //             // Remove the temporary note by its unique ID
    //             setNotes((prevNotes) => prevNotes.filter((note) => note.id !== tempId));
    //         } else if (editNote) {
    //             // Remove the note from your data or state
    //             setNotes((prevNotes) => prevNotes.filter((note) => note.id !== editNote.id));
    //         }

    //         if (editNote) {
    //             // Update AsyncStorage to remove the deleted note
    //             AsyncStorage.setItem(
    //                 'notes',
    //                 JSON.stringify(notes.filter((note) => (tempId ? note.id !== tempId : note.id !== editNote.id)))
    //             )
    //                 .then(() => {
    //                     // Dismiss the editing view
    //                     setShowNewNote(false);
    //                     setEditNote(null);
    //                 })
    //                 .catch((error) => {
    //                     console.error('Error saving notes to AsyncStorage: ', error);
    //                 });
    //         } else {
    //             // If there is no `editNote`, simply dismiss the editing view
    //             setShowNewNote(false);
    //         }
    //     } else {
    //         // Dismiss the editing view
    //         setShowNewNote(false);
    //     }
    // };

    return { notes, handleSaveNote }
}