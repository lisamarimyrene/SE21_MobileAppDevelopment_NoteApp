import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { getAllNotes } from '../utils/asyncStorage';
import { Alert } from 'react-native';
import { updateNotesArray } from '../utils/asyncStorage';
import { router } from 'expo-router';

export const useOneNote = (id) => {
    // console.log(id)

    const [notes, setNotes] = useState()
    const [oneNote, setOneNote] = useState({})

    useEffect(() => {
        setNotes(getAllNotes());
    }, [])

    // Find one note in notes array

    // const findOneNote = notes && notes.filter((note) => {
    //     // console.log('id to find: ' + id + '\ncurrent id: ' + note.id)
    //     if (id == note.id) {
    //         setOneNote(note)
    //         return note
    //     }
    // })

    // console.log("findOneNot1", findOneNote);
    // setOneNote(findOneNote[0])
    // console.log("oneNote", oneNote);


    // Listen on if the id changes
    // useEffect(() => {
    //     // if (!id) return
    //     getAllNotes(setNotes)
    //     // setOneNote(findOneNote[0])
    //     // console.log(JSON.stringify(oneNote))
    // }, [])
    // console.log("oneNote", oneNote);


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

