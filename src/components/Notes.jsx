import { ScrollView, View, Text, StyleSheet, FlatList } from "react-native"
import { colors } from "../../themes/colors"
import { PostIt } from "./PostIt"
import { useNotes } from "../hooks/useNotes"

export const Notes = () => {
    const { notes } = useNotes()

    if (!notes) {
        return (
            <View style={styles.placeholderTxtContainer}>
                <Text style={styles.placeholderTxt}>Click the + button to create new note</Text>
            </View>
        )
    }

    return (
        // <ScrollView style={styles.scrollContainer}
        //     showsVerticalScrollIndicator={false}
        //     showsHorizontalScrollIndicator={false}
        // 
        <View style={styles.viewSection}>
            <FlatList
                contentContainerStyle={styles.postitSection}
                scrollEnabled={true}
                data={notes}
                renderItem={({ item }) => {
                    return <PostIt
                        id={item.id}
                        color={item.color}
                        title={item.title}
                        content={item.content}
                    />
                }}
            />
        </View>
        // </ScrollView>
    )
}

const styles = StyleSheet.create({
    // scrollContainer: {
    //     height: "70%",
    //     width: "90%",
    //     borderWidth: 2,
    //     borderColor: '#000'
    // },
    placeholderTxtContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderTxt: {
        color: colors.text,
        fontFamily: 'Menlo'
    },
    viewSection: {
        height: 200,
        flexDirection: 'row',
        flexWrap: 'wrap', // Allow the PostIt components to wrap
        justifyContent: 'space-evenly',
    },
    postitSection: {
        width: '100%',
        paddingVertical: 20,
        borderWidth: 2,
        borderColor: '#000',
    },
})