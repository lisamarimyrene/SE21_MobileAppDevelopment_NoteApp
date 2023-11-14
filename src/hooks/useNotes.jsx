import { useEffect, useState } from "react"
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
    const handleSaveNote = async (title, content, color, imageUri) => {
        
        const newNote = {
            id: generateNewId(),
            color: color,
            title: title,
            content: content,
            image: imageUri,
        };

        const updatedNotes = notes ? [...notes, newNote] : [newNote];

        try {
            await updateNotesArray(updatedNotes);
            router.back();
        } catch (error) {
            console.error('Error saving note: ', error);
        }
    }

    return { notes, handleSaveNote }
}