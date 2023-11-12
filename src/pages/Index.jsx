import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Modal } from 'react-native'
import { PostIt } from '../components/PostIt'
import { NewNote } from '../components/NewNote';
import { colors } from '../../themes/colors'
import Svg, { Path } from 'react-native-svg';
import { handleData } from '../hooks/useNotesData';


export const Index = () => {
    // const [showNewNote, setShowNewNote] = useState(false);
    // const [notes, setNotes] = useState([]);
    // const [editNote, setEditNote] = useState(null);

    const {
        showNewNote, 
        setShowNewNote,
        notes,
        editNote,
        handleSaveNote,
        handleCancel,
        handleEditNote  
    } = handleData()



    return (
        <View style={styles.main}>
            <ScrollView style={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                {!notes.length ? (
                    <View style={styles.placeholderTxtContainer}>
                        <Text style={styles.placeholderTxt}>Click the + button to create new note</Text>
                    </View>
                ) : (
                    <View style={styles.postitSection}>
                        {/* Endre til flatlist */}
                        {notes.map((note) => (
                            <PostIt
                                key={note.id}
                            />
                        ))}
                    </View>
                )}
            </ScrollView>
            {showNewNote ? (
                <Modal styles={styles.newNote} animationType="slide">
                <NewNote  animationType="slide" />
                </Modal>
            ) : (
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => setShowNewNote(true)}
                >
                    <Svg width="90" height="90" viewBox="0 0 162 162" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M81 16.2C45.2142 16.2 16.2 45.2142 16.2 81C16.2 116.786 45.2142 145.8 81 145.8C116.786 145.8 145.8 116.786 145.8 81C145.8 45.2142 116.786 16.2 81 16.2ZM113.4 86.4H86.4V113.4C86.4 116.386 83.9808 118.8 81 118.8C78.0192 118.8 75.6 116.386 75.6 113.4V86.4H48.6C45.6192 86.4 43.2 83.9862 43.2 81C43.2 78.0138 45.6192 75.6 48.6 75.6H75.6V48.6C75.6 45.6138 78.0192 43.2 81 43.2C83.9808 43.2 86.4 45.6138 86.4 48.6V75.6H113.4C116.381 75.6 118.8 78.0138 118.8 81C118.8 83.9862 116.381 86.4 113.4 86.4Z" fill="#B17A9B" />
                    </Svg>
                </TouchableOpacity>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: colors.background,
        flex: 1,
        flexDirection: 'column',
        paddingTop: 80,
        paddingHorizontal: 12,
        alignItems: 'center',
        justifyContent: 'center',
        height: 'auto'
    },
    scrollContainer: {
        flex: 0.7,
    },
    placeholderTxtContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderTxt: {
        color: colors.text,
        fontFamily: 'Menlo'
    },
    postitSection: {
        flexDirection: 'row',
        flexWrap: 'wrap', // Allow the PostIt components to wrap
        justifyContent: 'space-between',
        padding: 5
    },
    newNote: {
        height: '90%'
    },
    buttonContainer: {
        flex: 0.3, // Set to 30% of the available height
        justifyContent: 'center',
        alignItems: 'center',
    },
})