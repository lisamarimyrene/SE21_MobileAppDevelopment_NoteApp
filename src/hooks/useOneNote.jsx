import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { getAllNotes } from '../utils/asyncStorage';

export const useOneNote = (id) => {
    const [notes, setNotes] = useState([])
    const [oneNote, setOneNote] = useState({})


    getAllNotes(setNotes)

    
    const findOneNote = notes.filter((note) => {
        if (id === note.id) return note
    })


    useEffect(() => {
        if (!id) return 

        findAllNotes()
        console.log('all notes ', notes);
        setOneNote(findOneNote())
    }, [id])

    
    return { oneNote }
}

