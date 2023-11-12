import { ScrollView, View, Text, StyleSheet } from "react-native"
import { colors } from "../../themes/colors"
import { PostIt } from "./PostIt"

export const Notes = ({ notes }) => {
    
    // Handle the edit of an exisiting note
    const handleEditNote = (note) => {
        setEditNote(note);
        setShowNewNote(true);
    };

    if (!notes.length) {
        return (
            <View style={styles.placeholderTxtContainer}>
                <Text style={styles.placeholderTxt}>Click the + button to create new note</Text>
            </View>
        )
    }

    return (
        <ScrollView style={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
        >

            <View style={styles.postitSection}>
                {/* Endre til flatlist */}
                {notes.map((note) => (
                    <PostIt
                        key={note.id}
                        color={note.color}
                        title={note.title}
                        content={note.content}
                        onEdit={() => handleEditNote(note)}
                    />
                ))}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
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
})