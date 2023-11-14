import { useEffect, useState } from "react"
import { Alert } from 'react-native'
import { getAllNotes, updateNotesArray } from "../utils/asyncStorage";
import { generateNewId } from "../utils/generateNewId";
import { router } from 'expo-router';

export const useNotes = () => {
    const [notes, setNotes] = useState([])

    // Refresh notes data that are listening on the refreshTrigger state
    useEffect(() => {
        const loadNotes = async () => {
            const loadedNotes = await getAllNotes();
            setNotes(loadedNotes);
        };
        loadNotes();
    }, [])

    // Save note created or edited
    const handleSaveNote = async (id, title, content, color, imageUri) => {
        let updatedNotesArray;
        
        const existingNoteObject = notes.find((note) => note.id === id) ;
        console.log("existingNote: ", existingNoteObject);

        // Set new note 
        const newNote = {
            id: id ? id : generateNewId(),
            color: color,
            title: title,
            content: content,
            image: imageUri,
        };

        // Check if note exist 
        if (existingNoteObject) {
            updatedNotesArray = notes.map((note) => (note.id === id ? newNote : note))
        } else {
            updatedNotesArray = [...notes, newNote];
        }

        try {
            await updateNotesArray(updatedNotesArray);
            router.back();
        } catch (error) {
            console.error('Error saving note: ', error);
        }
    };

    // Delete note functionality
    const handleDeleteNote = async (id) => {
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
                    onPress: async () => {
                        try {
                            const updatedNotesArray = notes.filter((note) => note.id !== id);
                            await updateNotesArray(updatedNotesArray);
                            router.back();
                        } catch (error) {
                            console.error('Error deleting note: ', error);
                        }
                    },
                    style: 'destructive',
                },
            ],
            { cancelable: false }
        );
    }





    return { notes, handleSaveNote, handleDeleteNote };
}