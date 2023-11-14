import { SafeAreaView, View, Text, StyleSheet, FlatList } from "react-native"
import { colors } from "../../themes/colors"
import { PostIt } from "./PostIt"

export const Notes = ({ notes }) => {

    if (!notes.length) {
        return (
            <View style={styles.placeholderTxtContainer}>
                <Text style={styles.placeholderTxt}>Click the + button to create new note</Text>
            </View>
        )
    }
    console.log('Notes: ', notes);

    return (
        <SafeAreaView style={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
        >
            <View style={styles.postitSection}>
                <FlatList
                    data={notes}
                    renderItem={(note) => 
                        <PostIt 
                            id={note.id}
                            color={note.color}
                            title={note.title}
                            content={note.content}
                            onEdit={() => toggleModal()} 
                        />
                    }
                />
            </View>
        </SafeAreaView>
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