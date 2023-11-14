import { useEffect, useState } from "react"
import { getAllNotes, updateNotesArray } from "../utils/asyncStorage";
import { generateNewId } from "../utils/generateNewId";
import { router } from 'expo-router';

export const useNotes = () => {
    const [notes, setNotes] = useState([])
    const [oneNote, setOneNote] = useState({})

    // Refresh notes data that are listening on the refreshTrigger state
    useEffect(() => {
        const loadNotes = async () => {
            const loadedNotes = await getAllNotes();
            setNotes(loadedNotes);
        };
        loadNotes();
    }, [])

    // Find a single note by ID
    const findOneNote = (id) => {
        const foundNote = notes.find((note) => note.id === id);
        console.log("foundNote", foundNote);
        if (foundNote) {
            setOneNote(foundNote);
        }
    };

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

    return { notes, oneNote, handleSaveNote, findOneNote };
}