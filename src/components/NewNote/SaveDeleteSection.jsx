import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import Svg, { Path } from 'react-native-svg';
import { useNotes } from "../../hooks/useNotes";

export const SaveDeleteSection = (id, title, content, color, imageUri) => {
    const { handleSaveNote, handleDeleteNote } = useNotes(id);

    const handleSubmit = () => {
        if (!title && !content) {
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
            return
        }
        handleSaveNote(id, title, content, color, imageUri)
    }

    return(
        <View style={styles.saveDeleteSection}>
        <TouchableOpacity onPress={() => handleDeleteNote(id)}>
            <Svg width="35" height="35" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M19.5 0C8.73113 0 0 8.73113 0 19.5C0 30.2689 8.73113 39 19.5 39C30.2689 39 39 30.2689 39 19.5C39 8.73113 30.2689 0 19.5 0ZM21.7977 19.5C21.7977 19.5 26.8986 24.6009 27.1489 24.8511C27.7843 25.4865 27.7843 26.5151 27.1489 27.1489C26.5135 27.7843 25.4849 27.7843 24.8511 27.1489C24.6009 26.9003 19.5 21.7977 19.5 21.7977C19.5 21.7977 14.3991 26.8986 14.1489 27.1489C13.5135 27.7843 12.4849 27.7843 11.8511 27.1489C11.2158 26.5135 11.2158 25.4849 11.8511 24.8511C12.0998 24.6009 17.2023 19.5 17.2023 19.5C17.2023 19.5 12.1014 14.3991 11.8511 14.1489C11.2158 13.5135 11.2158 12.4849 11.8511 11.8511C12.4865 11.2158 13.5151 11.2158 14.1489 11.8511C14.3991 12.0998 19.5 17.2023 19.5 17.2023C19.5 17.2023 24.6009 12.1014 24.8511 11.8511C25.4865 11.2158 26.5151 11.2158 27.1489 11.8511C27.7843 12.4865 27.7843 13.5151 27.1489 14.1489C26.9003 14.3991 21.7977 19.5 21.7977 19.5Z" fill="#D18290" />
            </Svg>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSubmit()} style={styles.saveBtn}>
            <Svg width="45" height="45" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M24.4999 4.89999C13.6758 4.89999 4.8999 13.6759 4.8999 24.5C4.8999 35.3241 13.6758 44.1 24.4999 44.1C35.324 44.1 44.0999 35.3241 44.0999 24.5C44.0999 13.6759 35.324 4.89999 24.4999 4.89999ZM35.4547 20.7548L23.1067 33.1028C22.7996 33.4098 22.3847 33.5813 21.9519 33.5813C21.5191 33.5813 21.1026 33.4098 20.7971 33.1028L15.1572 27.4629C14.5186 26.8242 14.5186 25.792 15.1572 25.1533C15.7959 24.5147 16.8281 24.5147 17.4668 25.1533L21.9519 29.6385L33.1451 18.4452C33.7838 17.8066 34.816 17.8066 35.4547 18.4452C36.0933 19.0839 36.0933 20.1161 35.4547 20.7548Z" fill="#ACD3A9" />
            </Svg>
        </TouchableOpacity>
    </View>
    )

    
}

const styles = StyleSheet.create({
    saveDeleteSection: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    saveBtn: {
        paddingLeft: 10
    },
})