import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export const useOneNote = (id) => {
    const [allNotes, setAllNotes] = useState([])
    const [oneNote, setOneNote] = useState({})


    const findAllNotes = () => {
        AsyncStorage.getItem('notes')
            .then(savedNotes => {
                if (savedNotes) {
                    const parsedNotes = JSON.parse(savedNotes);
                    setAllNotes(parsedNotes)
                    console.log("parsed", parsedNotes);
                
                }
            })
            // Error message in case it's not able to load notes
            .catch(error => {
                console.error('Error loading notes from AsyncStorage: ', error);
            });
    }

    
    const findOneNote = allNotes.filter((note) => {
        if (id === note.id) return note
    })


    useEffect(() => {
        if (!id) return 

        findAllNotes()
        console.log('all notes ', allNotes);
        setOneNote(findOneNote())
    }, [id])

    
    return { oneNote }
}

