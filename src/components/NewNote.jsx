
import { TextInput, View, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { colorOptions } from '../../utils/colorFunctions';
import Svg, { Path, Rect } from 'react-native-svg';
import React, { useState } from 'react';

export const NewNote = ({ onSave, onCancel, noteId, editNote }) => {
    // Set states, and populate fields if note exists.
    const [title, setTitle] = useState(editNote ? editNote.title : '');
    const [content, setContent] = useState(editNote ? editNote.content : '');
    const [color, setColor] = useState(editNote ? editNote.color : 'yellow');

    // Handle color change of the post-it note
    const handleColorChange = (color) => {
        setColor(color);
    };

    // Handle the saving functionality
    const handleSave = () => {
        if (title || content) {
            const newNote = {
                id: editNote ? editNote.id : noteId(),
                color: color,
                title: title,
                content: content,
            };
            onSave(newNote);
            onCancel();
        }
        else {
            Alert.alert(
                'Did you mean to save?',
                'Please enter some input or delete the note.',
                [
                    {
                        text: 'OK',
                    },
                ],
                { cancelable: true }
            );
        }
    };

    // Handle the cancel action with a confirmation dialog
    const handleCancel = () => {
        // If the note has title or content, give alert.
        if (title || content) {
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
                            onCancel(true);
                        },
                    },
                ],
                { cancelable: false }
            );
            // If the note doesnt have title or content, just close window.
        } else if (!title || !content) {
            onCancel(true);
            // Else, don't close window. 
        } else {
            onCancel(false);
        }
    };

    return (
        <View style={styles.newNoteContainer}>
            <View style={styles.saveSection}>
                <TouchableOpacity onPress={handleSave} style={styles.saveBtn}>
                    <Svg width="45" height="45" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M24.4999 4.89999C13.6758 4.89999 4.8999 13.6759 4.8999 24.5C4.8999 35.3241 13.6758 44.1 24.4999 44.1C35.324 44.1 44.0999 35.3241 44.0999 24.5C44.0999 13.6759 35.324 4.89999 24.4999 4.89999ZM35.4547 20.7548L23.1067 33.1028C22.7996 33.4098 22.3847 33.5813 21.9519 33.5813C21.5191 33.5813 21.1026 33.4098 20.7971 33.1028L15.1572 27.4629C14.5186 26.8242 14.5186 25.792 15.1572 25.1533C15.7959 24.5147 16.8281 24.5147 17.4668 25.1533L21.9519 29.6385L33.1451 18.4452C33.7838 17.8066 34.816 17.8066 35.4547 18.4452C36.0933 19.0839 36.0933 20.1161 35.4547 20.7548Z" fill="#ACD3A9" />
                    </Svg>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCancel}>
                    <Svg width="38" height="38" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M19.5 0C8.73113 0 0 8.73113 0 19.5C0 30.2689 8.73113 39 19.5 39C30.2689 39 39 30.2689 39 19.5C39 8.73113 30.2689 0 19.5 0ZM21.7977 19.5C21.7977 19.5 26.8986 24.6009 27.1489 24.8511C27.7843 25.4865 27.7843 26.5151 27.1489 27.1489C26.5135 27.7843 25.4849 27.7843 24.8511 27.1489C24.6009 26.9003 19.5 21.7977 19.5 21.7977C19.5 21.7977 14.3991 26.8986 14.1489 27.1489C13.5135 27.7843 12.4849 27.7843 11.8511 27.1489C11.2158 26.5135 11.2158 25.4849 11.8511 24.8511C12.0998 24.6009 17.2023 19.5 17.2023 19.5C17.2023 19.5 12.1014 14.3991 11.8511 14.1489C11.2158 13.5135 11.2158 12.4849 11.8511 11.8511C12.4865 11.2158 13.5151 11.2158 14.1489 11.8511C14.3991 12.0998 19.5 17.2023 19.5 17.2023C19.5 17.2023 24.6009 12.1014 24.8511 11.8511C25.4865 11.2158 26.5151 11.2158 27.1489 11.8511C27.7843 12.4865 27.7843 13.5151 27.1489 14.1489C26.9003 14.3991 21.7977 19.5 21.7977 19.5Z" fill="#D18290" />
                    </Svg>
                </TouchableOpacity>
            </View>

            <View style={styles.textSection}>
                <TextInput
                    style={styles.titleInput}
                    placeholder="Title"
                    value={title}
                    multiline={true}
                    onChangeText={text => setTitle(text)}
                />
                <TextInput
                    style={styles.contentInput}
                    placeholder="What's on your mind?"
                    value={content}
                    multiline={true}
                    onChangeText={text => setContent(text)}
                />
            </View>
            <View style={styles.optionsContainer}>
                <View style={styles.cameraSection}>

                </View>

                <View style={styles.chooseColorSection}>
                    {colorOptions.map((colorOption) => (
                        <TouchableOpacity
                            key={colorOption.name}
                            onPress={() => handleColorChange(colorOption.name)}
                        >
                            <Svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Rect
                                    width="41"
                                    height="41"
                                    rx="3"
                                    fill={color === colorOption.name ? colorOption.activeFill : colorOption.fill}
                                    stroke={colorOption.stroke}
                                    strokeWidth="7"
                                />
                            </Svg>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    newNoteContainer: {
        height: '100%',
        width: '100%',
        paddingHorizontal: 20,

    },
    saveSection: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'

    },
    saveBtn: {
        paddingRight: 10
    },
    textSection: {
        height: '80%',
        paddingVertical: 20,
    },
    titleInput: {
        fontSize: 26,
        marginBottom: 30,
        height: '10%',
        fontFamily: 'Menlo'
    },
    contentInput: {
        fontSize: 16,
        height: '80%',
        fontFamily: 'Menlo'
    },
    optionsContainer: {
        width: '100%',
        justifyContent: 'space-between'
    },
    chooseColorSection: {
        flexDirection: 'row',
        width: '65%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20
    }
})