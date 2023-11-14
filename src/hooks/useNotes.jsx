import { useEffect, useState } from "react"
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

    return { notes, handleSaveNote }
}