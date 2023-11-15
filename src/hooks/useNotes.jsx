import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { getAllNotes, updateNotesFunction } from "../utils/asyncStorage";
import { generateNewId } from "../utils/generateNewId";
import { router } from "expo-router";

// Bruker en hook når du har en state og en effect samtidig, der du lytter på hva brukeren gjør
export const useNotes = (id) => {
    const [notes, setNotes] = useState([]);
    const [oneNote, setOneNote] = useState({});

    // Refresh notes data that are listening on the refreshTrigger state
    useEffect(() => {
        const loadNotes = async () => {
            const loadedNotes = await getAllNotes();
            setNotes(loadedNotes);
        };
        loadNotes();
    }, [notes]);


    useEffect(() => {
        const existingNoteObject = notes.find((note) => note.id === id);
        setOneNote(existingNoteObject);
    }, [id, notes]);


    // Save note created or edited
    const handleSaveNote = async (id, title, content, color, imageUri) => {
        let newNotesArray;
        
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
            // Replaces the note with the matching ID with the new data
            newNotesArray = notes.map((note) => (note.id === id ? newNote : note));
        } else {
            // else it creates a new array by spreading and adding the new note
            newNotesArray = [...notes, newNote];
        }

        try {
            await updateNotesFunction(newNotesArray);
            setNotes(newNotesArray);
            router.back();
        } catch (error) {
            console.error("Error saving note: ", error);
        }
    };

    // Delete note functionality
    const handleDeleteNote = async (id) => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this note?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    onPress: async () => {
                        try {
                            // removes chosen note from the notes array based on id and updates array
                            const newNotesArray = notes.filter((note) => note.id !== id);
                            await updateNotesFunction(newNotesArray);
                            setNotes(newNotesArray);
                            router.back();
                        } catch (error) {
                            console.error("Error deleting note: ", error);
                        }
                    },
                    style: "destructive",
                },
            ],
            { cancelable: false }
        );
    };

    return { notes, oneNote, handleSaveNote, handleDeleteNote };
};