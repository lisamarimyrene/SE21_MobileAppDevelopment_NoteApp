import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { getAllNotes } from '../utils/asyncStorage';
import { Alert } from 'react-native';
import { updateNotesArray } from '../utils/asyncStorage';
import {router} from 'expo-router';

export const useOneNote = (id) => {
    const [notes, setNotes] = useState([])
    const [oneNote, setOneNote] = useState({})

    // Find one note in notes array
    const findOneNote = notes.filter((note) => {
        if (id === note.id) return note
    })

    // Listen on if the id changes
    useEffect(() => {
        if (!id) return

        getAllNotes(setNotes)
        setOneNote(findOneNote())

    }, [id])

    //! Need to check if edit-button works first
    // Delete selected note
    const handleDeleteNote = (id) => {
        let newNotesArray;

        newNotesArray = notes.filter((note) => {
            if (note.id === oneNote.id) {
                return note
            }
        })

        newNotesArray = [...notes, newNotesArray];
        console.log(newNotesArray);

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
                    onPress: () => {
                        updateNotesArray(newNotesArray, setNotes)
                        router.back()
                    },
                },
            ],
            { cancelable: false }
        );

    }


    return { oneNote, handleDeleteNote }
}

