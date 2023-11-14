import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { getAllNotes } from '../utils/asyncStorage';
import { Alert } from 'react-native';
import { updateNotesArray } from '../utils/asyncStorage';
import { router } from 'expo-router';

export const useOneNote = (id) => {
    const [notes, setNotes] = useState()
    const [oneNote, setOneNote] = useState({})

    useEffect(() => {
        const loadNotes = async () => {
            const loadedNotes = await getAllNotes();
            setNotes(loadedNotes || []);
        };
        loadNotes();
    }, [])

    console.log("notes: ", notes);

    // Find one note in notes array

    const findOneNote = () => {
        // console.log('id to find: ' + id + '\ncurrent id: ' + note.id)
        // if (id == note.id) {
        //     setOneNote(note)
        //     return note
        // }

        const foundNote = notes && notes.find((note) => note.id === id);
        console.log("foundNote", foundNote);
        if (foundNote) {
            setOneNote(foundNote);
        }
    }

    useEffect(() => {
        findOneNote();
    }, [id, notes]);

    // console.log("findOneNote: 1", findOneNote);
    // setOneNote(findOneNote)
    // console.log("oneNote", oneNote);


    // Listen on if the id changes



    //! Need to check if edit-button works first
    // Delete selected note
    // const handleDeleteNote = (id) => {
    //     let newNotesArray;

    //     newNotesArray = notes.filter((note) => {
    //         if (note.id === oneNote.id) {
    //             return note
    //         }
    //     })

    //     //! Doesn't make sense
    //     newNotesArray = [...notes, newNotesArray];
    //     console.log(newNotesArray);

    //     Alert.alert(
    //         'Confirm Delete',
    //         'Are you sure you want to delete this note?',
    //         [
    //             {
    //                 text: 'Cancel',
    //                 style: 'cancel',
    //             },
    //             {
    //                 text: 'Delete',
    //                 onPress: () => {
    //                     updateNotesArray(newNotesArray, setNotes)
    //                     router.back()
    //                 },
    //             },
    //         ],
    //         { cancelable: false }
    //     );

    // }


    return { oneNote }
}

