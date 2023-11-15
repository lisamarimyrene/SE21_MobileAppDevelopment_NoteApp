import { View, Text, StyleSheet, FlatList } from "react-native"
import { colors } from "../../../themes/colors"
import { PostIt } from "./PostIt"
import { useNotes } from "../../hooks/useNotes"

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
    placeholderTxtContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderTxt: {
        color: colors.text,
        fontFamily: 'Menlo'
    },
    viewSection: {
        height: "78%",
    },
    postitSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        width: '100%',
        paddingHorizontal: 30,
        height: 'auto',
        paddingVertical: 20,
    },
})