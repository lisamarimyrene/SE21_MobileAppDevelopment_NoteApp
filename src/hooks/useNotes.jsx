import { useEffect, useState } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { overwriteNotes } from "../utils/asyncStorage";
import { getNewId } from "../utils/getId";

export const useNotes = () => {
    const [refreshTrigger, setRefreshTrigger] = useState(false)
    const [notes, setNotes] = useState([])

    // Trigger refresh of data function
    const triggerRefresh = () => {
        setRefreshTrigger(!refreshTrigger)
    }

    // Refresh notes data that are listening on the refreshTrigger state
    useEffect(() => {
        AsyncStorage.getItem('notes')
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

    }, [refreshTrigger])

    // Save note created or edited
    const handleSaveNote = (noteToSave) => {
        let newNotesArray;

        const noteIdExists = notes.filter((note) => {
            if (noteToSave.id === note.id) return note
            console.log(note);
        })
        console.log("noteExists", noteIdExists);

        if (noteIdExists.length) {
            // If you are editing a note, update it in the existing notes
            newNotesArray = notes.map((note) =>
                note.id === noteToSave.id ? { ...note, ...noteToSave } : note
            );
            console.log("if", noteToSave.id);
            
            
            // ? Remove
            // Reset input fields to null
            // setEditNote(null);
            //! kommer ikke inn til elsen
        } else {
            // If you are adding a new note, add it to the existing notes
            noteToSave.id = getNewId();
            newNotesArray = [...notes, noteToSave];
            console.log("else", noteToSave.id);
        }

        overwriteNotes(newNotesArray)
        triggerRefresh()
    };

    return { notes, handleSaveNote }
}